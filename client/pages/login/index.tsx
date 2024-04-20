"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import EmailForm from "@/components/auth/EmailForm";
import { AuthProvider } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();

  function onSuccess(emailToken: string) {
    router.push(`/login/${emailToken}`);
  }

  return (
    <AuthProvider>
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <EmailForm onSuccess={onSuccess}/>
      </div>
    </div>
    </AuthProvider>
  );
}
