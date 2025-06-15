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
    //connect to mongodb
    const client = await dbConnect() as MongoClient;
    const db = client.db('database');

    //get dc traffic data for 2022
    const trafficData = await db.collection('traffic_data').findOne(
      { 
        'State Code': 'DC', 
        'Year': 2022 
      },
      { 
        projection: { 
          _id: 0,
          'Excess Fuel Consumed (thousands of gallons)': 1, //annual fuel waste
          'Total Annual Congestion Cost (million dollars)': 1, //total economic impact
          'Total Annual Delay (thousands of Person-Hours)': 1, //yearly delay hours
          'Freeway Daily Vehicle Miles of Travel in thousands': 1, //highway traffic
          'Arterial Street Daily Vehicle-Miles of Travel in thousands': 1, //local traffic
          'Average State Gasoline Cost ($/gallon)': 1 //gas price
        } 
      }
    );

    //use default values if no data found
    if (!trafficData) {
      return NextResponse.json({ rawData: null, totalLaneMiles: 62.574 });
    }

    //send data to client for calculations
    return NextResponse.json({
      rawData: {
        // Using reasonable defaults if data is missing
        excessFuel: Number(trafficData['Excess Fuel Consumed (thousands of gallons)'] || 1000),
        congestionCost: Number(trafficData['Total Annual Congestion Cost (million dollars)'] || 500),
        totalAnnualDelay: Number(trafficData['Total Annual Delay (thousands of Person-Hours)'] || 2000),
        freewayDailyMiles: Number(trafficData['Freeway Daily Vehicle Miles of Travel in thousands'] || 800),
        localDailyMiles: Number(trafficData['Arterial Street Daily Vehicle-Miles of Travel in thousands'] || 400),
        avgGasCost: Number(trafficData['Average State Gasoline Cost ($/gallon)'] || 3.50),
      },
      totalLaneMiles: 62.574 // initial total (31.312 + 31.262)
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.error();
  }
}
