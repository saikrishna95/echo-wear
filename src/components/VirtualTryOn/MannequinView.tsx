
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
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-md overflow-hidden flex items-center justify-center transform-gpu"
      style={{ 
        transform: `rotateY(${rotation}deg)`,
        transition: "transform 0.5s ease-in-out"
      }}
    >
      <div className="relative w-full h-full transform-gpu preserve-3d"
        style={{ transform: "translateZ(0px)" }}  
      >
        {/* Professional mannequin based on reference image */}
        <svg
          viewBox="0 0 200 400"
          className="absolute inset-0 h-full w-full transform-gpu translate-z-4"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="mannequinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f0f0f0" />
              <stop offset="50%" stopColor="#f8f8f8" />
              <stop offset="100%" stopColor="#f0f0f0" />
            </linearGradient>
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dbf3ff" />
              <stop offset="50%" stopColor="#33C3F0" />
              <stop offset="100%" stopColor="#dbf3ff" />
            </linearGradient>
            <filter id="softenEdges" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
          
          {/* Base Stand */}
          <ellipse 
            cx="100" 
            cy="380" 
            rx="30" 
            ry="10" 
            fill="#e0e0e0" 
            stroke="#d0d0d0" 
            strokeWidth="0.5"
          />
          
          {/* Neck and Head - Professional mannequin typically has no head */}
          <path
            d={`M100,40 
                C94,40 90,45 90,50 
                C90,55 94,60 100,60 
                C106,60 110,55 110,50 
                C110,45 106,40 100,40 Z`}
            fill={highlightedPart === "neck" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
            stroke="#e0e0e0"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-colors duration-300 ${
              highlightedPart === "neck" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Neck Stand */}
          <rect 
            x="97" 
            y="60" 
            width="6" 
            height="10" 
            fill="#e0e0e0" 
            stroke="#d0d0d0" 
            strokeWidth="0.5" 
          />
          
          {/* Shoulders */}
          <path
            d={`M${100 - (measurements.shoulder.value - measurements.shoulder.min) / 
                       (measurements.shoulder.max - measurements.shoulder.min) * 40},70 
                C${85 - weightFactor * 10},72 ${75 - weightFactor * 10},75 ${70 - weightFactor * 10},85 
                L${130 + weightFactor * 10},85 
                C${125 + weightFactor * 10},75 ${115 + weightFactor * 10},72 ${100 + (measurements.shoulder.value - measurements.shoulder.min) / 
                       (measurements.shoulder.max - measurements.shoulder.min) * 40},70 Z`}
            fill={highlightedPart === "shoulder" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
            stroke="#e0e0e0"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-colors duration-300 ${
              highlightedPart === "shoulder" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Chest */}
          <path
            d={`M${70 - weightFactor * 10},85 
                C${65 - weightFactor * 15},95 ${65 - weightFactor * 20},105 ${70 - weightFactor * 15},120 
                L${130 + weightFactor * 15},120 
                C${135 + weightFactor * 20},105 ${135 + weightFactor * 15},95 ${130 + weightFactor * 10},85 Z`}
            fill={highlightedPart === "chest" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
            stroke="#e0e0e0"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-all duration-300 ${
              highlightedPart === "chest" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Waist */}
          <path
            d={`M${70 - weightFactor * 15},120 
                C${65 - (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},130 
                  ${65 - (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},145 
                  ${70 - (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},155 
                L${130 + (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},155 
                C${135 + (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},145 
                  ${135 + (measurements.waist.value - measurements.waist.min) / 
                       (measurements.waist.max - measurements.waist.min) * 15},130 
                  ${130 + weightFactor * 15},120 Z`}
            fill={highlightedPart === "waist" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
            stroke="#e0e0e0"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-all duration-300 ${
              highlightedPart === "waist" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Hips and Stomach */}
          <path
            d={`M${70 - (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 15},155 
                C${68 - (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 18},165 
                  ${65 - (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 20},175 
                  ${65 - (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 25},190 
                L${135 + (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 25},190 
                C${135 + (measurements.hips.value - measurements.hips.min) / 
                       (measurements.hips.max - measurements.hips.min) * 20},175 
                  ${132 + (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 18},165 
                  ${130 + (measurements.stomach.value - measurements.stomach.min) / 
                       (measurements.stomach.max - measurements.stomach.min) * 15},155 Z`}
            fill={highlightedPart === "stomach" || highlightedPart === "hips" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
            stroke="#e0e0e0"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-all duration-300 ${
              highlightedPart === "stomach" || highlightedPart === "hips" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Thighs */}
          <g className={`transition-colors duration-300 ${
            highlightedPart === "thigh" ? "opacity-80" : "opacity-100"
          }`}>
            {/* Left Thigh */}
            <path
              d={`M${85 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 10},190 
                  C${80 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 12},210 
                    ${78 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 8},230 
                    ${85 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},250 
                  L${95 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},250 
                  C${97 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 4},230 
                    ${98 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 6},210 
                    ${95 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},190 Z`}
              fill={highlightedPart === "thigh" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
            
            {/* Right Thigh */}
            <path
              d={`M${105 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},190
                  C${102 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 6},210
                    ${103 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 4},230
                    ${105 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},250
                  L${115 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},250
                  C${122 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 8},230
                    ${120 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 12},210
                    ${115 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 10},190 Z`}
              fill={highlightedPart === "thigh" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
          </g>
          
          {/* Legs */}
          <g className={`transition-colors duration-300 ${
            highlightedPart === "inseam" ? "opacity-80" : "opacity-100"
          }`}>
            {/* Left Leg */}
            <path
              d={`M${85 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},250
                  C${83 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${260 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 20}
                    ${80 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${290 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30}
                    ${85},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${95},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  C${97 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${290 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30}
                    ${96 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${260 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 20}
                    ${95 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},250 Z`}
              fill={highlightedPart === "inseam" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
            
            {/* Right Leg */}
            <path
              d={`M${105 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},250
                  C${104 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${260 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 20}
                    ${103 - (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${290 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30}
                    ${105},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${115},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  C${120 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 2},${290 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 30}
                    ${117 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 3},${260 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 20}
                    ${115 + (measurements.thigh.value - measurements.thigh.min) / 
                         (measurements.thigh.max - measurements.thigh.min) * 5},250 Z`}
              fill={highlightedPart === "inseam" ? "url(#highlightGradient)" : "url(#mannequinGradient)"}
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
            
            {/* Feet/Base connectors */}
            <path
              d={`M${85},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${85},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${95},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${95},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  Z`}
              fill="url(#mannequinGradient)"
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
            
            <path
              d={`M${105},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${105},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${115},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${115},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  Z`}
              fill="url(#mannequinGradient)"
              stroke="#e0e0e0"
              strokeWidth="0.5"
            />
          </g>
          
          {/* Subtle contour lines to make it more realistic */}
          <g className="opacity-30">
            {/* Chest contour */}
            {highlightedPart === "chest" || !highlightedPart ? (
              <path
                d={`M100,100 
                    C95,103 90,105 85,105 
                    C80,105 75,103 70,100`}
                fill="none"
                stroke="#d0d0d0"
                strokeWidth="0.8"
              />
            ) : null}
            
            {/* Shoulder contour */}
            {highlightedPart === "shoulder" || !highlightedPart ? (
              <g>
                <path
                  d={`M85,75 
                      C83,78 81,82 80,85`}
                  fill="none"
                  stroke="#d0d0d0"
                  strokeWidth="0.8"
                />
                <path
                  d={`M115,75 
                      C117,78 119,82 120,85`}
                  fill="none"
                  stroke="#d0d0d0"
                  strokeWidth="0.8"
                />
              </g>
            ) : null}
            
            {/* Waist contour */}
            {highlightedPart === "waist" || !highlightedPart ? (
              <path
                d={`M85,135 
                    C90,137 95,138 100,138 
                    C105,138 110,137 115,135`}
                fill="none"
                stroke="#d0d0d0"
                strokeWidth="0.8"
              />
            ) : null}
            
            {/* Hip contour */}
            {highlightedPart === "hips" || !highlightedPart ? (
              <path
                d={`M80,180 
                    C90,182 100,183 110,182 
                    C120,181 125,180 130,178`}
                fill="none"
                stroke="#d0d0d0"
                strokeWidth="0.8"
              />
            ) : null}
          </g>
          
          {/* Hidden Center line for symmetry - invisible helper */}
          <line 
            x1="100" 
            y1="40" 
            x2="100" 
            y2="350" 
            stroke="#e0e0e0" 
            strokeWidth="0.2"
            strokeDasharray="2,2"
            className="opacity-10"
          />
        </svg>
        
        {/* Measurement indicator */}
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
