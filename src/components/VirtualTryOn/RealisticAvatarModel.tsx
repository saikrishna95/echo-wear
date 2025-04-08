
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
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
  const { scene } = useGLTF('/models/mannequin.glb', false) as any;
  
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
      model.scale.set(heightFactor * 0.18, heightFactor * 0.18, heightFactor * 0.18); // Adjusted scale for better fit
      
      // Position model for better visibility - centered in view
      model.position.y = -0.9;
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Adjust camera to focus on model
      const box = new THREE.Box3().setFromObject(group.current);
      const center = box.getCenter(new THREE.Vector3());
      camera.lookAt(center);
    }
  }, [measurements, rotation, camera, model, selectedClothing]);

  return (
    <group ref={group} />
  );
};

export default RealisticAvatarModel;
