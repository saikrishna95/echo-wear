
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VirtualTryOnHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="pt-6 pb-3 px-6">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 dark:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-medium text-gray-800 dark:text-white">Virtual Try-On</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        Customize your avatar and try on different clothes
      </p>
    </header>
  );
};

export default VirtualTryOnHeader;
