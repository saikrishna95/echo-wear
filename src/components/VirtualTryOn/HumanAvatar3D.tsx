
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
  const { camera } = useThree();
  
  // Create avatar parts directly with Three.js primitives
  useEffect(() => {
    if (group.current) {
      // Clear any existing children
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Scale factors based on measurements
      const heightFactor = measurements.height / 175; // Base height is 175cm
      const shoulderFactor = measurements.shoulder / 45; // Base shoulder width is 45cm
      const weightFactor = measurements.weight / 70;  // Base weight is 70kg
      const chestFactor = measurements.chest / 95; // Base chest is 95cm
      const waistFactor = measurements.waist / 85; // Base waist is 85cm
      const hipsFactor = measurements.hips / 95; // Base hips is 95cm
      
      // Create materials
      const skinMaterial = new THREE.MeshStandardMaterial({ 
        color: '#f2d2bd',
        roughness: 0.7
      });
      
      // Head
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.125 * heightFactor, 32, 32),
        skinMaterial
      );
      head.position.y = 0.75 * heightFactor;
      
      // Neck
      const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.07 * measurements.neck / 38, 
          0.08 * measurements.neck / 38, 
          0.1 * heightFactor, 
          16
        ),
        skinMaterial
      );
      neck.position.y = 0.7 * heightFactor;
      
      // Torso
      const torso = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.2 * shoulderFactor, // Upper width (shoulders)
          0.18 * waistFactor, // Lower width (waist)
          0.4 * heightFactor, // Height
          16
        ),
        skinMaterial
      );
      torso.position.y = 0.45 * heightFactor;
      
      // Hips
      const hips = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.18 * waistFactor, // Upper width (waist)
          0.22 * hipsFactor, // Lower width (hips)
          0.15 * heightFactor, // Height
          16
        ),
        skinMaterial
      );
      hips.position.y = 0.175 * heightFactor;
      
      // Left arm
      const leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.06 * weightFactor,
          0.05 * weightFactor,
          0.4 * heightFactor,
          16
        ),
        skinMaterial
      );
      leftArm.position.set(
        -0.25 * shoulderFactor,
        0.45 * heightFactor,
        0
      );
      leftArm.rotation.z = -Math.PI / 8;
      
      // Right arm
      const rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.06 * weightFactor,
          0.05 * weightFactor,
          0.4 * heightFactor,
          16
        ),
        skinMaterial
      );
      rightArm.position.set(
        0.25 * shoulderFactor,
        0.45 * heightFactor,
        0
      );
      rightArm.rotation.z = Math.PI / 8;
      
      // Left leg
      const leftLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09 * measurements.thigh / 55,
          0.07 * measurements.thigh / 55,
          0.5 * measurements.inseam / 80,
          16
        ),
        skinMaterial
      );
      leftLeg.position.set(
        -0.1 * hipsFactor,
        -0.1,
        0
      );
      
      // Right leg
      const rightLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09 * measurements.thigh / 55,
          0.07 * measurements.thigh / 55,
          0.5 * measurements.inseam / 80,
          16
        ),
        skinMaterial
      );
      rightLeg.position.set(
        0.1 * hipsFactor,
        -0.1,
        0
      );
      
      // Add all parts to the group
      group.current.add(head, neck, torso, hips, leftArm, rightArm, leftLeg, rightLeg);
      
      // Position the whole model
      group.current.position.y = -0.25;
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Adjust camera to focus on model
      const box = new THREE.Box3().setFromObject(group.current);
      const center = box.getCenter(new THREE.Vector3());
      camera.lookAt(center);
    }
  }, [measurements, rotation, camera]);

  return (
    <group ref={group} />
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
        {/* Improved lighting for more realistic appearance */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />
        
        {/* Avatar model */}
        <AvatarModel 
          measurements={simpleMeasurements} 
          rotation={rotation} 
        />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          minDistance={1.5}
          maxDistance={4}
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
