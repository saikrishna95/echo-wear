
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Shirt, Users, User, Settings } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Shirt, label: 'Closet', path: '/closet' },
    { icon: Users, label: 'Social', path: '/social' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200/60 bg-white/80 backdrop-blur-md dark:bg-gray-900/90 dark:border-gray-800/60 pb-safe">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-2 px-3 relative ${
              isActive(item.path)
                ? 'text-fashion-amber'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {isActive(item.path) && (
              <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-fashion-amber"></span>
            )}
            <item.icon size={20} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
