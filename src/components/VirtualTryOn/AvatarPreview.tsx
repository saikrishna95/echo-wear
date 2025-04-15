
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, Ratio, Frame, Camera, Download } from "lucide-react";
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
    <div className="px-4 mb-2">
      <div className="relative aspect-[3/5] w-full max-w-xs mx-auto perspective-[1200px] preserve-3d bg-gradient-to-b from-fashion-light to-fashion-peach rounded-xl shadow-sm">
        {/* Model label */}
        <div className="absolute top-3 left-0 w-full z-10 flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm text-xs font-medium text-gray-700">
            Virtual Try-On
          </div>
        </div>
        
        <SimplifiedHumanAvatar3D 
          measurements={measurements} 
          highlightedPart={highlightedPart}
          rotation={rotation}
          selectedClothing={selectedClothing}
        />
        
        {/* Frame indicator */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-md p-1.5 shadow-sm">
            <Ratio size={16} className="text-gray-600" />
          </div>
        </div>
        
        {/* Bottom controls */}
        <div className="absolute bottom-3 left-0 w-full flex justify-center gap-3">
          <Button 
            variant="secondary" 
            size="icon"
            className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-md"
            aria-label="Take photo"
          >
            <Camera size={18} className="text-gray-700" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon"
            className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-md"
            onClick={() => setRotation((rotation - 45) % 360)}
            aria-label="Rotate left"
          >
            <RotateCcw size={18} className="text-gray-700" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon"
            className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-md"
            onClick={() => setRotation((rotation + 45) % 360)}
            aria-label="Rotate right"
          >
            <RotateCw size={18} className="text-gray-700" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon"
            className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-md"
            aria-label="Save image"
          >
            <Download size={18} className="text-gray-700" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPreview;
