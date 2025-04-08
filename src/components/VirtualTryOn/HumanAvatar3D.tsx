
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import HybridAvatarModel from './HybridAvatarModel';
import { MeasurementKey, Measurements, ClothingItem } from './types';
import { useDeviceSize } from '../../hooks/use-mobile';

interface HumanAvatar3DProps {
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
  selectedClothing?: ClothingItem[];
}

// Camera configuration based on device size
const getCameraSettings = (deviceSize: "mobile" | "tablet" | "desktop") => {
  switch (deviceSize) {
    case "mobile":
      return { position: [0, 1.6, 3.2] as [number, number, number], fov: 35 };
    case "tablet":
      return { position: [0, 1.6, 3.5] as [number, number, number], fov: 40 };
    case "desktop":
      return { position: [0, 1.8, 4] as [number, number, number], fov: 45 };
    default:
      return { position: [0, 1.6, 3.2] as [number, number, number], fov: 35 };
  }
};

const HumanAvatar3D: React.FC<HumanAvatar3DProps> = ({ 
  measurements, 
  highlightedPart,
  rotation,
  selectedClothing = []
}) => {
  const deviceSize = useDeviceSize();
  const cameraSettings = getCameraSettings(deviceSize);
  
  // Convert measurements format to simplified record and log for debugging
  const simpleMeasurements: Measurements = Object.entries(measurements).reduce(
    (acc, [key, data]) => {
      acc[key as MeasurementKey] = data.value;
      return acc;
    }, 
    {} as Measurements
  );
  
  // Enhanced logging to debug measurement changes
  useEffect(() => {
    console.log("HumanAvatar3D measurements updated:", simpleMeasurements);
    if (highlightedPart) {
      console.log("Currently highlighted part:", highlightedPart, 
        "Value:", measurements[highlightedPart].value, 
        measurements[highlightedPart].unit);
    }
  }, [simpleMeasurements, highlightedPart, measurements]);

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
    <div className={`w-full h-full ${getContainerHeightClass()} rounded-xl overflow-hidden bg-gray-50 relative`}>
      <Canvas
        style={{ background: 'transparent' }}
        camera={{ 
          position: cameraSettings.position, 
          fov: cameraSettings.fov 
        }}
      >
        {/* Enhanced lighting for better visualization */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={0.5} color="#ffffff" />
        
        {/* Hybrid Avatar model with highlighted part */}
        <HybridAvatarModel 
          measurements={simpleMeasurements} 
          rotation={rotation}
          selectedClothing={selectedClothing}
          deviceSize={deviceSize}
          highlightedPart={highlightedPart}
        />
        
        {/* Environment lighting for better material rendering */}
        <Environment preset="city" />
        
        {/* Camera controls - adjusted for better view of the avatar */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0.5, 0] as [number, number, number]}
        />
      </Canvas>
      
      {/* Enhanced measurement indicator overlay */}
      {highlightedPart && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="bg-gray-800/80 text-white px-4 py-2 rounded-full text-sm font-medium">
            Editing: {measurements[highlightedPart].label} - {measurements[highlightedPart].value}{measurements[highlightedPart].unit}
          </span>
        </div>
      )}
    </div>
  );
};

export default HumanAvatar3D;
