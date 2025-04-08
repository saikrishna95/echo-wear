
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
  
  // Log measurements for debugging
  useEffect(() => {
    console.log("RealisticAvatarModel measurements:", measurements);
  }, [measurements]);
  
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
    // Adjust position based on height factor
    const heightFactor = measurements.height / 175;
    
    switch (deviceSize) {
      case "mobile":
        return -1 * heightFactor;
      case "tablet":
        return -1.05 * heightFactor;
      case "desktop":
        return -1.1 * heightFactor;
      default:
        return -1 * heightFactor;
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
      
      // Calculate scaling factors based on measurements
      const heightFactor = measurements.height / 175; // Base height is 175cm
      const weightFactor = measurements.weight / 70;  // Base weight is 70kg
      const chestFactor = measurements.chest / 95;    // Base chest is 95cm
      const waistFactor = measurements.waist / 85;    // Base waist is 85cm
      const hipsFactor = measurements.hips / 95;      // Base hips is 95cm
      const shoulderFactor = measurements.shoulder / 45; // Base shoulder is 45cm
      const stomachFactor = measurements.stomach / 88;   // Base stomach is 88cm
      
      console.log("Applying realistic avatar measurements:", {
        heightFactor, 
        weightFactor, 
        chestFactor, 
        waistFactor, 
        hipsFactor,
        shoulderFactor,
        stomachFactor
      });
      
      // Apply more pronounced scaling for better visual feedback
      model.scale.set(
        heightFactor * 0.18 * (0.7 + weightFactor * 0.3), // More weight influence
        heightFactor * 0.18,
        heightFactor * 0.18 * (0.7 + weightFactor * 0.3)
      );
      
      // Apply body-specific scaling if model has named parts
      model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          // Apply specific scaling to body parts based on their names
          const name = child.name.toLowerCase();
          
          if (name.includes('torso') || name.includes('chest')) {
            child.scale.x = chestFactor * 1.2; // Amplify the effect
            child.scale.z = chestFactor * 1.2;
          }
          else if (name.includes('waist')) {
            child.scale.x = waistFactor * 1.2;
            child.scale.z = waistFactor * 1.2;
          }
          else if (name.includes('hip') || name.includes('pelvis')) {
            child.scale.x = hipsFactor * 1.2;
            child.scale.z = hipsFactor * 1.2;
          }
          else if (name.includes('shoulder')) {
            child.scale.x = shoulderFactor * 1.3; // More pronounced
          }
          else if (name.includes('stomach') || name.includes('belly')) {
            child.scale.x = stomachFactor * 1.2;
            child.scale.z = stomachFactor * 1.2;
          }
        }
      });
      
      // Position model for better visibility - aligned with bottom of view
      model.position.set(0, getModelPositionY(), 0);
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
    }
  }, [measurements, rotation, camera, model, selectedClothing, deviceSize]);

  // Animation to slightly rotate for better viewing
  useFrame((state) => {
    if (group.current && model) {
      // Optional: Add subtle breathing animation or gentle swaying
      const t = state.clock.getElapsedTime();
      if (group.current.rotation.y === (rotation * Math.PI) / 180) {
        // Only apply subtle movement if user hasn't manually rotated
        group.current.position.y = getPositionY() + Math.sin(t * 0.5) * 0.01; // Subtle up/down breathing
      }
    }
  });

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default RealisticAvatarModel;
