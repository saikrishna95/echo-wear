
// Define measurement types in a separate file for reuse
export type MeasurementKey = 
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

export type Measurements = Record<MeasurementKey, number>;

export interface MeasurementData {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
}

export interface AvatarProps {
  measurements: Measurements;
  highlightedPart: MeasurementKey | null;
  rotation: number;
}
