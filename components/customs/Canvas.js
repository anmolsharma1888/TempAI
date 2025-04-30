"use client"
import { useDragElementLayout, useEmailTemplate, useScreenSize } from '@/app/Provider';
import React, { useEffect, useRef, useState } from 'react'
import ColumnLayout from '../LayoutsElements/ColumnLayout';
import ViewHtmlDialogue from './ViewHtmlDialogue';

export default function Canvas({ viewHTMLCode, closeDialogue}) {
  const htmlRef = useRef();
  const { screenSize, setScreenSize } = useScreenSize();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [dragOver, setDragOver] = useState(false);
  const[htmlCode,setHtmlCode]=useState();
  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    console.log('Over...');
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
    console.log('Left...');
  };
  const onDropHandle = (e) => {
    e.preventDefault();
    setDragOver(false);
    console.log('Dropped!');
  
    if (dragElementLayout?.dragLayout) {
      setEmailTemplate(prev => {
        const updated = [...prev, dragElementLayout.dragLayout];
        console.log("Updated template after drop:", updated);
        return updated;
      });
    } else {
      console.log("No drag layout found.");
    }
  };
  
  const getLayoutComponent = (layout) => {
    if (layout?.type == 'column') {
      return <ColumnLayout layout={layout} />
    }
  }

  useEffect(() => {
    if (viewHTMLCode > 0) {
      GetHTMLCode();
    }
  }, [viewHTMLCode]);
  
  const GetHTMLCode = () => {
    if (htmlRef.current) {
      const htmlContent = htmlRef.current.innerHTML;
      console.log("📦 HTML CONTENT:", htmlContent);
      setHtmlCode(htmlContent);
    } else {
      console.log("❌ htmlRef is null");
    }
  };
  
  return (
    <div className='mt-20 flex justify-center'>
      <div className={`bg-gray-50 p-6 w-full
  ${screenSize === 'desktop' ? 'max-w-2xl' : 'max-w-md'}
  ${dragOver ? 'bg-red-100 p-4' : ''}
`}

        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDropHandle}
        ref={htmlRef}
      >
        {emailTemplate?.length > 0 ? emailTemplate?.map((layout, index) => (
          <div key={index}>
            {getLayoutComponent(layout)}
          </div>
        )) :
          <h2 className='p-4 flex justify-center bg-gray-100 border border-dashed'>Add Layout Here</h2>
        }

      </div>
      <ViewHtmlDialogue openDialogue={viewHTMLCode} htmlCode={htmlCode} closeDialogue={closeDialogue}/>
    </div>
  )
}
