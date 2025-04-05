
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Shirt, 
  ArrowLeft, 
  Home, 
  Footprints, 
  UserIcon,
  Camera,
  SunIcon,
  CloudRainIcon,
  SnowflakeIcon,
  Calendar,
  Plus,
  Users,
  Scissors,
  Ruler,
  ChevronRight,
  PanelsTopLeft,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AddClothesModal from "@/components/closet/AddClothesModal";
import ClothingItemDetail from "@/components/closet/ClothingItemDetail";
import { useCloset } from "@/hooks/useCloset";
import { ClothingItem } from "@/components/closet/AddClothesModal";
import { Badge } from "@/components/ui/badge";

const mockOutfits = [
  {
    id: 1,
    name: "Casual Day Out",
    items: [
      { 
        id: "mock1", 
        name: "White T-Shirt", 
        image: "https://placehold.co/200x200/ffffff/000000?text=White+Tee",
        color: "White",
        type: "Casual"
      },
      {
        id: "mock2",
        name: "Blue Jeans",
        image: "https://placehold.co/200x200/3e5b76/ffffff?text=Blue+Jeans",
        color: "Blue",
        type: "Casual"
      },
      {
        id: "mock3",
        name: "White Sneakers",
        image: "https://placehold.co/200x200/eeeeee/333333?text=Sneakers",
        color: "White",
        type: "Casual"
      }
    ],
    occasion: "Casual",
    weather: "Sunny",
  },
  {
    id: 2,
    name: "Business Meeting",
    items: [
      {
        id: "mock4",
        name: "Blue Dress Shirt",
        image: "https://placehold.co/200x200/3498db/ffffff?text=Blue+Shirt",
        color: "Blue",
        type: "Formal"
      },
      {
        id: "mock5",
        name: "Black Slacks",
        image: "https://placehold.co/200x200/222222/ffffff?text=Black+Slacks",
        color: "Black",
        type: "Formal"
      },
      {
        id: "mock6",
        name: "Black Dress Shoes",
        image: "https://placehold.co/200x200/111111/ffffff?text=Dress+Shoes",
        color: "Black",
        type: "Formal"
      }
    ],
    occasion: "Formal",
    weather: "Any",
  },
];

const clothingCategories = [
  { id: 'tops', name: 'Tops', icon: <Shirt className="h-12 w-12" /> },
  { id: 'bottoms', name: 'Bottoms', icon: <Scissors className="h-12 w-12" /> },
  { id: 'shoes', name: 'Shoes', icon: <Footprints className="h-12 w-12" /> },
  { id: 'accessories', name: 'Accessories', icon: <Briefcase className="h-12 w-12" /> },
];

const Closet = () => {
  const [mainTab, setMainTab] = useState("closet");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const { toast } = useToast();
  const { clothes, addClothingItem } = useCloset();
  const navigate = useNavigate();

  const handleAddClothes = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setIsAddModalOpen(true);
  };

  const handleSaveClothingItem = (newItem: ClothingItem) => {
    addClothingItem(newItem);
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to your closet`,
    });
  };

  const handleTryOn = (outfit: any) => {
    toast({
      title: "Virtual Try-On",
      description: `Try-on for "${outfit.name}" will be available soon!`,
    });
  };

  const handleItemClick = (item: ClothingItem) => {
    setSelectedItem(item);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const getCategoryItems = () => {
    if (!selectedCategory) return [];
    return clothes[selectedCategory as keyof typeof clothes] || [];
  };

  const getCategorySingularName = (categoryId: string) => {
    return categoryId.charAt(0).toUpperCase() + categoryId.slice(1, -1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-fashion-light">
      <header className="w-full py-4 px-6 bg-white shadow-sm z-10 border-b border-fashion-amber/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {selectedCategory ? (
              <button onClick={handleBackToCategories} className="text-fashion-navy">
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : (
              <Link to="/" className="text-fashion-navy">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            )}
            <h1 className="text-xl font-bold text-fashion-navy">
              {selectedCategory 
                ? `My ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` 
                : "Your Virtual Closet"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/virtual-tryon">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Ruler className="h-4 w-4" />
                <span className="hidden sm:inline">Virtual Try-On</span>
              </Button>
            </Link>
            <Link to="/profile" className="text-fashion-navy">
              <UserIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <Tabs 
          defaultValue="closet" 
          className="w-full"
          onValueChange={setMainTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-6 rounded-xl p-1 bg-white shadow-sm">
            <TabsTrigger value="closet" className="rounded-lg data-[state=active]:bg-fashion-amber/20 data-[state=active]:text-fashion-navy">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Closet
            </TabsTrigger>
            <TabsTrigger value="outfits" className="rounded-lg data-[state=active]:bg-fashion-amber/20 data-[state=active]:text-fashion-navy">
              <Shirt className="h-4 w-4 mr-2" />
              Outfits
            </TabsTrigger>
            <TabsTrigger value="insights" className="rounded-lg data-[state=active]:bg-fashion-amber/20 data-[state=active]:text-fashion-navy">
              <Calendar className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="closet" className="animate-fade-in">
            <Card className="bg-white shadow-sm border-0 rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {selectedCategory 
                      ? `My ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` 
                      : "My Clothes"}
                  </h2>
                  {!selectedCategory && (
                    <Button 
                      onClick={() => handleAddClothes()}
                      className="bg-fashion-amber hover:bg-fashion-amber/90 text-white"
                      size="sm"
                    >
                      <Camera className="mr-2 h-3.5 w-3.5" />
                      Add Clothes
                    </Button>
                  )}
                  {selectedCategory && (
                    <Button 
                      onClick={() => handleAddClothes(selectedCategory)}
                      className="bg-fashion-amber hover:bg-fashion-amber/90 text-white"
                      size="sm"
                    >
                      <Camera className="mr-2 h-3.5 w-3.5" />
                      Add {getCategorySingularName(selectedCategory)}
                    </Button>
                  )}
                </div>
                
                {/* Category Selection View */}
                {!selectedCategory && (
                  <div className="grid grid-cols-2 gap-4">
                    {clothingCategories.map(category => (
                      <Card 
                        key={category.id} 
                        className="border border-fashion-amber/20 hover:border-fashion-amber/50 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => handleSelectCategory(category.id)}
                      >
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="flex flex-col items-center justify-center w-full">
                            <div className="mb-3 text-fashion-amber">
                              {category.icon}
                            </div>
                            <h3 className="text-lg font-medium">{category.name}</h3>
                            <Badge variant="outline" className="mt-2 bg-fashion-amber/10 text-fashion-navy border-fashion-amber/30">
                              {clothes[category.id as keyof typeof clothes]?.length || 0} items
                            </Badge>
                          </div>
                          <ChevronRight className="h-5 w-5 text-fashion-amber/70" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Items View when category is selected */}
                {selectedCategory && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getCategoryItems().map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-fashion-amber/10 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                      >
                        <AspectRatio ratio={1/1} className="bg-fashion-light/50">
                          <img 
                            src={item.images.front} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </AspectRatio>
                        <div className="p-3">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.color} • {item.type}</p>
                        </div>
                      </div>
                    ))}
                    <div 
                      className="border-2 border-dashed border-fashion-amber/30 rounded-xl flex items-center justify-center cursor-pointer hover:border-fashion-amber transition-colors bg-fashion-light/20"
                      onClick={() => handleAddClothes(selectedCategory)}
                      style={{ aspectRatio: "1/1" }}
                    >
                      <div className="text-center p-4">
                        <div className="w-10 h-10 rounded-full bg-fashion-amber/20 flex items-center justify-center mx-auto mb-2">
                          <Plus className="h-5 w-5 text-fashion-amber" />
                        </div>
                        <p className="text-fashion-navy mt-2">Add {getCategorySingularName(selectedCategory)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="outfits" className="animate-fade-in">
            <Card className="bg-white shadow-sm border-0 rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">AI Outfit Suggestions</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-fashion-amber/20 hover:bg-fashion-amber/10">
                      <Calendar className="mr-2 h-3.5 w-3.5" />
                      Events
                    </Button>
                    <Button variant="outline" size="sm" className="border-fashion-amber/20 hover:bg-fashion-amber/10">
                      <SunIcon className="mr-2 h-3.5 w-3.5" />
                      Weather
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockOutfits.map((outfit) => (
                    <Card key={outfit.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="p-4 bg-gradient-to-r from-fashion-amber/80 to-fashion-peach/80 text-white flex justify-between items-center">
                        <h3 className="font-medium">{outfit.name}</h3>
                        <div className="flex items-center gap-2">
                          {outfit.weather === "Sunny" && <SunIcon className="h-4 w-4" />}
                          {outfit.weather === "Rainy" && <CloudRainIcon className="h-4 w-4" />}
                          {outfit.weather === "Cold" && <SnowflakeIcon className="h-4 w-4" />}
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            {outfit.occasion}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <ScrollArea className="w-full whitespace-nowrap pb-4">
                          <div className="flex gap-3">
                            {outfit.items.map((item, idx) => (
                              <div key={idx} className="flex-shrink-0 w-24">
                                <AspectRatio ratio={1/1} className="bg-fashion-light/50 rounded-lg overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover border border-fashion-amber/10" 
                                  />
                                </AspectRatio>
                                <p className="text-xs mt-2 text-center truncate">{item.name}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-sm border-fashion-amber/20 hover:bg-fashion-amber/10"
                            onClick={() => handleTryOn(outfit)}
                          >
                            <Ruler className="mr-2 h-3.5 w-3.5" />
                            Try-On
                          </Button>
                          <Button 
                            size="sm"
                            className="text-sm bg-fashion-amber hover:bg-fashion-amber/90 text-white"
                          >
                            Wear Today
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="animate-fade-in">
            <Card className="bg-white shadow-sm border-0 rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Wardrobe Insights</h2>
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-fashion-amber/10">
                    <h3 className="text-lg font-medium mb-3">Clothing Rotation</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't worn these items in a while:
                    </p>
                    <ScrollArea className="w-full whitespace-nowrap pb-4">
                      <div className="flex gap-4">
                        {clothes.tops.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex-shrink-0 w-32">
                            <AspectRatio ratio={1/1} className="bg-fashion-light/50 rounded-lg overflow-hidden">
                              <img 
                                src={item.images.front} 
                                alt={item.name} 
                                className="w-full h-full object-cover border border-fashion-amber/10" 
                              />
                            </AspectRatio>
                            <p className="text-sm mt-2 text-center">{item.name}</p>
                            <p className="text-xs text-gray-500 text-center">Last worn: 3 months ago</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-fashion-amber/10">
                    <h3 className="text-lg font-medium mb-3">Sustainable Fashion</h3>
                    <p className="text-gray-600 mb-4">
                      Consider these eco-friendly recommendations:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-fashion-amber/10 rounded-lg">
                        <div className="bg-fashion-amber/20 p-2 rounded-full mr-3">
                          <Shirt className="h-5 w-5 text-fashion-amber" />
                        </div>
                        <div>
                          <p className="font-medium">Donate unused clothes</p>
                          <p className="text-sm text-gray-600">You have 5 items you haven't worn in over a year</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-fashion-peach/10 rounded-lg">
                        <div className="bg-fashion-peach/20 p-2 rounded-full mr-3">
                          <Shirt className="h-5 w-5 text-fashion-peach" />
                        </div>
                        <div>
                          <p className="font-medium">Missing essentials</p>
                          <p className="text-sm text-gray-600">Your wardrobe could use a basic white button-down</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <nav className="bg-white border-t border-fashion-amber/20 fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            <Link 
              to="/" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link 
              to="/closet" 
              className={`flex flex-col items-center py-3 px-4 ${mainTab === "closet" ? "text-fashion-amber" : "text-fashion-navy"}`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs mt-1">Closet</span>
            </Link>
            <Link 
              to="/virtual-tryon" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Ruler className="h-5 w-5" />
              <span className="text-xs mt-1">Try-On</span>
            </Link>
            <Link 
              to="/social" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Social</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <UserIcon className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>

      <AddClothesModal 
        open={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleSaveClothingItem}
        category={selectedCategory || ""}
      />

      <ClothingItemDetail 
        item={selectedItem} 
        open={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default Closet;
