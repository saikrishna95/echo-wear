
import React from 'react';
import * as THREE from 'three';
import { createAvatarMaterials } from './AvatarMaterials';

export const createAvatarLegs = (
  heightFactor: number,
  hipsFactor: number,
  thighMeasurement: number,
  inseamMeasurement: number,
  group: THREE.Group
) => {
  const materials = createAvatarMaterials();
  
  // Left leg - upper (thigh)
  const leftThigh = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.09 * thighMeasurement / 55,
      0.08 * thighMeasurement / 55,
      0.25 * inseamMeasurement / 80,
      32
    ),
    materials.darkClothMaterial
  );
  leftThigh.position.set(
    -0.1 * hipsFactor,
    0.05 * heightFactor,
    0
  );
  
  // Left leg - lower (calf)
  const leftCalf = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.07 * thighMeasurement / 55,
      0.05 * thighMeasurement / 55,
      0.25 * inseamMeasurement / 80,
      32
    ),
    materials.darkClothMaterial
  );
  leftCalf.position.set(
    -0.1 * hipsFactor,
    -0.2 * heightFactor,
    0
  );
  
  // Left foot
  const leftFoot = new THREE.Mesh(
    new THREE.BoxGeometry(
      0.08 * heightFactor,
      0.04 * heightFactor,
      0.12 * heightFactor
    ),
    materials.shoeMaterial
  );
  leftFoot.position.set(
    -0.1 * hipsFactor,
    -0.37 * heightFactor,
    0.04 * heightFactor
  );
  
  // Right leg - upper (thigh)
  const rightThigh = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.09 * thighMeasurement / 55,
      0.08 * thighMeasurement / 55,
      0.25 * inseamMeasurement / 80,
      32
    ),
    materials.darkClothMaterial
  );
  rightThigh.position.set(
    0.1 * hipsFactor,
    0.05 * heightFactor,
    0
  );
  
  // Right leg - lower (calf)
  const rightCalf = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.07 * thighMeasurement / 55,
      0.05 * thighMeasurement / 55,
      0.25 * inseamMeasurement / 80,
      32
    ),
    materials.darkClothMaterial
  );
  rightCalf.position.set(
    0.1 * hipsFactor,
    -0.2 * heightFactor,
    0
  );
  
  // Right foot
  const rightFoot = new THREE.Mesh(
    new THREE.BoxGeometry(
      0.08 * heightFactor,
      0.04 * heightFactor,
      0.12 * heightFactor
    ),
    materials.shoeMaterial
  );
  rightFoot.position.set(
    0.1 * hipsFactor,
    -0.37 * heightFactor,
    0.04 * heightFactor
  );
  
  group.add(
    leftThigh, leftCalf, leftFoot,
    rightThigh, rightCalf, rightFoot
  );
};
