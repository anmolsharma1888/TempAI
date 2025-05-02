// components/customs/Header.js
"use client";
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import SignInButton from './SignInButton';
import { useUserDetail } from '@/context/UserDetailContext';
import Link from 'next/link';

export default function Header() {
  const { userDetail, logout } = useUserDetail(); // Access logout from context

  return (
    <div className='flex justify-between items-center p-4 shadow-sm px-10'>
      <Image src={'/logo.svg'} alt='logo' width={180} height={140} />
      <div>
        {userDetail?.email ? (
          <div className='flex gap-3 items-center'>
            <Link href={'/dashboard'}>
              <Button>Dashboard</Button>
            </Link>
            <Image src={userDetail?.picture} alt='user' width={35} height={35} className='rounded-full' />
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}