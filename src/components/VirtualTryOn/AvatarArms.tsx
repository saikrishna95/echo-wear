
import React from 'react';
import * as THREE from 'three';
import { createAvatarMaterials } from './AvatarMaterials';

export const createAvatarArms = (
  heightFactor: number,
  shoulderFactor: number,
  weightFactor: number,
  group: THREE.Group
) => {
  const materials = createAvatarMaterials();
  
  // Left arm - upper
  const leftUpperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.06 * weightFactor,
      0.055 * weightFactor,
      0.2 * heightFactor,
      32
    ),
    materials.skinMaterial
  );
  leftUpperArm.position.set(
    -0.25 * shoulderFactor,
    0.55 * heightFactor,
    0
  );
  leftUpperArm.rotation.z = -Math.PI / 8;
  
  // Left arm - lower
  const leftLowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.055 * weightFactor,
      0.045 * weightFactor,
      0.2 * heightFactor,
      32
    ),
    materials.skinMaterial
  );
  leftLowerArm.position.set(
    -0.32 * shoulderFactor,
    0.38 * heightFactor,
    0
  );
  leftLowerArm.rotation.z = -Math.PI / 6;
  
  // Left hand
  const leftHand = new THREE.Mesh(
    new THREE.SphereGeometry(0.04 * weightFactor, 16, 16),
    materials.skinMaterial
  );
  leftHand.position.set(
    -0.39 * shoulderFactor,
    0.25 * heightFactor,
    0
  );
  
  // Right arm - upper
  const rightUpperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.06 * weightFactor,
      0.055 * weightFactor,
      0.2 * heightFactor,
      32
    ),
    materials.skinMaterial
  );
  rightUpperArm.position.set(
    0.25 * shoulderFactor,
    0.55 * heightFactor,
    0
  );
  rightUpperArm.rotation.z = Math.PI / 8;
  
  // Right arm - lower
  const rightLowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.055 * weightFactor,
      0.045 * weightFactor,
      0.2 * heightFactor,
      32
    ),
    materials.skinMaterial
  );
  rightLowerArm.position.set(
    0.32 * shoulderFactor,
    0.38 * heightFactor,
    0
  );
  rightLowerArm.rotation.z = Math.PI / 6;
  
  // Right hand
  const rightHand = new THREE.Mesh(
    new THREE.SphereGeometry(0.04 * weightFactor, 16, 16),
    materials.skinMaterial
  );
  rightHand.position.set(
    0.39 * shoulderFactor,
    0.25 * heightFactor,
    0
  );
  
  group.add(
    leftUpperArm, leftLowerArm, leftHand,
    rightUpperArm, rightLowerArm, rightHand
  );
};
