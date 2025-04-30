// app/api/ai-email-generate/route.js
import { GenerateEmailTemplateAIModel } from '@/config/AiModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const aiResp = await GenerateEmailTemplateAIModel(prompt);
    return NextResponse.json({ result: aiResp });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
