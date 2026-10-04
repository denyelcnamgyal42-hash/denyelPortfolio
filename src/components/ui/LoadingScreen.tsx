'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useScene } from '@/lib/scene/SceneContext';
export function LoadingScreen() {
  const { ready, reducedMotion } = useScene();
  const [dismissed, dismiss] = useState(false);
  return (
    <AnimatePresence>
      {!ready && !dismissed && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
          role="status"
        >
          <span className="loading-mark">D.</span>
          <p>INITIALIZING DENYEL.AI</p>
          <span>Establishing research environment…</span>
          <div className="loading-line" />
          <button
            className="text-button"
            onClick={() => {
              dismiss(true);
              document.getElementById('main')?.focus();
            }}
          >
            Continue to portfolio
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
