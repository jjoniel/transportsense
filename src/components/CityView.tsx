import React, { useEffect, useState } from "react";
import ChatInterface from "./ChatInterface";
import MetricsDisplay from "./MetricsDisplay";
import { calculateSvgArea, estimatePopulation } from "../lib/mapcalculations";
import "intro.js/introjs.css";
import { Choice } from "@/data/conversationData";

interface CityViewProps {
  city: { id: string; label: string };
  children: React.ReactNode;
  onBack: () => void;
}

const ORIGINAL_ROAD_COLOR = "var(--white)";
const ORIGINAL_STROKE_WIDTH = "4";

type Phase = 'initialPhase' | 'simulationStart' | 'laneAdded' | 'trafficReturns' | 'paradoxExplanation' | 'laneAddedAgain' | 'solutionExplanation';

const CityView: React.FC<CityViewProps> = ({ city, children }) => {
  const [currentPhase, setCurrentPhase] = useState<Phase>('initialPhase');
  const [, setSvgArea] = useState<number | null>(null);
  const [estimatedPopulation, setEstimatedPopulation] = useState<number | null>(
    null
  );

  const [redRoad, setRedRoad] = useState<SVGPathElement | null>(null);
  const [yellowRoads, setYellowRoads] = useState<SVGPathElement[]>([]);

  useEffect(() => {
    const svg = document.querySelector("svg");
    if (svg && svg.viewBox) {
      const area = calculateSvgArea(svg);
      setSvgArea(area);
      setEstimatedPopulation(estimatePopulation(area));
    }
  }, []);

  const getAllRoads = () =>
    document.querySelectorAll<SVGPathElement>(
      'path[stroke="var(--white)"], path[stroke="#FFD700"], path[stroke="#FFA500"], path[stroke="#FF0000"], path[stroke="green"]'
    );

  const resetSimulation = () => {
    const allRoads = getAllRoads();
    allRoads.forEach((road) => {
      road.style.stroke = ORIGINAL_ROAD_COLOR;
      road.style.strokeWidth = ORIGINAL_STROKE_WIDTH;
    });
    setRedRoad(null);
    setYellowRoads([]);
  };

  const showInitialCongestion = () => {
    resetSimulation();
    const allRoads = Array.from(getAllRoads());
    const shuffledRoads = allRoads.sort(() => 0.5 - Math.random());

    const mainCongestedRoad = shuffledRoads.find((road) => {
      if (!road) return false;
      const bbox = road.getBBox();
      return bbox.width > 20 || bbox.height > 20;
    });

    if (mainCongestedRoad) {
      mainCongestedRoad.parentNode?.appendChild(mainCongestedRoad);
      mainCongestedRoad.style.stroke = "#FF0000";
      setRedRoad(mainCongestedRoad);

      const secondaryCongestedRoads = shuffledRoads
        .filter((r) => r !== mainCongestedRoad)
        .slice(0, 3);
      secondaryCongestedRoads.forEach((road) => {
        road.style.stroke = "#FFD700";
      });
      setYellowRoads(secondaryCongestedRoads);
    } else {
      console.warn("Could not find a suitable road to make red.");
    }
  };

  const addLane = () => {
    if (redRoad) {
      redRoad.parentNode?.appendChild(redRoad);
      redRoad.style.stroke = "green";
      const currentWidth = parseInt(
        redRoad.style.strokeWidth || ORIGINAL_STROKE_WIDTH
      );
      redRoad.style.strokeWidth = `${currentWidth + 4}px`;
    }
    yellowRoads.forEach((road) => (road.style.stroke = ORIGINAL_ROAD_COLOR));
    setYellowRoads([]);
  };

  const showInducedDemand = () => {
    if (redRoad) {
      redRoad.parentNode?.appendChild(redRoad);
      redRoad.style.stroke = "#FF0000";
    }
    const allRoads = Array.from(getAllRoads());
    const shuffledRoads = allRoads.sort(() => 0.5 - Math.random());
    const secondaryCongestedRoads = shuffledRoads.slice(0, 3);
    secondaryCongestedRoads.forEach((road) => {
      road.style.stroke = "#FFD700";
    });
    setYellowRoads(secondaryCongestedRoads);
  };

  const handleChoiceSelect = (choice: Choice) => {
    switch (choice.nextNode) {
      case "simulationStart":
        showInitialCongestion();
        break;
      case "laneAdded":
      case "laneAddedAgain":
        addLane();
        break;
      case "trafficReturns":
        showInducedDemand();
        break;
      case "root":
        resetSimulation();
        break;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col sm:flex-row bg-[var(--background)] animate-fade-in">
      <div className="sm:basis-1/3 w-full flex sm:flex-col flex-row justify-between sm:justify-start p-4 sm:h-full">
        <div className="flex flex-col items-center sm:items-start w-full pt-3">
          <div className="w-full flex justify-between items-start gap-4">
            <div>
              <h1
                className="text-white text-left font-semibold text-4xl sm:pl-2"
                data-intro="In this simulation, you will be focusing on a small area of the the nation's capital."
                data-step="1"
                data-tooltip-class="custom-tooltip"
                data-highlight-class="custom-highlight"
              >
                {city.label}
              </h1>
              {estimatedPopulation !== null && (
                <p
                  className="text-lg text-gray-300 mt-1 sm:pl-2"
                  data-intro="The population of the area is shown here: it will change as the simulation progresses."
                  data-step="2"
                  data-tooltip-class="custom-tooltip"
                  data-highlight-class="custom-highlight"
                >
                  Map Area Population: {estimatedPopulation.toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <div
            className="w-full mt-4 px-2"
            data-intro="These are live metrics for the simulation."
            data-step="3"
            data-tooltip-class="custom-tooltip"
            data-highlight-class="custom-highlight"
          >
            <MetricsDisplay currentPhase={currentPhase} />
          </div>
        </div>

        {/* Content for large screens */}
        <div className="hidden sm:flex text-white flex-col space-y-2 flex-grow min-h-0">
          <div
            className="flex-grow min-h-0 mt-4"
            data-intro="This is the decision-making interface where you can interact with the simulation."
            data-step="4"
            data-tooltip-class="custom-tooltip"
            data-highlight-class="custom-highlight"
          >
            <ChatInterface 
              onChoiceSelect={handleChoiceSelect}
              onPhaseChange={(phase) => setCurrentPhase(phase)}
            />
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="sm:basis-2/3 w-full flex justify-end items-center">
        <div
          className="w-full h-full max-w-[130vh] max-h-[130vh] overflow-hidden bg-(var(--black)) sm:border-l-10 sm:border-0 border-t-2 border-b-2 sm:border-[var(--accent)]"
          data-intro="This is the map of the simulation area. It shows the road network and will display the traffic conditions."
          data-step="5"
          data-tooltip-class="custom-tooltip"
          data-highlight-class="custom-highlight"
        >
          {children}
        </div>
      </div>
      {/* Content for small screens */}
      <div className="sm:hidden flex text-white p-4 flex-col space-y-2">
        <div className="h-96 mt-4">
          <ChatInterface 
            onChoiceSelect={handleChoiceSelect}
            onPhaseChange={(phase) => setCurrentPhase(phase)}
          />
        </div>
      </div>
    </div>
  );
};

export default CityView;
