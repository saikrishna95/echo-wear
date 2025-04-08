
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
  
  // Calculate thigh factor based on thigh measurement
  const thighFactor = thighMeasurement / 55; // Base thigh is 55cm
  
  // Calculate inseam factor for leg length
  const inseamFactor = inseamMeasurement / 80; // Base inseam is 80cm
  
  // Left leg - upper (thigh)
  const leftThigh = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.09 * thighFactor,
      0.08 * thighFactor,
      0.25 * inseamFactor,
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
      0.07 * thighFactor,
      0.05 * thighFactor,
      0.25 * inseamFactor,
      32
    ),
    materials.darkClothMaterial
  );
  leftCalf.position.set(
    -0.1 * hipsFactor,
    -0.2 * heightFactor * inseamFactor,
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
    -0.37 * heightFactor * inseamFactor,
    0.04 * heightFactor
  );
  
  // Right leg - upper (thigh)
  const rightThigh = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.09 * thighFactor,
      0.08 * thighFactor,
      0.25 * inseamFactor,
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
      0.07 * thighFactor,
      0.05 * thighFactor,
      0.25 * inseamFactor,
      32
    ),
    materials.darkClothMaterial
  );
  rightCalf.position.set(
    0.1 * hipsFactor,
    -0.2 * heightFactor * inseamFactor,
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
    -0.37 * heightFactor * inseamFactor,
    0.04 * heightFactor
  );
  
  group.add(
    leftThigh, leftCalf, leftFoot,
    rightThigh, rightCalf, rightFoot
  );
};
