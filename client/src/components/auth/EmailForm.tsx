"use client";
import React, { useState, FormEvent } from 'react';

import { useAuth } from '@/context/AuthContext';

type EmailFormProps = {
  onSuccess?: (emailToken: string) => void;
};

const EmailForm: React.FC<EmailFormProps> = ({ onSuccess }) => {
  const { loginWithEmail } = useAuth();
  // State to hold the email value
  const [email, setEmail] = useState('');

  // Function to handle the email input change
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('Email submitted:', email);
    const emailToken = await loginWithEmail(email);
    console.log('Email token:', emailToken);
    if (emailToken && onSuccess) {
      onSuccess(emailToken);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        className='border-2 border-gray-300 p-2 w-full mt-2 text-black'
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        required
      />
        <button className="bg-red-500 rounded" type="submit">Submit</button>
    </form>
  );
};

export default EmailForm;