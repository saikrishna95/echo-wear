
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

  // Create a simple human mesh using primitive shapes
  return (
    <group ref={group}>
      {/* Head */}
      <mesh position={[0, 1.7 * heightFactor, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1.6 * heightFactor, 0]} scale={[
        0.6 + measurements.neck / 100, 
        0.1, 
        0.6 + measurements.neck / 100
      ]}>
        <cylinderGeometry args={[0.07, 0.07, 0.2, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 1.25 * heightFactor, 0]} scale={[
        0.8 + measurements.chest / 200,
        0.7,
        0.5 + measurements.chest / 200
      ]}>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Waist/Stomach */}
      <mesh position={[0, 0.9 * heightFactor, 0]} scale={[
        0.7 + measurements.waist / 200,
        0.3,
        0.4 + measurements.stomach / 200
      ]}>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Hips */}
      <mesh position={[0, 0.7 * heightFactor, 0]} scale={[
        0.7 + measurements.hips / 200,
        0.2,
        0.4 + measurements.hips / 200
      ]}>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.35 - measurements.shoulder / 300, 1.3 * heightFactor, 0]} scale={[0.1, 0.6, 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.35 + measurements.shoulder / 300, 1.3 * heightFactor, 0]} scale={[0.1, 0.6, 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.15, 0.3 * heightFactor, 0]} scale={[
        0.2 + measurements.thigh / 300,
        (0.7 + measurements.inseam / 200),
        0.2 + measurements.thigh / 300
      ]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.15, 0.3 * heightFactor, 0]} scale={[
        0.2 + measurements.thigh / 300,
        (0.7 + measurements.inseam / 200),
        0.2 + measurements.thigh / 300
      ]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
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
        style={{ background: '#f9f9f9' }}
        camera={{ position: [0, 0, 2], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.7} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        
        <AvatarModel 
          measurements={simpleMeasurements} 
          rotation={rotation} 
        />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          // Lock rotation to Y axis only
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2}
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
