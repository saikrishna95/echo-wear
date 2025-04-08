import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeasurementKey } from './types';
import { useGLTF } from '@react-three/drei';

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
  const { scene } = useGLTF('/models/mannequin.glb', true);

  // Extract measurement factors
  const heightFactor = measurements.height / 175;
  const waistFactor = measurements.waist / 85;
  const hipsFactor = measurements.hips / 95;
  const chestFactor = measurements.chest / 95;
  const shoulderFactor = measurements.shoulder / 45;

  // Load the mannequin into the scene
  useEffect(() => {
    if (!scene || !group.current) return;

    // Remove previous mannequin
    while (group.current.children.length) {
      group.current.remove(group.current.children[0]);
    }

    const model = scene.clone();

    // Adjust scale for better fit based on reference image
    model.scale.set(0.18, 0.18, 0.18);
    
    // Position the model to center it in the view - adjusted for T-pose visibility
    model.position.set(0, -0.45, 0); 
    
    // Apply rotation
    model.rotation.y = (rotation * Math.PI) / 180;

    // Add model to group
    group.current.add(model);
  }, [scene, measurements, rotation]);

  // No animation - keep avatar static
  useFrame(() => {
    if (group.current && highlightedPart) {
      // Highlighting functionality could be added here if needed
    }
  });

  return <group ref={group} position={[0, 0, 0]} />;
};

export default CustomMannequin;
