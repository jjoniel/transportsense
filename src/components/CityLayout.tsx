"use client";

import React from "react";

type CityLayoutProps = {
  city: string;
};

export default function CityLayout({ city }: CityLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome to {city.charAt(0).toUpperCase() + city.slice(1)}
      </h2>
      <p className="text-gray-600 text-center max-w-md">
        This is where the city-specific transit simulation or information will
        be displayed.
      </p>
    </div>
  );
}
