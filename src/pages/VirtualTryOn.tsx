import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, RotateCcw, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BodyTypeSelector } from "@/components/VirtualTryOn/BodyTypeSelector";
import SimplifiedHumanAvatar3D from "@/components/VirtualTryOn/SimplifiedHumanAvatar3D";
import ClothingSelector from "@/components/VirtualTryOn/ClothingSelector";
import { useClothingItems } from "@/hooks/useClothingItems";
import { useToast } from "@/hooks/use-toast";
import { ClothingItem, MeasurementKey } from "@/components/VirtualTryOn/types";

interface Measurement {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
}

type MeasurementKeyType = 
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

type MeasurementsState = {
  [key in MeasurementKeyType]: Measurement;
};

const initialMeasurements: MeasurementsState = {
  neck: { value: 38, min: 30, max: 50, unit: "cm", label: "Neck Circumference", category: "upper" },
  shoulder: { value: 45, min: 35, max: 60, unit: "cm", label: "Shoulder Width", category: "upper" },
  chest: { value: 95, min: 75, max: 130, unit: "cm", label: "Chest/Bust", category: "upper" },
  waist: { value: 85, min: 60, max: 120, unit: "cm", label: "Waist", category: "upper" },
  stomach: { value: 88, min: 65, max: 130, unit: "cm", label: "Stomach", category: "upper" },
  hips: { value: 95, min: 75, max: 130, unit: "cm", label: "Hips", category: "lower" },
  thigh: { value: 55, min: 40, max: 80, unit: "cm", label: "Thigh Circumference", category: "lower" },
  inseam: { value: 80, min: 65, max: 95, unit: "cm", label: "Inseam/Leg Length", category: "lower" },
  height: { value: 175, min: 140, max: 210, unit: "cm", label: "Height", category: "general" },
  weight: { value: 70, min: 40, max: 140, unit: "kg", label: "Weight", category: "general" },
};

const bodyTypePresets = {
  slim: {
    neck: 35, shoulder: 43, chest: 88, waist: 75, stomach: 78, 
    hips: 88, thigh: 48, inseam: 82, height: 178, weight: 65
  },
  athletic: {
    neck: 40, shoulder: 48, chest: 100, waist: 82, stomach: 85, 
    hips: 95, thigh: 58, inseam: 80, height: 180, weight: 78
  },
  curvy: {
    neck: 38, shoulder: 46, chest: 98, waist: 88, stomach: 92, 
    hips: 105, thigh: 62, inseam: 78, height: 168, weight: 75
  }
};

const VirtualTryOn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState<MeasurementsState>(initialMeasurements);
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
      <header className="pt-6 pb-4 px-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-fashion-navy dark:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-fashion-navy dark:text-white">Virtual Try-On</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Customize your avatar and try on different clothes
        </p>
      </header>

      {/* View Mode Tabs */}
      <div className="px-6 mb-4">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setViewMode("measurements")}
            className={`flex-1 py-3 text-center text-sm font-medium border-b-2 ${
              viewMode === "measurements" 
                ? "border-primary text-primary dark:border-primary dark:text-primary" 
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
          >
            Measurements
          </button>
          <button
            onClick={() => setViewMode("clothing")}
            className={`flex-1 py-3 text-center text-sm font-medium border-b-2 ${
              viewMode === "clothing" 
                ? "border-primary text-primary dark:border-primary dark:text-primary" 
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
          >
            Clothing
          </button>
        </div>
      </div>

      {viewMode === "measurements" && (
        <>
          {/* Body Type Selector */}
          <div className="px-6 mb-4">
            <BodyTypeSelector onSelectBodyType={applyBodyType} />
          </div>
        </>
      )}

      {/* 3D Avatar Preview */}
      <div className="px-6 mb-2">
        <div className="relative aspect-[3/5] w-full max-w-xs mx-auto perspective-[1200px] preserve-3d">
          <SimplifiedHumanAvatar3D 
            measurements={measurements} 
            highlightedPart={highlightedPart}
            rotation={rotation}
          />
          
          {/* Rotation controls */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="rounded-full p-2 h-8 w-8"
              onClick={() => setRotation((prev) => (prev - 45) % 360)}
            >
              <RotateCcw size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Measurement Tabs and Sliders OR Clothing Selection */}
      <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
        {viewMode === "measurements" ? (
          <Tabs 
            defaultValue="upper" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full flex-1 flex flex-col"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="upper">Upper Body</TabsTrigger>
              <TabsTrigger value="lower">Lower Body</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="upper" className="mt-0 space-y-4">
                {Object.entries(measurements)
                  .filter(([_, m]) => m.category === "upper")
                  .map(([key, measurement]) => (
                    <SliderControl
                      key={key}
                      measurementKey={key as MeasurementKey}
                      measurement={measurement}
                      onChange={handleSliderChange}
                      onFocus={() => setHighlightedPart(key as MeasurementKey)}
                      onBlur={() => setHighlightedPart(null)}
                    />
                  ))}
              </TabsContent>
              
              <TabsContent value="lower" className="mt-0 space-y-4">
                {Object.entries(measurements)
                  .filter(([_, m]) => m.category === "lower")
                  .map(([key, measurement]) => (
                    <SliderControl
                      key={key}
                      measurementKey={key as MeasurementKey}
                      measurement={measurement}
                      onChange={handleSliderChange}
                      onFocus={() => setHighlightedPart(key as MeasurementKey)}
                      onBlur={() => setHighlightedPart(null)}
                    />
                  ))}
              </TabsContent>
              
              <TabsContent value="general" className="mt-0 space-y-4">
                {Object.entries(measurements)
                  .filter(([_, m]) => m.category === "general")
                  .map(([key, measurement]) => (
                    <SliderControl
                      key={key}
                      measurementKey={key as MeasurementKey}
                      measurement={measurement}
                      onChange={handleSliderChange}
                      onFocus={() => setHighlightedPart(key as MeasurementKey)}
                      onBlur={() => setHighlightedPart(null)}
                    />
                  ))}
              </TabsContent>
            </div>
          </Tabs>
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
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="outline"
            onClick={resetMeasurements}
            className="flex-1"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button 
            onClick={saveOutfit}
            className="flex-1"
          >
            <Save className="mr-2 h-4 w-4" /> Save Outfit
          </Button>
        </div>
      </div>
    </div>
  );
};

const SliderControl = ({ 
  measurementKey, 
  measurement, 
  onChange,
  onFocus,
  onBlur
}: { 
  measurementKey: MeasurementKey; 
  measurement: Measurement;
  onChange: (key: MeasurementKey, value: number[]) => void;
  onFocus: () => void;
  onBlur: () => void;
}) => {
  return (
    <div 
      className="w-full" 
      onMouseEnter={onFocus} 
      onMouseLeave={onBlur}
      onTouchStart={onFocus}
      onTouchEnd={onBlur}
    >
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor={measurementKey} className="text-sm font-medium">
          {measurement.label}
        </Label>
        <span className="text-sm text-fashion-navy font-medium">
          {measurement.value} {measurement.unit}
        </span>
      </div>
      <Slider
        id={measurementKey}
        min={measurement.min}
        max={measurement.max}
        step={1}
        value={[measurement.value]}
        onValueChange={(value) => onChange(measurementKey, value)}
        className="w-full"
      />
    </div>
  );
};

export default VirtualTryOn;
