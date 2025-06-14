"use client";

import React from "react";

export default function LaunchOverlay({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--overlay)] backdrop-blur-xl">
      <div className="bg-[var(--glass)] px-8 py-10 rounded-[24px] shadow-2xl max-w-xl mx-4 border border-white/20 backdrop-blur-2xl">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-6 text-[var(--gray-900)] animate-fade-in tracking-tight">
          TransportSense
        </h1>
        <p className="text-base sm:text-lg text-[var(--gray-800)] mb-8 leading-relaxed">
          Discover why traffic works the way it does — and how better design can
          change everything.
          <br className="hidden sm:block" />
          <span className="block mt-3">
            In this interactive experience, you can make policy decisions and
            watch them play out in real time.
          </span>
        </p>
        <button
          onClick={onContinue}
          className="w-full sm:w-auto px-6 py-3 bg-[var(--accent)] text-[var(--white)] rounded-full hover:bg-[var(--accent-light)] active:bg-[var(--accent-dark)] transition-all duration-200 ease-in-out text-[17px] font-medium tracking-tight shadow-lg hover:shadow-xl active:shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
