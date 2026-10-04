import { useState } from 'react';
import { Html } from '@react-three/drei';
import type { Section } from '@/lib/constants/portfolio';
import { useScene } from '@/lib/scene/SceneContext';
export type Station = { label: string; section: Section; angle: number; variant: number };
export function LabStation({ label, section, angle, variant }: Station) {
  const [hovered, setHovered] = useState(false);
  const { navigate, quality } = useScene();
  return (
    <group rotation={[0, angle, 0]}>
      <group
        position={[0, 0, -8.5]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          navigate(section);
        }}
      >
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[2.15, 1.85, 0.65, 6]} />
          <meshStandardMaterial
            color={hovered ? '#304e5d' : '#172c39'}
            metalness={0.6}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[1.95, 1.95, 0.08, 6]} />
          <meshStandardMaterial color="#233d4a" />
        </mesh>
        <mesh position={[0, 0, 2]}>
          <boxGeometry args={[1.6, 0.18, 3.5]} />
          <meshStandardMaterial color="#1c3442" />
        </mesh>
        {[-0.75, 0.75].map((x) => (
          <mesh key={x} position={[x, 0.1, 2]}>
            <boxGeometry args={[0.025, 0.025, 3.5]} />
            <meshBasicMaterial color="#528d9e" />
          </mesh>
        ))}
        {variant % 3 === 0 ? (
          <>
            <mesh position={[0, 0.7, 0]} rotation={[-0.25, 0, 0]}>
              <boxGeometry args={[2, 1.2, 0.12]} />
              <meshStandardMaterial
                color="#122c3a"
                emissive="#2b7c97"
                emissiveIntensity={hovered ? 1 : 0.25}
              />
            </mesh>
            {[-0.38, 0, 0.38].map((y) => (
              <mesh key={y} position={[0, 0.7 + y, 0.22]}>
                <boxGeometry args={[1.55, 0.018, 0.01]} />
                <meshBasicMaterial color="#72bac9" />
              </mesh>
            ))}
          </>
        ) : variant % 3 === 1 ? (
          <>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[1.15, 1.3, 0.7, 6]} />
              <meshStandardMaterial color="#233d4c" />
            </mesh>
            <mesh position={[0, 0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.55, 0.58, 32]} />
              <meshBasicMaterial color="#83cbd4" />
            </mesh>
          </>
        ) : (
          <>
            {[-0.7, 0, 0.7].map((x, i) => (
              <mesh key={x} position={[x, 0.6 + i * 0.2, 0]}>
                <boxGeometry args={[0.5, 1.2 + i * 0.4, 0.55]} />
                <meshStandardMaterial
                  color="#244350"
                  emissive="#376275"
                  emissiveIntensity={hovered ? 0.65 : 0.15}
                />
              </mesh>
            ))}
          </>
        )}
        <mesh position={[0, 1.85, -0.4]}>
          <boxGeometry args={[3, 0.12, 1.65]} />
          <meshStandardMaterial color="#243c48" />
        </mesh>
        {[-1.25, 1.25].map((x) => (
          <mesh key={x} position={[x, 0.9, -0.9]}>
            <boxGeometry args={[0.1, 1.85, 0.1]} />
            <meshStandardMaterial color="#426472" />
          </mesh>
        ))}
        {quality !== 'low' && (
          <Html position={[0, 2.55, 0]} center zIndexRange={[5, 0]}>
            <button
              className="station-label"
              style={{ opacity: hovered ? 1 : 0.7 }}
              onFocus={() => setHovered(true)}
              onBlur={() => setHovered(false)}
              onClick={() => navigate(section)}
            >
              {label} <span aria-hidden="true">↗</span>
            </button>
          </Html>
        )}
      </group>
    </group>
  );
}
