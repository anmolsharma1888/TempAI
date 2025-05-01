"use client";
import React, { useContext, useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { DragDropLayoutElement } from '@/context/DragDropLayoutElement';
import { EmailTemplateContext } from '@/context/EmailTemplateContext';
import { SelectedElementContext } from '@/context/SelectedElementContext';
import { useRouter } from 'next/navigation';

export default function UserDetailProvider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  const router = useRouter();
  const [userDetail, setUserDetail] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [dragElementLayout, setDragElementLayout] = useState();
  const [emailTemplate, setEmailTemplate] = useState([]);
  const [selectedElement, setSelectedElement] = useState();

  useEffect(() => {
    const storage = localStorage.getItem('userDetail');
    const emailTemplateStorage = localStorage.getItem('emailTemplate');
    if (emailTemplateStorage) {
      try {
        setEmailTemplate(JSON.parse(emailTemplateStorage));
      } catch (error) {
        console.error('Error parsing emailTemplate:', error);
      }
    }
    if (storage) {
      try {
        const parsed = JSON.parse(storage);
        if (parsed?.email) {
          parsed.email = parsed.email.toLowerCase(); // Normalize email
          setUserDetail(parsed);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error parsing userDetail:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    localStorage.setItem('emailTemplate', JSON.stringify(emailTemplate));
  }, [emailTemplate]);

  useEffect(() => {
    if (selectedElement && selectedElement.layout && selectedElement.index !== undefined) {
      const updatedEmailTemplates = emailTemplate.map((item) =>
        item.id === selectedElement?.layout?.id ? selectedElement.layout : item
      );
      if (JSON.stringify(updatedEmailTemplates) !== JSON.stringify(emailTemplate)) {
        setEmailTemplate(updatedEmailTemplates);
      }
    }
  }, [selectedElement, emailTemplate]);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
            <DragDropLayoutElement.Provider value={{ dragElementLayout, setDragElementLayout }}>
              <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
                <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
                  {children}
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export const useScreenSize = () => useContext(ScreenSizeContext);
export const useDragElementLayout = () => useContext(DragDropLayoutElement);
export const useEmailTemplate = () => useContext(EmailTemplateContext);
export const useSelectedElement = () => useContext(SelectedElementContext);