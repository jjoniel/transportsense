"use client";

import React from "react";
import City1 from "@/components/maps/City1";
import { cities } from "@/constants/cities";

type CitySelectorProps = {
  onSelect: (city: { id: string; label: string }) => void;
  selectedCity: { id: string; label: string } | null;
};

export default function CitySelector({
  onSelect,
  selectedCity,
}: CitySelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 lg:py-16">
      <h2 className="text-xl font-semibold mb-6 font-serif">
        Choose a city to explore
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-7xl">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelect(city)}
            className="group bg-[var(--black)] rounded-4xl shadow flex items-center justify-center text-center hover:border-[var(--accent)] border w-full aspect-square max-w-[90vw] mx-auto"
          >
            {city.id === "city1" ? (
              <div className="relative w-full h-full">
                <span className="absolute font-strong inset-0 flex items-center justify-center text-9xl text-[var(--white)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none [@media(hover:none)]:opacity-100">
                  Akron
                </span>
                <div className="transition duration-300 group-hover:opacity-20 [@media(hover:none)]:opacity-20 transition-opacity duration-300 w-full h-full">
                  <City1 className="w-full h-full scale-94" />
                </div>
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
