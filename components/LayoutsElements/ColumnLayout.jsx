"use client";
import { useDragElementLayout, useEmailTemplate, useSelectedElement } from '@/app/Provider';
import React, { useState } from 'react';
import ButtonComponent from '../customs/Element/ButtonComponent';
import TextComponent from '../customs/Element/TextComponent';
import ImageComponent from '../customs/Element/ImageComponent';
import LogoComponent from '../customs/Element/LogoComponent';
import DividerComponent from '../customs/Element/DividerComponent';
import LogoHeaderComponent from '../customs/Element/LogoHeaderComponent';
import SocialIconsComponent from '../customs/Element/SocialIconsComponent';
import { Trash } from 'lucide-react';

export default function ColumnLayout({ layout }) {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  console.log('ColumnLayout layout:', layout); // Debug the layout structure

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDropHandle = () => {
    const index = dragOver.index;
    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id ? { ...col, [index]: dragElementLayout?.dragElement } : col
      )
    );
    console.log('Updated emailTemplate after drop:', emailTemplate);
    setDragOver(null);
  };

  const GetElementComponent = (element) => {
    console.log('GetElementComponent element:', element);

    if (!element) {
      console.log('Element is null or undefined');
      return null;
    }

    if (element?.type === 'Button') {
      return <ButtonComponent {...element} />;
    } else if (element?.type === 'Text') {
      return <TextComponent style={element.style} textarea={element.textarea} />;
    } else if (element?.type === 'Image') {
      return <ImageComponent style={element.style} imageUrl={element.imageUrl || 'Sample Text'} />;
    } else if (element?.type === 'Logo') {
      return <LogoComponent style={element.style} imageUrl={element.imageUrl || 'Sample Text'} outerStyle={element.outerStyle} />;
    } else if (element?.type === 'Divider') {
      return <DividerComponent {...element} />;
    } else if (element?.type === 'LogoHeader') {
      return <LogoHeaderComponent style={element.style} imageUrl={element.imageUrl} companyName={element.companyName || 'Your Company'} outerStyle={element.outerStyle} />;
    } else if (element?.type === 'SocialIcons') {
      return <SocialIconsComponent socialIcons={element.socialIcons} style={element.style} outerStyle={element.outerStyle} />;
    } else {
      console.log('Unsupported element type:', element?.type);
      return element?.type || 'Unsupported Element';
    }
  };

  const deleteLayout = (layoutId) => {
    const updatedEmailTemplate = emailTemplate?.filter((item) => item.id !== layoutId);
    setEmailTemplate(updatedEmailTemplate);
    setSelectedElement(null);
  };

  const effectiveLayout = layout?.design || layout;

  return (
    <div className="w-full relative">
      <div
        className={`grid gap-2 ${selectedElement?.layout?.id === effectiveLayout?.id ? 'border border-dashed border-blue-500' : ''}`}
        style={{
          gridTemplateColumns: `repeat(${effectiveLayout?.numOfCol || 1}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: effectiveLayout?.numOfCol || 1 }).map((_, index) => (
          <div
            key={index}
            className={`min-w-0 p-0 flex items-center justify-center cursor-pointer
              ${!effectiveLayout?.[index]?.type && 'bg-gray-100 border border-dashed'}
              ${index === dragOver?.index && dragOver?.columnId && 'bg-blue-100'}
              ${selectedElement?.layout?.id === effectiveLayout?.id && selectedElement?.index === index && 'border-blue-500 border-2'}`}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            onClick={() => setSelectedElement({ layout: effectiveLayout, index: index })}
          >
            {GetElementComponent(effectiveLayout?.[index]) ?? 'Drag Element Here'}
          </div>
        ))}
      </div>
      {selectedElement?.layout?.id === effectiveLayout?.id && (
        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => deleteLayout(effectiveLayout?.id)}>
          <Trash />
        </div>
      )}
    </div>
  );
}