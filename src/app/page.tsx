"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import introJs from "intro.js";
import LaunchOverlay from "@/components/LaunchOverlay";
import CitySelector from "@/components/CitySelector";
import { cities } from "@/constants/cities";
import CityView from "@/components/CityView";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step =
    (searchParams.get("step") as "launch" | "select" | "view") ?? "launch";

  useEffect(() => {
    if (!searchParams.get("step")) {
      router.replace("?step=launch");
    }
  }, [searchParams, router]);

  useEffect(() => {
    const fromLaunch = searchParams.get("fromLaunch");
    if (step === "view" && fromLaunch === "true") {
      setTimeout(() => {
        introJs()
          .setOptions({
            showBullets: false,
          })
          .start();
        const params = new URLSearchParams(window.location.search);
        params.delete("fromLaunch");
        const newUrl = window.location.pathname + "?" + params.toString();
        window.history.replaceState({}, "", newUrl);
      }, 300);
    }
  }, [step, searchParams]);

  const cityId = searchParams.get("city");
  const selectedCity = cities.find((c) => c.id === "city0");

  const handleContinue = () => {
    router.push("?step=view&fromLaunch=true", { scroll: false });
  };
  const handleCitySelect = (city: (typeof cities)[number]) => {
    router.push(`?step=view&city=${city.id}`, { scroll: false });
  };

  return (
    <main className="min-h-screen relative">
      {/* {(step === "launch" || step === "select") && (
        <div
          className={`transition-filter,opacity duration-.5 ${
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
      )} */}
      {step === "launch" && <LaunchOverlay onContinue={handleContinue} />}
      {selectedCity && (step === "view" || step === "launch") && (
        <div
          className={`transition-all duration-500 ${
            step === "launch"
              ? "blur-sm opacity-10 pointer-events-none"
              : "blur-none opacity-100 pointer-events-auto"
          }`}
        >
          <CityView
            onBack={() => {
              router.push("?step=launch", { scroll: false });
            }}
            city={selectedCity}
          >
            {selectedCity.component && <selectedCity.component />}
          </CityView>
        </div>
      )}
    </main>
  );
}
