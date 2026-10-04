import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points } from 'three';
import { qualitySettings } from '@/lib/scene/quality';
import { useScene } from '@/lib/scene/SceneContext';
export function AtmosphericParticles() {
  const { quality, reducedMotion } = useScene();
  const ref = useRef<Points>(null);
  const count = qualitySettings[quality].particles;
  const positions = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: count * 3 }, (_, i) => {
          const n = Math.sin(i * 127.1 + 311.7) * 43758.5453;
          return (n - Math.floor(n) - 0.5) * (i % 3 === 1 ? 35 : 100);
        }),
      ),
    [count],
  );
  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * 0.003;
  });
  return (
    <points ref={ref} position={[0, 9, -12]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#a7c8d8" transparent opacity={0.48} depthWrite={false} />
    </points>
  );
}
