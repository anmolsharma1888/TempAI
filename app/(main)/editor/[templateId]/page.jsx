"use client"
import Canvas from '@/components/customs/Canvas'
import EditorHeader from '@/components/customs/EditorHeader'
import ElementsSideBar from '@/components/customs/ElementsSideBar'
import Settings from '@/components/customs/Settings'
import React, { useState } from 'react'

export default function Editor() {
    const [viewHTMLCode,setViewHtmlCode]=useState(0);
    return (
        <div>
            <EditorHeader viewHTMLCode={()=>setViewHtmlCode(prev=>prev + 1)} />

            <div className='grid grid-cols-5'>
                <ElementsSideBar />
                <div className='col-span-3 bg-gray-100'>
                    <Canvas viewHTMLCode={viewHTMLCode} 
                    closeDialogue={()=>setViewHtmlCode(false)}/>
                </div>
                <Settings />
            </div>
        </div>
    )
}
