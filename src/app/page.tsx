"use client";

import { useState } from "react";
import LaunchOverlay from "@/components/LaunchOverlay";
import CitySelector from "@/components/CitySelector";
import City1 from "@/components/maps/City1";

export default function HomePage() {
  const [step, setStep] = useState<"launch" | "select" | "zoom">("launch");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleContinue = () => setStep("select");
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setStep("zoom");
  };

  return (
    <main className="min-h-screen relative">
      <div
        className={
          step === "zoom"
            ? "hidden"
            : step === "launch"
            ? "blur-sm opacity-60 pointer-events-none"
            : ""
        }
      >
        <CitySelector onSelect={handleCitySelect} selectedCity={selectedCity} />
      </div>
      {step === "launch" && <LaunchOverlay onContinue={handleContinue} />}
      {step === "zoom" && selectedCity === "city1" && <City1 />}
    </main>
  );
}
