
import React from 'react';
import * as THREE from 'three';
import { createAvatarMaterials } from './AvatarMaterials';

export const createAvatarTorso = (
  heightFactor: number,
  shoulderFactor: number,
  waistFactor: number,
  chestFactor: number,
  stomachFactor: number,
  group: THREE.Group
) => {
  const materials = createAvatarMaterials();
  
  // Upper torso - chest area
  const upperTorso = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.21 * chestFactor, // Upper width based on chest measurement
      0.19 * stomachFactor, // Lower width transitions to stomach measurement
      0.2 * heightFactor, // Height
      32
    ),
    materials.skinMaterial
  );
  upperTorso.position.y = 0.55 * heightFactor;
  
  // Lower torso - stomach to waist
  const lowerTorso = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.19 * stomachFactor, // Upper width based on stomach measurement
      0.18 * waistFactor, // Lower width transitions to waist measurement
      0.15 * heightFactor, // Height
      32
    ),
    materials.skinMaterial
  );
  lowerTorso.position.y = 0.375 * heightFactor;
  
  // Shoulders - connects to arms
  const shoulders = new THREE.Mesh(
    new THREE.BoxGeometry(
      0.5 * shoulderFactor, // Width - based on shoulder measurement
      0.05 * heightFactor, // Height
      0.1 * heightFactor // Depth
    ),
    materials.skinMaterial
  );
  shoulders.position.y = 0.63 * heightFactor;
  
  group.add(upperTorso, lowerTorso, shoulders);
};
