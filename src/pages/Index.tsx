
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { MessageSquare, ShoppingBag, Shirt, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("featured");
  const isMobile = useIsMobile();

  // Control animation on mount
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth state
  }

  const handleCategoryChange = (value: string) => {
    if (value) setSelectedCategory(value);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white relative">
      {/* Full screen background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="/lovable-uploads/6d5869e6-335e-43b2-9095-3cba3298e969.png" 
          alt="Fashion background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
      </div>

      {/* Content container with z-index to appear above background */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {/* App header with logo */}
        <header className="w-full pt-8 pb-4 px-6">
          <div className="max-w-md mx-auto flex justify-center items-center">
            <h1 className="text-2xl font-bold text-white text-center">
              Echo<span className="text-fashion-teal">Wear</span>
            </h1>
          </div>
        </header>

        {/* Category selection buttons */}
        <div className="px-6 mb-6">
          <ToggleGroup 
            type="single" 
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            className="flex justify-center bg-white/10 backdrop-blur-sm rounded-full p-1 w-full max-w-xs mx-auto"
          >
            <ToggleGroupItem 
              value="featured" 
              aria-label="Featured" 
              className="text-white data-[state=on]:bg-fashion-teal data-[state=on]:text-white rounded-full flex-1 text-xs py-2"
            >
              Featured
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="new" 
              aria-label="New"
              className="text-white data-[state=on]:bg-fashion-teal data-[state=on]:text-white rounded-full flex-1 text-xs py-2"
            >
              New In
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="trending" 
              aria-label="Trending"
              className="text-white data-[state=on]:bg-fashion-teal data-[state=on]:text-white rounded-full flex-1 text-xs py-2"
            >
              Trending
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* App Tagline */}
        <div className={`px-6 text-center mt-6 mb-8 transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl text-white font-light tracking-wide">
            Your AI stylist for every occasion
          </h2>
          <p className="text-white/80 mt-2 max-w-md mx-auto">
            Discover your perfect style with virtual try-on and personalized recommendations
          </p>
        </div>

        {/* Main Interactive Area */}
        <div className="flex-1 flex flex-col items-center justify-end px-6 pb-16 mt-auto">
          <div className={`w-full max-w-sm mx-auto transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-4 perspective-[1200px]">
              
              {/* Virtual Closet Button */}
              <div 
                className="aspect-square bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer preserve-3d hover:translate-z-4 hover:-translate-y-2 active:translate-y-1 active:shadow-inner"
                onClick={() => navigate("/closet")}
                style={{
                  transform: "translateZ(0)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2), 0 -6px 0 0 rgba(0, 0, 0, 0.05) inset, 8px 0 15px -5px rgba(0, 0, 0, 0.05) inset"
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-white mb-2 opacity-90" />
                  <span className="text-white font-semibold text-shadow shadow-black/90">
                    Virtual Closet
                  </span>
                </div>
                
                {/* 3D effect overlay */}
                <div className="absolute inset-0 bg-white opacity-5 rounded-2xl" 
                     style={{ 
                       boxShadow: "inset 0 2px 15px rgba(255,255,255,0.2), inset 0 -2px 15px rgba(0,0,0,0.2)"
                     }}>
                </div>
              </div>
              
              {/* Social Feed Button */}
              <div
                className="aspect-square bg-fashion-teal/70 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer preserve-3d hover:translate-z-4 hover:-translate-y-2 active:translate-y-1 active:shadow-inner relative"
                onClick={() => navigate("/social")}
                style={{
                  transform: "translateZ(0)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2), 0 -6px 0 0 rgba(0, 0, 0, 0.05) inset, -8px 0 15px -5px rgba(0, 0, 0, 0.05) inset"
                }}
              >
                {/* Social Feed Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MessageSquare className="h-16 w-16 text-white mb-2 opacity-90" />
                  <span className="text-white font-semibold text-shadow shadow-black/50">
                    Social Feed
                  </span>
                </div>
                
                {/* 3D effect overlay */}
                <div className="absolute inset-0 bg-white opacity-5 rounded-2xl" 
                     style={{ 
                       boxShadow: "inset 0 2px 15px rgba(255,255,255,0.2), inset 0 -2px 15px rgba(0,0,0,0.2)"
                     }}>
                </div>
              </div>
            </div>
            
            {/* Logout Button */}
            <div className="mt-12 text-center">
              <Button 
                variant="outline" 
                className="text-white border-white/30 bg-black/20 backdrop-blur-sm text-sm hover:bg-white/10"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
