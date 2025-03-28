
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trendingup, Users, Hanger } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

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
              onClick={() => {
                // This would be a login function in a real application
                console.log("Login clicked");
              }}
            >
              Login
            </Button>
            <Button 
              className="bg-fashion-teal hover:bg-fashion-teal/90 text-white"
              onClick={() => {
                // This would be a signup function in a real application
                console.log("Sign Up clicked");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-fashion-navy">
          Your AI stylist for every occasion!
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mb-10">
          Organize your wardrobe, get AI outfit suggestions, and connect with fashion enthusiasts
          all in one place.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg">
          <Button 
            className="flex-1 bg-fashion-navy hover:bg-fashion-navy/90 text-white py-8 fashion-button text-lg"
            onClick={() => navigate("/closet")}
          >
            <Hanger className="mr-2 h-6 w-6" />
            Virtual Closet
          </Button>
          <Button 
            className="flex-1 bg-fashion-teal hover:bg-fashion-teal/90 text-white py-8 fashion-button text-lg"
            onClick={() => navigate("/social")}
          >
            <Users className="mr-2 h-6 w-6" />
            Fashion Social
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-fashion-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-fashion-navy">
            AI-Powered Fashion Experience
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="fashion-card p-6">
              <div className="bg-fashion-teal/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Hanger className="h-8 w-8 text-fashion-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Closet</h3>
              <p className="text-gray-600">
                Scan, upload and organize your clothes. Get AI-powered outfit suggestions based on weather and events.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="fashion-card p-6">
              <div className="bg-fashion-pink/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-fashion-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fashion Social</h3>
              <p className="text-gray-600">
                Connect with fashion enthusiasts, share trends, and discover new styles from brands and creators.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="fashion-card p-6">
              <div className="bg-fashion-navy/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Trendingup className="h-8 w-8 text-fashion-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
              <p className="text-gray-600">
                Track clothing rotation, get outfit analytics, and receive suggestions for sustainable fashion choices.
              </p>
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
