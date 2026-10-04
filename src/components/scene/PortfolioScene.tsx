'use client';
import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScene } from '@/lib/scene/SceneContext';
import { qualitySettings } from '@/lib/scene/quality';
import { CameraController } from './CameraController';
import { Mountains } from './world/Mountains';
import { ResearchFacility } from './world/ResearchFacility';
import { AICore } from './ai/AICore';
import { AtmosphericParticles } from './effects/AtmosphericParticles';
function Ready() {
  const { setReady } = useScene();
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      setReady(true);
    }
  });
  return null;
}
function Fallback() {
  const { setReady } = useScene();
  useEffect(() => setReady(true), [setReady]);
  return <p className="scene-fallback-note">LIGHTWEIGHT VIEW / ALL NAVIGATION AVAILABLE</p>;
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
function World() {
  return (
    <>
      <color attach="background" args={['#0a1620']} />
      <fog attach="fog" args={['#0a1620', 28, 100]} />
      <ambientLight intensity={0.7} color="#a3c4d7" />
      <directionalLight position={[-15, 25, 5]} intensity={2.4} color="#b3d6eb" />
      <directionalLight position={[8, 6, -12]} intensity={1.5} color="#647fa8" />
      <Mountains />
      <ResearchFacility />
      <AICore />
      <AtmosphericParticles />
      <CameraController />
      <Ready />
    </>
  );
}
export default function PortfolioScene() {
  const { quality, reducedMotion } = useScene();
  const [lost, setLost] = useState(false);
  return (
    <SceneBoundary>
      {lost ? (
        <Fallback />
      ) : (
        <Canvas
          className="scene-canvas"
          dpr={[1, qualitySettings[quality].dpr]}
          camera={{
            position: reducedMotion ? [19, 14, 25] : [26, 20, 36],
            fov: 43,
            near: 0.1,
            far: 160,
          }}
          gl={{ antialias: quality !== 'low', alpha: false, powerPreference: 'high-performance' }}
          fallback={<Fallback />}
          onCreated={({ gl }) => {
            gl.domElement.setAttribute(
              'aria-label',
              'A neural core in a Himalayan research facility',
            );
            gl.domElement.addEventListener('webglcontextlost', () => setLost(true), { once: true });
          }}
        >
          <Suspense fallback={null}>
            <World />
          </Suspense>
        </Canvas>
      )}
      <div className="scene-caption">NEURAL CORE / ACTIVE</div>
    </SceneBoundary>
  );
}
