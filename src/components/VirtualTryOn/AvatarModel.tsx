
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { Measurements } from './types';
import { useGLTF } from '@react-three/drei';
import { createAvatarClothingLayer } from './AvatarClothingLayer';
import { ClothingItem } from './types';

interface AvatarModelProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
  deviceSize?: "mobile" | "tablet" | "desktop";
}

export const AvatarModel: React.FC<AvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = [],
  deviceSize = "mobile"
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Use the mannequin model that we know is available in the project
  const { scene, nodes, materials } = useGLTF('/models/mannequin.glb', false) as any;
  
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
  
  useEffect(() => {
    if (group.current && scene) {
      // Clear any existing children
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Create a copy of the scene to modify
      const model = scene.clone();
      
      // Calculate scale factors based on measurements
      const heightFactor = measurements.height / 175; // Base height is 175cm
      const shoulderFactor = measurements.shoulder / 45; // Base shoulder width is 45cm
      const chestFactor = measurements.chest / 95; // Base chest is 95cm
      const waistFactor = measurements.waist / 85; // Base waist is 85cm
      const hipsFactor = measurements.hips / 95; // Base hips is 95cm
      
      console.log("Avatar measurements applied:", { 
        heightFactor, shoulderFactor, chestFactor, 
        waistFactor, hipsFactor
      });
      
      // Apply overall model scaling for better proportions
      model.scale.set(
        0.07 * (shoulderFactor * 0.7 + chestFactor * 0.3), // X-axis width 
        0.07 * heightFactor,                               // Y-axis height
        0.07 * (waistFactor * 0.5 + hipsFactor * 0.5)      // Z-axis depth
      );
      
      // Apply rotation
      model.rotation.y = (rotation * Math.PI) / 180;
      
      // Position model
      model.position.y = getPositionY();
      
      // Add the model to the group FIRST so it's behind the clothing
      group.current.add(model);
      
      // Add clothing layers if selected
      if (selectedClothing && selectedClothing.length > 0) {
        console.log("Adding clothing to avatar:", selectedClothing);
        
        // Create a separate group for clothing to better control positioning
        const clothingGroup = new THREE.Group();
        clothingGroup.position.y = getPositionY();
        
        selectedClothing.forEach(item => {
          console.log("Adding clothing item:", item);
          createAvatarClothingLayer(
            item,
            heightFactor,
            chestFactor,
            waistFactor,
            hipsFactor,
            clothingGroup
          );
        });
        
        // Add the clothing group to the main group
        group.current.add(clothingGroup);
      }
    }
  }, [measurements, rotation, camera, selectedClothing, deviceSize, scene]);

  // Add subtle breathing animation
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      // Add subtle breathing movement
      group.current.position.y = getPositionY() + Math.sin(t * 0.5) * 0.01;
    }
  });

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default AvatarModel;
