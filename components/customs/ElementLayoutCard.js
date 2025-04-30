import React from 'react'

export default function ElementLayoutCard({ layout }) {
    return (
        <div
            className='flex flex-col items-center justify-center
                    border border-dashed rounded-xl p-3
                    group hover:shadow-md hover:border-red-400 cursor-pointer
                    '>
            {<layout.icon
                className='p-2 h-9 w-9 bg-gray-100 group-hover:text-red-400 group-hover:bg-red-100 rounded-full' />}
            <h2 className='text-sm  group-hover:text-red-400'>{layout.label}</h2>
        </div>
    )
}
