
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
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

    // Apply consistent scale - adjusted for better fit in frame
    model.scale.set(0.18, 0.18, 0.18);
    
    // Position the model to center it vertically in the view
    model.position.set(0, -0.9, 0); 
    
    // Apply rotation
    model.rotation.y = (rotation * Math.PI) / 180;

    // Add model to group
    group.current.add(model);
  }, [scene, measurements, rotation]);

  return <group ref={group} position={[0, 0, 0]} />;
};

export default CustomMannequin;
