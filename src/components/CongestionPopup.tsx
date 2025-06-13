//popup to show when user lands on the city view/chat page

"use client";

import React from "react";

export default function CongestionPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
      <div className="bg-[var(--background)] backdrop-blur-xl rounded-lg px-8 py-6 text-center w-full max-w-md mx-4 shadow-2xl border-4 border-[var(--accent)] ring-2 ring-[var(--accent)]/50 ring-offset-2 ring-offset-[var(--background)]">
        <div className="bg-gradient-to-b from-[var(--accent)]/10 to-transparent p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2 text-[var(--text)]">
            🚦 Washington DC: Fix the Traffic
          </h2>
          <p className="text-[var(--text)] mb-6">
            This city is heavily congested. Your task is to improve traffic flow
            by adding or removing roads.
            <br></br>
            <br></br>Each change affects the entire system — plan carefully to
            reduce delays.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--accent)] text-[var(--background)] rounded-md hover:opacity-90"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
