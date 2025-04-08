
import React from "react";
import { Ruler, Shirt } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "measurements" | "clothing";
  setViewMode: (mode: "measurements" | "clothing") => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="px-6 mb-4">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setViewMode("measurements")}
          className={`flex-1 py-3 text-center text-sm font-medium flex items-center justify-center gap-2 ${
            viewMode === "measurements" 
              ? "border-b-2 border-primary text-primary" 
              : "border-transparent text-gray-500"
          }`}
          aria-label="Measurements mode"
        >
          <Ruler size={18} />
          <span>Measurements</span>
        </button>
        <button
          onClick={() => setViewMode("clothing")}
          className={`flex-1 py-3 text-center text-sm font-medium flex items-center justify-center gap-2 ${
            viewMode === "clothing" 
              ? "border-b-2 border-primary text-primary" 
              : "border-transparent text-gray-500"
          }`}
          aria-label="Clothing mode"
        >
          <Shirt size={18} />
          <span>Clothing</span>
        </button>
      </div>
    </div>
  );
};

export default ViewModeToggle;
