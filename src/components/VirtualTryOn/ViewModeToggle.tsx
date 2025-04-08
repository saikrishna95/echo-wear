
import React from "react";

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
          className={`flex-1 py-3 text-center text-sm font-medium ${
            viewMode === "measurements" 
              ? "border-b-2 border-orange-500 text-orange-500" 
              : "border-transparent text-gray-500"
          }`}
        >
          Measurements
        </button>
        <button
          onClick={() => setViewMode("clothing")}
          className={`flex-1 py-3 text-center text-sm font-medium ${
            viewMode === "clothing" 
              ? "border-b-2 border-orange-500 text-orange-500" 
              : "border-transparent text-gray-500"
          }`}
        >
          Clothing
        </button>
      </div>
    </div>
  );
};

export default ViewModeToggle;
