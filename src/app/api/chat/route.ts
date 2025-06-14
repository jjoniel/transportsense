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
You are TransportSense, a helpful AI guide for a traffic simulation. Your tone is clear, knowledgeable, and slightly informal. You are guiding a user through a learning experience about urban planning.

The user just took this action: "${originalPrompt.userAction}"

The story is about to move to this phase: "${originalPrompt.nextPhase}"

Based on this, generate a brief (2-3 sentences) response that connects the user's action to the next phase of the story.

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