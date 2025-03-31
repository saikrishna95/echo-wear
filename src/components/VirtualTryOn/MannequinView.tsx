
import React from "react";

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
  // Create a mapping of body parts to respective measurement keys
  const bodyPartMapping: Record<string, MeasurementKey> = {
    "head": "neck",
    "shoulders": "shoulder",
    "chest": "chest",
    "waist": "waist",
    "stomach": "stomach",
    "hips": "hips",
    "thighs": "thigh",
    "legs": "inseam"
  };

  // Calculate the mannequin dimensions based on height
  const heightFactor = (measurements.height.value - measurements.height.min) / 
                        (measurements.height.max - measurements.height.min);
  const baseHeight = 320 + heightFactor * 60;
  
  // Scale factor for body parts based on weight
  const weightFactor = (measurements.weight.value - measurements.weight.min) / 
                        (measurements.weight.max - measurements.weight.min);
  
  return (
    <div className="w-full h-full bg-gradient-to-b from-fashion-gray to-white rounded-xl shadow-md overflow-hidden flex items-center justify-center transform-gpu"
      style={{ 
        transform: `rotateY(${rotation}deg)`,
        transition: "transform 0.5s ease-in-out"
      }}
    >
      <div className="relative w-full h-full transform-gpu preserve-3d"
        style={{ transform: "translateZ(0px)" }}  
      >
        {/* Natural-looking mannequin */}
        <svg
          viewBox="0 0 200 400"
          className="absolute inset-0 h-full w-full transform-gpu translate-z-4"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Body base shape - more natural human silhouette */}
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0e0e0" />
              <stop offset="50%" stopColor="#f0f0f0" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>
            <filter id="softenEdges" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1" />
            </filter>
          </defs>
          
          {/* Head and Neck - More realistic shape */}
          <path
            d={`M100,30 
                C88,30 80,38 80,50 
                C80,65 88,75 100,75 
                C112,75 120,65 120,50 
                C120,38 112,30 100,30 Z`}
            fill={highlightedPart === "neck" ? "#33C3F0" : "url(#bodyGradient)"}
            stroke="#ccc"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-colors duration-300 ${
              highlightedPart === "neck" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Shoulders - Natural curve */}
          <path
            d={`M${100 - (measurements.shoulder.value - measurements.shoulder.min) / 
                       (measurements.shoulder.max - measurements.shoulder.min) * 40},75 
                C${80 - weightFactor * 10},78 ${75 - weightFactor * 10},82 ${70 - weightFactor * 10},90 
                L${130 + weightFactor * 10},90 
                C${125 + weightFactor * 10},82 ${120 + weightFactor * 10},78 ${100 + (measurements.shoulder.value - measurements.shoulder.min) / 
                       (measurements.shoulder.max - measurements.shoulder.min) * 40},75 Z`}
            fill={highlightedPart === "shoulder" ? "#33C3F0" : "url(#bodyGradient)"}
            stroke="#ccc"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-colors duration-300 ${
              highlightedPart === "shoulder" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Upper torso - chest */}
          <path
            d={`M${70 - weightFactor * 10},90 
                C${65 - weightFactor * 15},100 ${65 - weightFactor * 20},110 ${70 - weightFactor * 15},120 
                L${130 + weightFactor * 15},120 
                C${135 + weightFactor * 20},110 ${135 + weightFactor * 15},100 ${130 + weightFactor * 10},90 Z`}
            fill={highlightedPart === "chest" ? "#33C3F0" : "url(#bodyGradient)"}
            stroke="#ccc"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-all duration-300 ${
              highlightedPart === "chest" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Mid torso - waist */}
          <path
            d={`M${70 - weightFactor * 15},120 
                C${65 - (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},130 
                  ${65 - (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},140 
                  ${70 - (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},150 
                L${130 + (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},150 
                C${135 + (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},140 
                  ${135 + (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},130 
                  ${130 + weightFactor * 15},120 Z`}
            fill={highlightedPart === "waist" ? "#33C3F0" : "url(#bodyGradient)"}
            stroke="#ccc"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-all duration-300 ${
              highlightedPart === "waist" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Lower torso - stomach and hips */}
          <path
            d={`M${70 - (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 15},150 
                C${68 - (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 18},160 
                  ${65 - (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 20},170 
                  ${65 - (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 25},180 
                L${135 + (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 25},180 
                C${135 + (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 20},170 
                  ${132 + (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 18},160 
                  ${130 + (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 15},150 Z`}
            fill={highlightedPart === "stomach" || highlightedPart === "hips" ? "#33C3F0" : "url(#bodyGradient)"}
            stroke="#ccc"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-all duration-300 ${
              highlightedPart === "stomach" || highlightedPart === "hips" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Legs */}
          <g className={`transition-colors duration-300 ${
            highlightedPart === "thigh" || highlightedPart === "inseam" ? "opacity-80" : "opacity-100"
          }`}>
            {/* Left Leg */}
            <path
              d={`M${75 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 10},180 
                  C${70 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 12},200 
                    ${70 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 8},220 
                    ${75 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 
                  L${85 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 
                  C${90 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 8},220 
                    ${90 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 12},200 
                    ${85 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 10},180 Z`}
              fill={highlightedPart === "thigh" ? "#33C3F0" : "url(#bodyGradient)"}
              stroke="#ccc"
              strokeWidth="0.5"
              filter="url(#softenEdges)"
            />
            {/* Right Leg */}
            <path
              d={`M${115 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 10},180 
                  C${110 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 12},200 
                    ${110 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 8},220 
                    ${115 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 
                  L${125 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 
                  C${130 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 8},220 
                    ${130 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 12},200 
                    ${125 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 10},180 Z`}
              fill={highlightedPart === "thigh" ? "#33C3F0" : "url(#bodyGradient)"}
              stroke="#ccc"
              strokeWidth="0.5"
              filter="url(#softenEdges)"
            />

            {/* Lower legs - calves and ankles */}
            <path
              d={`M${75 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 
                  C${74 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${250 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30} 
                    ${73 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${280 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40} 
                    ${80},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50} 
                  L${90},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50} 
                  C${87 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${280 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40} 
                    ${86 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${250 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30} 
                    ${85 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 Z`}
              fill={highlightedPart === "inseam" ? "#33C3F0" : "url(#bodyGradient)"}
              stroke="#ccc"
              strokeWidth="0.5"
              filter="url(#softenEdges)"
            />
            
            <path
              d={`M${115 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 
                  C${114 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${250 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30} 
                    ${113 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${280 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40} 
                    ${110},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50} 
                  L${120},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50} 
                  C${127 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${280 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40} 
                    ${126 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${250 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30} 
                    ${125 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},240 Z`}
              fill={highlightedPart === "inseam" ? "#33C3F0" : "url(#bodyGradient)"}
              stroke="#ccc"
              strokeWidth="0.5"
              filter="url(#softenEdges)"
            />
            
            {/* Feet */}
            <path 
              d={`M${80},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  L${90},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  L${95},${340 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  L${75},${340 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  Z`}
              fill="url(#bodyGradient)"
              stroke="#ccc"
              strokeWidth="0.5"
              filter="url(#softenEdges)"
            />
            
            <path 
              d={`M${110},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  L${120},${330 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  L${125},${340 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  L${105},${340 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 50}
                  Z`}
              fill="url(#bodyGradient)"
              stroke="#ccc"
              strokeWidth="0.5"
              filter="url(#softenEdges)"
            />
          </g>
          
          {/* Add subtle muscle definition and body details when part is highlighted */}
          {highlightedPart === "chest" && (
            <g>
              <path
                d={`M100,103 
                    C95,106 90,108 85,108 
                    C80,108 75,106 70,103`}
                fill="none"
                stroke="#ddd"
                strokeWidth="0.8"
              />
              <path
                d={`M100,103 
                    C105,106 110,108 115,108 
                    C120,108 125,106 130,103`}
                fill="none"
                stroke="#ddd"
                strokeWidth="0.8"
              />
            </g>
          )}
          
          {highlightedPart === "shoulder" && (
            <g>
              <path
                d={`M85,78 
                    C83,82 81,86 80,90`}
                fill="none"
                stroke="#ddd"
                strokeWidth="0.8"
              />
              <path
                d={`M115,78 
                    C117,82 119,86 120,90`}
                fill="none"
                stroke="#ddd"
                strokeWidth="0.8"
              />
            </g>
          )}
          
          {highlightedPart === "waist" && (
            <path
              d={`M85,135 
                  C90,137 95,138 100,138 
                  C105,138 110,137 115,135`}
              fill="none"
              stroke="#ddd"
              strokeWidth="0.8"
            />
          )}
        </svg>
        
        {/* Highlight Helper Text */}
        {highlightedPart && (
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="bg-fashion-navy/70 text-white px-3 py-1 rounded-full text-xs">
              Editing: {measurements[highlightedPart].label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MannequinView;
