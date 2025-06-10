"use client";

import { useState } from "react";
import LaunchOverlay from "@/components/LaunchOverlay";
import CitySelector from "@/components/CitySelector";
import City1 from "@/components/maps/City1";
import CityView from "@/components/CityView";

export default function HomePage() {
  const [step, setStep] = useState<"launch" | "select" | "view">("launch");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleContinue = () => setStep("select");
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setStep("view");
  };

  return (
    <main className="min-h-screen relative">
      {(step === "launch" || step === "select") && (
        <div
          className={`${
            step === "launch" ? "blur-lg opacity-100 pointer-events-none" : ""
          }`}
        >
          <CitySelector
            onSelect={handleCitySelect}
            selectedCity={selectedCity}
          />
        </div>
      )}
      {step === "launch" && <LaunchOverlay onContinue={handleContinue} />}
      {step === "view" && selectedCity === "city1" && (
        <div className="animate-fade-in transition-opacity duration-5000 opacity-0 animate-opacity-fade-in">
          <CityView>
            <City1 />
          </CityView>
        </div>
      )}
    </main>
  );
}
