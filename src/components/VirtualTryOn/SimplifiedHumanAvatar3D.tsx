
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, SoftShadows } from '@react-three/drei';
import { MeasurementKey, ClothingItem } from './types';
import { ErrorBoundary } from 'react-error-boundary';
import { useDeviceSize } from '../../hooks/use-mobile';
import ReadyPlayerMeAvatar from './ReadyPlayerMeAvatar';

// Enable soft shadows using the component approach
const EnableSoftShadows = () => {
  return <SoftShadows size={25} samples={16} />;
};

interface SimplifiedHumanAvatar3DProps {
  measurements: {
    [key in MeasurementKey]: {
      value: number;
      min: number;
      max: number;
      unit: string;
      label: string;
      category: "upper" | "lower" | "general";
    };
  };
  highlightedPart: MeasurementKey | null;
  rotation: number;
  selectedClothing?: ClothingItem[]; // Added this prop
}

// Fallback component if 3D rendering fails
const FallbackAvatar = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div className="text-center p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">3D Avatar</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Unable to load 3D avatar. Please try again later.
        </p>
      </div>
    </div>
  );
};

// Camera configuration based on device size - adjusted to point higher
const getCameraSettings = (deviceSize: "mobile" | "tablet" | "desktop") => {
  switch (deviceSize) {
    case "mobile":
      return { position: [0, 1.4, 3.5] as [number, number, number], fov: 35 };
    case "tablet":
      return { position: [0, 1.5, 3.8] as [number, number, number], fov: 40 };
    case "desktop":
      return { position: [0, 1.6, 4.2] as [number, number, number], fov: 45 };
    default:
      return { position: [0, 1.4, 3.5] as [number, number, number], fov: 35 };
  }
};

const SimplifiedHumanAvatar3D: React.FC<SimplifiedHumanAvatar3DProps> = ({ 
  measurements, 
  highlightedPart,
  rotation,
  selectedClothing = [] // Provide default empty array
}) => {
  const deviceSize = useDeviceSize();
  const cameraSettings = getCameraSettings(deviceSize);
  
  // Convert measurements format to simplified record
  const simpleMeasurements: Record<MeasurementKey, number> = Object.entries(measurements).reduce(
    (acc, [key, data]) => {
      acc[key as MeasurementKey] = data.value;
      return acc;
    }, 
    {} as Record<MeasurementKey, number>
  );

  // Get responsive container class based on device size
  const getContainerHeightClass = () => {
    switch (deviceSize) {
      case "mobile":
        return "max-h-[500px] min-h-[400px]";
      case "tablet":
        return "max-h-[600px] min-h-[450px]";
      case "desktop":
        return "max-h-[700px] min-h-[500px]";
      default:
        return "max-h-[500px]";
    }
  };

  return (
    <div className={`w-full h-full ${getContainerHeightClass()} rounded-xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
      <ErrorBoundary FallbackComponent={FallbackAvatar}>
        <Canvas
          shadows
          camera={{ 
            position: cameraSettings.position, 
            fov: cameraSettings.fov 
          }}
        >
          <React.Suspense fallback={null}>
            {/* Enable soft shadows using component */}
            <EnableSoftShadows />
            
            {/* Enhanced realistic lighting */}
            <ambientLight intensity={0.5} />
            <spotLight 
              position={[5, 5, 5]} 
              angle={0.3} 
              penumbra={0.8} 
              intensity={0.8} 
              castShadow 
              shadow-mapSize={1024}
            />
            <pointLight position={[-5, 5, -5]} intensity={0.5} />
            
            <ReadyPlayerMeAvatar 
              measurements={simpleMeasurements} 
              rotation={rotation}
              deviceSize={deviceSize}
              highlightedPart={highlightedPart}
              selectedClothing={selectedClothing} // Pass the prop to ReadyPlayerMeAvatar
            />
            
            {/* Contact shadows for better grounding */}
            <ContactShadows 
              opacity={0.4} 
              scale={10} 
              blur={2.5} 
              far={5} 
              resolution={128} 
              color="#000000" 
              position={[0, -1.5, 0]}
            />
            
            {/* Environment lighting - studio setting for more realistic look */}
            <Environment preset="studio" />
            
            {/* Camera controls - adjusted for better head centering */}
            <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              enableRotate={true}
              minDistance={2}
              maxDistance={5}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.8} // Limit vertical rotation
              target={[0, 1, 0] as [number, number, number]} // Raised target from 0.5 to 1 to focus on head
            />
          </React.Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {/* Measurement indicator overlay */}
      {highlightedPart && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="bg-gray-800/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm shadow-md">
            Editing: {measurements[highlightedPart].label}
          </span>
        </div>
      )}
    </div>
  );
};

export default SimplifiedHumanAvatar3D;
