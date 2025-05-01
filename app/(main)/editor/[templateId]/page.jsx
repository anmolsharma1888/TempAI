"use client";
import Canvas from '@/components/customs/Canvas';
import EditorHeader from '@/components/customs/EditorHeader';
import ElementsSideBar from '@/components/customs/ElementsSideBar';
import Settings from '@/components/customs/Settings';
import { useUserDetail } from '@/context/UserDetailContext';
import { useEmailTemplate } from '@/app/Provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Editor() {
  const [viewHTMLCode, setViewHtmlCode] = React.useState(0);
  const { templateId } = useParams();
  const { userDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const convex = useConvex();

  useEffect(() => {
    if (userDetail?.email && templateId) {
      GetTemplateData();
    } else {
      console.log('Missing userDetail.email or templateId:', { userDetail, templateId });
    }
  }, [userDetail?.email, templateId]);

  const GetTemplateData = async () => {
    try {
      setLoading(true);
      const normalizedEmail = userDetail.email.toLowerCase();
      console.log('Fetching template with tid:', templateId, 'email:', normalizedEmail);
      const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
        tid: templateId,
        email: normalizedEmail,
      });
      console.log('Raw fetched template data:', result);
      if (result && result.design) {
        let formattedDesign;
        if (result.design.result) {
          formattedDesign = result.design.result;
          console.log('Extracted design.result:', formattedDesign);
        } else if (typeof result.design === 'string') {
          formattedDesign = [{
            id: `layout-${templateId}`,
            type: 'column',
            numOfCol: 1,
            0: {
              type: 'Text',
              textarea: result.design,
              style: {}
            }
          }];
          console.log('Converted string design to layout:', formattedDesign);
        } else {
          formattedDesign = Array.isArray(result.design) ? result.design : [result.design];
        }
        setEmailTemplate(formattedDesign);
        console.log('Updated emailTemplate with design:', formattedDesign);
      } else {
        console.log('No template data or design found for tid:', templateId);
        setEmailTemplate([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching template data:', error);
      setEmailTemplate([]);
      setLoading(false);
    }
  };

  return (
    <div>
      <EditorHeader viewHTMLCode={() => setViewHtmlCode((prev) => prev + 1)} />
      {!loading ? (
        <div className="grid grid-cols-5">
          <ElementsSideBar />
          <div className="col-span-3 bg-gray-100">
            <Canvas viewHTMLCode={viewHTMLCode} closeDialogue={() => setViewHtmlCode(0)} />
          </div>
          <Settings />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h2>Please Wait...</h2>
        </div>
      )}
    </div>
  );
}