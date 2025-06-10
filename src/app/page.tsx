"use client";

import { useState } from "react";
import LaunchOverlay from "@/components/LaunchOverlay";
import CitySelector from "@/components/CitySelector";
import City1 from "@/components/maps/City1";
import CityView from "@/components/CityView";
import Loading from "@/components/Loading";

export default function HomePage() {
  const [step, setStep] = useState<"launch" | "select" | "view">("launch");
  const [selectedCity, setSelectedCity] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const handleContinue = () => setStep("select");
  const handleCitySelect = (city: { id: string; label: string }) => {
    setSelectedCity(city);
    setStep("view");
  };

  return (
    <main className="min-h-screen relative">
      {(step === "launch" || step === "select") && (
        <div
          className={`transition-filter,opacity duration-200 ${
            step === "launch"
              ? "blur-lg pointer-events-none"
              : "blur-none pointer-events-auto"
          }`}
        >
          <CitySelector
            onSelect={handleCitySelect}
            selectedCity={selectedCity}
          />
        </div>
      )}
      {step === "launch" && <LaunchOverlay onContinue={handleContinue} />}
      {selectedCity?.id === "city1" && step === "view" && (
        <CityView
          onBack={() => {
            setSelectedCity(null);
            setStep("select");
          }}
          city={selectedCity}
        >
          <City1 className="transition-opacity transition-filter" />
        </CityView>
      )}
    </main>
  );
}
