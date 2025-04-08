
import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AvatarModel from './AvatarModel';
import { RealisticAvatarModel } from './RealisticAvatarModel';
import ReadyPlayerMeAvatar from './ReadyPlayerMeAvatar';
import { Measurements, ClothingItem, MeasurementKey } from './types';

interface HybridAvatarModelProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
  deviceSize?: "mobile" | "tablet" | "desktop";
  highlightedPart?: MeasurementKey | null;
}

// Fallback component that uses the original primitive-based avatar
const FallbackAvatar: React.FC<HybridAvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing,
  deviceSize,
  highlightedPart
}) => {
  return <AvatarModel 
    measurements={measurements} 
    rotation={rotation}
    selectedClothing={selectedClothing}
    deviceSize={deviceSize}
  />;
};

export const HybridAvatarModel: React.FC<HybridAvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = [],
  deviceSize = "mobile",
  highlightedPart = null
}) => {
  // Options: "readyplayerme", "realistic", "primitive"
  const [modelType, setModelType] = useState("readyplayerme");

  // Check for model availability and switch to the appropriate one
  useEffect(() => {
    const checkModelExists = async () => {
      try {
        // Try to load the ReadyPlayerMe model
        const rpmResponse = await fetch('https://models.readyplayer.me/67f534d65ec6a722636d42b4.glb', { method: 'HEAD' });
        if (rpmResponse.ok) {
          setModelType("readyplayerme");
          console.log('Using ReadyPlayerMe model');
          return;
        }
      } catch (error) {
        console.log('Error loading ReadyPlayerMe model:', error);
      }
      
      try {
        // Fallback to mannequin.glb if ReadyPlayerMe fails
        const mannequinResponse = await fetch('/models/mannequin.glb', { method: 'HEAD' });
        if (mannequinResponse.ok) {
          setModelType("realistic");
          console.log('Using realistic mannequin model');
          return;
        }
      } catch (error) {
        console.log('Error loading GLB model:', error);
      }
      
      // Fallback to primitive model if both fail
      setModelType("primitive");
      console.log('Using primitive fallback');
    };
    
    checkModelExists();
    
    // Also set a timeout fallback in case loading takes too long
    const timer = setTimeout(() => {
      setModelType((current) => {
        if (current !== "primitive") {
          console.log('Timed out loading models, using primitive fallback');
          return "primitive";
        }
        return current;
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Select the appropriate model component
  const renderModel = () => {
    switch (modelType) {
      case "readyplayerme":
        return (
          <ReadyPlayerMeAvatar 
            measurements={measurements} 
            rotation={rotation}
            selectedClothing={selectedClothing}
            deviceSize={deviceSize}
            highlightedPart={highlightedPart}
          />
        );
      case "realistic":
        return (
          <RealisticAvatarModel 
            measurements={measurements} 
            rotation={rotation}
            selectedClothing={selectedClothing}
            deviceSize={deviceSize}
          />
        );
      case "primitive":
      default:
        return (
          <FallbackAvatar 
            measurements={measurements} 
            rotation={rotation}
            selectedClothing={selectedClothing}
            deviceSize={deviceSize}
            highlightedPart={highlightedPart}
          />
        );
    }
  };

  // ErrorBoundary to catch errors in model rendering
  return (
    <ErrorBoundary FallbackComponent={() => (
      <FallbackAvatar 
        measurements={measurements} 
        rotation={rotation}
        selectedClothing={selectedClothing}
        deviceSize={deviceSize}
        highlightedPart={highlightedPart}
      />
    )}>
      {renderModel()}
    </ErrorBoundary>
  );
};

export default HybridAvatarModel;
