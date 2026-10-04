'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Section } from '@/lib/constants/portfolio';
import type { QualityMode } from './quality';
type SceneState = {
  section: Section;
  navigate: (section: Section) => void;
  entered: boolean;
  quality: QualityMode;
  reducedMotion: boolean;
  ready: boolean;
  setReady: (ready: boolean) => void;
};
const Context = createContext<SceneState | null>(null);
export function SceneProvider({ children }: { children: ReactNode }) {
  const [section, navigate] = useState<Section>('home');
  const [quality, setQuality] = useState<QualityMode>('low');
  const [reducedMotion, setReducedMotion] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(motion.matches);
      setQuality(innerWidth < 700 ? 'low' : innerWidth < 1200 ? 'medium' : 'high');
    };
    update();
    window.addEventListener('resize', update);
    motion.addEventListener('change', update);
    return () => {
      window.removeEventListener('resize', update);
      motion.removeEventListener('change', update);
    };
  }, []);
  return (
    <Context.Provider
      value={{
        section,
        navigate,
        entered: section !== 'home',
        quality,
        reducedMotion,
        ready,
        setReady,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useScene() {
  const value = useContext(Context);
  if (!value) throw new Error('SceneProvider required');
  return value;
}
