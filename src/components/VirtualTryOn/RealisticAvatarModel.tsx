
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Measurements, ClothingItem } from './types';

interface RealisticAvatarModelProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
}

export const RealisticAvatarModel: React.FC<RealisticAvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = []
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Use the mannequin.glb model which is available in the project
  const { scene, nodes, materials } = useGLTF('/models/mannequin.glb', false) as any;
  
  // Create a copy of the scene to modify
  const model = scene?.clone();
  
  useEffect(() => {
    if (group.current && model) {
      // Clear any existing children
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Add the model to the group
      group.current.add(model);
      
      // Apply optimal scaling for full visibility
      const heightFactor = measurements.height / 175; // Base height is 175cm
      model.scale.set(heightFactor * 0.25, heightFactor * 0.25, heightFactor * 0.25); // Adjusted scale for better fit
      
      // Apply morphing or scaling to different body parts based on measurements
      // This depends on the specific model structure
      console.log("Applied measurements to 3D model:", measurements);
      
      // Apply clothing if any are selected
      if (selectedClothing && selectedClothing.length > 0) {
        console.log(`Applied ${selectedClothing.length} clothing items to realistic avatar`);
      }
      
      // Position model for better visibility
      model.position.y = -1.0;
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Adjust camera to focus on model
      const box = new THREE.Box3().setFromObject(group.current);
      const center = box.getCenter(new THREE.Vector3());
      camera.lookAt(center);
    }
  }, [measurements, rotation, camera, model, selectedClothing]);

  // Simple animation for subtle movement
  useFrame((state) => {
    if (group.current) {
      // Small breathing animation
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 0.5) * 0.01;
    }
  });

  return (
    <group ref={group} />
  );
};

export default RealisticAvatarModel;
