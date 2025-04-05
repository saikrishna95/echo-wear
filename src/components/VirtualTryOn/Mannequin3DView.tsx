
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Measurement {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  category: "upper" | "lower" | "general";
}

type MeasurementKey = 
  | "neck" 
  | "shoulder"
  | "chest"
  | "waist"
  | "stomach"
  | "hips"
  | "thigh"
  | "inseam"
  | "height"
  | "weight";

type MeasurementsState = {
  [key in MeasurementKey]: Measurement;
};

interface Mannequin3DViewProps {
  measurements: MeasurementsState;
  highlightedPart: MeasurementKey | null;
  rotation: number;
}

const Mannequin3DView: React.FC<Mannequin3DViewProps> = ({ 
  measurements, 
  highlightedPart,
  rotation 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mannequinRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // Calculate scaling factors based on measurements
  const calculateScaleFactor = (key: MeasurementKey): number => {
    const measurement = measurements[key];
    return (measurement.value - measurement.min) / (measurement.max - measurement.min);
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);
    sceneRef.current = scene;

    // Set up camera
    const aspectRatio = mountRef.current.clientWidth / mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.position.set(0, 1.5, 3);
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(0, 5, -10);
    scene.add(backLight);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 5;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Load mannequin model
    const loader = new GLTFLoader();
    
    // First, let's create a simple placeholder mannequin using primitives
    // This will show while the GLB model loads or if it fails to load
    const createPlaceholderMannequin = () => {
      const group = new THREE.Group();
      
      // Head
      const headGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.7;
      group.add(head);
      
      // Torso
      const torsoGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.6, 32);
      const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0xd0d0d0 });
      const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
      torso.position.y = 1.3;
      group.add(torso);
      
      // Lower body
      const lowerGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.5, 32);
      const lowerMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
      const lower = new THREE.Mesh(lowerGeometry, lowerMaterial);
      lower.position.y = 0.85;
      group.add(lower);
      
      // Legs
      const legGeometry = new THREE.CylinderGeometry(0.07, 0.05, 0.8, 32);
      const legMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0 });
      
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(0.1, 0.4, 0);
      group.add(leftLeg);
      
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(-0.1, 0.4, 0);
      group.add(rightLeg);
      
      // Arms
      const armGeometry = new THREE.CylinderGeometry(0.05, 0.04, 0.6, 32);
      const armMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0 });
      
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(0.35, 1.3, 0);
      leftArm.rotation.z = -Math.PI / 6;
      group.add(leftArm);
      
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(-0.35, 1.3, 0);
      rightArm.rotation.z = Math.PI / 6;
      group.add(rightArm);
      
      return group;
    };
    
    // Add placeholder mannequin
    mannequinRef.current = createPlaceholderMannequin();
    scene.add(mannequinRef.current);
    
    // Try to load actual GLB model
    try {
      // Look for mannequin.glb in public/models directory
      loader.load("/models/mannequin.glb", 
        (gltf) => {
          // If model loaded successfully, replace placeholder
          scene.remove(mannequinRef.current!);
          mannequinRef.current = gltf.scene;
          scene.add(mannequinRef.current);
          
          // Update mannequin based on current measurements
          updateMannequinMeasurements();
        },
        undefined,
        (error) => {
          console.log("Error loading mannequin model:", error);
          // Keep using placeholder if model fails to load
        }
      );
    } catch (error) {
      console.log("Failed to load mannequin model:", error);
      // Continue with placeholder mannequin
    }

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update mannequin when measurements change
  const updateMannequinMeasurements = () => {
    if (!mannequinRef.current) return;
    
    // Calculate scale factors
    const heightScale = 0.8 + calculateScaleFactor("height") * 0.4;
    const waistScale = 0.8 + calculateScaleFactor("waist") * 0.4;
    const hipScale = 0.8 + calculateScaleFactor("hips") * 0.4;
    
    // Apply rotation based on prop
    mannequinRef.current.rotation.y = THREE.MathUtils.degToRad(rotation);
    
    // If this is a placeholder mannequin (group of primitives)
    if (mannequinRef.current instanceof THREE.Group) {
      // Apply different scaling to different body parts
      mannequinRef.current.children.forEach(child => {
        const y = child.position.y;
        
        // Head
        if (y > 1.6) {
          child.scale.set(1, 1, 1);
        }
        // Torso
        else if (y > 1) {
          child.scale.set(waistScale, heightScale * 0.8, waistScale);
        }
        // Hips/Lower body
        else if (y > 0.7) {
          child.scale.set(hipScale, heightScale * 0.8, hipScale);
        }
        // Legs
        else if (y < 0.7) {
          // Scale leg height based on inseam/height
          const legHeightScale = 0.8 + calculateScaleFactor("inseam") * 0.4;
          child.scale.set(
            0.8 + calculateScaleFactor("thigh") * 0.4, 
            legHeightScale, 
            0.8 + calculateScaleFactor("thigh") * 0.4
          );
        }
      });
    } else {
      // For GLB model, apply overall scaling
      // Note: In a real app, you would use morph targets or bone scaling
      // for more realistic body changes
      mannequinRef.current.scale.set(
        waistScale,
        heightScale,
        hipScale
      );
    }
  };

  // Apply measurement updates
  useEffect(() => {
    updateMannequinMeasurements();
  }, [measurements, rotation]);

  return (
    <div className="w-full h-full bg-gray-50 rounded-xl shadow-sm overflow-hidden flex items-center justify-center">
      <div 
        ref={mountRef} 
        className="w-full h-full"
        style={{ 
          position: "relative" 
        }}
      >
        {/* Measurement indicator */}
        {highlightedPart && (
          <div className="absolute bottom-4 left-0 right-0 text-center z-10">
            <span className="bg-gray-800/70 text-white px-3 py-1 rounded-full text-xs">
              Editing: {measurements[highlightedPart].label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mannequin3DView;
