
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, Camera, Download } from "lucide-react";
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
  selectedClothing?: ClothingItem[]; 
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  measurements,
  highlightedPart,
  rotation,
  setRotation,
  selectedClothing = [] 
}) => {
  // Function to handle saving the avatar as an image
  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.download = 'echowear-avatar.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle taking a photo/screenshot
  const handleTakePhoto = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    // Flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'white';
    flash.style.opacity = '0.7';
    flash.style.transition = 'opacity 0.5s';
    flash.style.zIndex = '9999';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(flash);
        handleDownload();
      }, 500);
    }, 100);
  };

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
        
        {/* Bottom controls */}
        <div className="absolute bottom-3 left-0 w-full flex justify-center gap-3">
          <Button 
            variant="secondary" 
            size="icon"
            className="rounded-full h-10 w-10 bg-white/90 hover:bg-white shadow-md"
            aria-label="Take photo"
            onClick={handleTakePhoto}
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
            onClick={handleDownload}
          >
            <Download size={18} className="text-gray-700" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPreview;
