
import React from "react";
import { ChevronLeft, Shirt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VirtualTryOnHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="pt-6 pb-3 px-6">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-xl font-medium text-gray-800 dark:text-white flex items-center gap-2">
          <Shirt className="h-5 w-5 text-primary" />
          <span>Virtual Try-On</span>
        </h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        Customize your avatar and try on different clothes
      </p>
    </header>
  );
};

export default VirtualTryOnHeader;
