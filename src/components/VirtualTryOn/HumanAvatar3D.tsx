
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
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
      
      // Create materials with more realistic human appearance
      const skinMaterial = new THREE.MeshStandardMaterial({ 
        color: '#FDE1D3', // Soft peach skin tone
        roughness: 0.5,
        metalness: 0.1,
      });
      
      const hairMaterial = new THREE.MeshStandardMaterial({
        color: '#333333', // Dark hair
        roughness: 0.7,
        metalness: 0.1
      });
      
      const clothMaterial = new THREE.MeshStandardMaterial({
        color: '#9b87f5', // Purple clothing
        roughness: 0.5,
        metalness: 0.1
      });
      
      // Head
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.125 * heightFactor, 32, 32),
        skinMaterial
      );
      head.position.y = 0.75 * heightFactor;
      
      // Hair - simple cap-like shape
      const hair = new THREE.Mesh(
        new THREE.SphereGeometry(0.130 * heightFactor, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
        hairMaterial
      );
      hair.position.y = 0.79 * heightFactor;
      hair.rotation.x = Math.PI;
      
      // Face details - simple eyes
      const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.015 * heightFactor, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#FFFFFF' })
      );
      leftEye.position.set(-0.05 * heightFactor, 0.77 * heightFactor, 0.11 * heightFactor);
      
      const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.015 * heightFactor, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#FFFFFF' })
      );
      rightEye.position.set(0.05 * heightFactor, 0.77 * heightFactor, 0.11 * heightFactor);
      
      // Eye pupils
      const leftPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.007 * heightFactor, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#000000' })
      );
      leftPupil.position.set(-0.05 * heightFactor, 0.77 * heightFactor, 0.122 * heightFactor);
      
      const rightPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.007 * heightFactor, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#000000' })
      );
      rightPupil.position.set(0.05 * heightFactor, 0.77 * heightFactor, 0.122 * heightFactor);
      
      // Neck with more realistic shape
      const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.07 * measurements.neck / 38, 
          0.08 * measurements.neck / 38, 
          0.1 * heightFactor, 
          32
        ),
        skinMaterial
      );
      neck.position.y = 0.7 * heightFactor;
      
      // Upper body clothing (top/shirt) rather than bare skin
      const torso = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.20 * shoulderFactor, // Upper width (shoulders)
          0.18 * waistFactor, // Lower width (waist)
          0.4 * heightFactor, // Height
          32
        ),
        clothMaterial
      );
      torso.position.y = 0.45 * heightFactor;
      
      // Additional chest details for more human-like shape
      const chest = new THREE.Mesh(
        new THREE.SphereGeometry(0.21 * chestFactor / 95, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
        clothMaterial
      );
      chest.position.y = 0.55 * heightFactor;
      chest.position.z = 0.06 * heightFactor;
      chest.rotation.x = -Math.PI / 2;
      chest.scale.z = 0.7;
      
      // Lower clothing (pants/trousers)
      const hips = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.18 * waistFactor, // Upper width (waist)
          0.22 * hipsFactor, // Lower width (hips)
          0.15 * heightFactor, // Height
          32
        ),
        new THREE.MeshStandardMaterial({ color: '#7E69AB' }) // Darker purple for pants
      );
      hips.position.y = 0.175 * heightFactor;
      
      // Arms with better shape and joints
      // Left arm - upper
      const leftUpperArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.06 * weightFactor,
          0.055 * weightFactor,
          0.2 * heightFactor,
          32
        ),
        skinMaterial
      );
      leftUpperArm.position.set(
        -0.25 * shoulderFactor,
        0.55 * heightFactor,
        0
      );
      leftUpperArm.rotation.z = -Math.PI / 8;
      
      // Left arm - lower
      const leftLowerArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.055 * weightFactor,
          0.045 * weightFactor,
          0.2 * heightFactor,
          32
        ),
        skinMaterial
      );
      leftLowerArm.position.set(
        -0.32 * shoulderFactor,
        0.38 * heightFactor,
        0
      );
      leftLowerArm.rotation.z = -Math.PI / 6;
      
      // Left hand
      const leftHand = new THREE.Mesh(
        new THREE.SphereGeometry(0.04 * weightFactor, 16, 16),
        skinMaterial
      );
      leftHand.position.set(
        -0.39 * shoulderFactor,
        0.25 * heightFactor,
        0
      );
      
      // Right arm - upper
      const rightUpperArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.06 * weightFactor,
          0.055 * weightFactor,
          0.2 * heightFactor,
          32
        ),
        skinMaterial
      );
      rightUpperArm.position.set(
        0.25 * shoulderFactor,
        0.55 * heightFactor,
        0
      );
      rightUpperArm.rotation.z = Math.PI / 8;
      
      // Right arm - lower
      const rightLowerArm = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.055 * weightFactor,
          0.045 * weightFactor,
          0.2 * heightFactor,
          32
        ),
        skinMaterial
      );
      rightLowerArm.position.set(
        0.32 * shoulderFactor,
        0.38 * heightFactor,
        0
      );
      rightLowerArm.rotation.z = Math.PI / 6;
      
      // Right hand
      const rightHand = new THREE.Mesh(
        new THREE.SphereGeometry(0.04 * weightFactor, 16, 16),
        skinMaterial
      );
      rightHand.position.set(
        0.39 * shoulderFactor,
        0.25 * heightFactor,
        0
      );
      
      // Legs with better joints and shape
      // Left leg - upper (thigh)
      const leftThigh = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09 * measurements.thigh / 55,
          0.08 * measurements.thigh / 55,
          0.25 * measurements.inseam / 80,
          32
        ),
        new THREE.MeshStandardMaterial({ color: '#7E69AB' }) // Pants color
      );
      leftThigh.position.set(
        -0.1 * hipsFactor,
        0.05 * heightFactor,
        0
      );
      
      // Left leg - lower (calf)
      const leftCalf = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.07 * measurements.thigh / 55,
          0.05 * measurements.thigh / 55,
          0.25 * measurements.inseam / 80,
          32
        ),
        new THREE.MeshStandardMaterial({ color: '#7E69AB' }) // Pants color
      );
      leftCalf.position.set(
        -0.1 * hipsFactor,
        -0.2 * heightFactor,
        0
      );
      
      // Left foot
      const leftFoot = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.08 * heightFactor,
          0.04 * heightFactor,
          0.12 * heightFactor
        ),
        new THREE.MeshStandardMaterial({ color: '#111111' }) // Dark shoes
      );
      leftFoot.position.set(
        -0.1 * hipsFactor,
        -0.37 * heightFactor,
        0.04 * heightFactor
      );
      
      // Right leg - upper (thigh)
      const rightThigh = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09 * measurements.thigh / 55,
          0.08 * measurements.thigh / 55,
          0.25 * measurements.inseam / 80,
          32
        ),
        new THREE.MeshStandardMaterial({ color: '#7E69AB' }) // Pants color
      );
      rightThigh.position.set(
        0.1 * hipsFactor,
        0.05 * heightFactor,
        0
      );
      
      // Right leg - lower (calf)
      const rightCalf = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.07 * measurements.thigh / 55,
          0.05 * measurements.thigh / 55,
          0.25 * measurements.inseam / 80,
          32
        ),
        new THREE.MeshStandardMaterial({ color: '#7E69AB' }) // Pants color
      );
      rightCalf.position.set(
        0.1 * hipsFactor,
        -0.2 * heightFactor,
        0
      );
      
      // Right foot
      const rightFoot = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.08 * heightFactor,
          0.04 * heightFactor,
          0.12 * heightFactor
        ),
        new THREE.MeshStandardMaterial({ color: '#111111' }) // Dark shoes
      );
      rightFoot.position.set(
        0.1 * hipsFactor,
        -0.37 * heightFactor,
        0.04 * heightFactor
      );
      
      // Add all parts to the group
      group.current.add(
        head, hair, leftEye, rightEye, leftPupil, rightPupil, 
        neck, torso, chest, hips, 
        leftUpperArm, leftLowerArm, leftHand,
        rightUpperArm, rightLowerArm, rightHand,
        leftThigh, leftCalf, leftFoot,
        rightThigh, rightCalf, rightFoot
      );
      
      // Position the whole model
      group.current.position.y = -0.1;
      
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
        
        {/* Add subtle shadows for more realism */}
        <ContactShadows 
          opacity={0.5}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
          position={[0, -0.5, 0]}
        />
        
        {/* Avatar model */}
        <AvatarModel 
          measurements={simpleMeasurements} 
          rotation={rotation} 
        />
        
        {/* Environment lighting for better material rendering */}
        <Environment preset="city" />
        
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
