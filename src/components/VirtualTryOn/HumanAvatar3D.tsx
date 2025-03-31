
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
  const { scene, camera } = useThree();
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the 3D model
  const { scene: modelScene } = useGLTF('/avatar.glb');

  // Apply measurements-based scaling and rotation
  useEffect(() => {
    if (group.current) {
      // Base scaling factors
      const heightFactor = measurements.height / 175; // Base height is 175cm
      const shoulderFactor = measurements.shoulder / 45; // Base shoulder width is 45cm
      const weightFactor = measurements.weight / 70;  // Base weight is 70kg
      
      // Apply overall scaling based on height
      group.current.scale.y = heightFactor;
      
      // Apply width scaling based on shoulder width
      group.current.scale.x = shoulderFactor;
      
      // Apply depth scaling based on weight and chest
      const depthFactor = (weightFactor + measurements.chest / 95) / 2;
      group.current.scale.z = depthFactor;
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;

      // Center camera on model when it loads
      if (modelLoaded) {
        const box = new THREE.Box3().setFromObject(group.current);
        const center = box.getCenter(new THREE.Vector3());
        camera.lookAt(center);
      }
    }
  }, [measurements, rotation, camera, modelLoaded]);

  // Model initialization
  useEffect(() => {
    if (group.current && modelScene) {
      // Clone the model scene to avoid modifying the cached original
      const model = modelScene.clone();
      
      // Clear any existing children
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Add the model to our group
      group.current.add(model);
      
      // Adjust model position if needed
      model.position.y = -0.9; // Adjust based on your model's center point
      
      setModelLoaded(true);
    }
  }, [modelScene]);

  // Fallback model if GLB fails to load
  const createFallbackModel = () => {
    if (!modelLoaded && group.current) {
      // Skin color
      const skinColor = "#f2d2bd";
      
      // Create a simple humanoid figure
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.125, 32, 32),
        new THREE.MeshStandardMaterial({ color: skinColor })
      );
      head.position.y = 1.65;
      
      const torso = new THREE.Mesh(
        new THREE.BoxGeometry(
          0.4 * (measurements.shoulder/45), 
          0.5, 
          0.25 * (measurements.chest/95)
        ),
        new THREE.MeshStandardMaterial({ color: skinColor })
      );
      torso.position.y = 1.25;
      
      group.current.add(head, torso);
    }
  };
  
  // If model fails to load, use fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!modelLoaded) {
        createFallbackModel();
        console.warn("GLB model failed to load, using fallback model");
      }
    }, 3000); // Wait 3 seconds before showing fallback
    
    return () => clearTimeout(timer);
  }, [modelLoaded]);

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
