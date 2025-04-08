
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
  const modelRef = useRef<THREE.Object3D>();
  const { camera } = useThree();
  
  // Use the mannequin.glb model which is available in the project
  const { scene, nodes, materials } = useGLTF('/models/mannequin.glb', false) as any;
  
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

  // Get model position based on device size and height
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
    if (group.current && scene) {
      // Remove previous mannequin
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Create a copy of the scene to modify
      const model = scene.clone();
      modelRef.current = model;
      
      // Calculate scaling factors based on measurements
      const heightFactor = measurements.height / 175; // Base height is 175cm
      const weightFactor = measurements.weight / 70;  // Base weight is 70kg
      const chestFactor = measurements.chest / 95;    // Base chest is 95cm
      const waistFactor = measurements.waist / 85;    // Base waist is 85cm
      const hipsFactor = measurements.hips / 95;      // Base hips is 95cm
      const shoulderFactor = measurements.shoulder / 45; // Base shoulder is 45cm
      const stomachFactor = measurements.stomach / 88;   // Base stomach is 88cm
      const thighFactor = measurements.thigh / 55;      // Base thigh is 55cm
      const neckFactor = measurements.neck / 38;         // Base neck is 38cm
      
      console.log("Applying realistic avatar measurements:", {
        heightFactor, 
        weightFactor, 
        chestFactor, 
        waistFactor, 
        hipsFactor,
        shoulderFactor,
        stomachFactor,
        thighFactor,
        neckFactor
      });
      
      // Apply overall model scaling for better proportions
      model.scale.set(
        0.18 * (shoulderFactor * 0.7 + chestFactor * 0.3), // X-axis width influenced by shoulders and chest
        0.18 * heightFactor,                               // Y-axis height
        0.18 * (waistFactor * 0.5 + stomachFactor * 0.3 + hipsFactor * 0.2) // Z-axis depth
      );
      
      // Apply body-specific scaling to each body part
      model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          // Apply specific scaling to body parts based on their names
          const name = child.name.toLowerCase();
          
          if (name.includes('torso') || name.includes('chest')) {
            child.scale.x = chestFactor * 1.3; // Amplify the effect
            child.scale.z = chestFactor * 1.3;
          }
          else if (name.includes('waist')) {
            child.scale.x = waistFactor * 1.3;
            child.scale.z = waistFactor * 1.3;
          }
          else if (name.includes('hip') || name.includes('pelvis')) {
            child.scale.x = hipsFactor * 1.3;
            child.scale.z = hipsFactor * 1.3;
          }
          else if (name.includes('shoulder')) {
            child.scale.x = shoulderFactor * 1.4; // More pronounced
          }
          else if (name.includes('stomach') || name.includes('belly')) {
            child.scale.x = stomachFactor * 1.3;
            child.scale.z = stomachFactor * 1.3;
          }
          else if (name.includes('leg') || name.includes('thigh')) {
            child.scale.x = thighFactor * 1.3;
            child.scale.z = thighFactor * 1.3;
          }
          else if (name.includes('neck')) {
            child.scale.x = neckFactor * 1.2;
            child.scale.z = neckFactor * 1.2;
          }
          else if (name.includes('arm')) {
            child.scale.x = weightFactor * 1.2;
            child.scale.z = weightFactor * 1.2;
          }
        }
      });
      
      // Position model for better visibility - aligned with bottom of view
      model.position.set(0, getModelPositionY(), 0);
      
      // Apply rotation
      model.rotation.y = (rotation * Math.PI) / 180;
      
      // Add model to group
      group.current.add(model);
    }
  }, [measurements, rotation, camera, scene, selectedClothing, deviceSize]);

  // Animation to slightly rotate for better viewing and smooth breathing
  useFrame((state) => {
    if (modelRef.current) {
      // Add subtle breathing animation
      const t = state.clock.getElapsedTime();
      modelRef.current.position.y = getModelPositionY() + Math.sin(t * 0.5) * 0.01;
    }
  });

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default RealisticAvatarModel;
