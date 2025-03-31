
import { Plus } from "lucide-react";

interface AddClothingCardProps {
  onClick: () => void;
}

export const AddClothingCard = ({ onClick }: AddClothingCardProps) => {
  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-full min-h-[200px] cursor-pointer hover:border-fashion-teal transition-colors"
      onClick={onClick}
    >
      <div className="text-center p-4">
        <Plus className="h-8 w-8 mx-auto text-gray-400" />
        <p className="text-gray-500 mt-2">Add New</p>
      </div>
    </div>
  );
};
