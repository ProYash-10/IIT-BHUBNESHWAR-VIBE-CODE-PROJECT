import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function DataNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 150;
  
  const [positions, lines] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 12; // Spread particles
    }
    
    // Create connections for points close to each other
    const lineIndices = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 5) {
          lineIndices.push(i, j);
        }
      }
    }
    return [pos, new Uint16Array(lineIndices)];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current && linesRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.025;
      linesRef.current.rotation.y += delta * 0.05;
      linesRef.current.rotation.x += delta * 0.025;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#FF9932" transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={lines}
            itemSize={1}
            count={lines.length}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#114C5A" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <DataNodes />
      </Canvas>
    </div>
  );
}
