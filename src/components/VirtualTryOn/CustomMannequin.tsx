
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MeasurementKey } from './types';

interface CustomMannequinProps {
  measurements: Record<MeasurementKey, number>;
  rotation: number;
  highlightedPart: MeasurementKey | null;
}

const CustomMannequin: React.FC<CustomMannequinProps> = ({ 
  measurements, 
  rotation,
  highlightedPart
}) => {
  const group = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Try to load the custom mannequin model
  const { scene, nodes } = useGLTF('/models/mannequin.glb', false) as any;
  
  // Calculate scale factors
  const heightFactor = measurements.height / 175; // Base height of 175cm
  const waistFactor = measurements.waist / 85; // Base waist of 85cm
  const hipsFactor = measurements.hips / 95; // Base hips of 95cm
  const chestFactor = measurements.chest / 95; // Base chest of 95cm
  const shoulderFactor = measurements.shoulder / 45; // Base shoulder width of 45cm
  
  // Set up the model when it loads or when measurements change
  useEffect(() => {
    if (scene && group.current) {
      // Clear any existing children
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Clone the scene to avoid modifying the original
      const model = scene.clone();
      
      // Apply the rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Add the model to our group
      group.current.add(model);
      
      // Apply scaling based on measurements - for more realistic deformation,
      // in a real application you would use morph targets or bone scaling
      model.scale.set(
        shoulderFactor * 0.8 + chestFactor * 0.2, 
        heightFactor, 
        waistFactor * 0.5 + hipsFactor * 0.5
      );
      
      // Signal that we've loaded the model
      setModelLoaded(true);
    }
  }, [measurements, rotation, scene]);
  
  // Add subtle animation
  useFrame((state) => {
    if (group.current) {
      // Small breathing animation
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 0.5) * 0.01;
      
      // Highlight part if needed
      if (highlightedPart && modelLoaded) {
        // For a real implementation, you would find the specific mesh part
        // and highlight it - here we just log which part would be highlighted
        console.log('Highlighting:', highlightedPart);
      }
    }
  });

  return <group ref={group} position={[0, -0.9, 0]} />;
};

export default CustomMannequin;
