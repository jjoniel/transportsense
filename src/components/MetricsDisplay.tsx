"use client";

import React, { useEffect, useState } from "react";
import confetti from 'canvas-confetti';

type Metric = {
  label: string;
  value: string;
  unit: string;
  description: string;
  //   icon: string;
};

type RawData = {
  excessFuel: number; // thousands of gallons
  congestionCost: number; // million dollars
  totalAnnualDelay: number; // thousands of person-hours
  freewayDailyMiles: number; // thousands
  localDailyMiles: number; // thousands
  avgGasCost: number; // $/gallon
};

type ApiResponse = {
  rawData: RawData | null;
  totalLaneMiles: number;
};

type Metrics = {
  excessFuel: number;
  congestionCost: number;
  travelTime: number;
  delayTime: number;
};

type Phase = 'initialPhase' | 'simulationStart' | 'laneAdded' | 'trafficReturns' | 'paradoxExplanation' | 'simulationReset' | 'laneRemoved' | 'trafficGone' | 'solutionExplanation';

const MetricsDisplay: React.FC<{ currentPhase: Phase }> = ({ currentPhase }) => {
  //celebrate when metrics improve
  const celebrateImprovement = () => {
    //first burst from bottom
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#4ade80', '#86efac'] //green shades
    });

    //side bursts after delay
    setTimeout(() => {
      //left side
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 }
      });
      //right side
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 }
      });
    }, 300);

    //final burst from top
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0 },
        gravity: 0.8,
        colors: ['#22c55e', '#4ade80', '#86efac', '#ffffff']
      });
    }, 600);
  };

  const getMetricColor = (metric: Metric, index: number, initialMetrics: Metrics | null) => {
    //extract just the number from the metric value (removes currency symbol, comma)
    const currentValue = Number(metric.value.replace(/[^0-9.-]/g, ''));
    //get the corresponding initial value based on metric type
    const metricKey = index === 0 ? 'excessFuel' : 
                      index === 1 ? 'congestionCost' : 
                      index === 2 ? 'travelTime' : 'delayTime';
    const initialValue = initialMetrics?.[metricKey] ?? 0;

    //check if metric improved
    const improved = currentValue < initialValue;

    //only show colors in specific phases
    if (currentPhase === 'laneRemoved') {
      //show green for improvements and celebrate
      if (improved && initialMetrics) {
        celebrateImprovement();
      }
      return improved ? 'text-green-500' : '';
    } else if (currentPhase === 'laneAdded') {
      //show red for worsening metrics
      return currentValue > initialValue ? 'text-red-500' : '';
    } else {
      return '';
    }
  };

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
        return currentMetrics;
      case 'laneAdded':
        // User added a lane, seeing temporary improvement
        return {
          excessFuel: currentMetrics.excessFuel * 1.8,
          congestionCost: currentMetrics.congestionCost * 1.9,
          travelTime: currentMetrics.travelTime * 1.7,
          delayTime: currentMetrics.delayTime * 1.8,
        };
      case 'trafficReturns':
        // Traffic has returned worse due to induced demand
        return currentMetrics;
      case 'paradoxExplanation':
        // Learning about induced demand - metrics stay the same
        return currentMetrics;
      case 'laneRemoved':
        // Traffic improved after lane removal
        return {
          excessFuel: currentMetrics.excessFuel * 0.6,
          congestionCost: currentMetrics.congestionCost * 0.5,
          travelTime: currentMetrics.travelTime * 0.7,
          delayTime: currentMetrics.delayTime * 0.6,
        };
      case 'trafficGone':
        // Keep improved metrics
        return currentMetrics;
      case 'solutionExplanation':
        return currentMetrics;
      default:
        return currentMetrics;
    }
  };

  const [initialMetrics, setInitialMetrics] = useState<Metrics | null>(null);
  const [apiData, setApiData] = useState<ApiResponse>({ rawData: null, totalLaneMiles: 62.574 });
  const [metricsData, setMetricsData] = useState<Metrics>({
    excessFuel: 10,
    congestionCost: 10,
    travelTime: 10,
    delayTime: 5,
  });

  //calculate metrics using the formulas provided
  const calculateMetrics = (rawData: RawData | null, totalLaneMiles: number): Metrics => {
    
    if (!rawData) return {
      excessFuel: 0, //gallons per year
      congestionCost: 0, //dollars per year
      travelTime: 0, //minutes per mile
      delayTime: 0 //minutes per mile
    };

    //scale metrics based on ratio of current lanes to dc's total lanes (1500)
    const DC_TOTAL_LANE_MILES = 1500;
    const scaleFactor = totalLaneMiles / DC_TOTAL_LANE_MILES;
    const MAP_POPULATION = 3500;

    //total annual cost in millions, scaled by lane ratio
    const congestionCost = rawData.congestionCost * scaleFactor;

    //convert delay from annual hours to minutes per mile per day, scaled by lane miles, commuter population (assumed 1500)
    const delayTime = (((rawData.totalAnnualDelay * 1000 * scaleFactor) / 365 / Math.max(totalLaneMiles, 1))/1500) * 60;

    //calculate travel time based on traffic volume vs lane capacity
    const NO_TRAFFIC_TIME = 1.33; //base time at 45mph (assumed), 1.33 = 60mins/45mph
    const DEMAND_PER_LANE = 36000; //daily car capacity per lane (assumed)
    const totalDailyMiles = (rawData.freewayDailyMiles + rawData.localDailyMiles) * 1000 * scaleFactor;
    const travelTime = NO_TRAFFIC_TIME * totalDailyMiles / (DEMAND_PER_LANE * Math.max(totalLaneMiles, 1));

    //total annual fuel waste in gallons per year, scaled by total lane miles
    const excessFuel = (rawData.excessFuel * 1000 * scaleFactor) / Math.max(totalLaneMiles, 1);


    // Ensure no NaN values in final results
    return {
      excessFuel: isNaN(excessFuel) ? 0 : excessFuel,
      congestionCost: isNaN(congestionCost) ? 0 : congestionCost,
      travelTime: isNaN(travelTime) ? NO_TRAFFIC_TIME : travelTime,
      delayTime: isNaN(delayTime) ? 0 : delayTime
    };
  };

  const formatMetricValue = (value: number, index: number): string => {
    if (index === 0) { //format fuel in gallons/year with commas
      return Math.round(value).toLocaleString();
    } else if (index === 1) { //format cost in dollars/year, no decimals
      return `$${value.toFixed(0)}`;
    } else { //format time in minutes/mile with two decimals
      return value.toFixed(2);
    }
  };

  useEffect(() => {
    //update metrics when phase or lane miles change
    if (apiData.rawData) {
      //calculate new metrics based on current state
      const newMetrics = calculateMetrics(apiData.rawData, apiData.totalLaneMiles);
      
      //only update metrics in specific phases
      if (currentPhase === 'initialPhase') {
        //reset everything in initial phase
        setInitialMetrics(null);
        setMetricsData(newMetrics);
      } else if (currentPhase === 'paradoxExplanation') {
        //just update metrics without resetting initial state
        setMetricsData(newMetrics);
      } else if (currentPhase === 'simulationStart' && !initialMetrics) {
        //save initial state when simulation starts
        setInitialMetrics(newMetrics);
        setMetricsData(newMetrics);
      } else if (['laneAdded', 'laneRemoved'].includes(currentPhase)) {
        //update metrics when adding or removing lane
        const updatedMetrics = updateMetricsForPhase(newMetrics, currentPhase);
        setMetricsData(updatedMetrics);
      }
    }
  }, [currentPhase, apiData.totalLaneMiles, apiData.rawData, initialMetrics]);

  useEffect(() => {
    //fetch metrics from mongodb
    const fetchMetrics = async () => {
      try {
        //fetch metrics from mongodb through the api route
        const response = await fetch("/api/metrics");
        if (response.ok) {
          const data = await response.json();
          setApiData(data);
          if (data.rawData) {
            const calculatedMetrics = calculateMetrics(data.rawData, data.totalLaneMiles);
            setMetricsData(calculatedMetrics);
          }
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
  //metrics displayed at the top
  const metrics: Metric[] = [
    {
      label: "fuel wasted",
      value: formatMetricValue(metricsData.excessFuel, 0),
      unit: "gal",
      description: "Extra fuel consumed annually due to traffic.",
      //   icon: "⛽"
    },
    {
      label: "financial losses",
      value: formatMetricValue(metricsData.congestionCost, 1),
      unit: "million",
      description:
        "Total annual economic impact, including fuel costs, lost time, and decreased productivity.",
      //   icon: "💰"
    },
    {
      label: "time to travel 1 mile",
      value: formatMetricValue(metricsData.travelTime, 2),
      unit: "min",
      description: "Average time required to complete a typical journey.",
      //   icon: "⏱️"
    },
    {
      label: "average delay",
      value: formatMetricValue(metricsData.delayTime, 3),
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
            <div 
              className={`text-xl lg:text-2xl font-semibold text-center ${initialMetrics ? 
                getMetricColor(metric, index, initialMetrics) : ''}`}
            >
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
