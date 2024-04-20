"use client";
import React from "react";
import { useRouter } from 'next/navigation'

import EmailForm from "@/components/auth/EmailForm";
import { AuthProvider } from "@/context/AuthContext";
import Heading from "@/components/basic/Heading";
import Button from "@/components/basic/Button";
import '../../app/globals.css';
import './login.css';

export default function Login() {
  const router = useRouter();

  function onSuccess(emailToken: string) {
    router.push(`/login/${emailToken}`);
  }

  return (
    <div className="flex md:flex-row flex-col w-full items-center justify-center bg-blue-100 min-h-screen login">
      <div className="flex flex-col flex-1 w-full bg-brand-white md:min-h-screen justify-center items-center p-16">
        <AuthProvider>
          <EmailForm onSuccess={onSuccess}/>
        </AuthProvider>
      </div>
      <div className="flex flex-col flex-1 w-full bg-brand-black md:min-h-screen justify-center items-center space-y-4">
        <Heading className="text-brand-white" level={1}>Welcome</Heading>
        <span className="text-brand-white">{`Don't have an account?`}</span>
        <Button width={80} onClick={() => alert('Not implemented')} variant="white">Sign up</Button>
      </div>
    </div>
  );
}
