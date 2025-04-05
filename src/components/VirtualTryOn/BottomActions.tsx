
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save } from "lucide-react";

interface BottomActionsProps {
  resetMeasurements: () => void;
  saveOutfit: () => void;
}

const BottomActions: React.FC<BottomActionsProps> = ({
  resetMeasurements,
  saveOutfit
}) => {
  return (
    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={resetMeasurements}
          className="flex-1"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
        <Button 
          onClick={saveOutfit}
          className="flex-1"
        >
          <Save className="mr-2 h-4 w-4" /> Save Outfit
        </Button>
      </div>
    </div>
  );
};

export default BottomActions;
