
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClothingItem } from './types';
import { ShoppingBag, Shirt } from 'lucide-react';

interface ClothingSelectorProps {
  availableClothing: ClothingItem[];
  selectedItems: ClothingItem[];
  onSelectItem: (item: ClothingItem) => void;
  onRemoveItem: (itemId: string) => void;
}

const ClothingSelector: React.FC<ClothingSelectorProps> = ({
  availableClothing,
  selectedItems,
  onSelectItem,
  onRemoveItem
}) => {
  // Filter clothing by category
  const upperBodyItems = availableClothing.filter(item => 
    ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(item.type.toLowerCase())
  );
  
  const lowerBodyItems = availableClothing.filter(item => 
    ['pants', 'jeans', 'skirt', 'shorts'].includes(item.type.toLowerCase())
  );

  const isItemSelected = (itemId: string) => {
    return selectedItems.some(item => item.id === itemId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900 flex items-center">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Select Clothing Items
        </h3>
      </div>
      
      <ScrollArea className="h-[calc(100vh-400px)] min-h-[240px]">
        <div className="p-4 space-y-4">
          {/* Upper body clothing */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
              Tops
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {upperBodyItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => isItemSelected(item.id) ? onRemoveItem(item.id) : onSelectItem(item)}
                  className={`
                    flex flex-col items-center border rounded-md p-2 transition-colors
                    ${isItemSelected(item.id) 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100 mb-2">
                    {item.images.front ? (
                      <img 
                        src={item.images.front} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Shirt className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium line-clamp-1 text-center">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Lower body clothing */}
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
              Bottoms
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {lowerBodyItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => isItemSelected(item.id) ? onRemoveItem(item.id) : onSelectItem(item)}
                  className={`
                    flex flex-col items-center border rounded-md p-2 transition-colors
                    ${isItemSelected(item.id) 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100 mb-2">
                    {item.images.front ? (
                      <img 
                        src={item.images.front} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Shirt className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium line-clamp-1 text-center">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      
      {/* Selected items summary */}
      {selectedItems.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <h4 className="text-xs font-medium text-gray-500 mb-2">
            Selected Items ({selectedItems.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-full px-2 py-1 text-xs flex items-center border border-gray-200"
              >
                <span className="mr-1">{item.name}</span>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingSelector;
