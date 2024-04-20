"use client";
import React, { useState, FormEvent } from 'react';

import Button from '../basic/Button';
import Heading from '../basic/Heading';
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
    <div className="flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <Heading className="text-brand-black mb-6" level={3}>Marimekko B2B</Heading>
        <label className="text-brand-gray-400" htmlFor="email">Email</label>
        <input
          className='border-2 border-gray-300 p-2 w-full my-2 text-black w-80'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
        <Button width={80} type="submit" variant="black">Verify email</Button>
      </form>
    </div>
  );
};

export default EmailForm;
