"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { storeEmailToken, storeAccessToken, getAccessToken, removeAccessToken, removeEmailToken } from '@/lib/token';
import { getApiUrl } from '@/lib/helpers';
import { log } from 'console';

interface AuthContextType {
  user: User | null;
  loginWithEmail: (email: string) => Promise<string | null>;
  loginWithCode: (code: string, emailToken: string) => Promise<boolean>;
  logout: () => void;
}

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  companyId: number;
}

/**
 * AuthContext module.
 *
 * Provides authentication-related services to the application through context.
 * Exposes functionalities to log in a user via email or verification code,
 * log out, and check user authentication status.
 *
 * This module should be imported and used within components that require
 * authentication information or functionalities.
 *
 * Usage:
 * Wrap your root component with `<AuthProvider>` to provide authentication context
 * to the rest of your app.
 *
 *
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 *
 * Use `useAuth` hook to access auth functions and user state in functional components.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that wraps your app and provides an AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Fetches the user data from the API when the component mounts.
   * If the user is not found, clears the access token.
   * 
   * This effect runs once when the component mounts.
   **/
  useEffect(() => {
    async function fetchUser() {
      const accessToken = getAccessToken();
      if (!accessToken) return;
      try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/user`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        if (!res.ok) {
          console.log('Error fetching user:', res);
          // If there is an error, clear all tokens and user state.
          logout();
          return;
        }
        const result = await res.json();
        setUser(result.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        // If there is an error, clear all tokens and user state.
        logout();
      }
    }
    fetchUser();
  }, []);

  /**
   * Logs in a user with an email.
   * Stores the email token if successful.
   * 
   * @param email User input email
   */
  async function loginWithEmail(email: string): Promise<string | null> {
    const emailToken = await verifyEmail(email);
    if (!emailToken) {
      console.log('Email not verified.')
      // If there is an error, clear all tokens and user state.
      logout();
      return null;
    }
    storeEmailToken(emailToken);
    return emailToken;
  }

  async function loginWithCode(code: string, emailToken: string): Promise<boolean> {
    const accessToken = await verifyCode(code, emailToken);
    if (!accessToken) {
      console.log('Code not verified.')
      // If there is an error, clear all tokens and user state.
      logout();
      return false;
    }
    storeAccessToken(accessToken);
    removeEmailToken();
    return true;
  }

  /**
   * Verifies the email and returns an email token if successful.
   * 
   * @param email User input email
   * @returns Email token if email is verified, otherwise null
   */
  async function verifyEmail(email: string): Promise<string | null> {
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
      console.log(res);
      if (!res.ok) {
        return null;
      }
      const result = await res.json();
      const emailToken = result.data;
      return emailToken;
    } catch (error) {
      console.error('Error verifying email:', error);
      // If there is an error, clear all tokens and user state.
      logout();
      return null;
    }
  }

  /**
   * Verifies the codu and returns an access token if successful.
   * 
   * @param code User input code
   * @param emailToken Temporary email token
   * 
   * @returns Access token if code is verified, otherwise null
   */
  async function verifyCode(code: string, emailToken: string): Promise<string | null> {
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/auth/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-email-token': emailToken,
          },
          body: JSON.stringify({ code }),
        });
      if (!res.ok) {
        return null;
      }
      const result = await res.json();
      const accessToken = result.data;
      return accessToken;
    } catch (error) {
      console.error('Error verifying email:', error);
      // If there is an error, clear all tokens and user state.
      logout();
      return null;
    }
  }

  /**
   * Logs out the user, clearing all tokens and user state.
   */
  const logout = () => {
    setUser(null);
    removeAccessToken();
    removeEmailToken();
  };

  return (
    <AuthContext.Provider value={{ user, loginWithEmail, loginWithCode, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
