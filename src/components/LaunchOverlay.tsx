"use client";

import React from "react";

export default function LaunchOverlay({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--overlay)] backdrop-blur-md">
      <div className="bg-[var(--black)] px-8 py-10 rounded-2xl shadow-xl max-w-2xl mx-4 border border-[var(--accent-light)] border-opacity-20">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-8 text-[var(--white)] font-serif animate-fade-in">
          TransportSense
        </h1>
        <p className="text-lg sm:text-xl text-[var(--white)] mb-10 leading-relaxed opacity-90">
          Discover why traffic works the way it does — and how better design can
          change everything.
          <br />
          In this interactive experience, you can make policy decisions and
          watch them play out in real time.
        </p>
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-[var(--accent)] text-[var(--white)] rounded-xl hover:bg-[var(--accent-light)] active:bg-[var(--accent-dark)] transition-all duration-200 ease-in-out transform hover:-translate-y-1 active:translate-y-0 text-lg font-medium"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}
