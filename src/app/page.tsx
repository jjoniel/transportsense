"use client";

import { useState } from "react";
import LaunchOverlay from "@/components/LaunchOverlay";
import CitySelector from "@/components/CitySelector";
import { cities } from "@/constants/cities";
import CityView from "@/components/CityView";
import Loading from "@/components/Loading";

export default function HomePage() {
  const [step, setStep] = useState<"launch" | "select" | "view">("launch");
  const [selectedCity, setSelectedCity] = useState<
    (typeof cities)[number] | null
  >(null);

  const handleContinue = () => setStep("select");
  const handleCitySelect = (city: (typeof cities)[number]) => {
    setSelectedCity(city);
    setStep("view");
  };

  return (
    <main className="min-h-screen relative">
      {(step === "launch" || step === "select") && (
        <div
          className={`transition-filter,opacity duration-200 ${
            step === "launch"
              ? "blur-3xl pointer-events-none"
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
      {selectedCity && step === "view" && (
        <CityView
          onBack={() => {
            setSelectedCity(null);
            setStep("select");
          }}
          city={selectedCity}
        >
          {selectedCity.component && (
            <selectedCity.component className="transition-opacity transition-filter" />
          )}
        </CityView>
      )}
    </main>
  );
}
