"use client";
import React, { useState, FormEvent } from 'react';

import { useAuth } from '@/context/AuthContext';
import { getEmailToken } from '@/lib/token';

type CodeLoginForm = {
  onSuccess?: () => void;
};

const CodeLoginForm: React.FC<CodeLoginForm> = ({ onSuccess }) => {
  const { loginWithCode } = useAuth();
  const [code, setCode] = useState('');

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent) => {
    console.log(1);
    event.preventDefault();
    const emailToken = getEmailToken();
    if (!emailToken) {
      console.log('Email token not found.');
      return;
    }
    const success = await loginWithCode(code, emailToken);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Code</label>
      <input
        className='border-2 border-gray-300 p-2 w-full mt-2 text-black'
        type="number"
        id="code"
        name="email"
        value={code}
        onChange={handleCodeChange}
        placeholder="Enter your code"
        required
      />
        <button className="bg-red-500 rounded" type="submit">Submit</button>
    </form>
  );
};

export default CodeLoginForm;
