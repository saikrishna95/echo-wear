
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MeasurementKey } from "./types";
import { createAvatarHead } from "./AvatarHead";
import { createAvatarTorso } from "./AvatarTorso";
import { createAvatarLowerBody } from "./AvatarLowerBody";
import { createAvatarArms } from "./AvatarArms";
import { createAvatarLegs } from "./AvatarLegs";

interface FocusedAvatarModelProps {
  measurements: Record<MeasurementKey, number>;
  focusArea: "upper" | "lower" | "general";
  highlightedPart: MeasurementKey | null;
}

const FocusedAvatarModel: React.FC<FocusedAvatarModelProps> = ({
  measurements,
  focusArea,
  highlightedPart,
}) => {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) return;

    // Clear existing parts
    while (group.current.children.length) {
      group.current.remove(group.current.children[0]);
    }

    // Calculate factors for scaling
    const heightFactor = measurements.height / 175;
    const shoulderFactor = measurements.shoulder / 45;
    const weightFactor = measurements.weight / 70;
    const chestFactor = measurements.chest / 95;
    const waistFactor = measurements.waist / 85;
    const hipsFactor = measurements.hips / 95;
    const neckFactor = measurements.neck / 38;
    const stomachFactor = measurements.stomach / 88;
    const thighFactor = measurements.thigh / 55;
    const inseamFactor = measurements.inseam / 80;

    // Get vertical position offset based on focus area
    const getVerticalOffset = () => {
      switch (focusArea) {
        case "upper":
          return -0.5; // Move avatar down to focus on upper body
        case "lower":
          return 0.5; // Move avatar up to focus on lower body
        case "general":
        default:
          return 0; // No offset for full body view
      }
    };

    // Create only the relevant body parts based on focus area
    if (focusArea === "upper" || focusArea === "general") {
      // Upper body parts
      createAvatarHead(heightFactor, neckFactor, group.current);
      createAvatarTorso(
        heightFactor,
        shoulderFactor,
        waistFactor,
        chestFactor,
        stomachFactor,
        group.current
      );
      createAvatarArms(
        heightFactor,
        shoulderFactor,
        weightFactor,
        group.current
      );

      // Add partial lower body if general view
      if (focusArea === "general") {
        createAvatarLowerBody(
          heightFactor,
          waistFactor,
          hipsFactor,
          group.current
        );
        createAvatarLegs(
          heightFactor,
          hipsFactor,
          measurements.thigh,
          measurements.inseam,
          group.current
        );
      }
    }

    if (focusArea === "lower" || focusArea === "general") {
      // Lower body parts
      if (focusArea === "lower") {
        // Add partial torso for context when focusing on lower body
        createAvatarTorso(
          heightFactor,
          shoulderFactor,
          waistFactor,
          chestFactor,
          stomachFactor,
          group.current
        );
      }
      
      createAvatarLowerBody(
        heightFactor,
        waistFactor,
        hipsFactor,
        group.current
      );
      createAvatarLegs(
        heightFactor,
        hipsFactor,
        measurements.thigh,
        measurements.inseam,
        group.current
      );
    }

    // Apply vertical offset based on focus area
    group.current.position.y = getVerticalOffset();

  }, [measurements, focusArea]);

  // Add subtle animations and highlighting
  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();
    
    // Add subtle breathing animation
    group.current.position.y += Math.sin(t * 0.5) * 0.005;
    
    // Apply highlighting based on the highlighted part
    if (highlightedPart) {
      group.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Reset material emissive first
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.emissive.set(0x000000);
          }
          
          // Apply highlight based on part name
          const name = child.name.toLowerCase();
          
          if ((highlightedPart === "chest" && 
               (name.includes('chest') || name.includes('torso'))) ||
              (highlightedPart === "waist" && name.includes('waist')) ||
              (highlightedPart === "hips" && (name.includes('hip') || name.includes('pelvis'))) ||
              (highlightedPart === "shoulder" && name.includes('shoulder')) ||
              (highlightedPart === "stomach" && (name.includes('stomach') || name.includes('belly'))) ||
              (highlightedPart === "thigh" && (name.includes('thigh') || name.includes('leg'))) ||
              (highlightedPart === "neck" && name.includes('neck'))) {
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.emissive.set(0x666666);
            }
          }
        }
      });
    }
  });

  return <group ref={group} />;
};

export default FocusedAvatarModel;
