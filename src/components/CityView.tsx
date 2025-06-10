import React from "react";

interface CityViewProps {
  children: React.ReactNode;
  onBack: () => void;
}

const CityView: React.FC<CityViewProps> = ({ children, onBack }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[var(--background)] relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--white)] px-4 py-2 rounded-md font-medium hover:opacity-80 transition-opacity"
      >
        ← Back
      </button>
      <div className="w-full max-w-[100vh] aspect-square flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CityView;
