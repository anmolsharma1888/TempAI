"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from '@/context/UserDetailContext';
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const { userDetail } = useUserDetail();
  const router = useRouter();

  const OnGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "\n-" + userInput;
    const tid = uuidv4();
    setLoading(true);
    try {
      console.log("Calling /api/ai-email-generate with prompt:", PROMPT);
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });
      console.log("API response:", result.data);

      if (!userDetail?.email || typeof userDetail.email !== "string") {
        throw new Error("Invalid or missing user email");
      }

      let design = result.data;
      if (design.result && Array.isArray(design.result)) {
        design.result = design.result.map(layout => {
          for (let i = 0; i < layout.numOfCol; i++) {
            if (layout[i] && typeof layout[i] === 'object') {
              if (!layout[i].type || !['Button', 'Text', 'Image', 'Logo', 'Divider', 'LogoHeader', 'SocialIcons'].includes(layout[i].type)) {
                // Extract meaningful content if possible
                const content = layout[i].content || layout[i].text || JSON.stringify(layout[i]);
                layout[i] = {
                  type: 'Text',
                  textarea: typeof content === 'string' ? content : JSON.stringify(content),
                  style: {}
                };
              }
            } else {
              layout[i] = {
                type: 'Text',
                textarea: 'Placeholder content',
                style: {}
              };
            }
          }
          return layout;
        });
      } else {
        design = {
          result: [{
            id: `layout-${tid}`,
            type: 'column',
            numOfCol: 1,
            0: {
              type: 'Text',
              textarea: JSON.stringify(design),
              style: {}
            }
          }]
        };
      }

      const normalizedEmail = userDetail.email.toLowerCase();
      console.log("Calling SaveTemplate with:", {
        tid,
        design: design,
        email: normalizedEmail,
        description: userInput, // Set description to userInput
      });
      const resp = await SaveTemplate({
        tid: tid,
        design: design,
        email: normalizedEmail,
        description: userInput, // Pass userInput directly
      });
      console.log("SaveTemplate response:", resp);
      router.push('/editor/' + tid);
      setLoading(false);
    } catch (e) {
      console.error("Error in OnGenerate:", e);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="mb-2">Provide details about the email template you'd like to create</p>
      <Textarea
        placeholder="Start writing here"
        rows="5"
        className="text-xl"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        className="w-full mt-7"
        disabled={userInput.length === 0 || loading}
        onClick={OnGenerate}
      >
        {loading ? <span className="flex gap-2"><Loader2 className="animate-spin" /> Please wait...</span> : 'Generate'}
      </Button>
    </div>
  );
}