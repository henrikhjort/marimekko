import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CodeLoginForm from '.';
import { useAuth } from '@/context/AuthContext';
import '@testing-library/jest-dom';

// Mock the AuthContext
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock getEmailToken from token lib
jest.mock('@/lib/token', () => ({
  getEmailToken: jest.fn(),
}));

const mockLoginWithCode = jest.fn();

beforeEach(() => {
  (useAuth as jest.Mock).mockReturnValue({
    loginWithCode: mockLoginWithCode,
  });
  (require('@/lib/token').getEmailToken as jest.Mock).mockReturnValue('test-token');
  jest.clearAllMocks();
});

describe('CodeLoginForm', () => {
  test('renders correctly with all inputs', () => {
    // Mock success function
    const mockOnSuccess = jest.fn();
    render(<CodeLoginForm onSuccess={mockOnSuccess} />);
    // Get all code inputs
    const inputs = screen.getAllByRole('spinbutton');
    // Check that there are 4 inputs
    expect(inputs).toHaveLength(4);
  });

  test('handles input change and focuses next input', async () => {
    // Mock success function
    const mockOnSuccess = jest.fn();
    render(<CodeLoginForm onSuccess={mockOnSuccess} />);
    const inputs = screen.getAllByRole('spinbutton');

    // Type 1 in the first input
    await userEvent.type(inputs[0], '1', { delay: 1 });
    await waitFor(() => {
      expect(inputs[0]).toHaveValue(1);
    });

    // Expect the second input to have focus
    expect(inputs[1]).toHaveFocus();

    // Type 2 in the second input
    await userEvent.type(inputs[1], '2', { delay: 1 });
    await waitFor(() => {
      expect(inputs[1]).toHaveValue(2);
    });

    // Expect the third input to have focus
    expect(inputs[2]).toHaveFocus();

    // Type 3 in the third input
    await userEvent.type(inputs[2], '3', { delay: 1 });
    await waitFor(() => {
      expect(inputs[2]).toHaveValue(3);
    });

    // Expect the fourth input to have focus
    expect(inputs[3]).toHaveFocus();

    // Type 4 in the fourth input
    await userEvent.type(inputs[3], '4', { delay: 1 });
    await waitFor(() => {
      expect(inputs[3]).toHaveValue(4);
    });

    // Expect the fourth input to remain focused
    expect(inputs[3]).toHaveFocus();
  });
});
