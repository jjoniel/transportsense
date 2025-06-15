"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  left: string;
  top: string;
  delay: string;
}

export default function LaunchOverlay({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[var(--color-background)] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[url('/grid.svg')] opacity-10 animate-grid-scroll"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-[var(--color-foreground)]/10 rounded-full animate-float-${i % 3}`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-4 p-8 rounded-2xl bg-[var(--overlay)] backdrop-blur-2xl border border-[var(--color-foreground)]/10 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 hover:ring-2 hover:ring-[var(--color-accent)] hover:ring-opacity-50 group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-[var(--color-accent)] rounded-[20px] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        <div className="relative">
          {/* Title */}
          <h1 className="text-6xl sm:text-7xl font-medium mb-8 text-[var(--color-foreground)] tracking-tight transform hover:scale-105 transition-transform duration-300 cursor-default font-[var(--font-dm-sans)] lowercase">
            transport
            <span className="text-[var(--color-accent)] font-medium">sense</span>
          </h1>

          {/* Glowing accent line */}
          <div className="w-32 h-1 bg-[var(--color-accent)] rounded-full mb-8 animate-pulse opacity-80"></div>

          <p className="text-lg sm:text-xl text-[var(--color-foreground)]/90 mb-8 leading-relaxed tracking-normal font-[var(--font-dm-sans)] font-light">
            discover why traffic works the way it does — and how better design can
            change everything.
            <span className="block mt-4 text-[var(--color-foreground)]/80 tracking-normal">
              in this interactive experience, you can make policy decisions and
              watch them play out in real time.
            </span>
          </p>

          {/* Animated CTA button */}
          <button
            onClick={onContinue}
            className="group relative px-8 py-4 bg-[var(--color-accent)] text-[var(--color-foreground)] rounded-xl text-lg font-normal tracking-wide shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 font-[var(--font-dm-sans)] lowercase"
          >
            <span className="relative z-10">begin simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
