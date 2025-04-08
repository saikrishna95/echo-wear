
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Settings } from "lucide-react";
import { BodyTypeSelector } from "@/components/VirtualTryOn/BodyTypeSelector";
import ClothingSelector from "@/components/VirtualTryOn/ClothingSelector";
import { useClothingItems } from "@/hooks/useClothingItems";
import { ClothingItem, MeasurementKey } from "@/components/VirtualTryOn/types";
import { initialMeasurements, bodyTypePresets } from "@/components/VirtualTryOn/initialMeasurements";
import ViewModeToggle from "@/components/VirtualTryOn/ViewModeToggle";
import AvatarPreview from "@/components/VirtualTryOn/AvatarPreview";
import BottomActions from "@/components/VirtualTryOn/BottomActions";
import VirtualTryOnHeader from "@/components/VirtualTryOn/VirtualTryOnHeader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import BodyPartSettings from "@/components/VirtualTryOn/BodyPartSettings";
import { Button } from "@/components/ui/button";
import ClothingImageUpload from "@/components/VirtualTryOn/ClothingImageUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VirtualTryOn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState(initialMeasurements);
  const [highlightedPart, setHighlightedPart] = useState<MeasurementKey | null>(null);
  const [rotation, setRotation] = useState(0);
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem[]>([]);
  const [viewMode, setViewMode] = useState<"measurements" | "clothing">("measurements");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<"upper" | "lower" | "general">("upper");
  const [activeBodyType, setActiveBodyType] = useState<"slim" | "athletic" | "curvy" | null>(null);
  const [clothingTab, setClothingTab] = useState<"select" | "upload">("select");
  const [customClothingImages, setCustomClothingImages] = useState<{
    top?: string;
    bottom?: string;
  }>({});
  
  const { clothingItems, isLoading } = useClothingItems();

  const handleSliderChange = (key: MeasurementKey, value: number[]) => {
    setMeasurements((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: value[0] },
    }));
    
    // Reset active body type when manual adjustments are made
    setActiveBodyType(null);
  };

  const resetMeasurements = () => {
    setMeasurements(initialMeasurements);
    setSelectedClothing([]);
    setActiveBodyType(null);
    setCustomClothingImages({});
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
    setActiveBodyType(type);
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Body Type Applied`,
      description: "Your measurements have been updated to match the selected body type.",
    });
  };
  
  const handleSelectClothing = (item: ClothingItem) => {
    // Check if this is a top or bottom item
    const isTopItem = ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(item.type.toLowerCase());
    const isBottomItem = ['pants', 'jeans', 'skirt', 'shorts'].includes(item.type.toLowerCase());
    
    // Clear any custom uploaded images for this clothing type
    if (isTopItem && customClothingImages.top) {
      setCustomClothingImages(prev => ({ ...prev, top: undefined }));
    } else if (isBottomItem && customClothingImages.bottom) {
      setCustomClothingImages(prev => ({ ...prev, bottom: undefined }));
    }
    
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
  
  const handleImageUploaded = (imageUrl: string, clothingType: string) => {
    // Determine if this is a top or bottom
    const isTop = ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(clothingType.toLowerCase());
    const isBottom = ['pants', 'jeans', 'skirt', 'shorts'].includes(clothingType.toLowerCase());
    
    // Update custom clothing images
    if (isTop) {
      setCustomClothingImages(prev => ({ ...prev, top: imageUrl }));
      
      // Remove any selected top clothing items
      setSelectedClothing(prev => prev.filter(item => 
        !['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(item.type.toLowerCase())
      ));
      
      // Create a custom clothing item for the uploaded image
      const customTop: ClothingItem = {
        id: 'custom-top-' + Date.now(),
        name: 'Custom ' + clothingType,
        type: clothingType.toLowerCase() as any,
        category: 'tops',
        color: '#FFFFFF', // We'll use the image texture instead of a solid color
        pattern: 'custom',
        size: 'M',
        images: {
          front: imageUrl,
          back: imageUrl,
          side: imageUrl
        },
        customTexture: imageUrl
      };
      
      // Add the custom item to selected clothing
      setSelectedClothing(prev => [...prev, customTop]);
    }
    
    if (isBottom) {
      setCustomClothingImages(prev => ({ ...prev, bottom: imageUrl }));
      
      // Remove any selected bottom clothing items
      setSelectedClothing(prev => prev.filter(item => 
        !['pants', 'jeans', 'skirt', 'shorts'].includes(item.type.toLowerCase())
      ));
      
      // Create a custom clothing item for the uploaded image
      const customBottom: ClothingItem = {
        id: 'custom-bottom-' + Date.now(),
        name: 'Custom ' + clothingType,
        type: clothingType.toLowerCase() as any,
        category: 'bottoms',
        color: '#FFFFFF', // We'll use the image texture instead of a solid color
        pattern: 'custom',
        size: 'M',
        images: {
          front: imageUrl,
          back: imageUrl,
          side: imageUrl
        },
        customTexture: imageUrl
      };
      
      // Add the custom item to selected clothing
      setSelectedClothing(prev => [...prev, customBottom]);
    }
  };

  const saveOutfit = () => {
    // In a real app, you would save this to a database
    console.log('Saved outfit:', {
      bodyType: activeBodyType,
      measurements: Object.entries(measurements).reduce((acc, [key, m]) => {
        acc[key as MeasurementKey] = m.value;
        return acc;
      }, {} as Record<MeasurementKey, number>),
      clothing: selectedClothing.map(item => item.id),
      customClothingImages
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

      <div className="relative">
        {/* 3D Avatar Preview */}
        <AvatarPreview 
          measurements={measurements}
          highlightedPart={highlightedPart}
          rotation={rotation}
          setRotation={setRotation}
          selectedClothing={selectedClothing}
        />
        
        {/* Settings Button */}
        <div className="absolute right-4 top-4 z-10">
          <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="bg-white/80 hover:bg-white" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <BodyPartSettings 
                measurements={measurements}
                activeCategoryTab={activeCategoryTab}
                setActiveCategoryTab={setActiveCategoryTab}
                handleSliderChange={handleSliderChange}
                setHighlightedPart={setHighlightedPart}
                onClose={() => setSettingsOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* View Mode Tabs */}
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />

      {viewMode === "measurements" && (
        <>
          {/* Body Type Selector */}
          <div className="px-6 mb-4">
            <BodyTypeSelector 
              onSelectBodyType={applyBodyType} 
              activeBodyType={activeBodyType}
            />
          </div>
        </>
      )}

      {/* Clothing Selection */}
      {viewMode === "clothing" && (
        <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col">
          <Tabs value={clothingTab} onValueChange={(value) => setClothingTab(value as "select" | "upload")}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="select" className="flex-1">Select Clothing</TabsTrigger>
              <TabsTrigger value="upload" className="flex-1">Upload Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="select">
              <ClothingSelector
                availableClothing={clothingItems}
                selectedItems={selectedClothing}
                onSelectItem={handleSelectClothing}
                onRemoveItem={handleRemoveClothing}
              />
            </TabsContent>
            
            <TabsContent value="upload">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Upload Top</h3>
                  <ClothingImageUpload 
                    onImageUploaded={handleImageUploaded}
                    clothingType="t-shirt"
                  />
                  {customClothingImages.top && (
                    <div className="mt-2 flex items-center justify-center">
                      <div className="relative w-16 h-16 overflow-hidden rounded-md border">
                        <img 
                          src={customClothingImages.top} 
                          alt="Custom top" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Upload Bottom</h3>
                  <ClothingImageUpload 
                    onImageUploaded={handleImageUploaded}
                    clothingType="pants"
                  />
                  {customClothingImages.bottom && (
                    <div className="mt-2 flex items-center justify-center">
                      <div className="relative w-16 h-16 overflow-hidden rounded-md border">
                        <img 
                          src={customClothingImages.bottom} 
                          alt="Custom bottom" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Bottom Buttons */}
      <BottomActions
        resetMeasurements={resetMeasurements}
        saveOutfit={saveOutfit}
      />
    </div>
  );
};

export default VirtualTryOn;
