
import { useState, useEffect, useMemo } from 'react';
import { ClothingItem } from '@/components/closet/AddClothesModal';

// Extending ClothingItem with optional properties for different categories
type ExtendedClothingItem = ClothingItem & {
  pattern?: string;
  sleeveLength?: string;
  neckline?: string;
  fit?: string;
  style?: string;
};

export function useCloset() {
  const [clothes, setClothes] = useState<{
    tops: ExtendedClothingItem[];
    bottoms: ExtendedClothingItem[];
    shoes: ExtendedClothingItem[];
    accessories: ExtendedClothingItem[];
  }>({
    tops: [],
    bottoms: [],
    shoes: [],
    accessories: []
  });

  const [activeFilters, setActiveFilters] = useState<{
    color: string | null;
    pattern: string | null;
    type: string | null;
    sleeveLength?: string | null;
    neckline?: string | null;
    fit?: string | null;
    style?: string | null;
  }>({
    color: null,
    pattern: null,
    type: null,
    sleeveLength: null,
    neckline: null,
    fit: null,
    style: null
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
      [category]: [...prev[category], item as ExtendedClothingItem]
    }));
  };

  const removeClothingItem = (itemId: string, category: 'tops' | 'bottoms' | 'shoes' | 'accessories') => {
    setClothes(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId)
    }));
  };

  const getFilterOptions = (category: 'tops' | 'bottoms' | 'shoes' | 'accessories' | null) => {
    if (!category) return { colors: [], patterns: [], types: [] };
    
    const items = clothes[category];
    
    // Extract unique filter values with counts
    const colors = items.reduce<{value: string, count: number}[]>((acc, item) => {
      const existing = acc.find(c => c.value === item.color);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ value: item.color, count: 1 });
      }
      return acc;
    }, []);
    
    const patterns = items.reduce<{value: string, count: number}[]>((acc, item) => {
      if (!item.pattern) return acc;
      const existing = acc.find(p => p.value === item.pattern);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ value: item.pattern, count: 1 });
      }
      return acc;
    }, []);
    
    const types = items.reduce<{value: string, count: number}[]>((acc, item) => {
      const existing = acc.find(t => t.value === item.type);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ value: item.type, count: 1 });
      }
      return acc;
    }, []);

    // Category-specific filters
    const categorySpecificFilters: Record<string, {value: string, count: number}[]> = {};
    
    if (category === 'tops') {
      const sleeveLengths = items.reduce<{value: string, count: number}[]>((acc, item: ExtendedClothingItem) => {
        if (!item.sleeveLength) return acc;
        const existing = acc.find(s => s.value === item.sleeveLength);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ value: item.sleeveLength, count: 1 });
        }
        return acc;
      }, []);
      
      const necklines = items.reduce<{value: string, count: number}[]>((acc, item: ExtendedClothingItem) => {
        if (!item.neckline) return acc;
        const existing = acc.find(n => n.value === item.neckline);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ value: item.neckline, count: 1 });
        }
        return acc;
      }, []);
      
      categorySpecificFilters.sleeveLengths = sleeveLengths;
      categorySpecificFilters.necklines = necklines;
    } else if (category === 'bottoms') {
      const fits = items.reduce<{value: string, count: number}[]>((acc, item: ExtendedClothingItem) => {
        if (!item.fit) return acc;
        const existing = acc.find(f => f.value === item.fit);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ value: item.fit, count: 1 });
        }
        return acc;
      }, []);
      
      categorySpecificFilters.fits = fits;
    } else if (category === 'shoes') {
      const styles = items.reduce<{value: string, count: number}[]>((acc, item: ExtendedClothingItem) => {
        if (!item.style) return acc;
        const existing = acc.find(s => s.value === item.style);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ value: item.style, count: 1 });
        }
        return acc;
      }, []);
      
      categorySpecificFilters.styles = styles;
    }
    
    return {
      colors,
      patterns, 
      types,
      ...categorySpecificFilters
    };
  };

  const setFilter = (filterType: string, value: string | null) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value === prev[filterType as keyof typeof prev] ? null : value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      color: null,
      pattern: null,
      type: null,
      sleeveLength: null,
      neckline: null,
      fit: null,
      style: null
    });
  };

  const filteredItems = (category: 'tops' | 'bottoms' | 'shoes' | 'accessories' | null) => {
    if (!category) return [];
    
    return clothes[category].filter(item => {
      const colorMatch = !activeFilters.color || item.color === activeFilters.color;
      const patternMatch = !activeFilters.pattern || item.pattern === activeFilters.pattern;
      const typeMatch = !activeFilters.type || item.type === activeFilters.type;
      
      // Category-specific filters
      let categorySpecificMatch = true;
      
      if (category === 'tops') {
        const sleeveMatch = !activeFilters.sleeveLength || (item as ExtendedClothingItem).sleeveLength === activeFilters.sleeveLength;
        const necklineMatch = !activeFilters.neckline || (item as ExtendedClothingItem).neckline === activeFilters.neckline;
        categorySpecificMatch = sleeveMatch && necklineMatch;
      } else if (category === 'bottoms') {
        const fitMatch = !activeFilters.fit || (item as ExtendedClothingItem).fit === activeFilters.fit;
        categorySpecificMatch = fitMatch;
      } else if (category === 'shoes') {
        const styleMatch = !activeFilters.style || (item as ExtendedClothingItem).style === activeFilters.style;
        categorySpecificMatch = styleMatch;
      }
      
      return colorMatch && patternMatch && typeMatch && categorySpecificMatch;
    });
  };

  return {
    clothes,
    addClothingItem,
    removeClothingItem,
    getFilterOptions,
    setFilter,
    clearFilters,
    activeFilters,
    filteredItems
  };
}
