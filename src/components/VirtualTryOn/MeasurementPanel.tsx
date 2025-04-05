
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeasurementKey } from "./types";
import SliderControl from "./SliderControl";

interface MeasurementData {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
}

type MeasurementsState = {
  [key in MeasurementKey]: MeasurementData;
};

interface MeasurementPanelProps {
  measurements: MeasurementsState;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleSliderChange: (key: MeasurementKey, value: number[]) => void;
  setHighlightedPart: (part: MeasurementKey | null) => void;
}

const MeasurementPanel: React.FC<MeasurementPanelProps> = ({
  measurements,
  activeTab,
  setActiveTab,
  handleSliderChange,
  setHighlightedPart
}) => {
  return (
    <Tabs 
      defaultValue="upper" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full flex-1 flex flex-col"
    >
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="upper">Upper Body</TabsTrigger>
        <TabsTrigger value="lower">Lower Body</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>
      
      <div className="flex-1 overflow-y-auto">
        <TabsContent value="upper" className="mt-0 space-y-4">
          {Object.entries(measurements)
            .filter(([_, m]) => m.category === "upper")
            .map(([key, measurement]) => (
              <SliderControl
                key={key}
                measurementKey={key as MeasurementKey}
                measurement={measurement}
                onChange={handleSliderChange}
                onFocus={() => setHighlightedPart(key as MeasurementKey)}
                onBlur={() => setHighlightedPart(null)}
              />
            ))}
        </TabsContent>
        
        <TabsContent value="lower" className="mt-0 space-y-4">
          {Object.entries(measurements)
            .filter(([_, m]) => m.category === "lower")
            .map(([key, measurement]) => (
              <SliderControl
                key={key}
                measurementKey={key as MeasurementKey}
                measurement={measurement}
                onChange={handleSliderChange}
                onFocus={() => setHighlightedPart(key as MeasurementKey)}
                onBlur={() => setHighlightedPart(null)}
              />
            ))}
        </TabsContent>
        
        <TabsContent value="general" className="mt-0 space-y-4">
          {Object.entries(measurements)
            .filter(([_, m]) => m.category === "general")
            .map(([key, measurement]) => (
              <SliderControl
                key={key}
                measurementKey={key as MeasurementKey}
                measurement={measurement}
                onChange={handleSliderChange}
                onFocus={() => setHighlightedPart(key as MeasurementKey)}
                onBlur={() => setHighlightedPart(null)}
              />
            ))}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default MeasurementPanel;
