import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from '../ui/button';

export default function EmailTemplateList() {
    const [ emailList, setEmailList ] = useState([]);
    return (
        <div>
            <h2 className='font-bold text-xl text-red-400 mt-6'>Workspace</h2>
            {emailList?.length == 0 &&
                <div className='flex justify-center
                mt-7 flex-col items-center'>
                    <Image src={'/email.png'}
                        alt='email' height={250}
                        width={250}
                    />
                    <Button className="mt-7">+ Create New</Button>
                </div>
            }
        </div>
    )
}
