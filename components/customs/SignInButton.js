"use client";
import React from 'react';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUserDetail } from '@/context/UserDetailContext';
import { useRouter } from 'next/navigation';

function SignInButton() {
  const { setUserDetail } = useUserDetail();
  const CreateUser = useMutation(api.users.CreateUser);
  const router = useRouter();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('Token Response:', tokenResponse);
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } }
        );

        console.log('User Info:', userInfo.data);
        const user = userInfo.data;

        // Save to Convex
        const result = await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
        });

        const userDetail = {
          ...user,
          _id: result?.id ?? result,
        };

        // Update context
        setUserDetail(userDetail);
        console.log('Updated userDetail in context:', userDetail);

        // Save to localStorage
        localStorage.setItem('userDetail', JSON.stringify(userDetail));

        // Redirect to home or dashboard
        router.push('/');
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login failed:', errorResponse);
    },
  });

  return (
    <div>
      <Button onClick={googleLogin}>Get Started</Button>
    </div>
  );
}

export default SignInButton;