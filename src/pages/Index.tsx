
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, ShoppingBag } from "lucide-react";
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
        
        {/* Split box for Virtual Closet and Fashion Social */}
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Virtual Closet */}
            <div className={`transform transition-all duration-700 delay-200 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <Button 
                className="w-full h-64 bg-fashion-navy hover:bg-fashion-navy/90 text-white p-8 rounded-xl flex flex-col items-center justify-center gap-4 shadow-lg transition-transform hover:scale-105"
                onClick={() => navigate("/closet")}
              >
                <ShoppingBag className="h-16 w-16 mb-2" />
                <span className="text-2xl font-bold">Virtual Closet</span>
                <p className="text-sm opacity-80 max-w-xs text-center">
                  Organize your wardrobe and get AI outfit recommendations
                </p>
              </Button>
            </div>
            
            {/* Right side - Fashion Social */}
            <div className={`transform transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Button 
                className="w-full h-64 bg-fashion-teal hover:bg-fashion-teal/90 text-white p-8 rounded-xl flex flex-col items-center justify-center gap-4 shadow-lg transition-transform hover:scale-105"
                onClick={() => navigate("/social")}
              >
                <Users className="h-16 w-16 mb-2" />
                <span className="text-2xl font-bold">Fashion Social</span>
                <p className="text-sm opacity-80 max-w-xs text-center">
                  Connect with fashion enthusiasts and discover new trends
                </p>
              </Button>
            </div>
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
