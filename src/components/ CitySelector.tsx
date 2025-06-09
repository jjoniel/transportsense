"use client";

import React from "react";

type CitySelectorProps = {
  onSelect: (city: string) => void;
};

const cities = [
  { id: "city1", label: "City 1" },
  { id: "city2", label: "City 2" },
  { id: "city3", label: "City 3" },
];

export default function CitySelector({ onSelect }: CitySelectorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
      <h2 className="text-xl font-semibold mb-6">Choose a city to explore</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelect(city.id)}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-center text-center text-lg font-medium hover:bg-blue-100 transition min-h-[150px]"
          >
            {city.label}
          </button>
        ))}
      </div>
    </div>
  );
}
