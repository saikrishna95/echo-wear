
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
  Calendar,
  Plus,
  Users,
  Scissors,
  Ruler
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showToast } from "@/utils/toast";
import { getAllClothes, getOutfits } from "@/services/closetService";
import { ClothingCard } from "./components/ClothingCard";
import { AddClothingCard } from "./components/AddClothingCard";
import { OutfitCard } from "./components/OutfitCard";
import { Outfit } from "@/types";

const Closet = () => {
  const [selectedTab, setSelectedTab] = useState("closet");
  const mockClothes = getAllClothes();
  const mockOutfits = getOutfits();

  const handleAddClothes = () => {
    showToast(
      "Upload Feature Coming Soon",
      "The ability to upload and scan your clothes will be available in future updates!"
    );
  };

  const handleTryOn = (outfit: Outfit) => {
    showToast(
      "Virtual Try-On",
      `Try-on for "${outfit.name}" will be available soon!`
    );
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
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Ruler className="h-4 w-4" />
              <span className="hidden sm:inline">Virtual Try-On</span>
            </Button>
            <Link to="/profile" className="text-fashion-navy">
              <UserIcon className="h-5 w-5" />
            </Link>
          </div>
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
                        <ClothingCard key={item.id} item={item} />
                      ))}
                      <AddClothingCard onClick={handleAddClothes} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bottoms">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {mockClothes.bottoms.map((item) => (
                        <ClothingCard key={item.id} item={item} />
                      ))}
                      <AddClothingCard onClick={handleAddClothes} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="shoes">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {mockClothes.shoes.map((item) => (
                        <ClothingCard key={item.id} item={item} />
                      ))}
                      <AddClothingCard onClick={handleAddClothes} />
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
                    <OutfitCard 
                      key={outfit.id} 
                      outfit={outfit} 
                      onTryOn={handleTryOn} 
                    />
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
              to="/virtual-tryon" 
              className="flex flex-col items-center py-3 px-4 text-fashion-navy"
            >
              <Ruler className="h-6 w-6" />
              <span className="text-xs mt-1">Try-On</span>
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
