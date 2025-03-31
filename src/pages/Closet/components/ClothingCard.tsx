
import { ClothingItem } from "@/types";
import { Card } from "@/components/ui/card";

interface ClothingCardProps {
  item: ClothingItem;
}

export const ClothingCard = ({ item }: ClothingCardProps) => {
  return (
    <Card className="fashion-card h-full">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-3">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.color} • {item.type}</p>
      </div>
    </Card>
  );
};
