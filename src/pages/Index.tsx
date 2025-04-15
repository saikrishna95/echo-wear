
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import EchoWearDashboard from "@/components/EchoWear/Dashboard";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/echowear-login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while checking auth state
  }

  return (
    <div className="flex flex-col min-h-screen bg-fashion-light">
      {/* Full screen background with gradient overlay */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img 
          src="/lovable-uploads/5e62aadd-496b-44e3-84c8-e8f40d379fd5.png" 
          alt="Fashion background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fashion-amber/60 via-fashion-peach/30 to-fashion-sand/20"></div>
      </div>
      
      {/* Content container with z-index to appear above background */}
      <div className="relative z-10 flex flex-col min-h-screen pt-safe">
        {/* Header with logo */}
        <header className="w-full px-4 py-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-white text-center">
              Echo<span className="text-fashion-amber">Wear</span>
            </h1>
          </div>
        </header>
        
        {/* Main content with padding for bottom nav */}
        <main className="flex-1 pb-20">
          <EchoWearDashboard />
        </main>

        {/* Mobile bottom navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default Index;
