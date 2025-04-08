
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save, RefreshCw } from "lucide-react";

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
          className="flex-1 h-11 gap-2"
        >
          <RefreshCw className="h-5 w-5" /> 
          <span>Reset</span>
        </Button>
        <Button 
          onClick={saveOutfit}
          className="flex-1 h-11 gap-2"
        >
          <Save className="h-5 w-5" /> 
          <span>Save Outfit</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomActions;
