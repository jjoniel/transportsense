import {GoogleGenerativeAI} from '@google/generative-ai';
import {NextRequest, NextResponse} from 'next/server';
import dbConnect from "@/lib/mongodb";

const API_KEY = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});

//get handler for ai responses about cities
//takes city name as query param
//returns ai generated text about that city
export async function GET(req: NextRequest) {
  //get city from url params, default to 'Unknown'
  const {searchParams} = new URL(req.url);
  const city = searchParams.get('city') || 'Unknown';

  //get relevant the data from mongodb
  const client = await dbConnect();
  const db = client.db("database");
  const traffic_collection = db.collection("traffic_data");
  const delay_growth_collection = db.collection("delay_growth");

  const trafficDoc = await traffic_collection.findOne({ city });
  const delay_growthDoc = await delay_growth_collection.findOne({ city });
  //TODO:need to extract the needed fields after getting the city documents from the collections

  //TODO:add the context retrieved from mdb to the prompt
  //build the prompt and get ai response
  const prompt = `You are an expert on urban planning. Describe the city of ${city} based on its current traffic metrics. Be straightforward and concise, and easy to understand. Do not include any additional information.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const output = response.text();

  //return the generated text as json
  return NextResponse.json({output});
  //output will be a json object like: {"output": "generated text"}
}
