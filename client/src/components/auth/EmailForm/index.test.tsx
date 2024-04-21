// EmailForm.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmailForm from '.';
import { useAuth } from '@/context/AuthContext';
import '@testing-library/jest-dom';

// Mock the AuthContext
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock function to simulate login with email
const mockLoginWithEmail = jest.fn();

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    loginWithEmail: mockLoginWithEmail,
  });
  jest.clearAllMocks();
});

describe('EmailForm', () => {
  test('renders correctly with email input', () => {
    const mockOnSuccess = jest.fn();
    render(<EmailForm onSuccess={mockOnSuccess} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verify email/i })).toBeInTheDocument();
  });

  test('handles email input change', async () => {
    const mockOnSuccess = jest.fn();
    render(<EmailForm onSuccess={mockOnSuccess} />);
    const input = screen.getByLabelText(/email/i);
    await userEvent.type(input, 'test@example.com', { delay: 1 });
    await waitFor(() => {
      expect(input).toHaveValue('test@example.com');
    });
  });

  test('displays error on invalid email', async () => {
    mockLoginWithEmail.mockResolvedValue(null);
    const mockOnSuccess = jest.fn();
    render(<EmailForm onSuccess={mockOnSuccess} />);

    const input = screen.getByLabelText(/email/i);
    userEvent.type(input, 'bademail');
    fireEvent.submit(screen.getByRole('button', { name: /verify email/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });
});
