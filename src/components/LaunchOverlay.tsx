"use client";

import React from "react";

type LaunchOverlayProps = {
  onContinue: () => void;
};

export default function LaunchOverlay({ onContinue }: LaunchOverlayProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold mb-2">TransportSense</h1>
        <p className="text-gray-700 mb-4">
          Learn how better transportation planning can improve cities.
        </p>
        <button
          onClick={onContinue}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
