"use client";

import React from "react";

export default function LaunchOverlay({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="transparent px-4 py-8 sm:p-6 text-center w-full lg:w-[50%]">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-9 text-[var(--background)] font-domine">
          TransportSense
        </h1>
        <p className="text-base sm:text-lg text-[var(--background)] mb-9">
          Discover why traffic works the way it does — and how better design can
          change everything.
        </p>
        <button
          onClick={onContinue}
          className="px-4 py-2 bg-transparent border border-[var(--accent)] rounded-full hover:bg-[var(--accent)] transition-all duration-300"
        >
          explore
        </button>
      </div>
    </div>
  );
}
