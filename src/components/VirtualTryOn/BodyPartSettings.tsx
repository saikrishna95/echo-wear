
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeasurementKey } from "./types";
import SliderControl from "./SliderControl";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BodyPartPreview from "./BodyPartPreview";

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

interface BodyPartSettingsProps {
  measurements: MeasurementsState;
  activeCategoryTab: "upper" | "lower" | "general";
  setActiveCategoryTab: (tab: "upper" | "lower" | "general") => void;
  handleSliderChange: (key: MeasurementKey, value: number[]) => void;
  setHighlightedPart: (part: MeasurementKey | null) => void;
  onClose: () => void;
}

const BodyPartSettings: React.FC<BodyPartSettingsProps> = ({
  measurements,
  activeCategoryTab,
  setActiveCategoryTab,
  handleSliderChange,
  setHighlightedPart,
  onClose
}) => {
  // Focus the mannequin on the selected body area when the tab changes
  useEffect(() => {
    // Set a default highlighted part for each category
    if (activeCategoryTab === "upper") {
      setHighlightedPart("chest");
    } else if (activeCategoryTab === "lower") {
      setHighlightedPart("hips");
    } else {
      setHighlightedPart("height");
    }

    // Clear highlight when component unmounts
    return () => setHighlightedPart(null);
  }, [activeCategoryTab, setHighlightedPart]);

  const getCategoryLabel = () => {
    switch (activeCategoryTab) {
      case "upper": return "Upper Body";
      case "lower": return "Lower Body";
      case "general": return "General";
      default: return "Measurements";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">{getCategoryLabel()} Settings</h2>
      </div>

      <Tabs 
        value={activeCategoryTab} 
        onValueChange={(value) => setActiveCategoryTab(value as "upper" | "lower" | "general")}
        className="w-full flex-1 flex flex-col"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="upper">Upper Body</TabsTrigger>
          <TabsTrigger value="lower">Lower Body</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        
        {/* Avatar preview for the selected body part */}
        <div className="mb-4">
          <BodyPartPreview 
            bodyPartCategory={activeCategoryTab}
            measurements={measurements}
            highlightedPart={activeCategoryTab === "upper" ? "chest" : activeCategoryTab === "lower" ? "hips" : "height"}
          />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="upper" className="mt-0 space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              Adjust your upper body measurements. Changes will be reflected on the mannequin in real-time.
            </p>
            {Object.entries(measurements)
              .filter(([_, m]) => m.category === "upper")
              .map(([key, measurement]) => (
                <SliderControl
                  key={key}
                  measurementKey={key as MeasurementKey}
                  measurement={measurement}
                  onChange={handleSliderChange}
                  onFocus={() => setHighlightedPart(key as MeasurementKey)}
                  onBlur={() => setHighlightedPart(key as MeasurementKey)}
                />
              ))}
          </TabsContent>
          
          <TabsContent value="lower" className="mt-0 space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              Adjust your lower body measurements. Changes will be reflected on the mannequin in real-time.
            </p>
            {Object.entries(measurements)
              .filter(([_, m]) => m.category === "lower")
              .map(([key, measurement]) => (
                <SliderControl
                  key={key}
                  measurementKey={key as MeasurementKey}
                  measurement={measurement}
                  onChange={handleSliderChange}
                  onFocus={() => setHighlightedPart(key as MeasurementKey)}
                  onBlur={() => setHighlightedPart(key as MeasurementKey)}
                />
              ))}
          </TabsContent>
          
          <TabsContent value="general" className="mt-0 space-y-4">
            <p className="text-sm text-gray-500 mb-4">
              Adjust your general body measurements. Changes will be reflected on the mannequin in real-time.
            </p>
            {Object.entries(measurements)
              .filter(([_, m]) => m.category === "general")
              .map(([key, measurement]) => (
                <SliderControl
                  key={key}
                  measurementKey={key as MeasurementKey}
                  measurement={measurement}
                  onChange={handleSliderChange}
                  onFocus={() => setHighlightedPart(key as MeasurementKey)}
                  onBlur={() => setHighlightedPart(key as MeasurementKey)}
                />
              ))}
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-6 pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-3">
          Adjustments are applied in real-time to the mannequin. Close this panel to see the full view.
        </p>
        <Button onClick={onClose} className="w-full">Done</Button>
      </div>
    </div>
  );
};

export default BodyPartSettings;
