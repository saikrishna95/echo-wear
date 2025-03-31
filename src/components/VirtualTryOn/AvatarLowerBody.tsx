
import React from 'react';
import * as THREE from 'three';
import { createAvatarMaterials } from './AvatarMaterials';

export const createAvatarLowerBody = (
  heightFactor: number,
  waistFactor: number,
  hipsFactor: number,
  group: THREE.Group
) => {
  const materials = createAvatarMaterials();
  
  // Lower clothing (pants/trousers)
  const hips = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.18 * waistFactor, // Upper width (waist)
      0.22 * hipsFactor, // Lower width (hips)
      0.15 * heightFactor, // Height
      32
    ),
    materials.darkClothMaterial
  );
  hips.position.y = 0.175 * heightFactor;
  
  group.add(hips);
};
