"use client";
import React, { useState, FormEvent } from 'react';

import { useAuth } from '@/context/AuthContext';
import { getEmailToken } from '@/lib/token';

import Heading from '../../basic/Heading';
import Button from '../../basic/Button';

type CodeLoginForm = {
  onSuccess?: () => void;
};

/**
 * Form component for logging in with login code.
 *
 * Props:
 *  - onSuccess: function to call on successful login
 * 
 * Usage:
    <CodeLoginForm onSuccess={onSuccess} />
 */
const CodeLoginForm: React.FC<CodeLoginForm> = ({ onSuccess }) => {
  const { loginWithCode } = useAuth();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);
    if (event.target.nextSibling) {
      // Focus next input when user types a digit
      (event.target.nextElementSibling as HTMLInputElement)?.focus();
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const emailToken = getEmailToken();
    if (!emailToken) {
      console.log('Email token not found.');
      return;
    }
    const fullCode = code.join('');
    const success = await loginWithCode(fullCode, emailToken);
    if (success && onSuccess) {
      onSuccess();
    } else {
      setError('Invalid code');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Heading className="text-brand-black mb-6" level={3}>Verify login code</Heading>
        <div className="flex space-x-2 mb-4 w-80 justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              className="border-2 border-gray-300 w-14 h-14 text-center text-lg"
              type="number"
              maxLength={1}
              value={digit}
              onChange={handleCodeChange(index)}
              inputMode="numeric"
              pattern="[0-9]*"
              required
              disabled={loading}
            />
          ))}
        </div>
        {error && <span className="text-red-500 my-1">{error}</span>}
        <Button
          width={80}
          type="submit"
          variant="black"
          disabled={loading}
        >
          Verify code
        </Button>
      </form>
    </div>
  );
};

export default CodeLoginForm;
