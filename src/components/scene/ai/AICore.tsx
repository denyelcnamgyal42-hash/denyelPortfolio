import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';
import { useScene } from '@/lib/scene/SceneContext';
export function AICore() {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const { reducedMotion, navigate } = useScene();
  const { nodes, connections } = useMemo(() => {
    const points: number[] = [];
    const lines: number[] = [];
    const count = 76;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = i * 2.39996;
      points.push(Math.cos(a) * r * 1.3, y * 1.3, Math.sin(a) * r * 1.3);
    }
    for (let i = 0; i < count; i++)
      for (let j = i + 1; j < count; j++) {
        const d = Math.hypot(
          points[i * 3] - points[j * 3],
          points[i * 3 + 1] - points[j * 3 + 1],
          points[i * 3 + 2] - points[j * 3 + 2],
        );
        if (d < 0.56)
          lines.push(...points.slice(i * 3, i * 3 + 3), ...points.slice(j * 3, j * 3 + 3));
      }
    return { nodes: new Float32Array(points), connections: new Float32Array(lines) };
  }, []);
  useFrame((_, delta) => {
    if (group.current && !reducedMotion) group.current.rotation.y += delta * 0.075;
  });
  return (
    <group position={[0, 3, 0]}>
      <group ref={group}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            navigate('core');
          }}
        >
          <sphereGeometry args={[1.29, 32, 24]} />
          <meshStandardMaterial
            color="#317d92"
            emissive="#408aa0"
            emissiveIntensity={hovered ? 1.2 : 0.55}
            transparent
            opacity={0.17}
            roughness={0.3}
            depthWrite={false}
          />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#c0f7ff"
            size={hovered ? 0.085 : 0.06}
            sizeAttenuation
            transparent
            opacity={0.95}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connections, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#67c4dc" transparent opacity={hovered ? 0.65 : 0.32} />
        </lineSegments>
        {[
          [0.9, 0.2, 0],
          [-0.6, 0.7, 0.5],
          [0.2, 0, 1.2],
        ].map((rotation, i) => (
          <mesh key={i} rotation={rotation as [number, number, number]}>
            <torusGeometry args={[1.65 + i * 0.16, 0.012, 6, 100]} />
            <meshBasicMaterial color={i === 2 ? '#7799ce' : '#8cd7e5'} transparent opacity={0.55} />
          </mesh>
        ))}
        <mesh>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshBasicMaterial color="#8be4f0" wireframe transparent opacity={0.65} />
        </mesh>
      </group>
      <pointLight color="#8dd7ef" intensity={hovered ? 24 : 16} distance={11} decay={2} />
      <mesh position={[0, -1.45, 0]}>
        <cylinderGeometry args={[0.9, 0.35, 2.5, 32, 1, true]} />
        <meshBasicMaterial
          color="#73c6dc"
          transparent
          opacity={0.025}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
