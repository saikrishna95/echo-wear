
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReadyPlayerMeAvatar from './ReadyPlayerMeAvatar';
import { Measurements, ClothingItem, MeasurementKey } from './types';

interface HybridAvatarModelProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
  deviceSize?: "mobile" | "tablet" | "desktop";
  highlightedPart?: MeasurementKey | null;
}

// Simple empty fallback component
const FallbackComponent = () => {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

export const HybridAvatarModel: React.FC<HybridAvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = [],
  deviceSize = "mobile",
  highlightedPart = null
}) => {
  return (
    <ErrorBoundary FallbackComponent={() => <FallbackComponent />}>
      <ReadyPlayerMeAvatar 
        measurements={measurements} 
        rotation={rotation}
        selectedClothing={selectedClothing}
        deviceSize={deviceSize}
        highlightedPart={highlightedPart}
      />
    </ErrorBoundary>
  );
};

export default HybridAvatarModel;
