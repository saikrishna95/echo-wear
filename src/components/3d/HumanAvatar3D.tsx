
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface Measurement {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: string;
}

interface Measurements {
  [key: string]: Measurement;
}

interface HumanAvatarProps {
  measurements: Measurements;
  highlightedPart: string | null;
  rotation?: number;
}

const AvatarModel = ({ 
  measurements, 
  highlightedPart,
  rotation = 0 
}: HumanAvatarProps) => {
  // Use a ref to manipulate the mesh
  const meshRef = useRef<THREE.Group>(null);
  
  // Simple mannequin-style model - in a real app, we'd load a GLTF model
  useEffect(() => {
    if (meshRef.current) {
      // Here we would apply the measurements to the model
      // For now, just rotate to the starting position
      meshRef.current.rotation.y = (rotation * Math.PI) / 180;
    }
  }, [rotation, measurements]);

  // Rotate slightly each frame for a gentle animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Head */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color={highlightedPart === "neck" ? "#9b87f5" : "#f6f6f7"} 
        />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 1.2, 0]}>
        <capsuleGeometry args={[
          0.25 * (measurements.chest?.value / 95 || 1), 
          0.5, 
          16, 
          16
        ]} />
        <meshStandardMaterial 
          color={
            highlightedPart === "chest" || 
            highlightedPart === "waist" || 
            highlightedPart === "stomach" ? 
            "#9b87f5" : "#f6f6f7"
          } 
        />
      </mesh>
      
      {/* Right arm */}
      <mesh position={[0.35, 1.3, 0]} rotation={[0, 0, -Math.PI / 16]}>
        <capsuleGeometry args={[
          0.08 * (measurements.shoulder?.value / 45 || 1), 
          0.6, 
          16, 
          16
        ]} />
        <meshStandardMaterial 
          color={highlightedPart === "shoulder" ? "#9b87f5" : "#f6f6f7"} 
        />
      </mesh>
      
      {/* Left arm */}
      <mesh position={[-0.35, 1.3, 0]} rotation={[0, 0, Math.PI / 16]}>
        <capsuleGeometry args={[
          0.08 * (measurements.shoulder?.value / 45 || 1), 
          0.6, 
          16, 
          16
        ]} />
        <meshStandardMaterial 
          color={highlightedPart === "shoulder" ? "#9b87f5" : "#f6f6f7"} 
        />
      </mesh>
      
      {/* Hips */}
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[
          0.25 * (measurements.hips?.value / 95 || 1), 
          0.2, 
          16, 
          16
        ]} />
        <meshStandardMaterial 
          color={highlightedPart === "hips" ? "#9b87f5" : "#f6f6f7"} 
        />
      </mesh>
      
      {/* Right leg */}
      <mesh position={[0.15, 0.4, 0]}>
        <capsuleGeometry args={[
          0.1 * (measurements.thigh?.value / 55 || 1), 
          0.8, 
          16, 
          16
        ]} />
        <meshStandardMaterial 
          color={
            highlightedPart === "thigh" || 
            highlightedPart === "inseam" ? 
            "#9b87f5" : "#f6f6f7"
          } 
        />
      </mesh>
      
      {/* Left leg */}
      <mesh position={[-0.15, 0.4, 0]}>
        <capsuleGeometry args={[
          0.1 * (measurements.thigh?.value / 55 || 1), 
          0.8, 
          16, 
          16
        ]} />
        <meshStandardMaterial 
          color={
            highlightedPart === "thigh" || 
            highlightedPart === "inseam" ? 
            "#9b87f5" : "#f6f6f7"
          } 
        />
      </mesh>
    </group>
  );
};

const HumanAvatar3D = (props: HumanAvatarProps) => {
  return (
    <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AvatarModel {...props} />
      <OrbitControls enablePan={false} />
      <gridHelper args={[10, 10, `#9b87f5`, `#f1f0fb`]} />
    </Canvas>
  );
};

export default HumanAvatar3D;
