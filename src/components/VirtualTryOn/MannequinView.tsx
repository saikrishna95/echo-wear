
import React, { useState } from "react";
import Mannequin3DView from "./Mannequin3DView";

interface Measurement {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
}

type MeasurementKey = 
  | "neck" 
  | "shoulder"
  | "chest"
  | "waist"
  | "stomach"
  | "hips"
  | "thigh"
  | "inseam"
  | "height"
  | "weight";

type MeasurementsState = {
  [key in MeasurementKey]: Measurement;
};

interface MannequinViewProps {
  measurements: MeasurementsState;
  highlightedPart: MeasurementKey | null;
  rotation: number;
}

const MannequinView = ({ measurements, highlightedPart, rotation }: MannequinViewProps) => {
  const [use3D, setUse3D] = useState(true);
  
  // Helper function to determine fill color based on highlighted part for 2D view
  const getPartFill = (part: MeasurementKey | null) => {
    return highlightedPart === part ? "#33C3F0" : "#e0e0e0";
  };
  
  // Toggle between 2D and 3D views
  const toggleView = () => {
    setUse3D(!use3D);
  };
  
  return (
    <div className="relative w-full h-full bg-gray-50 rounded-xl shadow-sm overflow-hidden">
      {use3D ? (
        <Mannequin3DView
          measurements={measurements}
          highlightedPart={highlightedPart}
          rotation={rotation}
        />
      ) : (
        // Original 2D SVG mannequin
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ 
            transform: `rotateY(${rotation}deg)`,
            transition: "transform 0.5s ease-in-out"
          }}
        >
          <svg
            viewBox="0 0 200 400"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))" }}
          >
            {/* Base/Stand */}
            <ellipse 
              cx="100" 
              cy="380" 
              rx="30" 
              ry="10" 
              fill="#d0d0d0" 
            />
            
            {/* Head - simple circle */}
            <circle
              cx="100"
              cy="40"
              r="18"
              fill={getPartFill(null)}
              className="transition-colors duration-300"
            />
            
            {/* Neck */}
            <rect
              x="95"
              y="58"
              width="10"
              height="12"
              fill={getPartFill("neck")}
              className="transition-colors duration-300"
            />
            
            {/* Shoulders */}
            <rect
              x={85 - (measurements.shoulder.value - measurements.shoulder.min) / 
                  (measurements.shoulder.max - measurements.shoulder.min) * 20}
              y="70"
              width={30 + (measurements.shoulder.value - measurements.shoulder.min) / 
                   (measurements.shoulder.max - measurements.shoulder.min) * 40}
              height="10"
              fill={getPartFill("shoulder")}
              className="transition-colors duration-300"
            />
            
            {/* Upper Torso/Chest */}
            <path
              d={`M${85 - (measurements.weight.value - measurements.weight.min) / 
                     (measurements.weight.max - measurements.weight.min) * 10},80 
                  L${85 - (measurements.weight.value - measurements.weight.min) / 
                       (measurements.weight.max - measurements.weight.min) * 10},110 
                  L${115 + (measurements.weight.value - measurements.weight.min) / 
                         (measurements.weight.max - measurements.weight.min) * 10},110 
                  L${115 + (measurements.weight.value - measurements.weight.min) / 
                         (measurements.weight.max - measurements.weight.min) * 10},80 Z`}
              fill={getPartFill("chest")}
              className="transition-colors duration-300"
            />
            
            {/* Waist */}
            <path
              d={`M${85 - (measurements.weight.value - measurements.weight.min) / 
                       (measurements.weight.max - measurements.weight.min) * 10},110 
                  L${80 - (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},140 
                  L${120 + (measurements.waist.value - measurements.waist.min) / 
                        (measurements.waist.max - measurements.waist.min) * 15},140 
                  L${115 + (measurements.weight.value - measurements.weight.min) / 
                         (measurements.weight.max - measurements.weight.min) * 10},110 Z`}
              fill={getPartFill("waist")}
              className="transition-colors duration-300"
            />
            
            {/* Stomach/Hips */}
            <path
              d={`M${80 - (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 15},140 
                  L${75 - (measurements.hips.value - measurements.hips.min) / 
                        (measurements.hips.max - measurements.hips.min) * 20},170 
                  L${125 + (measurements.hips.value - measurements.hips.min) / 
                         (measurements.hips.max - measurements.hips.min) * 20},170 
                  L${120 + (measurements.stomach.value - measurements.stomach.min) / 
                         (measurements.stomach.max - measurements.stomach.min) * 15},140 Z`}
              fill={highlightedPart === "stomach" || highlightedPart === "hips" ? "#33C3F0" : "#e0e0e0"}
              className="transition-colors duration-300"
            />
            
            {/* Arms */}
            <g>
              {/* Left Arm */}
              <rect
                x={65 - (measurements.weight.value - measurements.weight.min) / 
                       (measurements.weight.max - measurements.weight.min) * 10}
                y="80"
                width="10"
                height="60"
                fill="#e0e0e0"
                className="transition-colors duration-300"
              />
              
              {/* Right Arm */}
              <rect
                x={125 + (measurements.weight.value - measurements.weight.min) / 
                         (measurements.weight.max - measurements.weight.min) * 10}
                y="80"
                width="10"
                height="60"
                fill="#e0e0e0"
                className="transition-colors duration-300"
              />
            </g>
            
            {/* Thighs */}
            <g>
              {/* Left Thigh */}
              <rect
                x={85 - (measurements.thigh.value - measurements.thigh.min) / 
                       (measurements.thigh.max - measurements.thigh.min) * 10}
                y="170"
                width={15 + (measurements.thigh.value - measurements.thigh.min) / 
                          (measurements.thigh.max - measurements.thigh.min) * 10}
                height="80"
                fill={getPartFill("thigh")}
                className="transition-colors duration-300"
              />
              
              {/* Right Thigh */}
              <rect
                x="100"
                y="170"
                width={15 + (measurements.thigh.value - measurements.thigh.min) / 
                          (measurements.thigh.max - measurements.thigh.min) * 10}
                height="80"
                fill={getPartFill("thigh")}
                className="transition-colors duration-300"
              />
            </g>
            
            {/* Lower Legs */}
            <g>
              {/* Left Lower Leg */}
              <rect
                x="85"
                y={250 + (measurements.inseam.value - measurements.inseam.min) / 
                        (measurements.inseam.max - measurements.inseam.min) * 0}
                width="15"
                height={80 + (measurements.inseam.value - measurements.inseam.min) / 
                           (measurements.inseam.max - measurements.inseam.min) * 30}
                fill={getPartFill("inseam")}
                className="transition-colors duration-300"
              />
              
              {/* Right Lower Leg */}
              <rect
                x="100"
                y={250 + (measurements.inseam.value - measurements.inseam.min) / 
                        (measurements.inseam.max - measurements.inseam.min) * 0}
                width="15"
                height={80 + (measurements.inseam.value - measurements.inseam.min) / 
                           (measurements.inseam.max - measurements.inseam.min) * 30}
                fill={getPartFill("inseam")}
                className="transition-colors duration-300"
              />
            </g>
          </svg>
        </div>
      )}
      
      {/* View toggle button */}
      <button 
        onClick={toggleView}
        className="absolute top-2 right-2 bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900 p-1.5 rounded-full text-xs shadow-sm transition-colors"
      >
        Switch to {use3D ? "2D" : "3D"} View
      </button>
    </div>
  );
};

export default MannequinView;
