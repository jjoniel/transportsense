"use client";

import React from "react";
import City1 from "@/components/maps/City1";

type CitySelectorProps = {
  onSelect: (city: string) => void;
  selectedCity: string | null;
};

const cities = [
  { id: "city1", label: "City 1" },
  { id: "city2", label: "City 2" },
  { id: "city3", label: "City 3" },
];

export default function CitySelector({
  onSelect,
  selectedCity,
}: CitySelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[var(--background)]">
      <h2 className="text-xl font-semibold mb-6">Choose a city to explore</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelect(city.id)}
            className="bg-[var(--secondary)] rounded-lg shadow flex items-center justify-center text-center hover:bg-[var(--complementary)] transition w-full h-full aspect-square"
          >
            {city.id === "city1" && selectedCity === null ? (
              <City1 className="w-full h-full" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
