"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "@/Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from '@/context/UserDetailContext';
import { api } from "@/convex/_generated/api"; // Ensure this import exists
import { Loader2 } from "lucide-react";

export default function AIInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const { userDetail } = useUserDetail();

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

      console.log("Calling SaveTemplate with:", {
        tid,
        design: result.data,
        email: userDetail.email,
      });
      const resp = await SaveTemplate({
        tid: tid,
        design: result.data,
        email: userDetail.email,
      });
      console.log("SaveTemplate response:", resp);
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
      >{loading ? <span><Loader2 />Please wait...</span> : 'Generate'}
      </Button>
    </div>
  );
}