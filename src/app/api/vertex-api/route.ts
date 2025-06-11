import {GoogleGenerativeAI} from '@google/generative-ai';
import {NextRequest, NextResponse} from 'next/server';

const API_KEY = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});

function buildPrompt(city: string) {
  return `You are an expert on urban planning. Describe the city of ${city} based on its current traffic metrics. Be straightforward and concise, and easy to understand. Do not include any additional information.`;
}

//get handler for ai responses about cities
//takes city name as query param
//returns ai generated text about that city
export async function GET(req: NextRequest) {
  //get city from url params, default to 'Unknown'
  const {searchParams} = new URL(req.url);
  const city = searchParams.get('city') || 'Unknown';

  //build the prompt and get ai response
  const prompt = buildPrompt(city);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const output = response.text();

  //return the generated text as json
  return NextResponse.json({output});
  //output will be a json object like: {"output": "generated text"}
}
