import { createContext, useContext } from 'react';

export const UserDetailContext = createContext(null);

export function useUserDetail() {
  const context = useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error('useUserDetail must be used within a UserDetailProvider');
  }
  return context;
}