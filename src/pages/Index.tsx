
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-fashion-light to-white">
      {/* Content container with z-index to appear above background */}
      <div className="relative z-10 flex flex-col min-h-screen pt-safe">
        {/* Header with logo */}
        <header className="w-full px-4 py-6 bg-white/70 backdrop-blur-sm shadow-sm">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-fashion-navy">
              Echo<span className="text-fashion-amber">Wear</span>
            </h1>
            <div className="text-sm text-fashion-navy/60 font-medium">
              AI Fashion Assistant
            </div>
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
