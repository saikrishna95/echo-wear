
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  showBackButton = true,
  rightContent
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-fashion-light">
      {/* Mobile Header with safe area padding */}
      <header className="sticky top-0 z-10 w-full bg-fashion-amber/80 backdrop-blur-md shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 text-white"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft />
            </Button>
          )}
          {title && <h1 className="text-lg font-semibold text-white">{title}</h1>}
        </div>
        
        {rightContent && <div>{rightContent}</div>}
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4 pb-16">
        {children}
      </main>
      
      {/* Bottom Padding for Mobile Safe Area */}
      <div className="h-safe-bottom bg-fashion-light"></div>
    </div>
  );
};

export default MobileLayout;
