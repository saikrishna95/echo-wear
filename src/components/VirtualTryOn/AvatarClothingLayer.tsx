
import React from 'react';
import * as THREE from 'three';
import { ClothingItem } from './types';
import { createAvatarMaterials } from './AvatarMaterials';

interface AvatarClothingLayerProps {
  clothingItem: ClothingItem;
  heightFactor: number;
  chestFactor: number;
  waistFactor: number;
  hipsFactor: number;
  group: THREE.Group;
}

export const createAvatarClothingLayer = (
  clothingItem: ClothingItem,
  heightFactor: number,
  chestFactor: number,
  waistFactor: number,
  hipsFactor: number,
  group: THREE.Group
) => {
  const materials = createAvatarMaterials();
  
  // Create clothing material based on the item's color
  const clothingColor = new THREE.Color(clothingItem.color.toLowerCase());
  
  const clothingMaterial = new THREE.MeshStandardMaterial({
    color: clothingColor,
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Create different clothing based on type
  switch(clothingItem.type.toLowerCase()) {
    case 't-shirt':
    case 'shirt':
    case 'blouse':
    case 'sweater':
      // Create a top (shirt, t-shirt, etc.)
      const top = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.21 * chestFactor, // Upper width (chest)
          0.19 * waistFactor, // Lower width (waist)
          0.35 * heightFactor, // Height
          32
        ),
        clothingMaterial
      );
      top.position.y = 0.5 * heightFactor;
      
      // Add sleeve for left arm
      const leftSleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.06, // Upper width
          0.05, // Lower width
          0.15 * heightFactor, // Length
          16
        ),
        clothingMaterial
      );
      leftSleeve.rotation.z = Math.PI / 2.5;
      leftSleeve.position.set(-0.25, 0.55 * heightFactor, 0);
      
      // Add sleeve for right arm
      const rightSleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.06, // Upper width
          0.05, // Lower width
          0.15 * heightFactor, // Length
          16
        ),
        clothingMaterial
      );
      rightSleeve.rotation.z = -Math.PI / 2.5;
      rightSleeve.position.set(0.25, 0.55 * heightFactor, 0);
      
      group.add(top, leftSleeve, rightSleeve);
      break;
      
    case 'pants':
    case 'jeans':
    case 'trousers':
      // Create pants
      const pants = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.19 * waistFactor, // Upper width (waist)
          0.23 * hipsFactor, // Lower width (hips)
          0.15 * heightFactor, // Height
          32
        ),
        clothingMaterial
      );
      pants.position.y = 0.175 * heightFactor;
      
      // Left pant leg
      const leftLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09, // Upper width
          0.07, // Lower width
          0.5 * heightFactor, // Length
          16
        ),
        clothingMaterial
      );
      leftLeg.position.set(-0.1, -0.1 * heightFactor, 0);
      
      // Right pant leg
      const rightLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09, // Upper width
          0.07, // Lower width
          0.5 * heightFactor, // Length
          16
        ),
        clothingMaterial
      );
      rightLeg.position.set(0.1, -0.1 * heightFactor, 0);
      
      group.add(pants, leftLeg, rightLeg);
      break;
      
    case 'skirt':
      // Create a skirt
      const skirt = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.19 * waistFactor, // Upper width (waist)
          0.3 * hipsFactor, // Lower width (flared skirt)
          0.35 * heightFactor, // Length
          32
        ),
        clothingMaterial
      );
      skirt.position.y = 0.05 * heightFactor;
      
      group.add(skirt);
      break;
      
    case 'jacket':
      // Create a jacket (similar to shirt but slightly larger)
      const jacket = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.23 * chestFactor, // Upper width (chest)
          0.21 * waistFactor, // Lower width (waist)
          0.35 * heightFactor, // Height
          32
        ),
        clothingMaterial
      );
      jacket.position.y = 0.5 * heightFactor;
      
      // Add sleeve for left arm
      const leftJacketSleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.07, // Upper width
          0.06, // Lower width
          0.2 * heightFactor, // Length
          16
        ),
        clothingMaterial
      );
      leftJacketSleeve.rotation.z = Math.PI / 2.5;
      leftJacketSleeve.position.set(-0.25, 0.55 * heightFactor, 0);
      
      // Add sleeve for right arm
      const rightJacketSleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.07, // Upper width
          0.06, // Lower width
          0.2 * heightFactor, // Length
          16
        ),
        clothingMaterial
      );
      rightJacketSleeve.rotation.z = -Math.PI / 2.5;
      rightJacketSleeve.position.set(0.25, 0.55 * heightFactor, 0);
      
      group.add(jacket, leftJacketSleeve, rightJacketSleeve);
      break;
      
    case 'shorts':
      // Create shorts (shorter pants)
      const shorts = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.19 * waistFactor, // Upper width (waist)
          0.23 * hipsFactor, // Lower width (hips)
          0.15 * heightFactor, // Height
          32
        ),
        clothingMaterial
      );
      shorts.position.y = 0.175 * heightFactor;
      
      // Left short leg
      const leftShortLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09, // Upper width
          0.1, // Lower width (slightly flared)
          0.2 * heightFactor, // Length (shorter than pants)
          16
        ),
        clothingMaterial
      );
      leftShortLeg.position.set(-0.1, 0.05 * heightFactor, 0);
      
      // Right short leg
      const rightShortLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.09, // Upper width
          0.1, // Lower width (slightly flared)
          0.2 * heightFactor, // Length (shorter than pants)
          16
        ),
        clothingMaterial
      );
      rightShortLeg.position.set(0.1, 0.05 * heightFactor, 0);
      
      group.add(shorts, leftShortLeg, rightShortLeg);
      break;
      
    default:
      // Handle other clothing types here or add more cases
      console.log(`Clothing type ${clothingItem.type} not implemented yet`);
      break;
  }
};
