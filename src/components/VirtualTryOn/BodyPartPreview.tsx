
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

  // Determine camera position and focus based on body part category - adjusted to match main view
  const getCameraSettings = () => {
    switch (bodyPartCategory) {
      case "upper":
        return {
          position: [0, 1.2, 1.6] as [number, number, number], // Closer view
          target: [0, 0.8, 0] as [number, number, number],
          fov: 30,
        };
      case "lower":
        return {
          position: [0, -0.3, 1.6] as [number, number, number], // Closer view
          target: [0, -0.3, 0] as [number, number, number],
          fov: 30,
        };
      case "general":
      default:
        return {
          position: [0, 0.5, 2.0] as [number, number, number], // Closer view
          target: [0, 0.2, 0] as [number, number, number],
          fov: 35,
        };
    }
  };

  const cameraSettings = getCameraSettings();

  return (
    <div className="w-full h-48 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Canvas
        shadows
        camera={{
          position: cameraSettings.position,
          fov: cameraSettings.fov,
        }}
      >
        {/* Enhanced realistic lighting - matching the main view */}
        <ambientLight intensity={0.6} />
        <spotLight 
          position={[4, 6, 4]} 
          angle={0.25} 
          penumbra={0.8} 
          intensity={0.9} 
          castShadow 
        />
        <pointLight position={[-4, 6, -4]} intensity={0.4} />
        
        <ReadyPlayerMeAvatar
          measurements={simpleMeasurements}
          rotation={0}
          highlightedPart={highlightedPart}
          deviceSize="mobile"
        />
        
        {/* Contact shadows for realism - lightened */}
        <ContactShadows 
          opacity={0.3} 
          scale={5} 
          blur={3} 
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
