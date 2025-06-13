import React, { useEffect, useState } from "react";
import ChatInterface from "./ChatInterface";
import MetricsDisplay from "./MetricsDisplay";
import {
  calculateLaneMiles,
  calculateSvgArea,
  estimatePopulation,
} from "../lib/mapcalculations";

interface CityViewProps {
  city: { id: string; label: string };
  children: React.ReactNode;
  onBack: () => void;
}

const CityView: React.FC<CityViewProps> = ({ city, children, onBack }) => {
  const [lengths, setLengths] = useState<{ [key: string]: number }>({});
  const [svgArea, setSvgArea] = useState<number | null>(null);
  const [estimatedPopulation, setEstimatedPopulation] = useState<number | null>(
      null
  );

  useEffect(() => {
    const paths = document.querySelectorAll("path");
    setLengths(calculateLaneMiles(paths));

    const svg = document.querySelector("svg");
    if (svg && svg.viewBox) {
      const area = calculateSvgArea(svg);
      setSvgArea(area);
      setEstimatedPopulation(estimatePopulation(area));
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row bg-[var(--background)] animate-fade-in">
  <div className="lg:basis-1/3 w-full flex lg:flex-col flex-row justify-between lg:justify-start p-4 lg:h-full">
    <div className="flex flex-col items-center lg:items-start w-full pt-3">
      <h1 className="text-white text-center lg:text-left font-semibold flex-1 text-4xl lg:pl-2">
        {city.label}
      </h1>
      {estimatedPopulation !== null && (
        <p className="text-lg text-gray-300 mt-1 lg:pl-2">
          Map Area Estimated Population:{" "}
          {estimatedPopulation.toLocaleString()}
        </p>
      )}
      <div className="w-full mt-4 px-2">
        <MetricsDisplay />
      </div>
    </div>

          {/* Content for large screens */}
          <div className="hidden lg:flex text-white mt-4 flex-col space-y-2 flex-grow min-h-0">
            <div className="font-bold">Road Lengths:</div>
            {Object.entries(lengths).map(([sw, len]) => (
                <div key={sw}>
                  {sw === "8" ? "Highways" : "Local Roads"}: {len.toFixed(3)} lane
                  miles
                </div>
            ))}
            <div className="flex-grow min-h-0 mt-4">
              <ChatInterface />
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:basis-2/3 w-full flex justify-end items-center">
          <div className="w-full h-full max-w-[130vh] max-h-[130vh] overflow-hidden bg-(var(--black)) lg:border-l-10 lg:border-0 border-t-2 border-b-2 lg:border-[var(--accent)]">
            {children}
          </div>
        </div>
        {/* Content for small screens */}
        <div className="lg:hidden flex text-white p-4 flex-col space-y-2">
          <div className="font-bold">Road Lengths:</div>
          {Object.entries(lengths).map(([sw, len]) => (
              <div key={sw}>
                {sw === "8" ? "Highways" : "Local Roads"}: {len.toFixed(3)}{" "}
                lane-miles d
              </div>
          ))}
          {/* Wrapper to give chat a fixed height on mobile */}
          <div className="h-96 mt-4">
            <ChatInterface />
          </div>
        </div>
      </div>
  );
};

export default CityView;