
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Define the measurement types
type MeasurementKey = 
  | "neck" 
  | "shoulder"
  | "chest"
  | "waist"
  | "stomach"
  | "hips"
  | "thigh"
  | "inseam"
  | "height"
  | "weight";

type Measurements = Record<MeasurementKey, number>;

interface AvatarModelProps {
  measurements: Measurements;
  rotation: number;
}

function AvatarModel({ measurements, rotation }: AvatarModelProps) {
  const group = useRef<THREE.Group>(null);
  
  // Calculate scaling factors based on measurements
  const heightFactor = measurements.height / 175; // Base height is 175cm
  const weightFactor = measurements.weight / 70;  // Base weight is 70kg
  
  // Adjust body parts based on measurements
  useEffect(() => {
    if (group.current) {
      // Apply overall height scaling
      group.current.scale.y = heightFactor;
      
      // Apply width scaling based on shoulder width
      const shoulderFactor = measurements.shoulder / 45;
      group.current.scale.x = shoulderFactor;
      
      // Apply depth scaling based on weight and chest
      const depthFactor = (weightFactor + measurements.chest / 95) / 2;
      group.current.scale.z = depthFactor;
    }
  }, [measurements, heightFactor, weightFactor]);
  
  // Handle manual rotation
  useEffect(() => {
    if (group.current) {
      group.current.rotation.y = (rotation * Math.PI) / 180;
    }
  }, [rotation]);

  return (
    <group ref={group}>
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.125, 32, 32]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.05 * (1 + measurements.neck/150), 0.06 * (1 + measurements.neck/150), 0.1, 32]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>
      
      {/* Shoulders */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.05, 32]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Upper Torso (chest) */}
      <mesh position={[0, 1.35, 0]}>
        <capsuleGeometry args={[0.21 * (1 + measurements.chest/300), 0.3, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Mid Torso (waist) */}
      <mesh position={[0, 1.15, 0]}>
        <capsuleGeometry args={[0.19 * (1 + measurements.waist/300), 0.2, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Lower Torso (stomach) */}
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.2 * (1 + measurements.stomach/300), 0.2, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.75, 0]}>
        <capsuleGeometry args={[0.22 * (1 + measurements.hips/300), 0.25, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Left Shoulder */}
      <mesh position={[-0.22 * (1 + measurements.shoulder/200), 1.45, 0]} rotation={[0, 0, Math.PI/8]}>
        <capsuleGeometry args={[0.05, 0.15, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[0.22 * (1 + measurements.shoulder/200), 1.45, 0]} rotation={[0, 0, -Math.PI/8]}>
        <capsuleGeometry args={[0.05, 0.15, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.3 * (1 + measurements.shoulder/200), 1.35, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.3 * (1 + measurements.shoulder/200), 1.35, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.05, 0.3, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Left Forearm */}
      <mesh position={[-0.35 * (1 + measurements.shoulder/300), 1.1, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.045, 0.25, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Right Forearm */}
      <mesh position={[0.35 * (1 + measurements.shoulder/300), 1.1, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.045, 0.25, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Left Hand */}
      <mesh position={[-0.38 * (1 + measurements.shoulder/300), 0.9, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Right Hand */}
      <mesh position={[0.38 * (1 + measurements.shoulder/300), 0.9, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Left Thigh */}
      <mesh position={[-0.12, 0.55, 0]} rotation={[0, 0, 0.05]}>
        <capsuleGeometry args={[0.08 * (1 + measurements.thigh/300), 0.3, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Right Thigh */}
      <mesh position={[0.12, 0.55, 0]} rotation={[0, 0, -0.05]}>
        <capsuleGeometry args={[0.08 * (1 + measurements.thigh/300), 0.3, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Left Calf */}
      <mesh position={[-0.13, 0.25, 0]} rotation={[0, 0, 0.05]}>
        <capsuleGeometry args={[0.06 * (1 + measurements.thigh/400), 0.3 + measurements.inseam/300, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Right Calf */}
      <mesh position={[0.13, 0.25, 0]} rotation={[0, 0, -0.05]}>
        <capsuleGeometry args={[0.06 * (1 + measurements.thigh/400), 0.3 + measurements.inseam/300, 8, 16]} />
        <meshStandardMaterial color="#f2d2bd" />
      </mesh>

      {/* Left Foot */}
      <mesh position={[-0.13, 0.05, 0.05]}>
        <boxGeometry args={[0.07, 0.04, 0.15]} />
        <meshStandardMaterial color="#d3a27d" />
      </mesh>

      {/* Right Foot */}
      <mesh position={[0.13, 0.05, 0.05]}>
        <boxGeometry args={[0.07, 0.04, 0.15]} />
        <meshStandardMaterial color="#d3a27d" />
      </mesh>
    </group>
  );
}

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
}

const HumanAvatar3D: React.FC<HumanAvatar3DProps> = ({ 
  measurements, 
  highlightedPart,
  rotation 
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
        camera={{ position: [0, 0.9, 2], fov: 45 }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        
        <AvatarModel 
          measurements={simpleMeasurements} 
          rotation={rotation} 
        />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          // Set reasonable limits for orbit controls
          minDistance={1.5}
          maxDistance={4}
          // Allow more natural rotation
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
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
