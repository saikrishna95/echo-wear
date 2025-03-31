
// User Types
export type User = {
  id: string;
  name: string;
  email: string;
};

// Clothing Types
export type ClothingItem = {
  id: number;
  name: string;
  image: string;
  color: string;
  type: string;
};

export type ClothingCategory = "tops" | "bottoms" | "shoes";

export type Outfit = {
  id: number;
  name: string;
  items: ClothingItem[];
  occasion: string;
  weather: string;
};
