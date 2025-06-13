//api route for getting metrics from mongodb

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

//get the metrics from mongodb
//right now we're getting excess fuel and annual congestion cost from mongodb
//the avg travel time and avg delay arent from the dataset, 
// we can calculate those ourselve based on the road lengths we have
export async function GET() {
  try {
    const client = await dbConnect() as MongoClient;
    const db = client.db('database');
    const trafficData = await db.collection('traffic_data').findOne(
      { 
        'State Code': 'DC',
        'Year': 2022
      },
      { 
        projection: { 
          _id: 0,
          'Excess Fuel Consumed (thousands of gallons)': 1,
          'Total Annual Congestion Cost (million dollars)': 1
        } 
      }
    );

    if (!trafficData) {
      //return default metrics if no data exists, prolly wotn happen tho
      return NextResponse.json({
        excessFuel: 10,
        congestionCost: 10,
        travelTime: 10,
        delayTime: 5
      });
    }

    //get the values from the doc we fetched, 10 is the default if nothing. 
    const excessFuel = trafficData['Excess Fuel Consumed (thousands of gallons)'] || 10;
    const congestionCost = trafficData['Total Annual Congestion Cost (million dollars)'] || 10;
    
    //return the metrics (to the metrics display)
    return NextResponse.json({
      excessFuel,
      congestionCost,
      travelTime: 10,
      delayTime: 5
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.error();
  }
}
