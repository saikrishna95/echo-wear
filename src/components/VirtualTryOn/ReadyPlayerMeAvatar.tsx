
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
  
  // Use the ReadyPlayerMe model
  const { scene } = useGLTF('https://models.readyplayer.me/67f534d65ec6a722636d42b4.glb');
  
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
      
      console.log("Applying ReadyPlayerMe avatar with height factor:", heightFactor);
      
      // Apply overall model scaling
      model.scale.set(
        0.8, // Base scale for the ReadyPlayerMe model
        0.8 * heightFactor, // Scale height based on measurements
        0.8
      );
      
      // Position model for better visibility
      model.position.set(0, getModelPositionY(), 0);
      
      // Apply rotation
      model.rotation.y = (rotation * Math.PI) / 180;
      
      // Add model to group
      group.current.add(model);
    }
  }, [measurements, rotation, camera, scene, selectedClothing, deviceSize]);

  // Animation and continuous updates
  useFrame((state) => {
    if (modelRef.current) {
      // Update rotation when it changes
      modelRef.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Add subtle breathing animation
      const t = state.clock.getElapsedTime();
      modelRef.current.position.y = getModelPositionY() + Math.sin(t * 0.5) * 0.01;
      
      // Highlight specific body parts if needed
      if (highlightedPart) {
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            // Reset all materials first
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                if (mat.emissive) mat.emissive.set(0x000000);
              });
            } else if (child.material.emissive) {
              child.material.emissive.set(0x000000);
            }
            
            // Apply highlighting based on part names in the model
            // Note: You'll need to adjust these based on actual model part names
            const name = child.name.toLowerCase();
            
            if ((highlightedPart === "chest" && 
                 (name.includes('chest') || name.includes('torso'))) ||
                (highlightedPart === "waist" && name.includes('waist')) ||
                (highlightedPart === "hips" && (name.includes('hip') || name.includes('pelvis'))) ||
                (highlightedPart === "shoulder" && name.includes('shoulder')) ||
                (highlightedPart === "stomach" && (name.includes('stomach') || name.includes('belly'))) ||
                (highlightedPart === "thigh" && (name.includes('thigh') || name.includes('leg'))) ||
                (highlightedPart === "neck" && name.includes('neck'))) {
              
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => {
                  if (mat.emissive) {
                    mat.emissive.set(0x666666);
                    mat.emissiveIntensity = 0.7;
                  }
                });
              } else if (child.material.emissive) {
                child.material.emissive.set(0x666666);
                child.material.emissiveIntensity = 0.7;
              }
            }
          }
        });
      }
    }
  });

  return <group ref={group} position={[0, getPositionY(), 0]} />;
};

export default ReadyPlayerMeAvatar;
