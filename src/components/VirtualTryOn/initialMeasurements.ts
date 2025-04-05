
import { MeasurementKey } from "./types";

type MeasurementData = {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
};

type MeasurementsState = {
  [key in MeasurementKey]: MeasurementData;
};

export const initialMeasurements: MeasurementsState = {
  neck: { value: 38, min: 30, max: 50, unit: "cm", label: "Neck Circumference", category: "upper" },
  shoulder: { value: 45, min: 35, max: 60, unit: "cm", label: "Shoulder Width", category: "upper" },
  chest: { value: 95, min: 75, max: 130, unit: "cm", label: "Chest/Bust", category: "upper" },
  waist: { value: 85, min: 60, max: 120, unit: "cm", label: "Waist", category: "upper" },
  stomach: { value: 88, min: 65, max: 130, unit: "cm", label: "Stomach", category: "upper" },
  hips: { value: 95, min: 75, max: 130, unit: "cm", label: "Hips", category: "lower" },
  thigh: { value: 55, min: 40, max: 80, unit: "cm", label: "Thigh Circumference", category: "lower" },
  inseam: { value: 80, min: 65, max: 95, unit: "cm", label: "Inseam/Leg Length", category: "lower" },
  height: { value: 175, min: 140, max: 210, unit: "cm", label: "Height", category: "general" },
  weight: { value: 70, min: 40, max: 140, unit: "kg", label: "Weight", category: "general" },
};

export const bodyTypePresets = {
  slim: {
    neck: 35, shoulder: 43, chest: 88, waist: 75, stomach: 78, 
    hips: 88, thigh: 48, inseam: 82, height: 178, weight: 65
  },
  athletic: {
    neck: 40, shoulder: 48, chest: 100, waist: 82, stomach: 85, 
    hips: 95, thigh: 58, inseam: 80, height: 180, weight: 78
  },
  curvy: {
    neck: 38, shoulder: 46, chest: 98, waist: 88, stomach: 92, 
    hips: 105, thigh: 62, inseam: 78, height: 168, weight: 75
  }
};
