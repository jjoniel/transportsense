"use client";

import { useSearchParams, useRouter } from "next/navigation";
import LaunchOverlay from "@/components/LaunchOverlay";
import CitySelector from "@/components/CitySelector";
import { cities } from "@/constants/cities";
import CityView from "@/components/CityView";
import Loading from "@/components/Loading";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step =
    (searchParams.get("step") as "launch" | "select" | "view") ?? "launch";
  const cityId = searchParams.get("city");
  const selectedCity = cities.find((c) => c.id === cityId) ?? null;

  const handleContinue = () => {
    router.push("?step=select", { scroll: false });
  };
  const handleCitySelect = (city: (typeof cities)[number]) => {
    router.push(`?step=view&city=${city.id}`, { scroll: false });
  };

  return (
    <main className="min-h-screen relative">
      {(step === "launch" || step === "select") && (
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
      )}
      {step === "launch" && <LaunchOverlay onContinue={handleContinue} />}
      {selectedCity && step === "view" && (
        <CityView
          onBack={() => {
            router.push("?step=select", { scroll: false });
          }}
          city={selectedCity}
        >
          {selectedCity.component && <selectedCity.component />}
        </CityView>
      )}
    </main>
  );
}
