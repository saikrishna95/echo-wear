
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import CustomMannequin from './CustomMannequin';
import { MeasurementKey } from './types';

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
}

const SimplifiedHumanAvatar3D: React.FC<SimplifiedHumanAvatar3DProps> = ({ 
  measurements, 
  highlightedPart,
  rotation
}) => {
  // Convert measurements format to simplified record
  const simpleMeasurements: Record<MeasurementKey, number> = Object.entries(measurements).reduce(
    (acc, [key, data]) => {
      acc[key as MeasurementKey] = data.value;
      return acc;
    }, 
    {} as Record<MeasurementKey, number>
  );

  return (
    <div className="w-full h-full rounded-xl shadow-sm overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Canvas
        camera={{ position: [0, 0.9, 2], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting for realistic appearance */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        
        {/* Add subtle shadows */}
        <ContactShadows 
          opacity={0.5}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
          position={[0, -0.5, 0]}
        />
        
        {/* Mannequin model */}
        <CustomMannequin 
          measurements={simpleMeasurements} 
          rotation={rotation}
          highlightedPart={highlightedPart}
        />
        
        {/* Environment lighting */}
        <Environment preset="city" />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          minDistance={1.5}
          maxDistance={4}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      {/* Measurement indicator overlay */}
      {highlightedPart && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="bg-gray-800/70 text-white px-3 py-1 rounded-full text-xs">
            Editing: {measurements[highlightedPart].label}
          </span>
        </div>
      )}
    </div>
  );
};

export default SimplifiedHumanAvatar3D;
