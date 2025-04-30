import { Input } from '@/components/ui/input'
import React from 'react'

export default function InputStyleField({ label, value, onHandleStyleChang,type='px' }) {

    const FormattedValue = (value_) => {
        if (!value_) return '';
        return parseInt(value_.toString().replace(type, '')) || '';
      }
      
    return (
        <div>
            <label>{label}</label>
            <div className='flex'>
            <Input type="text" value={FormattedValue(value)}
                onChange={(e) => onHandleStyleChange(e.target.value + type)}
            />
            <h2 className='p-1 bg-gray-100 rounded-r-lg -ml-2'>px</h2>
            </div>
        </div>
    )
}

