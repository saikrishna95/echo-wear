
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
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
      
      // Scale factors based on measurements
      const heightFactor = measurements.height / 175; // Base height is 175cm
      const shoulderFactor = measurements.shoulder / 45; // Base shoulder width is 45cm
      const weightFactor = measurements.weight / 70;  // Base weight is 70kg
      const chestFactor = measurements.chest / 95; // Base chest is 95cm
      const waistFactor = measurements.waist / 85; // Base waist is 85cm
      const hipsFactor = measurements.hips / 95; // Base hips is 95cm
      const neckFactor = measurements.neck / 38; // Base neck is 38cm
      const stomachFactor = measurements.stomach / 88; // Base stomach is 88cm
      const thighFactor = measurements.thigh / 55; // Base thigh is 55cm
      
      // Create body parts - hide parts that will be covered by clothing
      const hasUpperClothing = selectedClothing.some(item => 
        ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(item.type.toLowerCase())
      );
      
      const hasLowerClothing = selectedClothing.some(item => 
        ['pants', 'jeans', 'skirt', 'shorts'].includes(item.type.toLowerCase())
      );
      
      // Always create the head
      createAvatarHead(heightFactor, neckFactor, group.current);
      
      // Create body parts that aren't covered by clothing
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
        createAvatarLowerBody(heightFactor, waistFactor, hipsFactor, group.current);
      }
      
      // Always create arms and legs
      createAvatarArms(heightFactor, shoulderFactor, weightFactor, group.current);
      createAvatarLegs(
        heightFactor, 
        hipsFactor, 
        thighFactor,
        measurements.inseam, 
        group.current
      );
      
      // Add clothing layers
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

  return (
    <group ref={group} position={[0, getPositionY(), 0]} />
  );
};

export default AvatarModel;
