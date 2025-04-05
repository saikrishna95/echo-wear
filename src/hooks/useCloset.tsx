
import { useState, useEffect } from 'react';
import { ClothingItem } from '@/components/closet/AddClothesModal';

export function useCloset() {
  const [clothes, setClothes] = useState<{
    tops: ClothingItem[];
    bottoms: ClothingItem[];
    shoes: ClothingItem[];
    accessories: ClothingItem[];
  }>({
    tops: [],
    bottoms: [],
    shoes: [],
    accessories: []
  });

  // Load clothes from localStorage on initial render
  useEffect(() => {
    const savedClothes = localStorage.getItem('closet');
    if (savedClothes) {
      try {
        setClothes(JSON.parse(savedClothes));
      } catch (error) {
        console.error('Failed to parse saved clothes:', error);
      }
    }
  }, []);

  // Save to localStorage whenever clothes changes
  useEffect(() => {
    localStorage.setItem('closet', JSON.stringify(clothes));
  }, [clothes]);

  const addClothingItem = (item: ClothingItem) => {
    const category = item.category.toLowerCase() as 'tops' | 'bottoms' | 'shoes' | 'accessories';
    setClothes(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
  };

  const removeClothingItem = (itemId: string, category: 'tops' | 'bottoms' | 'shoes' | 'accessories') => {
    setClothes(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId)
    }));
  };

  return {
    clothes,
    addClothingItem,
    removeClothingItem
  };
}
