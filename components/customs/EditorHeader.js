"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Code, Monitor, Smartphone } from 'lucide-react'
import { useScreenSize } from '@/app/Provider'

export default function EditorHeader({viewHTMLCode}) {
  const { screenSize, setScreenSize } = useScreenSize();
  return (
    <div className='p-4 shadow-sm flex justify-between items-center'>
      <Image src={'/logo.svg'} alt='log'
        width={160}
        height={150}
      />
      <div className='flex gap-3'>
        <Button variant="ghost"
          onClick={() => setScreenSize('desktop')}
          className={`hover:bg-red-100 ${screenSize == 'desktop' && 'bg-red-100 text-red-400'}`}
        > <Monitor /> Desktop </Button>
        <Button variant="ghost"
          onClick={() => setScreenSize('mobile')}
          className={`hover:bg-red-100 ${screenSize == 'mobile' && 'bg-red-100 text-red-400'}`}>
          <Smartphone /> Mobile </Button>
      </div>
      <div className='flex gap-3'>
        <Button variant="ghost"
          className="hover:text-red-400
          hover:bg-red-100"
          onClick={()=>viewHTMLCode(true)}>
          <Code />
        </Button>
        <Button variant="outline">Send Test Email</Button>
        <Button>Save Template</Button>
      </div>

    </div>
  )
}
