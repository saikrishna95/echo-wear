
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
        {/* Human figure SVG */}
        <svg
          viewBox="0 0 200 400"
          className="absolute inset-0 h-full w-full transform-gpu translate-z-4"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="humanSkin" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5d0b0" />
              <stop offset="50%" stopColor="#f7d7bc" />
              <stop offset="100%" stopColor="#f5d0b0" />
            </linearGradient>
            <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dbf3ff" />
              <stop offset="50%" stopColor="#33C3F0" />
              <stop offset="100%" stopColor="#dbf3ff" />
            </linearGradient>
            <filter id="softenEdges" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
            <linearGradient id="muscleDefinition" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5d0b0" stopOpacity="1" />
              <stop offset="50%" stopColor="#e5b896" stopOpacity="1" />
              <stop offset="100%" stopColor="#f5d0b0" stopOpacity="1" />
            </linearGradient>
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
          
          {/* Head - oval shape with no facial features */}
          <ellipse
            cx="100"
            cy="40"
            rx="15"
            ry="20"
            fill={highlightedPart === "neck" ? "url(#highlightGradient)" : "url(#humanSkin)"}
            stroke="#e5b896"
            strokeWidth="0.5"
            className={`transition-colors duration-300 ${
              highlightedPart === "neck" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Neck */}
          <path
            d={`M95,60 
                C95,55 95,55 100,55 
                C105,55 105,55 105,60
                L105,70 
                L95,70 Z`}
            fill={highlightedPart === "neck" ? "url(#highlightGradient)" : "url(#humanSkin)"}
            stroke="#e5b896"
            strokeWidth="0.5"
            className={`transition-colors duration-300 ${
              highlightedPart === "neck" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Shoulders */}
          <path
            d={`M${95 - (measurements.shoulder.value - measurements.shoulder.min) / 
                       (measurements.shoulder.max - measurements.shoulder.min) * 25},70 
                C${85 - weightFactor * 10},72 ${75 - weightFactor * 10},75 ${70 - weightFactor * 10},80 
                L${130 + weightFactor * 10},80 
                C${125 + weightFactor * 10},75 ${115 + weightFactor * 10},72 ${105 + (measurements.shoulder.value - measurements.shoulder.min) / 
                       (measurements.shoulder.max - measurements.shoulder.min) * 25},70 Z`}
            fill={highlightedPart === "shoulder" ? "url(#highlightGradient)" : "url(#humanSkin)"}
            stroke="#e5b896"
            strokeWidth="0.5"
            filter="url(#softenEdges)"
            className={`transition-colors duration-300 ${
              highlightedPart === "shoulder" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Chest/Upper Torso with more realistic muscle definition */}
          <path
            d={`M${70 - weightFactor * 10},80 
                C${65 - weightFactor * 15},90 ${65 - weightFactor * 20},105 ${70 - weightFactor * 15},120 
                L${130 + weightFactor * 15},120 
                C${135 + weightFactor * 20},105 ${135 + weightFactor * 15},90 ${130 + weightFactor * 10},80 Z`}
            fill={highlightedPart === "chest" ? "url(#highlightGradient)" : "url(#humanSkin)"}
            stroke="#e5b896"
            strokeWidth="0.5"
            className={`transition-all duration-300 ${
              highlightedPart === "chest" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Chest muscle definition - subtle shading */}
          <path
            d={`M100,90 
                C95,95 90,97 85,100 
                C90,105 95,110 100,112 
                C105,110 110,105 115,100 
                C110,97 105,95 100,90`}
            fill="url(#muscleDefinition)"
            opacity="0.2"
            className={highlightedPart === "chest" ? "opacity-0" : ""}
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
            fill={highlightedPart === "waist" ? "url(#highlightGradient)" : "url(#humanSkin)"}
            stroke="#e5b896"
            strokeWidth="0.5"
            className={`transition-all duration-300 ${
              highlightedPart === "waist" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Abdomen muscle definition - subtle */}
          <path
            d={`M100,130 
                C95,135 95,140 100,145 
                C105,140 105,135 100,130`}
            fill="url(#muscleDefinition)"
            opacity="0.15"
            className={highlightedPart === "waist" ? "opacity-0" : ""}
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
            fill={highlightedPart === "stomach" || highlightedPart === "hips" ? "url(#highlightGradient)" : "url(#humanSkin)"}
            stroke="#e5b896"
            strokeWidth="0.5"
            className={`transition-all duration-300 ${
              highlightedPart === "stomach" || highlightedPart === "hips" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Arms */}
          <g className="transition-colors duration-300">
            {/* Left Arm */}
            <path
              d={`M${70 - weightFactor * 10},85
                  C${65 - weightFactor * 12},95 ${60 - weightFactor * 15},110 ${60 - weightFactor * 15},130
                  L${70 - weightFactor * 10},130
                  C${70 - weightFactor * 10},110 ${75 - weightFactor * 8},95 ${80 - weightFactor * 5},85
                Z`}
              fill="url(#humanSkin)"
              stroke="#e5b896"
              strokeWidth="0.5"
            />
            
            {/* Right Arm */}
            <path
              d={`M${130 + weightFactor * 10},85
                  C${135 + weightFactor * 12},95 ${140 + weightFactor * 15},110 ${140 + weightFactor * 15},130
                  L${130 + weightFactor * 10},130
                  C${130 + weightFactor * 10},110 ${125 + weightFactor * 8},95 ${120 + weightFactor * 5},85
                Z`}
              fill="url(#humanSkin)"
              stroke="#e5b896"
              strokeWidth="0.5"
            />
          </g>
          
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
              fill={highlightedPart === "thigh" ? "url(#highlightGradient)" : "url(#humanSkin)"}
              stroke="#e5b896"
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
              fill={highlightedPart === "thigh" ? "url(#highlightGradient)" : "url(#humanSkin)"}
              stroke="#e5b896"
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
              fill={highlightedPart === "inseam" ? "url(#highlightGradient)" : "url(#humanSkin)"}
              stroke="#e5b896"
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
              fill={highlightedPart === "inseam" ? "url(#highlightGradient)" : "url(#humanSkin)"}
              stroke="#e5b896"
              strokeWidth="0.5"
            />
            
            {/* Feet */}
            <path
              d={`M${85},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${85},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  C${88},${355 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                    ${92},${355 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                    ${95},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${95},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  Z`}
              fill="url(#humanSkin)"
              stroke="#e5b896"
              strokeWidth="0.5"
            />
            
            <path
              d={`M${105},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${105},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  C${108},${355 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                    ${112},${355 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                    ${115},${350 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  L${115},${320 + (measurements.inseam.value - measurements.inseam.min) / 
                         (measurements.inseam.max - measurements.inseam.min) * 40}
                  Z`}
              fill="url(#humanSkin)"
              stroke="#e5b896"
              strokeWidth="0.5"
            />
          </g>
          
          {/* Muscle definition - subtle contour lines */}
          <g className="opacity-30">
            {/* Chest contour */}
            {highlightedPart === "chest" || !highlightedPart ? (
              <path
                d={`M95,95 
                    C93,100 90,103 85,105
                    M105,95
                    C107,100 110,103 115,105`}
                fill="none"
                stroke="#e5b896"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            ) : null}
            
            {/* Shoulder contour */}
            {highlightedPart === "shoulder" || !highlightedPart ? (
              <g>
                <path
                  d={`M85,75 
                      C83,78 81,82 80,85`}
                  fill="none"
                  stroke="#e5b896"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <path
                  d={`M115,75 
                      C117,78 119,82 120,85`}
                  fill="none"
                  stroke="#e5b896"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </g>
            ) : null}
            
            {/* Arm muscle definition */}
            <path
              d={`M75,95
                  C72,100 70,105 68,110
                  M125,95
                  C128,100 130,105 132,110`}
              fill="none"
              stroke="#e5b896"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="1,2"
            />
            
            {/* Abdomen definition */}
            {highlightedPart === "waist" || highlightedPart === "stomach" || !highlightedPart ? (
              <path
                d={`M95,135
                    C97,138 100,140 103,138
                    M95,145
                    C97,148 100,150 103,148`}
                fill="none"
                stroke="#e5b896"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="1,2"
              />
            ) : null}
            
            {/* Thigh muscle definition */}
            {highlightedPart === "thigh" || !highlightedPart ? (
              <g>
                <path
                  d={`M88,210
                      C90,215 92,220 90,225`}
                  fill="none"
                  stroke="#e5b896"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="1,3"
                />
                <path
                  d={`M112,210
                      C110,215 108,220 110,225`}
                  fill="none"
                  stroke="#e5b896"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="1,3"
                />
              </g>
            ) : null}
            
            {/* Calf muscle definition */}
            {highlightedPart === "inseam" || !highlightedPart ? (
              <g>
                <path
                  d={`M88,280
                      C90,290 91,300 89,310`}
                  fill="none"
                  stroke="#e5b896"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="1,3"
                />
                <path
                  d={`M112,280
                      C110,290 109,300 111,310`}
                  fill="none"
                  stroke="#e5b896"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray="1,3"
                />
              </g>
            ) : null}
          </g>
          
          {/* Center line - invisible helper */}
          <line 
            x1="100" 
            y1="40" 
            x2="100" 
            y2="350" 
            stroke="#e5b896" 
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
