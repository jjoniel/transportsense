"use client";

import { useState } from "react";
import LaunchOverlay from "./components/LaunchOverlay";
import CitySelector from "./components/CitySelector";
import CityLayout from "./components/CityLayout";

export default function HomePage() {
  const [step, setStep] = useState<"launch" | "select" | "zoom">("launch");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleContinue = () => setStep("select");
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setStep("zoom");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {step === "launch" && <LaunchOverlay onContinue={handleContinue} />}
      {step === "select" && <CitySelector onSelect={handleCitySelect} />}
      {step === "zoom" && selectedCity && <CityLayout city={selectedCity} />}
    </main>
  );
}
