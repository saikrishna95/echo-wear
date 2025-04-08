
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, Ratio, Frame } from "lucide-react";
import SimplifiedHumanAvatar3D from "./SimplifiedHumanAvatar3D";
import { MeasurementKey, ClothingItem } from "./types";

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

interface AvatarPreviewProps {
  measurements: MeasurementsState;
  highlightedPart: MeasurementKey | null;
  rotation: number;
  setRotation: (rotation: number) => void;
  selectedClothing?: ClothingItem[]; // Added this prop to match what's being passed
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  measurements,
  highlightedPart,
  rotation,
  setRotation,
  selectedClothing = [] // Provide default empty array
}) => {
  return (
    <div className="px-6 mb-2">
      <div className="relative aspect-[3/5] w-full max-w-xs mx-auto perspective-[1200px] preserve-3d">
        <SimplifiedHumanAvatar3D 
          measurements={measurements} 
          highlightedPart={highlightedPart}
          rotation={rotation}
          selectedClothing={selectedClothing} // Pass the prop to SimplifiedHumanAvatar3D
        />
        
        {/* Improved rotation controls */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <Button 
            variant="secondary" 
            size="icon"
            className="rounded-full h-9 w-9 bg-white/80 hover:bg-white shadow-md"
            onClick={() => setRotation((rotation - 45) % 360)}
            aria-label="Rotate left"
          >
            <RotateCcw size={18} />
          </Button>
          <Button 
            variant="secondary" 
            size="icon"
            className="rounded-full h-9 w-9 bg-white/80 hover:bg-white shadow-md"
            onClick={() => setRotation((rotation + 45) % 360)}
            aria-label="Rotate right"
          >
            <RotateCw size={18} />
          </Button>
        </div>
        
        {/* Frame indicator */}
        <div className="absolute top-2 left-2">
          <div className="bg-white/80 rounded-md p-1.5 shadow-sm">
            <Ratio size={16} className="text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarPreview;
