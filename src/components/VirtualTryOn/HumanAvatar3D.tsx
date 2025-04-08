
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import HybridAvatarModel from './HybridAvatarModel';
import { MeasurementKey, Measurements, ClothingItem } from './types';

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

const HumanAvatar3D: React.FC<HumanAvatar3DProps> = ({ 
  measurements, 
  highlightedPart,
  rotation,
  selectedClothing = []
}) => {
  // Convert measurements format to simplified record
  const simpleMeasurements: Measurements = Object.entries(measurements).reduce(
    (acc, [key, data]) => {
      acc[key as MeasurementKey] = data.value;
      return acc;
    }, 
    {} as Measurements
  );

  return (
    <div className="w-full h-full rounded-xl shadow-sm overflow-hidden bg-gray-50">
      <Canvas
        style={{ background: '#f8f8f8' }}
        camera={{ position: [0, -0.5, 4], fov: 40 }} // Adjusted camera position and FOV for better head visibility
      >
        {/* Improved lighting for more realistic appearance */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        
        {/* Add subtle shadows for more realism */}
        <ContactShadows 
          opacity={0.5}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
          position={[0, -2.2, 0]} // Match the mannequin's base position
        />
        
        {/* Hybrid Avatar model - uses realistic GLB if available, falls back to primitive */}
        <HybridAvatarModel 
          measurements={simpleMeasurements} 
          rotation={rotation}
          selectedClothing={selectedClothing}
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
          maxPolarAngle={Math.PI / 1.5}
          target={[0, -1.0, 0]} // Adjusted target to better frame the head
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

export default HumanAvatar3D;
