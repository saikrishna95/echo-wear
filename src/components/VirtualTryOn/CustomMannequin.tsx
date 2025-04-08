import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeasurementKey } from './types';
import { useGLTF } from '@react-three/drei';

interface CustomMannequinProps {
  measurements: Record<MeasurementKey, number>;
  rotation: number;
  highlightedPart: MeasurementKey | null;
  deviceSize?: "mobile" | "tablet" | "desktop";
}

const CustomMannequin: React.FC<CustomMannequinProps> = ({
  measurements,
  rotation,
  highlightedPart,
  deviceSize = "mobile"
}) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/mannequin.glb', true);

  // Extract measurement factors
  const heightFactor = measurements.height / 175;
  const waistFactor = measurements.waist / 85;
  const hipsFactor = measurements.hips / 95;
  const chestFactor = measurements.chest / 95;
  const shoulderFactor = measurements.shoulder / 45;

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

  // Get model position based on device size
  const getModelPositionY = () => {
    switch (deviceSize) {
      case "mobile":
        return -1;
      case "tablet":
        return -1.05;
      case "desktop":
        return -1.1;
      default:
        return -1;
    }
  };

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
    
    // Position the model to align with bottom of view
    model.position.set(0, getModelPositionY(), 0);
    
    // Apply rotation
    model.rotation.y = (rotation * Math.PI) / 180;

    // Add model to group
    group.current.add(model);
  }, [scene, measurements, rotation, deviceSize]);

  // No animation - keep avatar static
  useFrame(() => {
    if (group.current && highlightedPart) {
      // Highlighting functionality could be added here if needed
    }
  });

  return <group ref={group} position={[0, getPositionY(), 0]} />;
};

export default CustomMannequin;
