
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import CustomMannequin from './CustomMannequin';
import { MeasurementKey } from './types';
import { ErrorBoundary } from 'react-error-boundary';
import * as THREE from 'three';


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

// Fallback component if 3D rendering fails
const FallbackAvatar = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div className="text-center p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">3D Avatar</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Unable to load 3D avatar. Using basic mannequin instead.
        </p>
      </div>
    </div>
  );
};

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
      <ErrorBoundary FallbackComponent={FallbackAvatar}>
        <Canvas
          camera={{ position: [0, 1.5, 3], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            {/* Lighting for realistic appearance */}
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.2} />

            {/* Add the grid here */}
            <primitive object={new THREE.GridHelper(10, 10)} position={[0, -1, 0]} />
            
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
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
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

