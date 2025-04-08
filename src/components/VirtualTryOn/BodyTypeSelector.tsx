
import React from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface BodyTypeSelectorProps {
  onSelectBodyType: (type: "slim" | "athletic" | "curvy") => void;
  activeBodyType: "slim" | "athletic" | "curvy" | null;
}

export const BodyTypeSelector: React.FC<BodyTypeSelectorProps> = ({ 
  onSelectBodyType, 
  activeBodyType 
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">Body Type Presets</label>
      <div className="grid grid-cols-3 gap-2">
        <BodyTypeCard 
          type="slim" 
          label="Slim"
          onClick={() => onSelectBodyType("slim")}
          isActive={activeBodyType === "slim"}
        />
        <BodyTypeCard 
          type="athletic" 
          label="Athletic"
          onClick={() => onSelectBodyType("athletic")}
          isActive={activeBodyType === "athletic"}
        />
        <BodyTypeCard 
          type="curvy" 
          label="Curvy"
          onClick={() => onSelectBodyType("curvy")}
          isActive={activeBodyType === "curvy"}
        />
      </div>
    </div>
  );
};

interface BodyTypeCardProps {
  type: "slim" | "athletic" | "curvy";
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const BodyTypeCard: React.FC<BodyTypeCardProps> = ({ type, label, onClick, isActive }) => {
  return (
    <Card 
      className={`flex flex-col items-center justify-center p-2 cursor-pointer transition-colors border-fashion-teal/30 ${
        isActive 
          ? "bg-primary/10 border-primary" 
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      <div className="h-16 w-8 relative mb-1">
        {type === "slim" && (
          <svg viewBox="0 0 40 80" className="h-full w-full">
            <ellipse cx="20" cy="10" rx="8" ry="8" fill="#D8D8D8" />
            <rect x="16" y="18" width="8" height="10" fill="#D8D8D8" />
            <ellipse cx="20" cy="33" rx="9" ry="5" fill="#D8D8D8" />
            <path d="M16,38 L16,65 C16,67.7 17.3,70 20,70 C22.7,70 24,67.7 24,65 L24,38 Z" fill="#D8D8D8" />
          </svg>
        )}
        
        {type === "athletic" && (
          <svg viewBox="0 0 40 80" className="h-full w-full">
            <ellipse cx="20" cy="10" rx="8" ry="8" fill="#D8D8D8" />
            <rect x="12" y="18" width="16" height="8" rx="4" fill="#D8D8D8" />
            <ellipse cx="20" cy="31" rx="12" ry="5" fill="#D8D8D8" />
            <ellipse cx="20" cy="38" rx="10" ry="4" fill="#D8D8D8" />
            <path d="M14,42 L14,65 C14,68 16.7,72 20,72 C23.3,72 26,68 26,65 L26,42 Z" fill="#D8D8D8" />
          </svg>
        )}
        
        {type === "curvy" && (
          <svg viewBox="0 0 40 80" className="h-full w-full">
            <ellipse cx="20" cy="10" rx="8" ry="8" fill="#D8D8D8" />
            <rect x="15" y="18" width="10" height="8" rx="4" fill="#D8D8D8" />
            <ellipse cx="20" cy="30" rx="12" ry="6" fill="#D8D8D8" />
            <ellipse cx="20" cy="40" rx="14" ry="6" fill="#D8D8D8" />
            <path d="M13,46 L13,65 C13,68 16,72 20,72 C24,72 27,68 27,65 L27,46 Z" fill="#D8D8D8" />
          </svg>
        )}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Card>
  );
};
