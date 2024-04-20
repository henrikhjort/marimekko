"use client";
import React, { useState, FormEvent } from 'react';

import { useAuth } from '@/context/AuthContext';
import { getEmailToken } from '@/lib/token';

import Heading from '../basic/Heading';
import Button from '../basic/Button';

type CodeLoginForm = {
  onSuccess?: () => void;
};

const CodeLoginForm: React.FC<CodeLoginForm> = ({ onSuccess }) => {
  const { loginWithCode } = useAuth();
  const [code, setCode] = useState(["", "", "", ""]);

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
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Heading className="text-brand-black mb-6" level={3}>Verify login code</Heading>
        <div className="flex space-x-2 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              className="border-2 border-gray-300 p-2 w-14 text-center text-lg"
              type="number"
              maxLength={1}
              value={digit}
              onChange={handleCodeChange(index)}
              inputMode="numeric"
              pattern="[0-9]*"
              required
            />
          ))}
        </div>
        <Button width={80} type="submit" variant="black">Verify code</Button>
      </form>
    </div>
  );
};

export default CodeLoginForm;
