"use client";
import { useDragElementLayout, useEmailTemplate, useSelectedElement } from '@/app/Provider';
import React, { useContext, useState } from 'react';
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
    const onDragOverHandle = (event, index) => {
        event.preventDefault();
        setDragOver({
            index: index,
            columnId: layout?.id
        })
    }

    const onDropHandle = () => {
        const index = dragOver.index;
        setEmailTemplate(prevItem =>
            prevItem?.map(col => col.id === layout?.id ?
                { ...col, [index]: dragElementLayout?.dragElement }
                : col)
        )
        console.log(emailTemplate)
        setDragOver(null);
    }
    const GetElementComponent = (element) => {
        console.log("Text element props:", element);

        if (!element) return null;

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
        }
        return element?.type;
    }
const deleteLayout=(layoutId)=>{
    const updatedEmailTemplate=emailTemplate?.filter(item=>item.id!=layoutId);
    setEmailTemplate(updatedEmailTemplate);
    setSelectedElement(null);
}
    return (
        <div className="w-full relative">
            {/* Grid Layout */}
            <div
                className={`grid gap-2 ${selectedElement?.layout?.id == layout?.id ? 'border border-dashed border-blue-500' : ''}`}
                style={{
                    gridTemplateColumns: `repeat(${layout?.numOfCol}, minmax(0, 1fr))`,
                }}
            >
                {Array.from({ length: layout?.numOfCol }).map((_, index) => (
                    <div
                        key={index}
                        className={`min-w-0 p-0 flex items-center justify-center cursor-pointer
          ${!layout?.[index]?.type && 'bg-gray-100 border border-dashed'}
          ${(index == dragOver?.index && dragOver?.columnId) && 'bg-blue-100'}
          ${(selectedElement?.layout?.id == layout?.id && selectedElement?.index == index) && 'border-blue-500 border-2'}`}
                        onDragOver={(event) => onDragOverHandle(event, index)}
                        onDrop={onDropHandle}
                        onClick={() => setSelectedElement({ layout: layout, index: index })}
                    >
                        {GetElementComponent(layout?.[index]) ?? 'Drag Element Here'}
                    </div>
                ))}
            </div>
            {selectedElement?.layout?.id == layout?.id &&
            <div className='absolute top-2 right-2 cursor-pointer'onClick={()=>deleteLayout(layout?.id)}>
                <Trash />
            </div>}
        </div>
    );
}
