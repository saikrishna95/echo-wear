
import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AvatarModel from './AvatarModel';
import { RealisticAvatarModel } from './RealisticAvatarModel';
import { Measurements } from './types';

interface HybridAvatarModelProps {
  measurements: Measurements;
  rotation: number;
}

// Fallback component that uses the original primitive-based avatar
const FallbackAvatar: React.FC<HybridAvatarModelProps> = ({ measurements, rotation }) => {
  return <AvatarModel measurements={measurements} rotation={rotation} />;
};

export const HybridAvatarModel: React.FC<HybridAvatarModelProps> = ({ 
  measurements, 
  rotation 
}) => {
  const [useRealistic, setUseRealistic] = useState(true);

  // Check if the model exists or use fallback after a timeout
  useEffect(() => {
    const checkModelExists = async () => {
      try {
        const response = await fetch('/models/avatar.glb');
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
    <ErrorBoundary FallbackComponent={() => <FallbackAvatar measurements={measurements} rotation={rotation} />}>
      {useRealistic ? (
        <RealisticAvatarModel measurements={measurements} rotation={rotation} />
      ) : (
        <FallbackAvatar measurements={measurements} rotation={rotation} />
      )}
    </ErrorBoundary>
  );
};

export default HybridAvatarModel;
