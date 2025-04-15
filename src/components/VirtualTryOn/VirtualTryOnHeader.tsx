
import React from "react";
import { ChevronLeft, Shirt, CalendarDays, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
          <Shirt className="h-5 w-5 text-fashion-amber" />
          <span>EchoWear</span>
        </h1>
        <div className="flex items-center gap-1">
          <CalendarDays size={18} className="text-gray-600 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your AI stylist for every occasion
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Sun size={16} className="text-fashion-amber" />
          <span>24°C</span>
        </div>
      </div>
    </header>
  );
};

export default VirtualTryOnHeader;
