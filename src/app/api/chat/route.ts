import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
    if (!process.env.GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY is not set in the .env.local file.");
        return NextResponse.json(
            { error: "Server configuration error: The Gemini API key is missing." },
            { status: 500 }
        );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        const reqBody = await request.json();
        const { prompt: originalPrompt } = reqBody;

        if (!originalPrompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const newPrompt = `
You are TransportSense, a helpful AI guide for a traffic simulation. Your tone is clear, knowledgeable, and concise. You are guiding a user through a learning experience about urban planning and Braess' Paradox.

Avoid technical or complex words. Keep your tone casual and simple — speak like a normal person.

Here is the message I want to convey to the user: "${originalPrompt.nextPhase}"

Rephrase this message in your own words, keeping the same information and maintaining a professional tone. Your response should be concise, and no longer than 2-3 sentences.

IMPORTANT: Do not wrap your final response in quotation marks or any other formatting. Just provide the plain text for the response.
    `;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const result = await model.generateContent(newPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return NextResponse.json(
            { error: 'Failed to generate content from AI service.' },
            { status: 500 }
        );
    }
}