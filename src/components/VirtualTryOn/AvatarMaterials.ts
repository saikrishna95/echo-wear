
import * as THREE from 'three';

// Create and export materials to be reused
export const createAvatarMaterials = () => {
  // Materials with more realistic human appearance
  const skinMaterial = new THREE.MeshStandardMaterial({ 
    color: '#FDE1D3', // Soft peach skin tone
    roughness: 0.5,
    metalness: 0.1,
  });
  
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: '#333333', // Dark hair
    roughness: 0.7,
    metalness: 0.1
  });
  
  const clothMaterial = new THREE.MeshStandardMaterial({
    color: '#9b87f5', // Purple clothing
    roughness: 0.5,
    metalness: 0.1
  });

  const darkClothMaterial = new THREE.MeshStandardMaterial({ 
    color: '#7E69AB', // Darker purple for pants
    roughness: 0.5,
    metalness: 0.1 
  });

  const shoeMaterial = new THREE.MeshStandardMaterial({ 
    color: '#111111', // Dark shoes
    roughness: 0.5,
    metalness: 0.1 
  });

  const eyeWhiteMaterial = new THREE.MeshBasicMaterial({ 
    color: '#FFFFFF' // White for eye whites
  });

  const eyePupilMaterial = new THREE.MeshBasicMaterial({ 
    color: '#000000' // Black for eye pupils
  });
  
  return {
    skinMaterial,
    hairMaterial,
    clothMaterial,
    darkClothMaterial,
    shoeMaterial,
    eyeWhiteMaterial,
    eyePupilMaterial
  };
};
