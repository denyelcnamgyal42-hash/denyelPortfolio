'use client';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScene } from '@/lib/scene/SceneContext';
export function HeroOverlay() {
  const { navigate, entered, reducedMotion } = useScene();
  return (
    <motion.section
      className="hero"
      aria-label="Introduction"
      animate={{ opacity: entered ? 0 : 1, y: entered && !reducedMotion ? -15 : 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      style={{
        pointerEvents: entered ? 'none' : 'auto',
        visibility: entered ? 'hidden' : 'visible',
      }}
    >
      <div className="eyebrow">
        <span className="eyebrow-line" /> INDEPENDENT THINKING. INTELLIGENT SYSTEMS.
      </div>
      <h1>
        Denyel Chokey
        <br />
        <span>Namgyal.</span>
      </h1>
      <p className="disciplines">
        AI <span>/</span> DATA SCIENCE <span>/</span> CYBERSECURITY
      </p>
      <p className="hero-copy">
        Building intelligent systems.
        <br />
        Exploring secure ones.
      </p>
      <div className="hero-actions">
        <button
          className="button primary"
          onClick={() => navigate('intro')}
          tabIndex={entered ? -1 : 0}
        >
          Enter lab <ArrowUpRight size={18} />
        </button>
        <button
          className="button secondary"
          onClick={() => navigate('Projects')}
          tabIndex={entered ? -1 : 0}
        >
          View projects <ArrowRight size={17} />
        </button>
      </div>
      <div className="hero-note">
        <span>01 — DIGITAL LAB</span>
        <p>
          A research space at the intersection
          <br />
          of intelligence and security.
        </p>
      </div>
    </motion.section>
  );
}
