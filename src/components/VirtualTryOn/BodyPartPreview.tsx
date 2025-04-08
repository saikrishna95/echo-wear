
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { MeasurementKey } from "./types";
import FocusedAvatarModel from "./FocusedAvatarModel";
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

  // Determine camera position and focus based on body part category
  const getCameraSettings = () => {
    switch (bodyPartCategory) {
      case "upper":
        return {
          position: [0, 1.2, 1.8] as [number, number, number],
          target: [0, 0.8, 0] as [number, number, number],
          fov: 30,
        };
      case "lower":
        return {
          position: [0, -0.3, 1.8] as [number, number, number],
          target: [0, -0.3, 0] as [number, number, number],
          fov: 30,
        };
      case "general":
      default:
        return {
          position: [0, 0.5, 2.2] as [number, number, number],
          target: [0, 0.2, 0] as [number, number, number],
          fov: 40,
        };
    }
  };

  const cameraSettings = getCameraSettings();
  const [useReadyPlayerMe, setUseReadyPlayerMe] = useState(true);
  
  // Check if ReadyPlayerMe model is available
  useEffect(() => {
    const checkModelAvailability = async () => {
      try {
        const response = await fetch('https://models.readyplayer.me/67f534d65ec6a722636d42b4.glb', { method: 'HEAD' });
        setUseReadyPlayerMe(response.ok);
      } catch (error) {
        console.error('Error checking ReadyPlayerMe model:', error);
        setUseReadyPlayerMe(false);
      }
    };
    
    checkModelAvailability();
    
    // Fallback timer
    const timer = setTimeout(() => {
      setUseReadyPlayerMe(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-48 rounded-md overflow-hidden bg-gray-50">
      <Canvas
        camera={{
          position: cameraSettings.position,
          fov: cameraSettings.fov,
        }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        {useReadyPlayerMe ? (
          <ReadyPlayerMeAvatar
            measurements={simpleMeasurements}
            rotation={0}
            highlightedPart={highlightedPart}
            deviceSize="mobile"
          />
        ) : (
          <FocusedAvatarModel
            measurements={simpleMeasurements}
            focusArea={bodyPartCategory}
            highlightedPart={highlightedPart}
          />
        )}
        
        <Environment preset="city" />
        
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
