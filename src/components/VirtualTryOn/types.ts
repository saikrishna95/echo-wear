export interface Measurements {
  height: number;
  shoulder: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  neck: number;
  stomach: number;
  thigh: number;
  inseam: number;
}

export type MeasurementKey = keyof Measurements;

export interface ClothingItem {
  id: string;
  name: string;
  type: string;
  category: 'tops' | 'bottoms' | 'outerwear' | 'accessories';
  color: string;
  pattern: string;
  size: string;
  images: {
    front: string;
    back: string;
    side: string;
  };
  customTexture?: string; // Added for custom image uploads
}
