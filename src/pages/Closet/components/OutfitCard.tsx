
import { Outfit } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SunIcon, CloudRainIcon, Snowflake } from "lucide-react";

interface OutfitCardProps {
  outfit: Outfit;
  onTryOn: (outfit: Outfit) => void;
}

export const OutfitCard = ({ outfit, onTryOn }: OutfitCardProps) => {
  return (
    <Card key={outfit.id} className="overflow-hidden">
      <div className="p-4 bg-fashion-navy text-white flex justify-between items-center">
        <h3 className="font-medium">{outfit.name}</h3>
        <div className="flex items-center gap-2">
          {outfit.weather === "Sunny" && <SunIcon className="h-4 w-4" />}
          {outfit.weather === "Rainy" && <CloudRainIcon className="h-4 w-4" />}
          {outfit.weather === "Cold" && <Snowflake className="h-4 w-4" />}
          <span className="text-xs bg-white/20 px-2 py-1 rounded">
            {outfit.occasion}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {outfit.items.map((item, idx) => (
            <div key={idx} className="flex-shrink-0 w-24">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-24 object-cover rounded" 
              />
              <p className="text-xs mt-1 text-center">{item.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            className="text-sm"
            onClick={() => onTryOn(outfit)}
          >
            Virtual Try-On
          </Button>
          <Button className="text-sm bg-fashion-teal hover:bg-fashion-teal/90">
            Wear Today
          </Button>
        </div>
      </div>
    </Card>
  );
};
