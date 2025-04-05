
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
}

export const AvatarModel: React.FC<AvatarModelProps> = ({ 
  measurements, 
  rotation,
  selectedClothing = [] 
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
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
      
      // Create body parts - hide parts that will be covered by clothing
      const hasUpperClothing = selectedClothing.some(item => 
        ['shirt', 'blouse', 'sweater', 'jacket', 't-shirt'].includes(item.type.toLowerCase())
      );
      
      const hasLowerClothing = selectedClothing.some(item => 
        ['pants', 'jeans', 'skirt', 'shorts'].includes(item.type.toLowerCase())
      );
      
      // Always create the head
      createAvatarHead(heightFactor, group.current);
      
      // Create body parts that aren't covered by clothing
      if (!hasUpperClothing) {
        createAvatarTorso(heightFactor, shoulderFactor, waistFactor, chestFactor, group.current);
      }
      
      if (!hasLowerClothing) {
        createAvatarLowerBody(heightFactor, waistFactor, hipsFactor, group.current);
      }
      
      // Always create arms and legs
      createAvatarArms(heightFactor, shoulderFactor, weightFactor, group.current);
      createAvatarLegs(
        heightFactor, 
        hipsFactor, 
        measurements.thigh, 
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
      
      // Position the whole model
      group.current.position.y = -0.1;
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Adjust camera to focus on model
      const box = new THREE.Box3().setFromObject(group.current);
      const center = box.getCenter(new THREE.Vector3());
      camera.lookAt(center);
    }
  }, [measurements, rotation, camera, selectedClothing]);

  return (
    <group ref={group} />
  );
};

export default AvatarModel;
