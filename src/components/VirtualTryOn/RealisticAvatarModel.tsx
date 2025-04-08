
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
      
      // Apply optimal scaling to match reference image
      model.scale.set(
        heightFactor * 0.18 * (0.8 + weightFactor * 0.2), // Width scaled by height and weight
        heightFactor * 0.18,                              // Height scaled by height
        heightFactor * 0.18 * (0.8 + weightFactor * 0.2)  // Depth scaled by height and weight
      );
      
      // Apply body-specific scaling if model has named parts
      model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          // Apply specific scaling to body parts based on their names
          const name = child.name.toLowerCase();
          
          if (name.includes('torso') || name.includes('chest')) {
            child.scale.x *= chestFactor;
            child.scale.z *= chestFactor;
          }
          else if (name.includes('waist')) {
            child.scale.x *= waistFactor;
            child.scale.z *= waistFactor;
          }
          else if (name.includes('hip')) {
            child.scale.x *= hipsFactor;
            child.scale.z *= hipsFactor;
          }
        }
      });
      
      // Position model for better visibility - aligned with bottom of view
      model.position.set(0, getModelPositionY(), 0);
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
    }
  }, [measurements, rotation, camera, model, selectedClothing, deviceSize]);

  // If this is a GLB model, highlight relevant body parts when a measurement is selected
  useFrame((state) => {
    if (group.current && model) {
      // Custom animation logic if needed
    }
  });

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default RealisticAvatarModel;
