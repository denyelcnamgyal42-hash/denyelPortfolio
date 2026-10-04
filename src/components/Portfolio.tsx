'use client';
import dynamic from 'next/dynamic';
import { SceneProvider, useScene } from '@/lib/scene/SceneContext';
import { Navbar } from './layout/Navbar';
import { HeroOverlay } from './ui/HeroOverlay';
import { SectionPanel } from './ui/SectionPanel';
import { LoadingScreen } from './ui/LoadingScreen';
const Scene = dynamic(() => import('./scene/PortfolioScene'), { ssr: false });
function Experience() {
  const { ready, quality } = useScene();
  return (
    <div className="experience">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="scene-backdrop" aria-hidden="true">
        <div className="fallback-mountains" />
        <div className="fallback-core" />
      </div>
      <Scene />
      <div className="scene-vignette" />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <HeroOverlay />
        <SectionPanel />
      </main>
      <LoadingScreen />
      <footer className="footer">
        <span>
          <i className="status-dot" />
          {ready ? 'SYSTEM ONLINE' : 'ESTABLISHING ENVIRONMENT'}
        </span>
        <span className="footer-center">
          THIMPHU, BHUTAN <span className="coordinates">27.47° N / 89.64° E</span>
        </span>
        <span>
          RESEARCH NODE 01 <span className="quality-label">/ {quality.toUpperCase()}</span>
        </span>
      </footer>
    </div>
  );
}
export function Portfolio() {
  return (
    <SceneProvider>
      <Experience />
    </SceneProvider>
  );
}
