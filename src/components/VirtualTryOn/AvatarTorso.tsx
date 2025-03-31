
import React from 'react';
import * as THREE from 'three';
import { createAvatarMaterials } from './AvatarMaterials';

export const createAvatarTorso = (
  heightFactor: number,
  shoulderFactor: number,
  waistFactor: number,
  chestFactor: number,
  group: THREE.Group
) => {
  const materials = createAvatarMaterials();
  
  // Upper body clothing (top/shirt) rather than bare skin
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.20 * shoulderFactor, // Upper width (shoulders)
      0.18 * waistFactor, // Lower width (waist)
      0.4 * heightFactor, // Height
      32
    ),
    materials.clothMaterial
  );
  torso.position.y = 0.45 * heightFactor;
  
  // Additional chest details for more human-like shape
  const chest = new THREE.Mesh(
    new THREE.SphereGeometry(0.21 * chestFactor / 95, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
    materials.clothMaterial
  );
  chest.position.y = 0.55 * heightFactor;
  chest.position.z = 0.06 * heightFactor;
  chest.rotation.x = -Math.PI / 2;
  chest.scale.z = 0.7;
  
  group.add(torso, chest);
};
