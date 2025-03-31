
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Simple Header */}
      <header className="w-full pt-12 pb-6 px-6">
        <div className="max-w-md mx-auto flex justify-center items-center">
          <h1 className="text-2xl font-bold text-fashion-navy text-center">
            Echo<span className="text-fashion-teal">Wear</span>
          </h1>
        </div>
      </header>

      {/* App Tagline */}
      <div className={`px-6 text-center mb-8 transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-xl text-fashion-charcoal font-light tracking-wide">
          Your AI stylist for every occasion
        </h2>
      </div>

      {/* Main Interactive Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className={`w-full max-w-sm mx-auto transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Grid for the two buttons */}
          <div className="grid grid-cols-2 gap-4 perspective-[1200px]">
            
            {/* Virtual Closet Button */}
            <div 
              className="aspect-square rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer preserve-3d hover:translate-z-4 hover:-translate-y-2 active:translate-y-1 active:shadow-inner"
              onClick={() => navigate("/closet")}
              style={{
                transform: "translateZ(0)",
                transformStyle: "preserve-3d",
                boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2), 0 -6px 0 0 rgba(0, 0, 0, 0.05) inset, 8px 0 15px -5px rgba(0, 0, 0, 0.05) inset"
              }}
            >
              {/* Closet Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/lovable-uploads/a5e5209b-37ed-404a-aca4-c4984df06eff.png" 
                  alt="Virtual Closet" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Dark overlay for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Button Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <span className="text-white font-semibold text-shadow shadow-black/90">
                  Virtual Closet
                </span>
              </div>
              
              {/* 3D effect overlay */}
              <div className="absolute inset-0 bg-fashion-navy opacity-5 rounded-2xl" 
                   style={{ 
                     boxShadow: "inset 0 2px 15px rgba(255,255,255,0.2), inset 0 -2px 15px rgba(0,0,0,0.2)"
                   }}>
              </div>
            </div>
            
            {/* Social Feed Button */}
            <div
              className="aspect-square bg-fashion-teal rounded-2xl overflow-hidden transform transition-all duration-300 cursor-pointer preserve-3d hover:translate-z-4 hover:-translate-y-2 active:translate-y-1 active:shadow-inner relative"
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
          
          {/* Logout Button - Moved to bottom for cleaner interface */}
          <div className="mt-12 text-center">
            <Button 
              variant="ghost" 
              className="text-fashion-navy/70 text-sm"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
