import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Scissors
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const mockClothes = {
  tops: [
    { id: 1, name: "White T-Shirt", image: "https://placehold.co/200x200/ffffff/000000?text=White+Tee", color: "White", type: "Casual" },
    { id: 2, name: "Blue Dress Shirt", image: "https://placehold.co/200x200/3498db/ffffff?text=Blue+Shirt", color: "Blue", type: "Formal" },
    { id: 3, name: "Black Sweater", image: "https://placehold.co/200x200/333333/ffffff?text=Black+Sweater", color: "Black", type: "Casual" },
  ],
  bottoms: [
    { id: 1, name: "Blue Jeans", image: "https://placehold.co/200x200/3e5b76/ffffff?text=Blue+Jeans", color: "Blue", type: "Casual" },
    { id: 2, name: "Black Slacks", image: "https://placehold.co/200x200/222222/ffffff?text=Black+Slacks", color: "Black", type: "Formal" },
  ],
  shoes: [
    { id: 1, name: "White Sneakers", image: "https://placehold.co/200x200/eeeeee/333333?text=Sneakers", color: "White", type: "Casual" },
    { id: 2, name: "Black Dress Shoes", image: "https://placehold.co/200x200/111111/ffffff?text=Dress+Shoes", color: "Black", type: "Formal" },
  ],
};

const mockOutfits = [
  {
    id: 1,
    name: "Casual Day Out",
    items: [mockClothes.tops[0], mockClothes.bottoms[0], mockClothes.shoes[0]],
    occasion: "Casual",
    weather: "Sunny",
  },
  {
    id: 2,
    name: "Business Meeting",
    items: [mockClothes.tops[1], mockClothes.bottoms[1], mockClothes.shoes[1]],
    occasion: "Formal",
    weather: "Any",
  },
];

const Closet = () => {
  const [selectedTab, setSelectedTab] = useState("closet");
  const { toast } = useToast();

  const handleAddClothes = () => {
    toast({
      title: "Upload Feature Coming Soon",
      description: "The ability to upload and scan your clothes will be available in future updates!",
    });
  };

  const handleTryOn = (outfit: any) => {
    toast({
      title: "Virtual Try-On",
      description: `Try-on for "${outfit.name}" will be available soon!`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-fashion-gray">
      <header className="w-full py-4 px-6 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-fashion-navy">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-fashion-navy">
              Your Virtual Closet
            </h1>
          </div>
          <Link to="/profile" className="text-fashion-navy">
            <UserIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Tabs 
          defaultValue="closet" 
          className="w-full"
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="closet">Closet</TabsTrigger>
            <TabsTrigger value="outfits">AI Outfits</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="closet" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">My Clothes</h2>
                  <Button 
                    onClick={handleAddClothes}
                    className="bg-fashion-teal hover:bg-fashion-teal/90"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Add Clothes
                  </Button>
                </div>
                
                <Tabs defaultValue="tops" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="tops" className="flex gap-2 items-center">
                      <Shirt className="h-4 w-4" />
                      Tops
                    </TabsTrigger>
                    <TabsTrigger value="bottoms" className="flex gap-2 items-center">
                      <Scissors className="h-4 w-4" />
                      Bottoms
                    </TabsTrigger>
                    <TabsTrigger value="shoes" className="flex gap-2 items-center">
                      <Footprints className="h-4 w-4" />
                      Shoes
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tops">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {mockClothes.tops.map((item) => (
                        <div key={item.id} className="fashion-card">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-48 object-cover" 
                          />
                          <div className="p-3">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.color} • {item.type}</p>
                          </div>
                        </div>
                      ))}
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-full min-h-[200px] cursor-pointer hover:border-fashion-teal transition-colors"
                        onClick={handleAddClothes}
                      >
                        <div className="text-center p-4">
                          <Plus className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-gray-500 mt-2">Add New</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bottoms">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {mockClothes.bottoms.map((item) => (
                        <div key={item.id} className="fashion-card">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-48 object-cover" 
                          />
                          <div className="p-3">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.color} • {item.type}</p>
                          </div>
                        </div>
                      ))}
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-full min-h-[200px] cursor-pointer hover:border-fashion-teal transition-colors"
                        onClick={handleAddClothes}
                      >
                        <div className="text-center p-4">
                          <Plus className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-gray-500 mt-2">Add New</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="shoes">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {mockClothes.shoes.map((item) => (
                        <div key={item.id} className="fashion-card">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-48 object-cover" 
                          />
                          <div className="p-3">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.color} • {item.type}</p>
                          </div>
                        </div>
                      ))}
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-full min-h-[200px] cursor-pointer hover:border-fashion-teal transition-colors"
                        onClick={handleAddClothes}
                      >
                        <div className="text-center p-4">
                          <Plus className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-gray-500 mt-2">Add New</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="outfits" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">AI Outfit Suggestions</h2>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Events
                    </Button>
                    <Button variant="outline">
                      <SunIcon className="mr-2 h-4 w-4" />
                      Weather
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockOutfits.map((outfit) => (
                    <Card key={outfit.id} className="overflow-hidden">
                      <div className="p-4 bg-fashion-navy text-white flex justify-between items-center">
                        <h3 className="font-medium">{outfit.name}</h3>
                        <div className="flex items-center gap-2">
                          {outfit.weather === "Sunny" && <SunIcon className="h-4 w-4" />}
                          {outfit.weather === "Rainy" && <CloudRainIcon className="h-4 w-4" />}
                          {outfit.weather === "Cold" && <SnowflakeIcon className="h-4 w-4" />}
                          <span className="text-xs bg-white/20 px-2 py-1 rounded">
                            {outfit.occasion}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {outfit.items.map((item, idx) => (
                            <div key={idx} className="flex-shrink-0 w-24">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-24 object-cover rounded" 
                              />
                              <p className="text-xs mt-1 text-center">{item.name}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            className="text-sm"
                            onClick={() => handleTryOn(outfit)}
                          >
                            Virtual Try-On
                          </Button>
                          <Button className="text-sm bg-fashion-teal hover:bg-fashion-teal/90">
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
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Wardrobe Insights</h2>
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-medium mb-3">Clothing Rotation</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't worn these items in a while:
                    </p>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {mockClothes.tops.slice(1, 3).map((item) => (
                        <div key={item.id} className="flex-shrink-0 w-32">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-32 object-cover rounded border border-gray-200" 
                          />
                          <p className="text-sm mt-2 text-center">{item.name}</p>
                          <p className="text-xs text-gray-500 text-center">Last worn: 3 months ago</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-medium mb-3">Sustainable Fashion</h3>
                    <p className="text-gray-600 mb-4">
                      Consider these eco-friendly recommendations:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <Shirt className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Donate unused clothes</p>
                          <p className="text-sm text-gray-600">You have 5 items you haven't worn in over a year</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Shirt className="h-5 w-5 text-blue-600" />
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

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            <Link 
              to="/" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link 
              to="/closet" 
              className={`flex flex-col items-center py-3 px-4 ${selectedTab === "closet" ? "text-fashion-teal" : "text-fashion-navy"}`}
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="text-xs mt-1">Closet</span>
            </Link>
            <Link 
              to="/social" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">Social</span>
            </Link>
            <Link 
              to="/profile" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <UserIcon className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>
    </div>
  );
};

export default Closet;
