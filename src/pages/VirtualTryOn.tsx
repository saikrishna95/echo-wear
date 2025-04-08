
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BodyTypeSelector } from "@/components/VirtualTryOn/BodyTypeSelector";
import ClothingSelector from "@/components/VirtualTryOn/ClothingSelector";
import { useClothingItems } from "@/hooks/useClothingItems";
import { ClothingItem, MeasurementKey } from "@/components/VirtualTryOn/types";
import { initialMeasurements, bodyTypePresets } from "@/components/VirtualTryOn/initialMeasurements";
import ViewModeToggle from "@/components/VirtualTryOn/ViewModeToggle";
import AvatarPreview from "@/components/VirtualTryOn/AvatarPreview";
import MeasurementPanel from "@/components/VirtualTryOn/MeasurementPanel";
import BottomActions from "@/components/VirtualTryOn/BottomActions";
import VirtualTryOnHeader from "@/components/VirtualTryOn/VirtualTryOnHeader";

const VirtualTryOn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState(initialMeasurements);
  const [activeTab, setActiveTab] = useState("upper");
  const [highlightedPart, setHighlightedPart] = useState<MeasurementKey | null>(null);
  const [rotation, setRotation] = useState(0);
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem[]>([]);
  const [viewMode, setViewMode] = useState<"measurements" | "clothing">("measurements");
  
  const { clothingItems, isLoading } = useClothingItems();

  const handleSliderChange = (key: MeasurementKey, value: number[]) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: value[0] },
    }));
  };

  const resetMeasurements = () => {
    setMeasurements(initialMeasurements);
    setSelectedClothing([]);
    toast({
      title: "Reset Complete",
      description: "Your measurements and clothing selection have been reset.",
    });
  };

  const applyBodyType = (type: keyof typeof bodyTypePresets) => {
    const preset = bodyTypePresets[type];
    const newMeasurements = { ...measurements };
    
    (Object.keys(preset) as MeasurementKey[]).forEach(key => {
      newMeasurements[key] = {
        ...newMeasurements[key],
        value: preset[key]
      };
    });
    
    setMeasurements(newMeasurements);
  };
  
  const handleSelectClothing = (item: ClothingItem) => {
    // Check if this is a top or bottom item
    const isTopItem = ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(item.type.toLowerCase());
    const isBottomItem = ['pants', 'jeans', 'skirt', 'shorts'].includes(item.type.toLowerCase());
    
    setSelectedClothing(prev => {
      // Create a new array without any items of the same type category
      const filteredItems = prev.filter(prevItem => {
        const isPrevTopItem = ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(prevItem.type.toLowerCase());
        const isPrevBottomItem = ['pants', 'jeans', 'skirt', 'shorts'].includes(prevItem.type.toLowerCase());
        
        if (isTopItem && isPrevTopItem) {
          return false; // Remove previous top items
        }
        if (isBottomItem && isPrevBottomItem) {
          return false; // Remove previous bottom items
        }
        return true; // Keep all other items
      });
      
      return [...filteredItems, item];
    });
  };
  
  const handleRemoveClothing = (itemId: string) => {
    setSelectedClothing(prev => prev.filter(item => item.id !== itemId));
  };

  const saveOutfit = () => {
    // In a real app, you would save this to a database
    console.log('Saved outfit:', {
      measurements: Object.entries(measurements).reduce((acc, [key, m]) => {
        acc[key as MeasurementKey] = m.value;
        return acc;
      }, {} as Record<MeasurementKey, number>),
      clothing: selectedClothing.map(item => item.id)
    });
    
    toast({
      title: "Outfit Saved",
      description: "Your measurements and clothing selection have been saved.",
    });
    
    // Navigate back to closet
    setTimeout(() => navigate('/closet'), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <VirtualTryOnHeader />

      {/* View Mode Tabs */}
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === "measurements" && (
        <>
          {/* Body Type Selector */}
          <div className="px-6 mb-4">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Body Type Presets</h2>
            <BodyTypeSelector onSelectBodyType={applyBodyType} />
          </div>
        </>
      )}

      {/* 3D Avatar Preview */}
      <div className="px-6">
        <div className="relative w-full overflow-hidden rounded-xl">
          <AvatarPreview 
            measurements={measurements}
            highlightedPart={highlightedPart}
            rotation={rotation}
            setRotation={setRotation}
          />
        </div>
      </div>

      {/* Measurement Tabs and Sliders OR Clothing Selection */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col mt-4">
        {viewMode === "measurements" ? (
          <MeasurementPanel
            measurements={measurements}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleSliderChange={handleSliderChange}
            setHighlightedPart={setHighlightedPart}
          />
        ) : (
          <ClothingSelector
            availableClothing={clothingItems}
            selectedItems={selectedClothing}
            onSelectItem={handleSelectClothing}
            onRemoveItem={handleRemoveClothing}
          />
        )}
      </div>

      {/* Bottom Buttons */}
      <BottomActions
        resetMeasurements={resetMeasurements}
        saveOutfit={saveOutfit}
      />
    </div>
  );
};

export default VirtualTryOn;
