
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
  const neckFactor = measurements.neck / 38;
  
  // Log measurements for debugging
  useEffect(() => {
    console.log("CustomMannequin measurements:", {
      height: measurements.height,
      chest: measurements.chest,
      waist: measurements.waist,
      hips: measurements.hips,
      heightFactor,
      chestFactor,
      waistFactor,
      hipsFactor
    });
  }, [measurements]);

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
        const name = child.name.toLowerCase();
        
        // Apply more pronounced scaling for better visual feedback
        if (name.includes('torso') || name.includes('chest')) {
          child.scale.x = chestFactor * 1.2; // Amplify the effect
          child.scale.z = chestFactor * 1.2;
        }
        else if (name.includes('waist')) {
          child.scale.x = waistFactor * 1.2;
          child.scale.z = waistFactor * 1.2;
        }
        else if (name.includes('hip') || name.includes('pelvis')) {
          child.scale.x = hipsFactor * 1.2;
          child.scale.z = hipsFactor * 1.2;
        }
        else if (name.includes('stomach') || name.includes('belly')) {
          child.scale.x = stomachFactor * 1.2;
          child.scale.z = stomachFactor * 1.2;
        }
        else if (name.includes('leg') || name.includes('thigh')) {
          child.scale.x = thighFactor * 1.2;
          child.scale.z = thighFactor * 1.2;
          child.scale.y = inseamFactor * 1.1;
        }
        else if (name.includes('shoulder')) {
          child.scale.x = shoulderFactor * 1.3; // Make shoulders more pronounced
        }
        else if (name.includes('arm')) {
          child.scale.x = weightFactor * 1.1;
          child.scale.z = weightFactor * 1.1;
        }
        else if (name.includes('neck')) {
          child.scale.x = neckFactor * 1.1;
          child.scale.z = neckFactor * 1.1;
        }
      }
    });
    
    // If no specific parts are named, apply general scaling
    if (heightFactor !== 1 || weightFactor !== 1) {
      // Adjust width based on weight and height
      model.scale.x = heightFactor * (0.7 + weightFactor * 0.3); // More weight influence
      model.scale.z = heightFactor * (0.7 + weightFactor * 0.3);
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
      0.18 * heightFactor * (0.7 + weightFactor * 0.3), // More weight influence
      0.18 * heightFactor,
      0.18 * heightFactor * (0.7 + weightFactor * 0.3)
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
    if (group.current && highlightedPart) {
      group.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Reset all materials
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.emissive.set(0x000000);
          }
          
          // Highlight specific body part based on measurement
          const name = child.name.toLowerCase();
          if ((highlightedPart === "chest" && 
               (name.includes('chest') || name.includes('torso'))) ||
              (highlightedPart === "waist" && name.includes('waist')) ||
              (highlightedPart === "hips" && (name.includes('hip') || name.includes('pelvis'))) ||
              (highlightedPart === "shoulder" && name.includes('shoulder')) ||
              (highlightedPart === "stomach" && (name.includes('stomach') || name.includes('belly'))) ||
              (highlightedPart === "thigh" && (name.includes('thigh') || name.includes('leg'))) ||
              (highlightedPart === "neck" && name.includes('neck'))) {
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.set(0x555555); // Brighter highlight
              child.material.emissiveIntensity = 0.5; // More intense
            }
          }
        }
      });
    }
  });

  return <group ref={group} position={[0, getPositionY(), 0]} />;
};

export default CustomMannequin;
