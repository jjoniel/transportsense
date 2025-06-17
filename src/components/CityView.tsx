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

type Phase =
  | "initialPhase"
  | "simulationStart"
  | "laneAdded"
  | "trafficReturns"
  | "paradoxExplanation"
  | "simulationReset"
  | "laneRemoved"
  | "trafficGone"
  | "solutionExplanation";

const CityView: React.FC<CityViewProps> = ({ city, children }) => {
  const [currentPhase, setCurrentPhase] = useState<Phase>("initialPhase");
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

  //get all regular roads
  const getAllNonHighwayRoads = () =>
    document.querySelectorAll<SVGPathElement>(
      'path[stroke="var(--white)"], path[stroke="#FFD700"], path[stroke="#FFA500"], path[stroke="#FF0000"], path[stroke="green"]'
    );

  //get highways
  const getHighwayRoads = () =>
    Array.from(
      document.querySelectorAll<SVGPathElement>(
        'path[stroke="#666"][stroke-width="8"]'
      )
    );

  //sleep helper
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  //check if roads are white
  const checkAllRoadsWhite = () => {
    const nonHighwayRoads = Array.from(getAllNonHighwayRoads());
    return nonHighwayRoads.every(
      (road) => road.style.stroke === "var(--white)"
    );
  };

  //wait for white roads
  const waitForWhiteRoads = async () => {
    while (!checkAllRoadsWhite()) {
      await sleep(50);
    }
  };

  //animate traffic
  const animateTrafficBuild = async () => {
    const nonHighwayRoads = Array.from(getAllNonHighwayRoads());
    const highwayRoads = getHighwayRoads();

    //pick random highway
    const targetHighway = highwayRoads
      //shuffle and take first
      .sort(() => 0.5 - Math.random())[0];

    //get roads for yellow wave
    const randomRoads = nonHighwayRoads
      //shuffle roads
      .sort(() => 0.5 - Math.random())
      //take 70 percent
      .slice(0, Math.floor(nonHighwayRoads.length * 0.7));

    //start highway animation
    let highwayAnimation: Promise<void> | undefined;
    if (targetHighway) {
      highwayAnimation = (async () => {
        //random delay 0-100ms
        await sleep(Math.random() * 100);
        targetHighway.style.stroke = "#FFD700";

        //go orange then red
        await sleep(100);
        targetHighway.style.stroke = "#FFA500";
        await sleep(400);
        targetHighway.style.stroke = "#FF0000";
        setRedRoad(targetHighway);
      })();
    }

    //make local roads yellow
    for (const road of randomRoads) {
      road.style.stroke = "#FFD700";
      await sleep(10 + Math.random() * 15);
    }

    //pause for effect
    await sleep(400);

    //wait for highway if needed
    if (highwayAnimation) {
      await highwayAnimation;
    }
  };

  const resetSimulation = () => {
    const nonHighwayRoads = getAllNonHighwayRoads();
    nonHighwayRoads.forEach((road) => {
      road.style.stroke = "var(--white)";
      road.style.strokeWidth = ORIGINAL_STROKE_WIDTH;
    });
    const highwayRoads = getHighwayRoads();
    highwayRoads.forEach((road) => {
      road.style.stroke = "#666";
      road.style.strokeWidth = "8px";
    });
    setRedRoad(null);
    setYellowRoads([]);
  };

  const showInitialCongestion = async () => {
    resetSimulation();
    await animateTrafficBuild();
  };

  const addLane = () => {
    if (redRoad) {
      redRoad.parentNode?.appendChild(redRoad);
      redRoad.style.stroke = "green";
      const currentWidth = parseInt(
        redRoad.style.strokeWidth || ORIGINAL_STROKE_WIDTH
      );
      redRoad.style.strokeWidth = `${currentWidth + 8}px`; //make it thicker
    }
    yellowRoads.forEach((road) => (road.style.stroke = ORIGINAL_ROAD_COLOR));
    setYellowRoads([]);
  };

  const removeLane = () => {
    if (redRoad) {
      redRoad.parentNode?.appendChild(redRoad);
      redRoad.style.stroke = "#FFA500"; // orange to indicate lane removal
      const currentWidth = parseInt(
        redRoad.style.strokeWidth || ORIGINAL_STROKE_WIDTH
      );
      // Don't go below the original width
      const newWidth = Math.max(
        parseInt(ORIGINAL_STROKE_WIDTH),
        currentWidth - 4
      );
      redRoad.style.strokeWidth = `${newWidth}px`;
    }
    yellowRoads.forEach((road) => (road.style.stroke = ORIGINAL_ROAD_COLOR));
    setYellowRoads([]);
  };

  const showInducedDemand = () => {
    const nonHighwayRoads = Array.from(getAllNonHighwayRoads());
    const shuffledRoads = nonHighwayRoads.sort(() => 0.5 - Math.random());
    const secondaryCongestedRoads = shuffledRoads
      .filter((r: SVGPathElement) => r !== redRoad)
      .slice(0, 3);
    secondaryCongestedRoads.forEach((road: SVGPathElement) => {
      road.style.stroke = "#FFD700";
    });
    setYellowRoads(secondaryCongestedRoads);
  };

  const handleChoiceSelect = (choice: Choice) => {
    switch (choice.nextNode) {
      case "simulationStart":
        Promise.resolve().then(async () => {
          await showInitialCongestion();
        });
        break;

      case "laneAdded":
        addLane();
        break;

      case "trafficReturns":
        //green road gets congested again
        Promise.resolve().then(async () => {
          if (redRoad) {
            await sleep(500);
            redRoad.style.stroke = "#FFD700"; //yellow
            await sleep(800);
            redRoad.style.stroke = "#FFA500"; //orange
            await sleep(800);
            redRoad.style.stroke = "#FF0000"; //red
          }
          showInducedDemand();
        });
        break;

      case "simulationReset":
        resetSimulation();
        Promise.resolve().then(async () => {
          await showInitialCongestion();
        });
        break;

      case "laneRemoved":
        removeLane();
        break;

      case "trafficGone":
        //show traffic improvement
        Promise.resolve().then(async () => {
          if (redRoad) {
            await sleep(500);
            redRoad.style.stroke = "#FFD700"; //yellow
            await sleep(800);
            redRoad.style.stroke = "green"; //improved
          }
          //clear other yellow roads
          yellowRoads.forEach(
            (road) => (road.style.stroke = ORIGINAL_ROAD_COLOR)
          );
          setYellowRoads([]);
        });
        break;

      case "initialPhase":
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
