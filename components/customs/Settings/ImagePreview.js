import { Input } from '@/components/ui/input'
import React from 'react'

export default function ImagePreview({ label, value, onHandleInputChange }) {
    return (
        <div>
            <label>{label}</label>
            <img src={value} alt='image' className='w-full h-[150px] object-cover border rounded-xl'/>
        <Input value={value} onChange={(e) => onHandleInputChange(e.target.value)} 
        className='mt-2'/>
        </div>
    )
}

