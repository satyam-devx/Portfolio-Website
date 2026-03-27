import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingSphere({ position, color, speed, radius }) {
  const meshRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[radius, 1]} />
      <meshBasicMaterial color={color} wireframe opacity={0.18} transparent />
    </mesh>
  );
}

function FloatingTorus({ position, color, speed }) {
  const meshRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.cos(t * speed + offset) * 0.3;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.z = t * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.7, 0.18, 8, 24]} />
      <meshBasicMaterial color={color} wireframe opacity={0.14} transparent />
    </mesh>
  );
}

function ParticleField() {
  const ref = useRef();
  const count = 800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00f5ff" size={0.04} opacity={0.35} transparent />
    </points>
  );
}

function DistortionRing({ radius, color, speed, axis }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (axis === 'x') ref.current.rotation.x = t;
    if (axis === 'y') ref.current.rotation.y = t;
    if (axis === 'z') ref.current.rotation.z = t;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 4, 80]} />
      <meshBasicMaterial color={color} opacity={0.2} transparent />
    </mesh>
  );
}

export default function Scene3D({ style, className }) {
  return (
  <div 
    style={{ pointerEvents: 'none', ...style }} 
    className={className}
  >
      <Canvas
  camera={{ position: [0, 0, 7], fov: 60 }}
  gl={{ alpha: true, antialias: true }}
  style={{ 
    background: 'transparent',
    pointerEvents: 'none'   // ✅ THIS LINE FIXES EVERYTHING
  }}
>
        <ParticleField />
        <FloatingSphere position={[-4, 1.5, -2]} color="#00f5ff" speed={0.6} radius={1.1} />
        <FloatingSphere position={[4.5, -1, -1.5]} color="#9b5de5" speed={0.4} radius={0.7} />
        <FloatingSphere position={[2, 3, -3]} color="#4361ee" speed={0.8} radius={0.5} />
        <FloatingTorus position={[-3, -2, -1]} color="#f72585" speed={0.5} />
        <FloatingTorus position={[3.5, 2, -2]} color="#00f5ff" speed={0.7} />
        <DistortionRing radius={2.5} color="#00f5ff" speed={0.2} axis="y" />
        <DistortionRing radius={3.2} color="#9b5de5" speed={-0.15} axis="x" />
        <DistortionRing radius={4} color="#4361ee" speed={0.1} axis="z" />
      </Canvas>
    </div>
  );
}
