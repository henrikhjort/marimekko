import type { Metadata } from "next";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/basic/Navbar";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  colors: {
    'brand-black': [
      '#333333', // 50 - lighter
      '#2d2d2d', // 100
      '#262626', // 200
      '#202020', // 300
      '#1a1a1a', // 400
      '#141414', // 500 - base/black
      '#101010', // 600
      '#0c0c0c', // 700
      '#080808', // 800
      '#040404', // 900 - darker
    ],
    'brand-white': [
      '#f7f7f7', // 50 - lighter
      '#f2f2f2', // 100
      '#ededed', // 200 - base/white
      '#e8e8e8', // 300
      '#e3e3e3', // 400
      '#dedede', // 500
      '#d9d9d9', // 600
      '#d4d4d4', // 700
      '#cfcfcf', // 800
      '#cacaca', // 900 - darker
    ],
  },
  primaryColor: 'brand-black',
});

export const metadata: Metadata = {
  title: "Marimekko B2B",
  description: "Browse, get inspired, and purchase Marimekko products for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <Navbar links={[]}/>
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
