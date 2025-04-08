
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewModeToggleProps {
  viewMode: "measurements" | "clothing";
  setViewMode: (mode: "measurements" | "clothing") => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="px-6 mb-4">
      <Tabs
        value={viewMode}
        onValueChange={(value) => setViewMode(value as "measurements" | "clothing")}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full bg-transparent p-0 h-auto">
          <TabsTrigger
            value="measurements"
            className={`pb-2 rounded-none text-base ${
              viewMode === "measurements"
                ? "text-orange-500 border-b-2 border-orange-500 font-medium"
                : "text-gray-500 border-b border-gray-200"
            }`}
          >
            Measurements
          </TabsTrigger>
          <TabsTrigger
            value="clothing"
            className={`pb-2 rounded-none text-base ${
              viewMode === "clothing"
                ? "text-orange-500 border-b-2 border-orange-500 font-medium"
                : "text-gray-500 border-b border-gray-200"
            }`}
          >
            Clothing
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ViewModeToggle;
