"use client";

import React from "react";

export default function LaunchOverlay({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[var(--foreground)] p-6 rounded shadow text-center">
        <h1 className="text-2xl font-semibold mb-2 text-[var(--background)]">
          TransportSense
        </h1>
        <p className="text-[var(--background)] mb-4">
          Learn how better transportation planning can improve cities.
        </p>
        <button
          onClick={onContinue}
          className="px-4 py-2 bg-[var(--secondary)] rounded hover:bg-[var(--complementary)] transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
