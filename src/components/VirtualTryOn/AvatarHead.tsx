
import React from 'react';
import * as THREE from 'three';
import { createAvatarMaterials } from './AvatarMaterials';

interface AvatarHeadProps {
  heightFactor: number;
  group: React.RefObject<THREE.Group>;
}

export const createAvatarHead = (
  heightFactor: number,
  group: THREE.Group
) => {
  const materials = createAvatarMaterials();
  
  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.125 * heightFactor, 32, 32),
    materials.skinMaterial
  );
  head.position.y = 0.75 * heightFactor;
  
  // Hair - simple cap-like shape
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.130 * heightFactor, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
    materials.hairMaterial
  );
  hair.position.y = 0.79 * heightFactor;
  hair.rotation.x = Math.PI;
  
  // Face details - simple eyes
  const leftEye = new THREE.Mesh(
    new THREE.SphereGeometry(0.015 * heightFactor, 16, 16),
    materials.eyeWhiteMaterial
  );
  leftEye.position.set(-0.05 * heightFactor, 0.77 * heightFactor, 0.11 * heightFactor);
  
  const rightEye = new THREE.Mesh(
    new THREE.SphereGeometry(0.015 * heightFactor, 16, 16),
    materials.eyeWhiteMaterial
  );
  rightEye.position.set(0.05 * heightFactor, 0.77 * heightFactor, 0.11 * heightFactor);
  
  // Eye pupils
  const leftPupil = new THREE.Mesh(
    new THREE.SphereGeometry(0.007 * heightFactor, 16, 16),
    materials.eyePupilMaterial
  );
  leftPupil.position.set(-0.05 * heightFactor, 0.77 * heightFactor, 0.122 * heightFactor);
  
  const rightPupil = new THREE.Mesh(
    new THREE.SphereGeometry(0.007 * heightFactor, 16, 16),
    materials.eyePupilMaterial
  );
  rightPupil.position.set(0.05 * heightFactor, 0.77 * heightFactor, 0.122 * heightFactor);
  
  // Neck with more realistic shape
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.07 * heightFactor, 
      0.08 * heightFactor, 
      0.1 * heightFactor, 
      32
    ),
    materials.skinMaterial
  );
  neck.position.y = 0.7 * heightFactor;
  
  // Add all parts to the group
  group.add(head, hair, leftEye, rightEye, leftPupil, rightPupil, neck);
};
