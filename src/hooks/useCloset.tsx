
import { useState, useEffect } from 'react';

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  type: string;
  pattern?: string;
  // Optional category-specific properties
  sleevelength?: string;
  neckline?: string;
  fit?: string;
  style?: string;
  images: {
    front: string;
    back: string;
    side: string;
  };
}

interface ClosetState {
  tops: ClothingItem[];
  bottoms: ClothingItem[];
  shoes: ClothingItem[];
  accessories: ClothingItem[];
}

// Sample images for each category
const sampleItems: ClothingItem[] = [
  // Tops
  {
    id: 'sample-top-1',
    name: 'White Button-Up Shirt',
    category: 'tops',
    color: 'White',
    type: 'Formal',
    pattern: 'Solid',
    sleevelength: 'full',
    neckline: 'collar',
    images: {
      front: 'https://placehold.co/300x400/ffffff/000000?text=White+Shirt',
      back: 'https://placehold.co/300x400/ffffff/000000?text=White+Shirt+Back',
      side: 'https://placehold.co/300x400/ffffff/000000?text=White+Shirt+Side',
    }
  },
  {
    id: 'sample-top-2',
    name: 'Blue T-Shirt',
    category: 'tops',
    color: 'Blue',
    type: 'Casual',
    pattern: 'Solid',
    sleevelength: 'short',
    neckline: 'round',
    images: {
      front: 'https://placehold.co/300x400/3498db/ffffff?text=Blue+T-Shirt',
      back: 'https://placehold.co/300x400/3498db/ffffff?text=Blue+T-Shirt+Back',
      side: 'https://placehold.co/300x400/3498db/ffffff?text=Blue+T-Shirt+Side',
    }
  },
  {
    id: 'sample-top-3',
    name: 'Striped Blouse',
    category: 'tops',
    color: 'Multi',
    type: 'Business',
    pattern: 'Striped',
    sleevelength: 'full',
    neckline: 'v-neck',
    images: {
      front: 'https://placehold.co/300x400/f39c12/ffffff?text=Striped+Blouse',
      back: 'https://placehold.co/300x400/f39c12/ffffff?text=Striped+Blouse+Back',
      side: 'https://placehold.co/300x400/f39c12/ffffff?text=Striped+Blouse+Side',
    }
  },
  
  // Bottoms
  {
    id: 'sample-bottom-1',
    name: 'Black Jeans',
    category: 'bottoms',
    color: 'Black',
    type: 'Casual',
    pattern: 'Solid',
    fit: 'slim',
    images: {
      front: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Jeans',
      back: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Jeans+Back',
      side: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Jeans+Side',
    }
  },
  {
    id: 'sample-bottom-2',
    name: 'Blue Chinos',
    category: 'bottoms',
    color: 'Blue',
    type: 'Business',
    pattern: 'Solid',
    fit: 'regular',
    images: {
      front: 'https://placehold.co/300x400/34495e/ffffff?text=Blue+Chinos',
      back: 'https://placehold.co/300x400/34495e/ffffff?text=Blue+Chinos+Back',
      side: 'https://placehold.co/300x400/34495e/ffffff?text=Blue+Chinos+Side',
    }
  },
  {
    id: 'sample-bottom-3',
    name: 'Plaid Skirt',
    category: 'bottoms',
    color: 'Multi',
    type: 'Formal',
    pattern: 'Plaid',
    fit: 'flared',
    images: {
      front: 'https://placehold.co/300x400/8e44ad/ffffff?text=Plaid+Skirt',
      back: 'https://placehold.co/300x400/8e44ad/ffffff?text=Plaid+Skirt+Back',
      side: 'https://placehold.co/300x400/8e44ad/ffffff?text=Plaid+Skirt+Side',
    }
  },
  
  // Shoes
  {
    id: 'sample-shoe-1',
    name: 'White Sneakers',
    category: 'shoes',
    color: 'White',
    type: 'Casual',
    pattern: 'Solid',
    style: 'athletic',
    images: {
      front: 'https://placehold.co/300x400/ffffff/000000?text=White+Sneakers',
      back: 'https://placehold.co/300x400/ffffff/000000?text=White+Sneakers+Back',
      side: 'https://placehold.co/300x400/ffffff/000000?text=White+Sneakers+Side',
    }
  },
  {
    id: 'sample-shoe-2',
    name: 'Black Dress Shoes',
    category: 'shoes',
    color: 'Black',
    type: 'Formal',
    pattern: 'Solid',
    style: 'oxford',
    images: {
      front: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Dress+Shoes',
      back: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Dress+Shoes+Back',
      side: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Dress+Shoes+Side',
    }
  },
  {
    id: 'sample-shoe-3',
    name: 'Brown Boots',
    category: 'shoes',
    color: 'Brown',
    type: 'Casual',
    pattern: 'Solid',
    style: 'boots',
    images: {
      front: 'https://placehold.co/300x400/d35400/ffffff?text=Brown+Boots',
      back: 'https://placehold.co/300x400/d35400/ffffff?text=Brown+Boots+Back',
      side: 'https://placehold.co/300x400/d35400/ffffff?text=Brown+Boots+Side',
    }
  },
  
  // Accessories
  {
    id: 'sample-accessory-1',
    name: 'Black Belt',
    category: 'accessories',
    color: 'Black',
    type: 'Formal',
    pattern: 'Solid',
    style: 'leather',
    images: {
      front: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Belt',
      back: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Belt+Back',
      side: 'https://placehold.co/300x400/2c3e50/ffffff?text=Black+Belt+Side',
    }
  },
  {
    id: 'sample-accessory-2',
    name: 'Gold Necklace',
    category: 'accessories',
    color: 'Gold',
    type: 'Party',
    pattern: 'Chain',
    style: 'jewelry',
    images: {
      front: 'https://placehold.co/300x400/f1c40f/ffffff?text=Gold+Necklace',
      back: 'https://placehold.co/300x400/f1c40f/ffffff?text=Gold+Necklace+Back',
      side: 'https://placehold.co/300x400/f1c40f/ffffff?text=Gold+Necklace+Side',
    }
  },
  {
    id: 'sample-accessory-3',
    name: 'Blue Scarf',
    category: 'accessories',
    color: 'Blue',
    type: 'Casual',
    pattern: 'Solid',
    style: 'winter',
    images: {
      front: 'https://placehold.co/300x400/3498db/ffffff?text=Blue+Scarf',
      back: 'https://placehold.co/300x400/3498db/ffffff?text=Blue+Scarf+Back',
      side: 'https://placehold.co/300x400/3498db/ffffff?text=Blue+Scarf+Side',
    }
  }
];

export function useCloset() {
  const [clothes, setClothes] = useState<ClosetState>({
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
        const parsedClothes = JSON.parse(savedClothes);
        setClothes(parsedClothes);
      } catch (error) {
        console.error('Failed to parse saved clothes:', error);
        initializeWithSampleItems();
      }
    } else {
      // If no saved clothes, initialize with sample items
      initializeWithSampleItems();
    }
  }, []);

  const initializeWithSampleItems = () => {
    const initialState: ClosetState = {
      tops: [],
      bottoms: [],
      shoes: [],
      accessories: []
    };
    
    // Organize sample items by category
    sampleItems.forEach(item => {
      const category = item.category.toLowerCase() as keyof ClosetState;
      if (initialState[category]) {
        initialState[category].push(item);
      }
    });
    
    setClothes(initialState);
  };

  // Save to localStorage whenever clothes changes
  useEffect(() => {
    localStorage.setItem('closet', JSON.stringify(clothes));
  }, [clothes]);

  const addClothingItem = (item: ClothingItem) => {
    const category = item.category.toLowerCase() as keyof ClosetState;
    setClothes(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
  };

  const removeClothingItem = (itemId: string, category: keyof ClosetState) => {
    setClothes(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId)
    }));
  };

  interface FilterOption {
    value: string;
    count: number;
  }

  interface FilterOptionsResult {
    colors: FilterOption[];
    patterns: FilterOption[];
    types: FilterOption[];
    // These will be conditionally added based on category
    sleeveLengths?: FilterOption[];
    necklines?: FilterOption[];
    fits?: FilterOption[];
    styles?: FilterOption[];
  }

  const getFilterOptions = (category: keyof ClosetState): FilterOptionsResult => {
    const items = clothes[category] || [];
    
    // Collection maps to count occurrences
    const colorMap: Record<string, number> = {};
    const patternMap: Record<string, number> = {};
    const typeMap: Record<string, number> = {};
    const sleeveLengthMap: Record<string, number> = {};
    const necklineMap: Record<string, number> = {};
    const fitMap: Record<string, number> = {};
    const styleMap: Record<string, number> = {};
    
    // Count occurrences
    items.forEach(item => {
      // Common attributes
      const color = item.color || 'Unknown';
      const pattern = item.pattern || 'Unknown';
      const type = item.type || 'Unknown';
      
      colorMap[color] = (colorMap[color] || 0) + 1;
      patternMap[pattern] = (patternMap[pattern] || 0) + 1;
      typeMap[type] = (typeMap[type] || 0) + 1;
      
      // Category-specific attributes
      if (category === 'tops') {
        const sleevelength = item.sleevelength || 'Unknown';
        const neckline = item.neckline || 'Unknown';
        sleeveLengthMap[sleevelength] = (sleeveLengthMap[sleevelength] || 0) + 1;
        necklineMap[neckline] = (necklineMap[neckline] || 0) + 1;
      } else if (category === 'bottoms') {
        const fit = item.fit || 'Unknown';
        fitMap[fit] = (fitMap[fit] || 0) + 1;
      } else if (category === 'shoes' || category === 'accessories') {
        const style = item.style || 'Unknown';
        styleMap[style] = (styleMap[style] || 0) + 1;
      }
    });
    
    // Convert maps to arrays
    const result: FilterOptionsResult = {
      colors: Object.entries(colorMap).map(([value, count]) => ({ value, count })),
      patterns: Object.entries(patternMap).map(([value, count]) => ({ value, count })),
      types: Object.entries(typeMap).map(([value, count]) => ({ value, count }))
    };
    
    // Add category-specific options
    if (category === 'tops') {
      result.sleeveLengths = Object.entries(sleeveLengthMap).map(([value, count]) => ({ value, count }));
      result.necklines = Object.entries(necklineMap).map(([value, count]) => ({ value, count }));
    } else if (category === 'bottoms') {
      result.fits = Object.entries(fitMap).map(([value, count]) => ({ value, count }));
    } else if (category === 'shoes' || category === 'accessories') {
      result.styles = Object.entries(styleMap).map(([value, count]) => ({ value, count }));
    }
    
    return result;
  };

  return {
    clothes,
    addClothingItem,
    removeClothingItem,
    getFilterOptions
  };
}
