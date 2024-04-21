import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { GetServerSideProps } from "next";

import { getEmailToken } from "@/lib/token";
import { AuthProvider } from "@/context/AuthContext";

import CodeLoginForm from "@/components/auth/CodeLoginForm";
import Heading from "@/components/basic/Heading";
import Button from "@/components/basic/Button";
import '../../../app/globals.css';

type CodeLoginPageProps = {
  emailToken: string;
};

export default function CodeLoginPage({ emailToken }: CodeLoginPageProps) {
  const router = useRouter();

  // Check that the email token matches the one stored in local storage
  useEffect(() => {
    const storageToken = getEmailToken();
    if (storageToken !== emailToken) {
      console.log('Email token does not match.');
      router.push('/login');
    }
  }, [emailToken, router]);

  function onSuccess() {
    router.push('/');
  }

  return (
    <div className="flex md:flex-row flex-col w-full items-center justify-center min-h-screen login">
      <div className="flex flex-col flex-1 w-full bg-brand-white md:min-h-screen justify-center items-center p-16">
        <AuthProvider>
          <CodeLoginForm onSuccess={onSuccess} />
        </AuthProvider>
      </div>
      <div className="flex flex-col flex-1 w-full bg-brand-black md:min-h-screen justify-center items-center space-y-4">
        <Heading className="text-brand-white" level={1}>Welcome</Heading>
        <span className="text-brand-white">{`Don't have an account?`}</span>
        <Button onClick={() => alert('Not implemented')} variant="white">Sign up</Button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Read email token from route params
  const emailToken = params?.emailToken as string;
  if (!emailToken) {
    // Redirect to /login
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      emailToken,
    },
  };
};
