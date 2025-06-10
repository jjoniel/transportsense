import React from "react";

interface CityViewProps {
  children: React.ReactNode;
}

const CityView: React.FC<CityViewProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="h-full aspect-square flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CityView;
