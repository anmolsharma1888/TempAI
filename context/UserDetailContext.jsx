"use client";
import { createContext, useContext, useState, useEffect } from 'react';

export const UserDetailContext = createContext(null);

export function UserDetailProvider({ children }) {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userDetail');
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export function useUserDetail() {
  const context = useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error('useUserDetail must be used within a UserDetailProvider');
  }
  return context;
}