
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Measurements } from './types';
import { createAvatarHead } from './AvatarHead';
import { createAvatarTorso } from './AvatarTorso';
import { createAvatarLowerBody } from './AvatarLowerBody';
import { createAvatarArms } from './AvatarArms';
import { createAvatarLegs } from './AvatarLegs';

interface AvatarModelProps {
  measurements: Measurements;
  rotation: number;
}

export const AvatarModel: React.FC<AvatarModelProps> = ({ measurements, rotation }) => {
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
      
      // Create body parts
      createAvatarHead(heightFactor, group.current);
      createAvatarTorso(heightFactor, shoulderFactor, waistFactor, chestFactor, group.current);
      createAvatarLowerBody(heightFactor, waistFactor, hipsFactor, group.current);
      createAvatarArms(heightFactor, shoulderFactor, weightFactor, group.current);
      createAvatarLegs(
        heightFactor, 
        hipsFactor, 
        measurements.thigh, 
        measurements.inseam, 
        group.current
      );
      
      // Position the whole model
      group.current.position.y = -0.1;
      
      // Apply rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Adjust camera to focus on model
      const box = new THREE.Box3().setFromObject(group.current);
      const center = box.getCenter(new THREE.Vector3());
      camera.lookAt(center);
    }
  }, [measurements, rotation, camera]);

  return (
    <group ref={group} />
  );
};

export default AvatarModel;
