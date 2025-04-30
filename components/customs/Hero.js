import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import SignInButton from './SignInButton'

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 xl:px-56
    flex flex-col items-center
    mt-24'>
        <h2 className='font-extrabold text-5xl'>AI-Powered 
            <span className='text-red-400'> Email Templates
                </span></h2>

            <p className='text-justify mt-4'>Welcome to TempAI, your smart solution for creating professional email templates effortlessly. Powered by cutting-edge AI, TempAI lets you generate customized, responsive email designs based on simple prompts. Whether you're running a business, launching a campaign, or just saving time on everyday communication, TempAI helps you design with ease — no coding skills required.</p>

            <div className='flex gap-5 mt-6'>
                <Button variant="outline">Try Demo</Button>
                <SignInButton />
            </div>

            <Image src={'/landing.png'} alt='landing'
            width={1000}
            height={800}
            className='mt-12 rounded-xl'
            />
    </div>
  )
}

export default Hero