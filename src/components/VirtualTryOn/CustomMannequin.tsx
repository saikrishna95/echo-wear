
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
  const stomachFactor = measurements.stomach / 88;
  const thighFactor = measurements.thigh / 55;
  const inseamFactor = measurements.inseam / 80;
  const weightFactor = measurements.weight / 70;

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
        return -1 * heightFactor;
      case "tablet":
        return -1.05 * heightFactor;
      case "desktop":
        return -1.1 * heightFactor;
      default:
        return -1 * heightFactor;
    }
  };

  // Apply measurements to mannequin model
  const applyMeasurementsToModel = (model: THREE.Object3D) => {
    // Apply global scaling based on height
    model.scale.y = heightFactor;
    
    // Find and scale specific body parts if they exist in the model
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Use the name of the mesh to identify body parts
        // Note: This is a simplification - in a real app you'd have more detailed mapping
        if (child.name.toLowerCase().includes('torso') || child.name.toLowerCase().includes('chest')) {
          child.scale.x *= chestFactor;
          child.scale.z *= chestFactor;
        }
        else if (child.name.toLowerCase().includes('waist')) {
          child.scale.x *= waistFactor;
          child.scale.z *= waistFactor;
        }
        else if (child.name.toLowerCase().includes('hip')) {
          child.scale.x *= hipsFactor;
          child.scale.z *= hipsFactor;
        }
        else if (child.name.toLowerCase().includes('leg') || child.name.toLowerCase().includes('thigh')) {
          child.scale.x *= thighFactor;
          child.scale.z *= thighFactor;
          child.scale.y *= inseamFactor;
        }
        else if (child.name.toLowerCase().includes('shoulder')) {
          child.scale.x *= shoulderFactor;
        }
        else if (child.name.toLowerCase().includes('arm')) {
          child.scale.x *= weightFactor * 0.8;
          child.scale.z *= weightFactor * 0.8;
        }
      }
    });
    
    // If no specific parts are named, apply general scaling
    if (heightFactor !== 1 || weightFactor !== 1) {
      // Adjust width based on weight
      model.scale.x = heightFactor * (0.8 + weightFactor * 0.2);
      model.scale.z = heightFactor * (0.8 + weightFactor * 0.2);
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

    // Apply measurements to the model
    applyMeasurementsToModel(model);
    
    // Adjust scale for better fit based on reference image
    model.scale.set(
      0.18 * heightFactor * (0.8 + weightFactor * 0.2),
      0.18 * heightFactor,
      0.18 * heightFactor * (0.8 + weightFactor * 0.2)
    );
    
    // Position the model to align with bottom of view
    model.position.set(0, getModelPositionY(), 0);
    
    // Apply rotation
    model.rotation.y = (rotation * Math.PI) / 180;

    // Add model to group
    group.current.add(model);
  }, [scene, measurements, rotation, deviceSize]);

  // Handle highlighting for the currently selected measurement
  useFrame(() => {
    if (group.current && highlightedPart && highlightedPart !== "height" && highlightedPart !== "weight") {
      group.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Reset all materials
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.emissive.set(0x000000);
          }
          
          // Highlight specific body part based on measurement
          if (highlightedPart === "chest" && 
              (child.name.toLowerCase().includes('chest') || child.name.toLowerCase().includes('torso'))) {
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.set(0x333333);
            }
          }
          else if (highlightedPart === "waist" && child.name.toLowerCase().includes('waist')) {
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.set(0x333333);
            }
          }
          // Add more conditions for other body parts
        }
      });
    }
  });

  return <group ref={group} position={[0, getPositionY(), 0]} />;
};

export default CustomMannequin;
