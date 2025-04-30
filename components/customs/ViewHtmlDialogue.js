import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Copy } from 'lucide-react'

export default function ViewHtmlDialogue({ openDialogue, htmlCode, closeDialogue }) {
    const CopyCode = async () => {
        try {
          await navigator.clipboard.writeText(htmlCode);
          console.log("✅ HTML copied to clipboard");
        } catch (err) {
          console.error("❌ Failed to copy:", err);
        }
      };
      
    return (
        <Dialog open={openDialogue} onOpenChange={closeDialogue}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <div className='flex items-center justify-between'>
                            <h2>HTML Email Template</h2>
                            <Copy className='p-2 bg-gray-100 rounded-full h-10 w-10 cursor-pointer'
                            onClick={CopyCode}
                            />
                        </div>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className='max-h-[400px] overflow-auto bg-gray-200 text-black rounded-lg p-5'>
                            <pre className='whitespace-pre-wrap break-all'>
                                <code>
                                    {htmlCode}
                                </code>
                            </pre>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
