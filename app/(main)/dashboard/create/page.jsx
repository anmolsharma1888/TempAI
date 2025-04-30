import react from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from 'lucide-react'
import AIInputBox from '@/components/customs/AIInputBox'

export default function Create() {

    return (
        <div className='px-10 md:px-44 lg:px-64 xl:px-72 mt-20'>
            <div className='flex items-center flex-col'>
                <h2 className='font-bold text-3xl text-red-400'>CREATE NEW EMAIL TEMPLATE</h2>
                <p className='text-lg text-gray-500'>Effortlessly design and customize professional AI-powered email templates with ease.</p>
                <Tabs defaultValue="AI" className="w-[500px] mt-10">
                    <TabsList>
                        <TabsTrigger value="AI"> Create with AI<Sparkles className='h-5 w-5 ml-2'/></TabsTrigger>
                        <TabsTrigger value="SCRATCH">Start from Scratch</TabsTrigger>
                    </TabsList>
                    <TabsContent value="AI">
                        <AIInputBox />
                    </TabsContent>
                    <TabsContent value="SCRATCH">Change your password here.</TabsContent>
                </Tabs>

            </div>

        </div>
    )
}
