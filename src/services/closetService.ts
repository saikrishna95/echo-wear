
import { ClothingItem, Outfit } from "@/types";

// Mock data for the closet
const mockClothes = {
  tops: [
    { id: 1, name: "White T-Shirt", image: "https://placehold.co/200x200/ffffff/000000?text=White+Tee", color: "White", type: "Casual" },
    { id: 2, name: "Blue Dress Shirt", image: "https://placehold.co/200x200/3498db/ffffff?text=Blue+Shirt", color: "Blue", type: "Formal" },
    { id: 3, name: "Black Sweater", image: "https://placehold.co/200x200/333333/ffffff?text=Black+Sweater", color: "Black", type: "Casual" },
  ],
  bottoms: [
    { id: 1, name: "Blue Jeans", image: "https://placehold.co/200x200/3e5b76/ffffff?text=Blue+Jeans", color: "Blue", type: "Casual" },
    { id: 2, name: "Black Slacks", image: "https://placehold.co/200x200/222222/ffffff?text=Black+Slacks", color: "Black", type: "Formal" },
  ],
  shoes: [
    { id: 1, name: "White Sneakers", image: "https://placehold.co/200x200/eeeeee/333333?text=Sneakers", color: "White", type: "Casual" },
    { id: 2, name: "Black Dress Shoes", image: "https://placehold.co/200x200/111111/ffffff?text=Dress+Shoes", color: "Black", type: "Formal" },
  ],
};

const mockOutfits = [
  {
    id: 1,
    name: "Casual Day Out",
    items: [mockClothes.tops[0], mockClothes.bottoms[0], mockClothes.shoes[0]],
    occasion: "Casual",
    weather: "Sunny",
  },
  {
    id: 2,
    name: "Business Meeting",
    items: [mockClothes.tops[1], mockClothes.bottoms[1], mockClothes.shoes[1]],
    occasion: "Formal",
    weather: "Any",
  },
];

export const getClothingItems = (category: keyof typeof mockClothes) => {
  return mockClothes[category];
};

export const getAllClothes = () => {
  return mockClothes;
};

export const getOutfits = () => {
  return mockOutfits;
};
