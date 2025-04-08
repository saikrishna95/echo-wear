import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Measurements, ClothingItem } from './types';

interface RealisticAvatarModelProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
  deviceSize?: "mobile" | "tablet" | "desktop";
}

export const RealisticAvatarModel: React.FC<RealisticAvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = [],
  deviceSize = "mobile"
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Use the mannequin.glb model which is available in the project
  const { scene, nodes, materials } = useGLTF('/models/mannequin.glb', false) as any;
  
  // Create a copy of the scene to modify
  const model = scene?.clone();
  
  // Get position adjustment based on device size
  const getPositionY = () => {
    switch (deviceSize) {
      case "mobile":
        return -1.15;
      case "tablet":
        return -1.2;
      case "desktop":
        return -1.25;
      default:
        return -1.15;
    }
  };

  // Get model position based on device size
  const getModelPositionY = () => {
    switch (deviceSize) {
      case "mobile":
        return -1;
      case "tablet":
        return -1.05;
      case "desktop":
        return -1.1;
      default:
        return -1;
    }
  };
  
  useEffect(() => {
    if (group.current && model) {
      // Remove previous mannequin
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Add the model to the group
      group.current.add(model);
      
      // Apply optimal scaling to match reference image
      const heightFactor = measurements.height / 175; // Base height is 175cm
      model.scale.set(heightFactor * 0.18, heightFactor * 0.18, heightFactor * 0.18); // Adjusted scale
      
      // Position model for better visibility - aligned with bottom of view
      model.position.set(0, getModelPositionY(), 0);
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
    }
  }, [measurements, rotation, camera, model, selectedClothing, deviceSize]);

  // No animation - keep avatar static
  useFrame(() => {
    // Static positioning, no animation needed
  });

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default RealisticAvatarModel;
