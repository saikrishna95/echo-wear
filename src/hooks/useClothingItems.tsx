import { useState, useEffect } from 'react';
import { ClothingItem } from '@/components/VirtualTryOn/types';

// Demo clothing items
const demoClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Blue T-Shirt',
    type: 't-shirt',
    category: 'tops',
    color: '#3b82f6',
    pattern: 'solid',
    size: 'M',
    images: {
      front: '/uploads/a5e5209b-37ed-404a-aca4-c4984df06eff.png',
      back: '/uploads/a5e5209b-37ed-404a-aca4-c4984df06eff.png',
      side: '/uploads/a5e5209b-37ed-404a-aca4-c4984df06eff.png'
    }
  },
  {
    id: '2',
    name: 'Black Jeans',
    type: 'jeans',
    category: 'bottoms',
    color: '#1f2937',
    pattern: 'solid',
    size: '32',
    images: {
      front: '/uploads/6d5869e6-335e-43b2-9095-3cba3298e969.png',
      back: '/uploads/6d5869e6-335e-43b2-9095-3cba3298e969.png',
      side: '/uploads/6d5869e6-335e-43b2-9095-3cba3298e969.png'
    }
  },
  {
    id: '3',
    name: 'Red Sweater',
    type: 'sweater',
    category: 'tops',
    color: '#ef4444',
    pattern: 'solid',
    size: 'L',
    images: {
      front: '/uploads/5e62aadd-496b-44e3-84c8-e8f40d379fd5.png',
      back: '/uploads/5e62aadd-496b-44e3-84c8-e8f40d379fd5.png',
      side: '/uploads/5e62aadd-496b-44e3-84c8-e8f40d379fd5.png'
    }
  },
  {
    id: '4',
    name: 'Khaki Shorts',
    type: 'shorts',
    category: 'bottoms',
    color: '#d1bca2',
    pattern: 'solid',
    size: 'M',
    images: {
      front: '/placeholder.svg',
      back: '/placeholder.svg',
      side: '/placeholder.svg'
    }
  },
  {
    id: '5',
    name: 'Purple Jacket',
    type: 'jacket',
    category: 'outerwear',
    color: '#9b87f5',
    pattern: 'solid',
    size: 'M',
    images: {
      front: '/placeholder.svg',
      back: '/placeholder.svg',
      side: '/placeholder.svg'
    }
  },
  {
    id: '6',
    name: 'Gray Skirt',
    type: 'skirt',
    category: 'bottoms',
    color: '#6b7280',
    pattern: 'solid',
    size: 'S',
    images: {
      front: '/placeholder.svg',
      back: '/placeholder.svg',
      side: '/placeholder.svg'
    }
  }
];

export const useClothingItems = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(demoClothingItems);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real app, you would fetch these from an API
  useEffect(() => {
    const fetchClothingItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 500));
        setClothingItems(demoClothingItems);
      } catch (err) {
        setError('Failed to load clothing items');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClothingItems();
  }, []);

  return {
    clothingItems,
    isLoading,
    error
  };
};

export default useClothingItems;
