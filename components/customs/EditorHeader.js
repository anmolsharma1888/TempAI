"use client";
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { Code, Monitor, Smartphone } from 'lucide-react';
import { useEmailTemplate, useScreenSize } from '@/app/Provider';
import { useUserDetail } from '@/context/UserDetailContext';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

export default function EditorHeader({ viewHTMLCode }) {
  const { screenSize, setScreenSize } = useScreenSize();
  const router = useRouter(); // Initialize router
  const updateEmailTemplate = useMutation(api.emailTemplate.UpdateTemplateDesign);
  const { templateId } = useParams();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { userDetail } = useUserDetail();
  const onSaveTemplate = async () => {
    if (!userDetail?.email) {
      console.error("Cannot save template: no user email");
      return;
    }
    await updateEmailTemplate({
      tid: templateId,
      email: userDetail.email,       // ← pass the required email field
      design: emailTemplate
    });
    toast('Email Template Saved Successfully!')
  }
  return (
    <div className='p-4 shadow-sm flex justify-between items-center'>
      <Image
        src={'/logo.svg'}
        alt='log'
        width={160}
        height={150}
        priority
        style={{ objectFit: 'contain', cursor: 'pointer' }} // Indicate clickable
        onClick={() => {
          console.log('Header logo clicked'); // Debug log
          router.push('/'); // Navigate to homepage
        }}
      />
      <div className='flex gap-3'>
        <Button
          variant="ghost"
          onClick={() => setScreenSize('desktop')}
          className={`hover:bg-red-100 ${screenSize === 'desktop' && 'bg-red-100 text-red-400'}`}
        >
          <Monitor /> Desktop
        </Button>
        <Button
          variant="ghost"
          onClick={() => setScreenSize('mobile')}
          className={`hover:bg-red-100 ${screenSize === 'mobile' && 'bg-red-100 text-red-400'}`}
        >
          <Smartphone /> Mobile
        </Button>
      </div>
      <div className='flex gap-3'>
        <Button
          variant="ghost"
          className="hover:text-red-400 hover:bg-red-100"
          onClick={() => viewHTMLCode(true)}
        >
          <Code />
        </Button>
        <Button variant="outline">Send Test Email</Button>
        <Button onClick={onSaveTemplate}>Save Template</Button>
      </div>
    </div>
  );
}