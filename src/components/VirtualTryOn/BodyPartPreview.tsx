
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { MeasurementKey } from "./types";
import ReadyPlayerMeAvatar from "./ReadyPlayerMeAvatar";

interface MeasurementData {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
}

type MeasurementsState = {
  [key in MeasurementKey]: MeasurementData;
};

interface BodyPartPreviewProps {
  bodyPartCategory: "upper" | "lower" | "general";
  measurements: MeasurementsState;
  highlightedPart: MeasurementKey | null;
}

const BodyPartPreview: React.FC<BodyPartPreviewProps> = ({
  bodyPartCategory,
  measurements,
  highlightedPart,
}) => {
  // Convert measurements state to simple record
  const simpleMeasurements = Object.entries(measurements).reduce(
    (acc, [key, data]) => {
      acc[key as MeasurementKey] = data.value;
      return acc;
    },
    {} as Record<MeasurementKey, number>
  );

  // Determine camera position and focus based on body part category - adjusted to point higher
  const getCameraSettings = () => {
    switch (bodyPartCategory) {
      case "upper":
        return {
          position: [0, 1.1, 1.8] as [number, number, number], // Raised from 0.9
          target: [0, 1.0, 0] as [number, number, number], // Raised from 0.5
          fov: 30,
        };
      case "lower":
        return {
          position: [0, -0.4, 1.8] as [number, number, number], // Raised from -0.6
          target: [0, -0.4, 0] as [number, number, number], // Raised from -0.6
          fov: 30,
        };
      case "general":
      default:
        return {
          position: [0, 0.8, 2.2] as [number, number, number], // Raised from 0.2
          target: [0, 0.6, 0] as [number, number, number], // Raised from 0
          fov: 40,
        };
    }
  };

  const cameraSettings = getCameraSettings();

  return (
    <div className="w-full h-48 rounded-md overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Canvas
        shadows
        camera={{
          position: cameraSettings.position,
          fov: cameraSettings.fov,
        }}
      >
        {/* Enhanced realistic lighting */}
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[3, 3, 3]} 
          angle={0.3} 
          penumbra={0.8} 
          intensity={0.7} 
          castShadow 
        />
        <pointLight position={[-3, 3, -3]} intensity={0.4} />
        
        <ReadyPlayerMeAvatar
          measurements={simpleMeasurements}
          rotation={0}
          highlightedPart={highlightedPart}
          deviceSize="mobile"
        />
        
        {/* Contact shadows for realism */}
        <ContactShadows 
          opacity={0.4} 
          scale={5} 
          blur={2} 
          far={3} 
          resolution={128} 
          color="#000000" 
          position={[0, -1.5, 0]}
        />
        
        {/* Environment lighting */}
        <Environment preset="studio" />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI - Math.PI / 8}
          target={cameraSettings.target}
        />
      </Canvas>
    </div>
  );
};

export default BodyPartPreview;
