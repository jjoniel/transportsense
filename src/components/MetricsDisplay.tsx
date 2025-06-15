"use client";

import React, { useEffect, useState } from "react";

type Metric = {
  label: string;
  value: string;
  unit: string;
  description: string;
  //   icon: string;
};

type Metrics = {
  excessFuel: number;
  congestionCost: number;
  travelTime: number;
  delayTime: number;
};

type Phase = 'initialPhase' | 'simulationStart' | 'laneAdded' | 'trafficReturns' | 'paradoxExplanation' | 'laneAddedAgain' | 'solutionExplanation';

const MetricsDisplay: React.FC<{ currentPhase: Phase }> = ({ currentPhase }) => {
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  const handleMetricTap = (index: number) => {
    // Only handle taps on mobile
    if (window.matchMedia("(max-width: 768px)").matches) {
      setTappedIndex(index);
      setTimeout(() => setTappedIndex(null), 4000);
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  //these r just random metrics as the default, they won't be shown though
  // Update metrics based on the current phase
  const updateMetricsForPhase = (currentMetrics: Metrics, phase: Phase): Metrics => {
    // Update metrics based on the completed phase's effects
    switch (phase) {
      case 'initialPhase':
        // Initial state - no changes
        return currentMetrics;
      case 'simulationStart':
        // User has seen initial traffic build up
        return {
          excessFuel: currentMetrics.excessFuel * 1.3,
          congestionCost: currentMetrics.congestionCost * 1.4,
          travelTime: currentMetrics.travelTime * 1.2,
          delayTime: currentMetrics.delayTime * 1.5,
        };
      case 'laneAdded':
        // User added a lane, seeing temporary improvement
        return {
          excessFuel: currentMetrics.excessFuel * 0.8,
          congestionCost: currentMetrics.congestionCost * 0.9,
          travelTime: currentMetrics.travelTime * 0.9,
          delayTime: currentMetrics.delayTime * 0.7,
        };
      case 'trafficReturns':
        // Traffic has returned worse due to induced demand
        return {
          excessFuel: currentMetrics.excessFuel * 1.4,
          congestionCost: currentMetrics.congestionCost * 1.5,
          travelTime: currentMetrics.travelTime * 1.3,
          delayTime: currentMetrics.delayTime * 1.6,
        };
      case 'paradoxExplanation':
        // Learning about induced demand - metrics stay the same
        return currentMetrics;
      case 'laneAddedAgain':
        // Second lane added, making things even worse
        return {
          excessFuel: currentMetrics.excessFuel * 1.6,
          congestionCost: currentMetrics.congestionCost * 1.7,
          travelTime: currentMetrics.travelTime * 1.5,
          delayTime: currentMetrics.delayTime * 1.8,
        };
      case 'solutionExplanation':
        return {
          excessFuel: currentMetrics.excessFuel * 0.6, // Better solutions help
          congestionCost: currentMetrics.congestionCost * 0.7,
          travelTime: currentMetrics.travelTime * 0.8,
          delayTime: currentMetrics.delayTime * 0.6,
        };
      default:
        return currentMetrics;
    }
  };

  const [metricsData, setMetricsData] = useState<Metrics>({
    excessFuel: 10,
    congestionCost: 10,
    travelTime: 10,
    delayTime: 5,
  });

  //scaling the metrics for the size of our displayed city view,
  // since the metrics fromt he dataset at for the entire city
  const scaleMetrics = (data: Metrics) => {
    // constants for our map area
    const MAP_LOCAL_ROADS = 31.312; // miles
    const MAP_HIGHWAYS = 31.262; // miles
    const MAP_TOTAL_ROADS = MAP_LOCAL_ROADS + MAP_HIGHWAYS;
    const MAP_POPULATION = 3500;

    //scale metrics based on road length ratio - this represents what portion of DC's road network we're showing
    const roadRatio = MAP_TOTAL_ROADS / 1500; //DC has approximately 1500 miles of roads total
    
    //scale both metrics by the road ratio
    const scaledFuel = data.excessFuel * roadRatio; //keep units in thousands of gallons
    const scaledCost = data.congestionCost * roadRatio; //keep units in millions

    return {
      scaledFuel: Math.round(scaledFuel).toLocaleString(), //round and add commas
      scaledCost: Math.round(scaledCost).toLocaleString(),
      travelTime: data.travelTime, //leave travel time as is for now
      delayTime: data.delayTime, //leave delay time as is for now
    };
  };

  useEffect(() => {
    // Update metrics whenever the phase changes
    setMetricsData(prevMetrics => updateMetricsForPhase(prevMetrics, currentPhase));
  }, [currentPhase]);

  useEffect(() => {
    //fetch metrics from mongodb
    const fetchMetrics = async () => {
      try {
        //fetch metrics from mongodb through the api route
        const response = await fetch("/api/metrics");
        if (response.ok) {
          const data = await response.json();
          setMetricsData(data);
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    //initial fetch the first time the user visits the page
    fetchMetrics();
  }, []);
  //scale the metrics
  const scaledMetrics = scaleMetrics(metricsData);
  //metrics displayed at the top
  const metrics: Metric[] = [
    {
      label: "fuel wasted",
      value: scaledMetrics.scaledFuel.toString(),
      unit: "gal",
      description: "Extra fuel consumed annually due to traffic.",
      //   icon: "⛽"
    },
    {
      label: "financial losses",
      value: "$" + scaledMetrics.scaledCost.toString(),
      unit: "million",
      description:
        "Total yearly economic impact of traffic, including fuel costs, lost time, and decreased productivity.",
      //   icon: "💰"
    },
    {
      label: "time to travel 1 mile",
      value: scaledMetrics.travelTime.toString(),
      unit: "min",
      description: "Average time required to complete a typical journey.",
      //   icon: "⏱️"
    },
    {
      label: "average delay",
      value: scaledMetrics.delayTime.toString(),
      unit: "min",
      description: "Average time added to trips due to traffic.",
      //   icon: "⏳"
    },
  ];
  //this is if its loading, itll just be grayed out with an animation until the data is fetched from mongo
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4 p-2 relative overflow-x-hidden mt-20 md:mt-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-4 shadow-lg border border-[#333] flex flex-col items-center justify-center min-h-[100px] animate-[pulse_2s_ease-in-out_infinite] md:hover:border-[#444]"
          >
            <div className="h-4 w-16 bg-[#333] rounded mb-2"></div>
            <div className="h-6 w-12 bg-[#333] rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full mb-4 p-2">
      {metrics.map((metric, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <h1 className="col-span-full text-center">
              Annual Effects of Traffic
            </h1>
          )}
          {index === 2 && (
            <h1 className="col-span-full text-center">Everyday Impact</h1>
          )}

          <div
            onClick={() => handleMetricTap(index)}
            className="bg-gradient-to-br from-[var(--accent)]/10 to-[var(--background)]
                 rounded-3xl p-4 border border-[var(--accent)]/20 shadow-lg
                 flex flex-col items-center justify-center min-h-[100px]
                 cursor-pointer select-none relative group
                 md:backdrop-blur-sm md:cursor-help md:transition-all md:duration-300
                 md:hover:border-[var(--accent)]/40 md:hover:from-[var(--accent)]/20 md:hover:to-[var(--background)]"
          >
            <div className="text-sm lg:text-md text-center mb-2">
              {metric.label}
            </div>
            <div className="text-xl lg:text-2xl font-semibold text-center">
              {metric.value} {metric.unit}
            </div>

            <div
              className={`pointer-events-none z-50 text-white text-center max-w-[280px] rounded-lg bg-black/90
          ${
            index === tappedIndex
              ? "fixed left-1/2 -translate-x-1/2 top-4 w-[90%] p-3 opacity-100"
              : "absolute opacity-0 transition-opacity duration-200 left-0 right-0 p-2 mx-auto hidden md:block group-hover:opacity-100 " +
                (index < 2 ? "-top-16" : "bottom-full mb-2")
          }`}
            >
              {metric.description}
              <div className="absolute hidden md:block -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black/90"></div>
              <div className="absolute md:hidden -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-black/90"></div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MetricsDisplay;
