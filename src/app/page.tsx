"use client";

import { useState } from "react";
import LaunchOverlay from "@/components/LaunchOverlay";
import CitySelector from "@/components/CitySelector";
import City1 from "@/components/maps/City1";
import CityView from "@/components/CityView";
import Loading from "@/components/Loading";

export default function HomePage() {
  const [step, setStep] = useState<"launch" | "select" | "view">("launch");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = () => setStep("select");
  const handleCitySelect = (city: string) => {
    setLoading(true);
    setSelectedCity(city);
    setTimeout(() => {
      setLoading(false);
      setStep("view");
    }, 1000); // Adjust duration as needed
  };

  return (
    <main className="min-h-screen relative">
      {(step === "launch" || step === "select") && !loading && (
        <div
          className={`transition-filter,opacity duration-500 ${
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
      {loading && <Loading />}
      {step === "launch" && <LaunchOverlay onContinue={handleContinue} />}
      {selectedCity === "city1" && (
        <CityView
          onBack={() => {
            setSelectedCity(null);
            setStep("select");
          }}
        >
          <City1 className="transition-opacity transition-filter animate-fade-in" />
        </CityView>
      )}
    </main>
  );
}
