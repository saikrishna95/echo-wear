import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon, ShirtIcon, Scissors, Footprints } from "lucide-react";
import { ClothingCard } from "./components/ClothingCard";
import { AddClothingCard } from "./components/AddClothingCard";
import { OutfitCard } from "./components/OutfitCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClothingItem, Outfit } from "@/types";
import { showToast } from "@/utils/toast";

const MOCK_CLOTHING: Record<string, ClothingItem[]> = {
  tops: [
    { id: 1, name: "White T-Shirt", color: "White", type: "T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format" },
    { id: 2, name: "Blue Oxford Shirt", color: "Blue", type: "Dress Shirt", image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=500&auto=format" },
    { id: 3, name: "Black Sweater", color: "Black", type: "Sweater", image: "https://images.unsplash.com/photo-1543076499-a6133cb495ba?w=500&auto=format" },
  ],
  bottoms: [
    { id: 4, name: "Blue Jeans", color: "Blue", type: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format" },
    { id: 5, name: "Black Slacks", color: "Black", type: "Dress Pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format" },
  ],
  shoes: [
    { id: 6, name: "White Sneakers", color: "White", type: "Casual", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format" },
    { id: 7, name: "Brown Dress Shoes", color: "Brown", type: "Formal", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&auto=format" },
  ]
};

const MOCK_OUTFITS: Outfit[] = [
  {
    id: 1,
    name: "Casual Friday",
    items: [MOCK_CLOTHING.tops[0], MOCK_CLOTHING.bottoms[0], MOCK_CLOTHING.shoes[0]],
    occasion: "Casual",
    weather: "Sunny",
  },
  {
    id: 2,
    name: "Business Meeting",
    items: [MOCK_CLOTHING.tops[1], MOCK_CLOTHING.bottoms[1], MOCK_CLOTHING.shoes[1]],
    occasion: "Formal",
    weather: "Any",
  },
];

const Closet = () => {
  const [clothing, setClothing] = useState(MOCK_CLOTHING);
  const [outfits, setOutfits] = useState(MOCK_OUTFITS);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [tryOnDialogOpen, setTryOnDialogOpen] = useState(false);

  const handleAddItem = () => {
    showToast("Coming Soon", "The Add Item feature is coming soon!");
  };

  const handleTryOn = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setTryOnDialogOpen(true);
    showToast("Virtual Try-On", "Virtual try-on feature is coming soon with AI visualizations");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Closet</h1>
        
        <Tabs defaultValue="items" className="mb-6">
          <TabsList>
            <TabsTrigger value="items">Clothing Items</TabsTrigger>
            <TabsTrigger value="outfits">Outfits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="pt-4">
            <div className="grid grid-cols-1 gap-6">
              {/* Tops Section */}
              <div>
                <div className="flex items-center mb-4">
                  <ShirtIcon className="mr-2 h-5 w-5 text-fashion-teal" />
                  <h2 className="text-xl font-semibold">Tops</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {clothing.tops.map(item => (
                    <ClothingCard key={item.id} item={item} />
                  ))}
                  <AddClothingCard onClick={handleAddItem} />
                </div>
              </div>
              
              {/* Bottoms Section */}
              <div>
                <div className="flex items-center mb-4">
                  <Scissors className="mr-2 h-5 w-5 text-fashion-teal" />
                  <h2 className="text-xl font-semibold">Bottoms</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {clothing.bottoms.map(item => (
                    <ClothingCard key={item.id} item={item} />
                  ))}
                  <AddClothingCard onClick={handleAddItem} />
                </div>
              </div>
              
              {/* Shoes Section */}
              <div>
                <div className="flex items-center mb-4">
                  <Footprints className="mr-2 h-5 w-5 text-fashion-teal" />
                  <h2 className="text-xl font-semibold">Shoes</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {clothing.shoes.map(item => (
                    <ClothingCard key={item.id} item={item} />
                  ))}
                  <AddClothingCard onClick={handleAddItem} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="outfits" className="pt-4">
            <div className="flex justify-end mb-4">
              <Button className="bg-fashion-teal hover:bg-fashion-teal/90">
                <PlusIcon className="mr-2 h-4 w-4" />
                Create New Outfit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {outfits.map(outfit => (
                <OutfitCard 
                  key={outfit.id} 
                  outfit={outfit} 
                  onTryOn={handleTryOn}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={tryOnDialogOpen} onOpenChange={setTryOnDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Virtual Try-On: {selectedOutfit?.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center p-4">
              <div className="bg-gray-100 w-full h-64 rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-400">AI-generated visualization coming soon</p>
              </div>
              <div className="flex gap-4">
                {selectedOutfit?.items.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded" 
                    />
                    <p className="text-xs mt-1">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Closet;
