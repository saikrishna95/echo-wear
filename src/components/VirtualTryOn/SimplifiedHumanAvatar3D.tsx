
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import CustomMannequin from './CustomMannequin';
import { MeasurementKey } from './types';
import { ErrorBoundary } from 'react-error-boundary';
import { useDeviceSize } from '../../hooks/use-mobile';
import ReadyPlayerMeAvatar from './ReadyPlayerMeAvatar';

interface SimplifiedHumanAvatar3DProps {
  measurements: {
    [key in MeasurementKey]: {
      value: number;
      min: number;
      max: number;
      unit: string;
      label: string;
      category: "upper" | "lower" | "general";
    };
  };
  highlightedPart: MeasurementKey | null;
  rotation: number;
}

// Fallback component if 3D rendering fails
const FallbackAvatar = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
      <div className="text-center p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">3D Avatar</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Unable to load 3D avatar. Using basic mannequin instead.
        </p>
      </div>
    </div>
  );
};

// Camera configuration based on device size
const getCameraSettings = (deviceSize: "mobile" | "tablet" | "desktop") => {
  switch (deviceSize) {
    case "mobile":
      return { position: [0, 1.6, 3.2] as [number, number, number], fov: 35 };
    case "tablet":
      return { position: [0, 1.6, 3.5] as [number, number, number], fov: 40 };
    case "desktop":
      return { position: [0, 1.8, 4] as [number, number, number], fov: 45 };
    default:
      return { position: [0, 1.6, 3.2] as [number, number, number], fov: 35 };
  }
};

const SimplifiedHumanAvatar3D: React.FC<SimplifiedHumanAvatar3DProps> = ({ 
  measurements, 
  highlightedPart,
  rotation
}) => {
  const deviceSize = useDeviceSize();
  const cameraSettings = getCameraSettings(deviceSize);
  
  // Convert measurements format to simplified record
  const simpleMeasurements: Record<MeasurementKey, number> = Object.entries(measurements).reduce(
    (acc, [key, data]) => {
      acc[key as MeasurementKey] = data.value;
      return acc;
    }, 
    {} as Record<MeasurementKey, number>
  );

  // Get responsive container class based on device size
  const getContainerHeightClass = () => {
    switch (deviceSize) {
      case "mobile":
        return "max-h-[500px] min-h-[400px]";
      case "tablet":
        return "max-h-[600px] min-h-[450px]";
      case "desktop":
        return "max-h-[700px] min-h-[500px]";
      default:
        return "max-h-[500px]";
    }
  };
  
  // Use ReadyPlayerMe model with fallback to CustomMannequin
  const [useReadyPlayerMe, setUseReadyPlayerMe] = React.useState(true);
  
  React.useEffect(() => {
    // Check if ReadyPlayerMe model is available
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
    <div className={`w-full h-full ${getContainerHeightClass()} rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900`}>
      <ErrorBoundary FallbackComponent={FallbackAvatar}>
        <Canvas
          camera={{ 
            position: cameraSettings.position, 
            fov: cameraSettings.fov 
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            {/* Simple lighting for clear visibility */}
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.2} />
            
            {/* Choose between ReadyPlayerMe or fallback mannequin */}
            {useReadyPlayerMe ? (
              <ReadyPlayerMeAvatar 
                measurements={simpleMeasurements} 
                rotation={rotation}
                deviceSize={deviceSize}
                highlightedPart={highlightedPart}
              />
            ) : (
              <CustomMannequin 
                measurements={simpleMeasurements} 
                rotation={rotation}
                highlightedPart={highlightedPart}
                deviceSize={deviceSize}
              />
            )}
            
            {/* Environment lighting */}
            <Environment preset="city" />
            
            {/* Camera controls - adjusted for better centering */}
            <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              enableRotate={true}
              minDistance={2}
              maxDistance={5}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 1.8} // Limit vertical rotation
              target={[0, 0.5, 0] as [number, number, number]} // Fixed: explicitly typed as tuple
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      {/* Measurement indicator overlay */}
      {highlightedPart && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="bg-gray-800/70 text-white px-3 py-1 rounded-full text-xs">
            Editing: {measurements[highlightedPart].label}
          </span>
        </div>
      )}
    </div>
  );
};

export default SimplifiedHumanAvatar3D;
