
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
  const modelRef = useRef<THREE.Object3D>();
  const { scene } = useGLTF('/models/mannequin.glb', true);

  // Extract measurement factors - divide by standard measurements to get ratios
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
    console.log("CustomMannequin measurements applied:", {
      height: measurements.height,
      chest: measurements.chest,
      waist: measurements.waist,
      hips: measurements.hips,
      heightFactor,
      chestFactor,
      waistFactor,
      hipsFactor,
      shoulderFactor,
      stomachFactor
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

  // Function to update model scaling - extracted for reuse in useFrame
  const updateModelScaling = () => {
    if (!modelRef.current) return;
    
    // Apply global scaling based on measurements
    modelRef.current.scale.set(
      0.18 * (shoulderFactor * 0.7 + chestFactor * 0.3),  // X-axis: Width of upper body
      0.18 * heightFactor,                                // Y-axis: Total height
      0.18 * (waistFactor * 0.5 + stomachFactor * 0.3 + hipsFactor * 0.2)  // Z-axis: Depth of torso
    );
    
    // Apply more specific scaling to body parts
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        
        // Apply more pronounced scaling for better visual feedback
        if (name.includes('torso') || name.includes('chest')) {
          child.scale.x = chestFactor * 1.2; 
          child.scale.z = chestFactor * 1.2;
        }
        else if (name.includes('waist')) {
          child.scale.x = waistFactor * 1.3;
          child.scale.z = waistFactor * 1.3;
        }
        else if (name.includes('hip') || name.includes('pelvis')) {
          child.scale.x = hipsFactor * 1.3;
          child.scale.z = hipsFactor * 1.3;
        }
        else if (name.includes('stomach') || name.includes('belly')) {
          child.scale.x = stomachFactor * 1.3;
          child.scale.z = stomachFactor * 1.3;
        }
        else if (name.includes('leg') || name.includes('thigh')) {
          child.scale.x = thighFactor * 1.3;
          child.scale.z = thighFactor * 1.3;
          child.scale.y = inseamFactor * 1.2;
        }
        else if (name.includes('shoulder')) {
          child.scale.x = shoulderFactor * 1.4;
        }
        else if (name.includes('arm')) {
          child.scale.x = weightFactor * 1.2;
          child.scale.z = weightFactor * 1.2;
        }
        else if (name.includes('neck')) {
          child.scale.x = neckFactor * 1.2;
          child.scale.z = neckFactor * 1.2;
        }
      }
    });
    
    // Update model position
    modelRef.current.position.y = getModelPositionY();
  };

  // Initial setup - load the mannequin into the scene
  useEffect(() => {
    if (!scene || !group.current) return;

    // Remove previous mannequin
    while (group.current.children.length) {
      group.current.remove(group.current.children[0]);
    }

    const model = scene.clone();
    
    // Store reference for animation frame updates
    modelRef.current = model;
    
    // Apply initial rotation
    model.rotation.y = (rotation * Math.PI) / 180;

    // Add model to group
    group.current.add(model);
    
    // Initial scaling and position
    updateModelScaling();
  }, [scene, rotation, deviceSize]);

  // Live updates and highlighting - runs every frame
  useFrame(() => {
    if (!modelRef.current) return;
    
    // Update rotation when it changes
    if (modelRef.current) {
      modelRef.current.rotation.y = (rotation * Math.PI) / 180;
    }
    
    // 🔥 Apply continuous real-time scaling based on current measurements hello
    updateModelScaling();
    
    // Handle highlighting for the currently selected measurement
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
              child.material.emissive.set(0x666666); // Brighter highlight
              child.material.emissiveIntensity = 0.7; // More intense
            }
          }
        }
      });
    }
    
    // Add subtle breathing animation
    const t = Date.now() * 0.001;
    if (modelRef.current) {
      // Apply breathing animation after position update in updateModelScaling
      modelRef.current.position.y = getModelPositionY() + Math.sin(t * 0.5) * 0.01;
    }
  });

  return <group ref={group} position={[0, getPositionY(), 0]} />;
};

export default CustomMannequin;
