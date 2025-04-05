
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { MeasurementKey } from "./types";

interface MeasurementData {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
}

interface SliderControlProps { 
  measurementKey: MeasurementKey; 
  measurement: MeasurementData;
  onChange: (key: MeasurementKey, value: number[]) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const SliderControl: React.FC<SliderControlProps> = ({ 
  measurementKey, 
  measurement, 
  onChange,
  onFocus,
  onBlur
}) => {
  return (
    <div 
      className="w-full" 
      onMouseEnter={onFocus} 
      onMouseLeave={onBlur}
      onTouchStart={onFocus}
      onTouchEnd={onBlur}
    >
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor={measurementKey} className="text-sm font-medium">
          {measurement.label}
        </Label>
        <span className="text-sm text-fashion-navy font-medium">
          {measurement.value} {measurement.unit}
        </span>
      </div>
      <Slider
        id={measurementKey}
        min={measurement.min}
        max={measurement.max}
        step={1}
        value={[measurement.value]}
        onValueChange={(value) => onChange(measurementKey, value)}
        className="w-full"
      />
    </div>
  );
};

export default SliderControl;
