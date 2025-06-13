"use client";

import React from "react";
import { cities } from "@/constants/cities";

type CitySelectorProps = {
  onSelect: (city: (typeof cities)[number]) => void;
  selectedCity: (typeof cities)[number] | null;
};

export default function CitySelector({
  onSelect,
  selectedCity,
}: CitySelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-16 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6 font-serif">
        Choose a city to explore
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelect(city)}
            className="group bg-[var(--black)] rounded-4xl shadow flex items-center justify-center text-center hover:border-[var(--accent)] border w-full aspect-square max-w-[90vw] mx-auto"
          >
            <div className="relative w-full h-full">
              <span className="absolute font-strong inset-0 flex items-center justify-center text-7xl text-[var(--white)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none [@media(hover:none)]:opacity-100">
                {city.label}
              </span>
              <div className="transition duration-300 group-hover:opacity-20 [@media(hover:none)]:opacity-20 transition-opacity duration-300 w-full h-fåull">
                <city.component className="w-full h-full scale-95" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
