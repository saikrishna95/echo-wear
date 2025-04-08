
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
  
  // Use the doctor-like ReadyPlayerMe model
  const { scene } = useGLTF('https://models.readyplayer.me/67f534d65ec6a722636d42b4.glb', true);
  
  // Debug logs for measurements
  useEffect(() => {
    console.log("ReadyPlayerMeAvatar measurements:", measurements);
  }, [measurements]);
  
  // Get position adjustment based on device size
  const getPositionY = () => {
    switch (deviceSize) {
      case "mobile":
        return -0.9; // Adjusted to match the image (higher position)
      case "tablet":
        return -0.95;
      case "desktop":
        return -1.0;
      default:
        return -0.9;
    }
  };

  // Get model position based on device size and height
  const getModelPositionY = () => {
    // Adjust position based on height factor
    const heightFactor = measurements.height / 175;
    
    switch (deviceSize) {
      case "mobile":
        return -0.75 * heightFactor; // Adjusted to move the avatar higher
      case "tablet":
        return -0.8 * heightFactor;
      case "desktop":
        return -0.85 * heightFactor;
      default:
        return -0.75 * heightFactor;
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
      
      // Apply overall model scaling - adjusted to match the image
      model.scale.set(
        0.85, // Slightly wider
        0.85 * heightFactor, // Scale height based on measurements
        0.85
      );
      
      // Position model for better visibility - adjusted to match the image
      model.position.set(0, getModelPositionY(), 0);
      
      // Apply rotation
      model.rotation.y = (rotation * Math.PI) / 180;
      
      // Apply default clothing textures to match the image
      model.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                // Make coat white if it's outerwear
                if (child.name.toLowerCase().includes('coat') || 
                    child.name.toLowerCase().includes('jacket') ||
                    child.name.toLowerCase().includes('outerwear')) {
                  mat.color.set('#ffffff'); // White coat
                  mat.roughness = 0.7;
                  mat.metalness = 0.1;
                }
                // Make shirt white
                else if (child.name.toLowerCase().includes('shirt') || 
                         child.name.toLowerCase().includes('top')) {
                  mat.color.set('#ffffff'); // White shirt
                  mat.roughness = 0.6;
                  mat.metalness = 0.05;
                }
                // Make pants gray
                else if (child.name.toLowerCase().includes('pant') || 
                         child.name.toLowerCase().includes('trouser') || 
                         child.name.toLowerCase().includes('bottom')) {
                  mat.color.set('#707070'); // Gray pants
                  mat.roughness = 0.7;
                  mat.metalness = 0.05;
                }
                // Make shoes dark gray
                else if (child.name.toLowerCase().includes('shoe') || 
                         child.name.toLowerCase().includes('boot') || 
                         child.name.toLowerCase().includes('footwear')) {
                  mat.color.set('#3a3a3a'); // Dark gray shoes
                  mat.roughness = 0.5;
                  mat.metalness = 0.2;
                }
                // Make gloves light blue (as in the image)
                else if (child.name.toLowerCase().includes('glove') || 
                         child.name.toLowerCase().includes('hand')) {
                  mat.color.set('#a8d1f0'); // Light blue gloves
                  mat.roughness = 0.6;
                  mat.metalness = 0.1;
                }
                
                // Improve skin material
                if (mat.name.toLowerCase().includes('skin') || 
                    child.name.toLowerCase().includes('face') || 
                    child.name.toLowerCase().includes('head')) {
                  mat.roughness = 0.7; 
                  mat.metalness = 0.1;
                  mat.envMapIntensity = 0.8;
                }
                // Improve hair material
                else if (mat.name.toLowerCase().includes('hair') || 
                         child.name.toLowerCase().includes('hair')) {
                  mat.roughness = 0.6;
                  mat.metalness = 0.1;
                  mat.color.set('#1a1a1a'); // Dark hair (almost black)
                }
                
                // Enable shadows for all meshes
                if (child.castShadow !== undefined) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            // Same material enhancements for non-array materials
            const mat = child.material;
            
            // Apply the same coloring logic for single materials
            if (child.name.toLowerCase().includes('coat') || 
                child.name.toLowerCase().includes('jacket') ||
                child.name.toLowerCase().includes('outerwear')) {
              mat.color.set('#ffffff'); // White coat
              mat.roughness = 0.7;
              mat.metalness = 0.1;
            }
            else if (child.name.toLowerCase().includes('shirt') || 
                     child.name.toLowerCase().includes('top')) {
              mat.color.set('#ffffff'); // White shirt
              mat.roughness = 0.6;
              mat.metalness = 0.05;
            }
            else if (child.name.toLowerCase().includes('pant') || 
                     child.name.toLowerCase().includes('trouser') || 
                     child.name.toLowerCase().includes('bottom')) {
              mat.color.set('#707070'); // Gray pants
              mat.roughness = 0.7;
              mat.metalness = 0.05;
            }
            else if (child.name.toLowerCase().includes('shoe') || 
                     child.name.toLowerCase().includes('boot') || 
                     child.name.toLowerCase().includes('footwear')) {
              mat.color.set('#3a3a3a'); // Dark gray shoes
              mat.roughness = 0.5;
              mat.metalness = 0.2;
            }
            else if (child.name.toLowerCase().includes('glove') || 
                     child.name.toLowerCase().includes('hand')) {
              mat.color.set('#a8d1f0'); // Light blue gloves
              mat.roughness = 0.6;
              mat.metalness = 0.1;
            }
            else if (mat.name.toLowerCase().includes('skin') || 
                     child.name.toLowerCase().includes('face') || 
                     child.name.toLowerCase().includes('head')) {
              mat.roughness = 0.7;
              mat.metalness = 0.1;
              mat.envMapIntensity = 0.8;
            }
            else if (mat.name.toLowerCase().includes('hair') || 
                     child.name.toLowerCase().includes('hair')) {
              mat.roughness = 0.6;
              mat.metalness = 0.1;
              mat.color.set('#1a1a1a'); // Dark hair
            }
            
            // Enable shadows
            if (child.castShadow !== undefined) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        }
      });
      
      // Add model to group
      group.current.add(model);
    }
  }, [measurements, rotation, camera, scene, selectedClothing, deviceSize]);

  // Animation and continuous updates
  useFrame((state) => {
    if (modelRef.current) {
      // Update rotation when it changes
      modelRef.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Add natural breathing animation
      const t = state.clock.getElapsedTime();
      const breathingAmplitude = 0.01; // Subtle breathing
      const breathingFrequency = 0.5; // Slow, natural breathing
      
      // Apply breathing animation
      modelRef.current.position.y = getModelPositionY() + Math.sin(t * breathingFrequency) * breathingAmplitude;
      
      // Very subtle shoulder movement for breathing
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Object3D) {
          if (child.name.toLowerCase().includes('shoulder') || 
              child.name.toLowerCase().includes('chest') || 
              child.name.toLowerCase().includes('spine')) {
            // Apply extremely subtle rotation to simulate breathing
            const breathScale = 0.0008; // Very small scale
            child.rotation.x = (Math.sin(t * breathingFrequency) * breathScale) + (child.rotation.x || 0);
          }
        }
      });
      
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
            const name = child.name.toLowerCase();
            
            if ((highlightedPart === "chest" && 
                 (name.includes('chest') || name.includes('torso'))) ||
                (highlightedPart === "waist" && name.includes('waist')) ||
                (highlightedPart === "hips" && (name.includes('hip') || name.includes('pelvis'))) ||
                (highlightedPart === "shoulder" && name.includes('shoulder')) ||
                (highlightedPart === "stomach" && (name.includes('stomach') || name.includes('belly') || name.includes('abdomen'))) ||
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
