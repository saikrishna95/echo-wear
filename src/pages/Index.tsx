
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shirt, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-fashion-navy">
            Echo<span className="text-fashion-teal">Wear</span>
          </h1>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="text-fashion-navy"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Animation */}
      <section className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-fashion-navy">
          Your AI stylist for every occasion!
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mb-10">
          Organize your wardrobe, get AI outfit suggestions, and connect with fashion enthusiasts
          all in one place.
        </p>
        
        {/* Door-like button container with no gap */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-0">
            {/* Left side - Virtual Closet */}
            <Button 
              className={`h-auto py-16 bg-fashion-navy hover:bg-fashion-navy/90 text-white rounded-l-xl rounded-r-none flex flex-col items-center justify-center gap-2 shadow-md transition-all duration-500 border-r border-white/10 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              onClick={() => navigate("/closet")}
            >
              <Shirt className="h-8 w-8" />
              <span className="text-base font-bold">Virtual Closet</span>
            </Button>
            
            {/* Right side - Fashion Social */}
            <Button 
              className={`h-auto py-16 bg-fashion-teal hover:bg-fashion-teal/90 text-white rounded-r-xl rounded-l-none flex flex-col items-center justify-center gap-2 shadow-md transition-all duration-500 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              onClick={() => navigate("/social")}
            >
              <Users className="h-8 w-8" />
              <span className="text-base font-bold">Fashion Social</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-fashion-navy text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-lg font-bold">
            Echo<span className="text-fashion-teal">Wear</span>
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EchoWear. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
