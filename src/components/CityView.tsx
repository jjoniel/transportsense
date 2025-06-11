import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface CityViewProps {
  city: { id: string; label: string };
  children: React.ReactNode;
  onBack: () => void;
}

const CityView: React.FC<CityViewProps> = ({ city, children, onBack }) => {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row bg-[var(--background)] animate-fade-in">
      <div className="lg:basis-1/3 w-full flex lg:flex-col flex-row justify-between lg:justify-start p-4 lg:h-full">
        <div className="flex items-center justify-between w-full pt-3">
          <button
            onClick={onBack}
            className="px-2 py-2 rounded-full text-white"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-white font-semibold text-center flex-1 text-4xl">
            {city.label}
          </h1>
          <div className="w-10" /> {/* spacer to balance the button */}
        </div>

        {/* Content (position varies by screen size) */}
        <div className="hidden lg:flex text-white mt-4 lg:mt-auto lg:mb-4">
          some content will go here
        </div>
      </div>

      {/* Map Area */}
      <div className="lg:basis-2/3 w-full flex justify-end items-center lg:border-l-10 lg:border-0 border-t-2 border-b-2 lg:border-[var(--accent)]">
        <div className="w-full h-full max-w-[130vh] max-h-[130vh] overflow-hidden">
          {children}
        </div>
      </div>
      <div className="sm:hidden flex text-white mt-4 lg:mt-auto lg:mb-4">
        some content will go here
      </div>
    </div>
  );
};

export default CityView;
