import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { GetServerSideProps } from "next";

import { getEmailToken } from "@/lib/token";
import { AuthProvider } from "@/context/AuthContext";

import CodeLoginForm from "@/components/CodeLoginForm";

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
    <AuthProvider>
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <CodeLoginForm onSuccess={onSuccess} />
      </div>
    </div>
    </AuthProvider>
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
