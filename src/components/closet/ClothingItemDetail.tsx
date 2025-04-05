
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ClothingItem } from "@/hooks/useCloset"; // Import from useCloset instead

interface ClothingItemDetailProps {
  item: ClothingItem | null;
  open: boolean;
  onClose: () => void;
}

const ClothingItemDetail: React.FC<ClothingItemDetailProps> = ({ item, open, onClose }) => {
  const [activeView, setActiveView] = useState<"front" | "back" | "side">("front");

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div className="flex gap-2 items-center">
            <Badge variant="outline" className="bg-fashion-amber/10 text-fashion-amber border-fashion-amber/20">
              {item.category}
            </Badge>
            <Badge variant="outline" className="bg-gray-100 border-gray-200">
              {item.color}
            </Badge>
            <Badge variant="outline" className="bg-gray-100 border-gray-200">
              {item.type}
            </Badge>
          </div>
          
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <AspectRatio ratio={3/4}>
              <img 
                src={item.images[activeView]} 
                alt={`${item.name} ${activeView} view`} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveView("front")}
              className={`border rounded-md overflow-hidden ${
                activeView === "front" ? "border-fashion-amber" : "border-gray-200"
              }`}
            >
              <AspectRatio ratio={1/1} className="w-full">
                <img 
                  src={item.images.front} 
                  alt={`${item.name} front view`} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className={`text-xs text-center py-1 ${
                activeView === "front" ? "bg-fashion-amber/10 text-fashion-amber" : "bg-gray-50"
              }`}>
                Front
              </div>
            </button>
            
            <button
              onClick={() => setActiveView("back")}
              className={`border rounded-md overflow-hidden ${
                activeView === "back" ? "border-fashion-amber" : "border-gray-200"
              }`}
            >
              <AspectRatio ratio={1/1} className="w-full">
                <img 
                  src={item.images.back} 
                  alt={`${item.name} back view`} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className={`text-xs text-center py-1 ${
                activeView === "back" ? "bg-fashion-amber/10 text-fashion-amber" : "bg-gray-50"
              }`}>
                Back
              </div>
            </button>
            
            <button
              onClick={() => setActiveView("side")}
              className={`border rounded-md overflow-hidden ${
                activeView === "side" ? "border-fashion-amber" : "border-gray-200"
              }`}
            >
              <AspectRatio ratio={1/1} className="w-full">
                <img 
                  src={item.images.side} 
                  alt={`${item.name} side view`} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className={`text-xs text-center py-1 ${
                activeView === "side" ? "bg-fashion-amber/10 text-fashion-amber" : "bg-gray-50"
              }`}>
                Side
              </div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClothingItemDetail;
