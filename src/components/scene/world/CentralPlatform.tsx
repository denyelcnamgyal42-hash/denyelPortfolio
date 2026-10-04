export function CentralPlatform() {
  return (
    <group>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[7, 6.3, 0.9, 12]} />
        <meshStandardMaterial color="#152732" metalness={0.7} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.19, 0]}>
        <cylinderGeometry args={[6.75, 6.75, 0.12, 12]} />
        <meshStandardMaterial color="#253d48" metalness={0.65} roughness={0.6} />
      </mesh>
      {[6.6, 4.6, 2.25].map((r, i) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1 + i * 0.03, 0]}>
          <ringGeometry args={[r - 0.024, r, 80]} />
          <meshBasicMaterial color={i === 2 ? '#8acbd2' : '#396a7b'} />
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.95, 2.4, 0.45, 12]} />
        <meshStandardMaterial color="#142b38" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.29, 0]}>
        <cylinderGeometry args={[1.75, 1.75, 0.05, 64]} />
        <meshStandardMaterial color="#417987" emissive="#397d8e" emissiveIntensity={0.5} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[0, -0.15, 4.2]}>
            <boxGeometry args={[0.045, 0.035, 3]} />
            <meshBasicMaterial color="#6faeba" />
          </mesh>
          <mesh position={[5, -2, 0]}>
            <boxGeometry args={[0.35, 3.3, 0.5]} />
            <meshStandardMaterial color="#101e28" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
