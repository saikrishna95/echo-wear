
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Measurements, ClothingItem, MeasurementKey } from './types';

interface ReadyPlayerMeAvatarProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
  deviceSize?: "mobile" | "tablet" | "desktop";
  highlightedPart?: MeasurementKey | null;
}

export const ReadyPlayerMeAvatar: React.FC<ReadyPlayerMeAvatarProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = [],
  deviceSize = "mobile",
  highlightedPart = null
}) => {
  const group = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D>();
  const { camera } = useThree();
  
  // Use the custom model file - note the path to our new model
  const { scene, nodes, materials } = useGLTF('/models/Model_in_Underwear_0415163210_texture.glb', false) as any;
  
  // Log measurements for debugging
  useEffect(() => {
    console.log("ReadyPlayerMeAvatar measurements:", measurements);
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
      // Remove previous model
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
      
      console.log("Applying measurements to model:", {
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
        0.07 * (shoulderFactor * 0.7 + chestFactor * 0.3), // X-axis width influenced by shoulders and chest
        0.07 * heightFactor,                               // Y-axis height
        0.07 * (waistFactor * 0.5 + stomachFactor * 0.3 + hipsFactor * 0.2) // Z-axis depth
      );
      
      // Apply rotation
      model.rotation.y = (rotation * Math.PI) / 180;
      
      // Position model for better visibility
      model.position.set(0, getModelPositionY(), 0);
      
      // Add model to group
      group.current.add(model);
      
      // Apply highlighting if applicable
      if (highlightedPart) {
        console.log("Highlighting part:", highlightedPart);
        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            // Remove any previous highlighting
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.set(0x000000);
            }
            
            // Apply highlighting based on the body part name
            const name = child.name.toLowerCase();
            
            if ((highlightedPart === "chest" && 
                (name.includes('chest') || name.includes('torso'))) ||
                (highlightedPart === "waist" && name.includes('waist')) ||
                (highlightedPart === "hips" && (name.includes('hip') || name.includes('pelvis'))) ||
                (highlightedPart === "shoulder" && name.includes('shoulder')) ||
                (highlightedPart === "stomach" && (name.includes('stomach') || name.includes('belly'))) ||
                (highlightedPart === "thigh" && (name.includes('thigh') || name.includes('leg'))) ||
                (highlightedPart === "neck" && name.includes('neck'))) {
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.emissive.set(0x2266CC);
                child.material.emissiveIntensity = 0.3;
              }
            }
          }
        });
      }
    }
  }, [measurements, rotation, camera, scene, selectedClothing, deviceSize, highlightedPart]);

  // Animation for subtle movement
  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      modelRef.current.position.y = getModelPositionY() + Math.sin(t * 0.5) * 0.01;
    }
  });

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default ReadyPlayerMeAvatar;
