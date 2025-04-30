// config/AiModel.js
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in your environment.');
}

const ai = new GoogleGenAI({ apiKey });

// Use the Flash-2.0 model
const modelName = 'gemini-2.0-flash';

// JSON streaming config
const generationConfig = {
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

/**
 * Generates an email‐template JSON string for a given prompt by streaming.
 * @param {string} prompt
 * @returns {Promise<Object>} parsed JSON
 */
export async function GenerateEmailTemplateAIModel(prompt) {
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  let raw = '';
  const stream = await ai.models.generateContentStream({
    model: modelName,
    config: generationConfig,
    contents,
  });

  for await (const chunk of stream) {
    raw += chunk.text;
  }

  // The model streams a valid JSON string; parse it:
  return JSON.parse(raw);
}
