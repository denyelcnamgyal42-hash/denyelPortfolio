import { memo, useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { useScene } from '@/lib/scene/SceneContext';
import { qualitySettings } from '@/lib/scene/quality';
function Mountain({
  x,
  z,
  width,
  height,
  shade,
}: {
  x: number;
  z: number;
  width: number;
  height: number;
  shade: string;
}) {
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const points: number[] = [];
    const ring = Array.from({ length: 7 }, (_, i) => {
      const angle = (i / 7) * Math.PI * 2;
      return [Math.cos(angle) * width, 0, Math.sin(angle) * width * 0.7];
    });
    for (let i = 0; i < 7; i++) {
      const a = ring[i],
        b = ring[(i + 1) % 7];
      const peak = [width * 0.17, height, -0.4];
      points.push(...a, ...b, ...peak);
    }
    g.setAttribute('position', new Float32BufferAttribute(points, 3));
    g.computeVertexNormals();
    return g;
  }, [width, height]);
  return (
    <mesh geometry={geometry} position={[x, -6, z]}>
      <meshStandardMaterial color={shade} roughness={1} flatShading />
    </mesh>
  );
}
export const Mountains = memo(function Mountains() {
  const { quality } = useScene();
  const count = qualitySettings[quality].mountainCount;
  return (
    <group>
      {Array.from({ length: count }, (_, i) => (
        <Mountain
          key={i}
          x={(i - count / 2) * 7}
          z={-25 - (i % 3) * 9}
          width={10 + (i % 4) * 3}
          height={13 + Math.sin(i * 8.7) * 5 + (i % 3) * 2}
          shade={i % 3 === 0 ? '#233846' : '#162c3b'}
        />
      ))}
    </group>
  );
});
