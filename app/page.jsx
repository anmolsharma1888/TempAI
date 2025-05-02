// app/page.jsx
"use client";
import Header from "@/components/customs/Header";
import Hero from "@/components/customs/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUserDetail } from '@/context/UserDetailContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { userDetail } = useUserDetail();
  const router = useRouter();

  return (
    <div>
      <Header />
      <Hero />
      {userDetail?.email && (
        <div className="text-center mt-4">
          <Button
            onClick={() => router.push('/dashboard/create')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create a Template
          </Button>
        </div>
      )}
    </div>
  );
}