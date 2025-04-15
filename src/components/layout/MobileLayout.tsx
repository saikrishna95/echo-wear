
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-fashion-light to-white">
      {/* Mobile Header with safe area padding */}
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md shadow-sm pt-safe px-4 py-3 flex items-center justify-between border-b border-fashion-peach/10">
        <div className="flex items-center">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 text-fashion-navy"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft />
            </Button>
          )}
          {title && <h1 className="text-lg font-semibold text-fashion-navy">{title}</h1>}
        </div>
        
        {rightContent && <div>{rightContent}</div>}
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default MobileLayout;
