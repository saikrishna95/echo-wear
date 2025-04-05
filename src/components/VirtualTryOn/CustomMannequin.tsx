
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeasurementKey } from './types';

interface CustomMannequinProps {
  measurements: Record<MeasurementKey, number>;
  rotation: number;
  highlightedPart: MeasurementKey | null;
}

const CustomMannequin: React.FC<CustomMannequinProps> = ({ 
  measurements, 
  rotation,
  highlightedPart
}) => {
  const group = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Calculate scale factors
  const heightFactor = measurements.height / 175; // Base height of 175cm
  const waistFactor = measurements.waist / 85; // Base waist of 85cm
  const hipsFactor = measurements.hips / 95; // Base hips of 95cm
  const chestFactor = measurements.chest / 95; // Base chest of 95cm
  const shoulderFactor = measurements.shoulder / 45; // Base shoulder width of 45cm
  
  // Set up the mannequin model
  useEffect(() => {
    if (group.current) {
      // Clear any existing children
      while (group.current.children.length) {
        group.current.remove(group.current.children[0]);
      }
      
      // Create a basic mannequin using THREE.js primitives
      createBasicMannequin();
      
      // Apply the rotation
      group.current.rotation.y = (rotation * Math.PI) / 180;
      
      // Signal that we've loaded the model
      setModelLoaded(true);
    }
  }, [measurements, rotation]);
  
  // Create a basic mannequin using THREE.js primitives
  const createBasicMannequin = () => {
    if (!group.current) return;
    
    // Create materials
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf5d0b0, // Skin tone
      roughness: 0.7,
      metalness: 0.1
    });
    
    // Head
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 32, 32),
      bodyMaterial
    );
    head.position.y = 0.65;
    group.current.add(head);
    
    // Torso
    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.2 * shoulderFactor, 
        0.15 * waistFactor, 
        0.4 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    torso.position.y = 0.4;
    group.current.add(torso);
    
    // Hips
    const hips = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.15 * waistFactor, 
        0.2 * hipsFactor, 
        0.1 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    hips.position.y = 0.15;
    group.current.add(hips);
    
    // Upper Legs
    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.07, 
        0.05, 
        0.3 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    leftLeg.position.set(0.1, -0.05, 0);
    group.current.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.07, 
        0.05, 
        0.3 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    rightLeg.position.set(-0.1, -0.05, 0);
    group.current.add(rightLeg);
    
    // Lower Legs
    const leftLowerLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.05, 
        0.06, 
        0.3 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    leftLowerLeg.position.set(0.1, -0.35, 0);
    group.current.add(leftLowerLeg);
    
    const rightLowerLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.05, 
        0.06, 
        0.3 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    rightLowerLeg.position.set(-0.1, -0.35, 0);
    group.current.add(rightLowerLeg);
    
    // Arms
    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.05 * shoulderFactor, 
        0.04, 
        0.3 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    leftArm.position.set(0.25, 0.4, 0);
    leftArm.rotation.z = Math.PI / 2;
    group.current.add(leftArm);
    
    const rightArm = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.05 * shoulderFactor, 
        0.04, 
        0.3 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    rightArm.position.set(-0.25, 0.4, 0);
    rightArm.rotation.z = -Math.PI / 2;
    group.current.add(rightArm);
    
    // Forearms
    const leftForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.04, 
        0.04, 
        0.25 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    leftForearm.position.set(0.45, 0.4, 0);
    leftForearm.rotation.z = Math.PI / 2;
    group.current.add(leftForearm);
    
    const rightForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.04, 
        0.04, 
        0.25 * heightFactor, 
        32
      ),
      bodyMaterial
    );
    rightForearm.position.set(-0.45, 0.4, 0);
    rightForearm.rotation.z = -Math.PI / 2;
    group.current.add(rightForearm);
    
    // Apply overall scaling based on measurements
    group.current.scale.set(
      1.0 * chestFactor, 
      heightFactor, 
      1.0 * hipsFactor
    );
  };
  
  // Add subtle animation
  useFrame((state) => {
    if (group.current) {
      // Small breathing animation
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 0.5) * 0.01;
      
      // Highlight part if needed
      if (highlightedPart && modelLoaded) {
        // For a real implementation, you would find the specific mesh part
        // and highlight it - here we just log which part would be highlighted
        console.log('Highlighting:', highlightedPart);
      }
    }
  });

  return <group ref={group} position={[0, -0.9, 0]} />;
};

export default CustomMannequin;

