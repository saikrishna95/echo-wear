
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
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
        
        {/* Rotation controls */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full p-2 h-8 w-8"
            onClick={() => setRotation((rotation - 45) % 360)}
          >
            <RotateCcw size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPreview;
