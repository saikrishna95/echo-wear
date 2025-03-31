
import React, { useEffect, useState } from "react";

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

  // For simplicity, we're using a static mannequin SVG with different parts
  // In a production app, this would be replaced with a proper 3D model
  
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
        {/* Sample mannequin - this would be replaced with an actual 3D model */}
        <svg
          viewBox="0 0 200 400"
          className="absolute inset-0 h-full w-full transform-gpu translate-z-4"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Head and Neck */}
          <circle
            cx="100"
            cy="50"
            r="25"
            fill={highlightedPart === "neck" ? "#33C3F0" : "#E0E0E0"}
            stroke="#555"
            strokeWidth="1"
            className={`transition-colors duration-300 ${
              highlightedPart === "neck" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Shoulders */}
          <rect
            x={100 - (measurements.shoulder.value - measurements.shoulder.min) / (measurements.shoulder.max - measurements.shoulder.min) * 40 - 10}
            y="75"
            width={(measurements.shoulder.value - measurements.shoulder.min) / (measurements.shoulder.max - measurements.shoulder.min) * 80 + 20}
            height="10"
            rx="5"
            fill={highlightedPart === "shoulder" ? "#33C3F0" : "#D0D0D0"}
            stroke="#555"
            strokeWidth="1"
            className={`transition-all duration-300 ${
              highlightedPart === "shoulder" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Chest */}
          <ellipse
            cx="100"
            cy="100"
            rx={(measurements.chest.value - measurements.chest.min) / (measurements.chest.max - measurements.chest.min) * 30 + 20}
            ry="15"
            fill={highlightedPart === "chest" ? "#33C3F0" : "#D8D8D8"}
            stroke="#555"
            strokeWidth="1"
            className={`transition-all duration-300 ${
              highlightedPart === "chest" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Waist */}
          <ellipse
            cx="100"
            cy="130"
            rx={(measurements.waist.value - measurements.waist.min) / (measurements.waist.max - measurements.waist.min) * 25 + 15}
            ry="15"
            fill={highlightedPart === "waist" ? "#33C3F0" : "#D0D0D0"}
            stroke="#555"
            strokeWidth="1"
            className={`transition-all duration-300 ${
              highlightedPart === "waist" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Stomach */}
          <ellipse
            cx="100"
            cy="160"
            rx={(measurements.stomach.value - measurements.stomach.min) / (measurements.stomach.max - measurements.stomach.min) * 25 + 18}
            ry="15"
            fill={highlightedPart === "stomach" ? "#33C3F0" : "#D8D8D8"}
            stroke="#555"
            strokeWidth="1"
            className={`transition-all duration-300 ${
              highlightedPart === "stomach" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Hips */}
          <ellipse
            cx="100"
            cy="190"
            rx={(measurements.hips.value - measurements.hips.min) / (measurements.hips.max - measurements.hips.min) * 25 + 20}
            ry="15"
            fill={highlightedPart === "hips" ? "#33C3F0" : "#D0D0D0"}
            stroke="#555"
            strokeWidth="1"
            className={`transition-all duration-300 ${
              highlightedPart === "hips" ? "opacity-80" : "opacity-100"
            }`}
          />
          
          {/* Thighs */}
          <g className={`transition-colors duration-300 ${
            highlightedPart === "thigh" ? "opacity-80" : "opacity-100"
          }`}>
            {/* Left Thigh */}
            <ellipse
              cx="80"
              cy="220"
              rx={(measurements.thigh.value - measurements.thigh.min) / (measurements.thigh.max - measurements.thigh.min) * 10 + 10}
              ry="20"
              fill={highlightedPart === "thigh" ? "#33C3F0" : "#D8D8D8"}
              stroke="#555"
              strokeWidth="1"
            />
            {/* Right Thigh */}
            <ellipse
              cx="120"
              cy="220"
              rx={(measurements.thigh.value - measurements.thigh.min) / (measurements.thigh.max - measurements.thigh.min) * 10 + 10}
              ry="20"
              fill={highlightedPart === "thigh" ? "#33C3F0" : "#D8D8D8"}
              stroke="#555"
              strokeWidth="1"
            />
          </g>
          
          {/* Legs */}
          <g className={`transition-colors duration-300 ${
            highlightedPart === "inseam" ? "opacity-80" : "opacity-100"
          }`}>
            {/* Left Leg */}
            <rect
              x="70"
              y="240"
              width="20"
              height={(measurements.inseam.value - measurements.inseam.min) / (measurements.inseam.max - measurements.inseam.min) * 60 + 70}
              rx="10"
              fill={highlightedPart === "inseam" ? "#33C3F0" : "#D0D0D0"}
              stroke="#555"
              strokeWidth="1"
            />
            {/* Right Leg */}
            <rect
              x="110"
              y="240"
              width="20"
              height={(measurements.inseam.value - measurements.inseam.min) / (measurements.inseam.max - measurements.inseam.min) * 60 + 70}
              rx="10"
              fill={highlightedPart === "inseam" ? "#33C3F0" : "#D0D0D0"}
              stroke="#555"
              strokeWidth="1"
            />
          </g>
          
          {/* Connecting lines */}
          <line x1="80" y1="85" x2="80" y2="240" stroke="#ccc" strokeWidth="1" />
          <line x1="120" y1="85" x2="120" y2="240" stroke="#ccc" strokeWidth="1" />
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
