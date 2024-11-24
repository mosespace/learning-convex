'use client';

import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import generateUserId from '@/utils/generateRandomId';

// Function to get or create userId
const getUserId = () => {
  if (typeof window === 'undefined') return null;

  const storageKey = 'user_id';
  let userId = localStorage.getItem(storageKey);

  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(storageKey, userId);
  }

  return userId;
};

const UserIdInitializer = () => {
  useEffect(() => {
    getUserId();
  }, []);

  return null;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserIdInitializer />
      {children}
      <Toaster />
    </>
  );
}
