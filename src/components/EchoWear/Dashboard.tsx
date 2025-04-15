
import React from "react";
import { Shirt, Users, Settings, Search, Calendar } from "lucide-react";
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
    <div className="flex flex-col px-4 pt-2 pb-4">
      {/* Greeting */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Hi {username} 👋
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 dark:text-gray-400"
        >
          <Calendar size={20} />
        </Button>
      </div>
      
      {/* Main buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline"
          className="h-24 flex flex-col gap-2 border-2 border-fashion-peach bg-white hover:bg-fashion-sand"
          onClick={() => navigate("/closet")}
        >
          <Shirt size={28} className="text-fashion-amber" />
          <span className="font-medium">Closet</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-24 flex flex-col gap-2 border-2 border-fashion-peach bg-white hover:bg-fashion-sand"
          onClick={() => navigate("/social")}
        >
          <Users size={28} className="text-fashion-amber" />
          <span className="font-medium">Social</span>
        </Button>
      </div>
      
      {/* Daily outfit suggestion */}
      <Card className="mb-6 p-4 border-fashion-peach bg-white">
        <h3 className="text-lg font-medium mb-2 text-gray-800">Today's Outfit Suggestion</h3>
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 bg-fashion-sand rounded-lg flex items-center justify-center">
            <Shirt size={32} className="text-fashion-amber" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">
              Based on today's weather ({temperature}°C) and your style preferences:
            </p>
            <p className="text-sm font-medium text-gray-800">
              Light cotton shirt, beige chinos, and casual loafers
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm text-fashion-amber"
              onClick={() => navigate("/virtual-tryon")}
            >
              Try it on →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EchoWearDashboard;
