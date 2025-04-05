
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
  const { scene } = useGLTF('/models/male_base (1).glb', true);

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

    // Apply scale from measurement values
    model.scale.set(1, 1, 1); // Reset scale for visibility
    model.position.set(0, -1, 0); // Raise the model up from ground

    // Apply rotation
    model.rotation.y = (rotation * Math.PI) / 180;

    // Add model to group
    group.current.add(model);
  }, [scene, measurements, rotation]);

  // Animation loop
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 0.5) * 0.01;

      if (highlightedPart) {
        // You could highlight specific parts here
        console.log('Highlighting:', highlightedPart);
      }
    }
  });

  return <group ref={group} position={[0, 0, 0]} />;
};

export default CustomMannequin;
