
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
        <header className="w-full pt-safe pt-16 pb-4 px-6">
          <div className="max-w-md mx-auto flex justify-center items-center">
            <h1 className="text-2xl font-bold text-white text-center">
              Echo<span className="text-fashion-amber">Wear</span>
            </h1>
          </div>
        </header>

        {/* App Tagline */}
        <div className={`px-6 text-center mt-4 mb-8 transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
            <div className="grid grid-cols-2 gap-5">
              
              {/* Virtual Closet Button */}
              <div 
                className="aspect-square bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer hover:-translate-y-2 active:translate-y-1 active:shadow-inner"
                onClick={() => navigate("/closet")}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-white opacity-90" />
                  </div>
                  <span className="text-white font-semibold text-shadow shadow-black/90 mt-1">
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
              
              {/* Social Feed Button */}
              <div
                className="aspect-square bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer hover:-translate-y-2 active:translate-y-1 active:shadow-inner relative"
                onClick={() => navigate("/social")}
              >
                {/* Social Feed Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <MessageSquare className="h-10 w-10 text-white opacity-90" />
                  </div>
                  <span className="text-white font-semibold text-shadow shadow-black/50 mt-1">
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
              
              {/* Profile Button */}
              <div
                className="aspect-square bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer hover:-translate-y-2 active:translate-y-1 active:shadow-inner relative"
                onClick={() => navigate("/profile")}
              >
                {/* Profile Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <User className="h-10 w-10 text-white opacity-90" />
                  </div>
                  <span className="text-white font-semibold text-shadow shadow-black/50 mt-1">
                    Profile
                  </span>
                </div>
                
                {/* 3D effect overlay */}
                <div className="absolute inset-0 bg-fashion-amber/5 rounded-2xl" 
                     style={{ 
                       boxShadow: "inset 0 2px 15px rgba(255,228,196,0.2), inset 0 -2px 15px rgba(0,0,0,0.2)"
                     }}>
                </div>
              </div>
              
              {/* Virtual Try-On Button */}
              <div
                className="aspect-square bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer hover:-translate-y-2 active:translate-y-1 active:shadow-inner relative"
                onClick={() => navigate("/virtual-tryon")}
              >
                {/* Virtual Try-On Icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="h-10 w-10 text-white opacity-90" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"/>
                      <path d="M4 16v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1"/>
                      <path d="M6 16v4h12v-4"/>
                    </svg>
                  </div>
                  <span className="text-white font-semibold text-shadow shadow-black/50 mt-1">
                    Try-On
                  </span>
                </div>
                
                {/* 3D effect overlay */}
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
