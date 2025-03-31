
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Measurements } from './types';

interface RealisticAvatarModelProps {
  measurements: Measurements;
  rotation: number;
}

export const RealisticAvatarModel: React.FC<RealisticAvatarModelProps> = ({ 
  measurements, 
  rotation 
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Attempt to load the GLB model
  const { scene, nodes, materials } = useGLTF('/models/avatar.glb', false) as any;
  
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
      
      // Apply basic scaling based on height
      const heightFactor = measurements.height / 175; // Base height is 175cm
      model.scale.set(heightFactor, heightFactor, heightFactor);
      
      // Potentially apply other scaling based on measurements
      // This would depend on the specific model's structure and bone names
      
      // Position the model - may need adjustment depending on the model
      model.position.y = -0.9;
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Adjust camera to focus on model
      const box = new THREE.Box3().setFromObject(group.current);
      const center = box.getCenter(new THREE.Vector3());
      camera.lookAt(center);
    }
  }, [measurements, rotation, camera, model]);

  // Add subtle animation
  useFrame((state) => {
    if (group.current) {
      // Small breathing animation
      const t = state.clock.getElapsedTime();
      group.current.position.y = -0.9 + Math.sin(t * 0.5) * 0.01;
    }
  });

  return (
    <group ref={group} />
  );
};

export default RealisticAvatarModel;
