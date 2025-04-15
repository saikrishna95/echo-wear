
import React from "react";
import { Shirt, Users, Search, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardProps {
  temperature?: number;
}

const EchoWearDashboard: React.FC<DashboardProps> = ({ 
  temperature = 24 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.name || "Guest";
  
  return (
    <div className="flex flex-col px-4 pt-4 pb-4 max-w-md mx-auto w-full">
      {/* Greeting */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-sm border border-fashion-peach/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-fashion-navy">
              Welcome back,
            </h2>
            <p className="text-2xl font-bold text-fashion-amber">
              {username}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white text-fashion-amber border-fashion-peach/30 hover:bg-fashion-sand/50"
          >
            <Calendar size={20} />
          </Button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <h3 className="text-sm font-medium text-fashion-navy/70 mb-3 ml-1">QUICK ACCESS</h3>
      
      {/* Main buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline"
          className="h-32 flex flex-col gap-2 border-2 border-fashion-peach/20 bg-white hover:bg-fashion-sand/50 rounded-2xl shadow-sm"
          onClick={() => navigate("/closet")}
        >
          <div className="w-12 h-12 rounded-full bg-fashion-amber/10 flex items-center justify-center">
            <Shirt size={24} className="text-fashion-amber" />
          </div>
          <span className="font-medium text-fashion-navy">My Closet</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-32 flex flex-col gap-2 border-2 border-fashion-peach/20 bg-white hover:bg-fashion-sand/50 rounded-2xl shadow-sm"
          onClick={() => navigate("/social")}
        >
          <div className="w-12 h-12 rounded-full bg-fashion-amber/10 flex items-center justify-center">
            <Users size={24} className="text-fashion-amber" />
          </div>
          <span className="font-medium text-fashion-navy">Style Social</span>
        </Button>
      </div>
      
      {/* Daily outfit suggestion */}
      <h3 className="text-sm font-medium text-fashion-navy/70 mb-3 ml-1">TODAY'S SUGGESTION</h3>
      <Card className="mb-6 p-5 border-fashion-peach/20 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-fashion-amber" />
          <h3 className="text-lg font-semibold text-fashion-navy">AI Outfit Suggestion</h3>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 bg-fashion-sand/30 rounded-xl flex items-center justify-center">
            <Shirt size={40} className="text-fashion-amber" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1 text-sm text-fashion-navy/60">
              <Calendar size={14} className="text-fashion-amber" />
              <span>{temperature}°C</span>
              <span className="mx-1">•</span>
              <span>Sunny</span>
            </div>
            <p className="text-sm font-medium text-fashion-navy mb-2">
              Light cotton shirt, beige chinos, and casual loafers
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 text-fashion-amber border-fashion-amber/30 hover:bg-fashion-amber/10 hover:text-fashion-amber"
              onClick={() => navigate("/virtual-tryon")}
            >
              Try it on <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Search bar */}
      <div className="mt-2">
        <Button
          variant="outline"
          className="w-full flex items-center justify-start gap-2 bg-white/70 backdrop-blur-sm border-fashion-peach/20 hover:bg-fashion-sand/30 rounded-xl h-12 px-4"
          onClick={() => navigate("/closet")}
        >
          <Search size={18} className="text-fashion-navy/40" />
          <span className="text-fashion-navy/50">Search your wardrobe...</span>
        </Button>
      </div>
    </div>
  );
};

export default EchoWearDashboard;
