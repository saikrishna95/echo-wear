
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { Measurements } from './types';
import { createAvatarHead } from './AvatarHead';
import { createAvatarTorso } from './AvatarTorso';
import { createAvatarLowerBody } from './AvatarLowerBody';
import { createAvatarArms } from './AvatarArms';
import { createAvatarLegs } from './AvatarLegs';
import { createAvatarClothingLayer } from './AvatarClothingLayer';
import { ClothingItem } from './types';

interface AvatarModelProps {
  measurements: Measurements;
  rotation: number;
  selectedClothing?: ClothingItem[];
  deviceSize?: "mobile" | "tablet" | "desktop";
}

export const AvatarModel: React.FC<AvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = [],
  deviceSize = "mobile"
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
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
  
  useEffect(() => {
    if (group.current) {
      // Clear any existing children
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Calculate scale factors based on measurements
      const heightFactor = measurements.height / 175; // Base height is 175cm
      const shoulderFactor = measurements.shoulder / 45; // Base shoulder width is 45cm
      const weightFactor = measurements.weight / 70;  // Base weight is 70kg
      const chestFactor = measurements.chest / 95; // Base chest is 95cm
      const waistFactor = measurements.waist / 85; // Base waist is 85cm
      const hipsFactor = measurements.hips / 95; // Base hips is 95cm
      const neckFactor = measurements.neck / 38; // Base neck is 38cm
      const stomachFactor = measurements.stomach / 88; // Base stomach is 88cm
      const thighFactor = measurements.thigh / 55; // Base thigh is 55cm
      const inseamFactor = measurements.inseam / 80; // Base inseam is 80cm
      
      console.log("Avatar measurements applied:", { 
        heightFactor, shoulderFactor, weightFactor, chestFactor, 
        waistFactor, hipsFactor, neckFactor, stomachFactor, thighFactor, inseamFactor 
      });
      
      // Check which body parts should be visible based on clothing
      const hasUpperClothing = selectedClothing.some(item => 
        ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(item.type.toLowerCase())
      );
      
      const hasLowerClothing = selectedClothing.some(item => 
        ['pants', 'jeans', 'skirt', 'shorts'].includes(item.type.toLowerCase())
      );
      
      // Create body parts with updated measurements
      // Head is always visible
      createAvatarHead(heightFactor, neckFactor, group.current);
      
      // Create body parts that aren't covered by clothing with proper measurements
      if (!hasUpperClothing) {
        createAvatarTorso(
          heightFactor, 
          shoulderFactor, 
          waistFactor, 
          chestFactor,
          stomachFactor, 
          group.current
        );
      }
      
      if (!hasLowerClothing) {
        createAvatarLowerBody(
          heightFactor, 
          waistFactor, 
          hipsFactor, 
          group.current
        );
      }
      
      // Always create arms and legs with updated measurements
      createAvatarArms(
        heightFactor, 
        shoulderFactor, 
        weightFactor, 
        group.current
      );
      
      createAvatarLegs(
        heightFactor, 
        hipsFactor, 
        measurements.thigh,  
        measurements.inseam, 
        group.current
      );
      
      // Add clothing layers if selected
      if (selectedClothing && selectedClothing.length > 0) {
        selectedClothing.forEach(item => {
          createAvatarClothingLayer(
            item,
            heightFactor,
            chestFactor,
            waistFactor,
            hipsFactor,
            group.current
          );
        });
      }
      
      // Position the whole model to align with bottom of view
      group.current.position.y = getPositionY();
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
    }
  }, [measurements, rotation, camera, selectedClothing, deviceSize]);

  // Add subtle breathing animation
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      // Add subtle breathing movement
      group.current.position.y = getPositionY() + Math.sin(t * 0.5) * 0.01;
    }
  });

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default AvatarModel;
