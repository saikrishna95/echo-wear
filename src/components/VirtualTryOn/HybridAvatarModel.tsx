
import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AvatarModel from './AvatarModel';
import { RealisticAvatarModel } from './RealisticAvatarModel';
import { Measurements, ClothingItem } from './types';

interface HybridAvatarModelProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
}

// Fallback component that uses the original primitive-based avatar
const FallbackAvatar: React.FC<HybridAvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing 
}) => {
  return <AvatarModel 
    measurements={measurements} 
    rotation={rotation}
    selectedClothing={selectedClothing} 
  />;
};

export const HybridAvatarModel: React.FC<HybridAvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = []
}) => {
  const [useRealistic, setUseRealistic] = useState(true);

  // Check if the model exists or use fallback after a timeout
  useEffect(() => {
    const checkModelExists = async () => {
      try {
        // Check for the male_base model instead of avatar.glb
        const response = await fetch('/models/male_base (1).glb');
        if (!response.ok) {
          setUseRealistic(false);
          console.log('GLB model not found, using primitive fallback');
        }
      } catch (error) {
        setUseRealistic(false);
        console.log('Error loading GLB model:', error);
      }
    };
    
    checkModelExists();
    
    // Also set a timeout fallback in case loading takes too long
    const timer = setTimeout(() => {
      setUseRealistic((current) => {
        if (current) {
          console.log('Timed out loading GLB model, using primitive fallback');
        }
        return false;
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // ErrorBoundary to catch errors in RealisticAvatarModel
  return (
    <ErrorBoundary FallbackComponent={() => (
      <FallbackAvatar 
        measurements={measurements} 
        rotation={rotation}
        selectedClothing={selectedClothing} 
      />
    )}>
      {useRealistic ? (
        <RealisticAvatarModel 
          measurements={measurements} 
          rotation={rotation}
          selectedClothing={selectedClothing}
        />
      ) : (
        <FallbackAvatar 
          measurements={measurements} 
          rotation={rotation}
          selectedClothing={selectedClothing}
        />
      )}
    </ErrorBoundary>
  );
};

export default HybridAvatarModel;
