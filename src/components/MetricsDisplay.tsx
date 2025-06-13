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

const MetricsDisplay: React.FC = () => {
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
  const [metricsData, setMetricsData] = useState<Metrics>({
    excessFuel: 10,
    congestionCost: 10,
    travelTime: 10,
    delayTime: 5,
  });

  //scaling the metrics for the size of our displayed city view,
  // since the metrics fromt he dataset at for the entire city
  const scaleMetrics = (data: Metrics) => {
    //gotta figure out the fmorula to scale the metrics, just dividing by 2 for now until we figure that out

    //im dividing excess fuel by a thousand because this metric from the db is in thousands of gallons
    const scaledFuel = Math.round(data.excessFuel / 2) / 1000;
    const scaledCost = Math.round(data.congestionCost / 2);
    return {
      scaledFuel,
      scaledCost,
      travelTime: data.travelTime,
      delayTime: data.delayTime,
    };
  };

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
      label: "fuel wasted per vehicle",
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
    <div className="grid grid-cols-2 gap-4 w-full mb-4 p-2">
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
            <div className="text-sm text-center mb-2">{metric.label}</div>
            <div className="text-xl font-semibold text-center">
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
