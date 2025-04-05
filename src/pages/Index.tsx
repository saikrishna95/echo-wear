
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);
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

  return (
    <div className="min-h-screen w-full flex flex-col bg-fashion-light relative">
      {/* Full screen background image with warm overlay */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img 
          src="/lovable-uploads/5e62aadd-496b-44e3-84c8-e8f40d379fd5.png" 
          alt="Fashion background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fashion-amber/80 via-fashion-peach/40 to-fashion-sand/30"></div>
      </div>

      {/* Content container with z-index to appear above background */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        {/* App header with logo - moved even further down */}
        <header className="w-full pt-20 pb-4 px-6">
          <div className="max-w-md mx-auto flex justify-center items-center">
            <h1 className="text-2xl font-bold text-white text-center">
              Echo<span className="text-fashion-amber">Wear</span>
            </h1>
          </div>
        </header>

        {/* App Tagline */}
        <div className={`px-6 text-center mt-4 mb-4 transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl text-white font-light tracking-wide">
            Your AI stylist for every occasion
          </h2>
          <p className="text-white/80 mt-2 max-w-md mx-auto">
            Discover your perfect style with virtual try-on and personalized recommendations
          </p>
        </div>

        {/* Main Interactive Area - moved up further */}
        <div className="flex-1 flex flex-col items-center px-6">
          <div className={`w-full max-w-sm mx-auto mt-2 transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Virtual Closet Button */}
              <div 
                className="aspect-square bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer hover:-translate-y-2 active:translate-y-1 active:shadow-inner"
                onClick={() => navigate("/closet")}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-white mb-2 opacity-90" />
                  <span className="text-white font-semibold text-shadow shadow-black/90">
                    Virtual Closet
                  </span>
                </div>
                
                {/* 3D effect overlay with warm glow */}
                <div className="absolute inset-0 bg-fashion-amber/5 rounded-2xl" 
                     style={{ 
                       boxShadow: "inset 0 2px 15px rgba(255,228,196,0.2), inset 0 -2px 15px rgba(0,0,0,0.2)"
                     }}>
                </div>
              </div>
              
              {/* Social Feed Button - now transparent like Virtual Closet */}
              <div
                className="aspect-square bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer hover:-translate-y-2 active:translate-y-1 active:shadow-inner relative"
                onClick={() => navigate("/social")}
              >
                {/* Social Feed Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MessageSquare className="h-16 w-16 text-white mb-2 opacity-90" />
                  <span className="text-white font-semibold text-shadow shadow-black/50">
                    Social Feed
                  </span>
                </div>
                
                {/* 3D effect overlay with warm glow */}
                <div className="absolute inset-0 bg-fashion-amber/5 rounded-2xl" 
                     style={{ 
                       boxShadow: "inset 0 2px 15px rgba(255,228,196,0.2), inset 0 -2px 15px rgba(0,0,0,0.2)"
                     }}>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Logout Button - fixed to bottom of screen */}
        <div className="w-full flex justify-center pb-8 pt-4 absolute bottom-0 left-0">
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
  );
};

export default Index;
