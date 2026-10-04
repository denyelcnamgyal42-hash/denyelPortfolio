'use client';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { portfolio } from '@/lib/constants/portfolio';
import { useScene } from '@/lib/scene/SceneContext';
const previews = {
  Projects: [
    'Project archive',
    'A home for experiments that become useful systems.',
    'NLP, computer vision, retrieval and security. Project case studies will open here in the next phase.',
  ],
  Research: [
    'Intelligence, explored.',
    'Questions before conclusions.',
    'This research station will hold AI experiments, model comparisons and notes from the lab.',
  ],
  Skills: [
    'A growing toolkit.',
    'Learning through building.',
    'My focus spans AI, machine learning, NLP and computer vision, with a growing foundation in cybersecurity.',
  ],
  Experience: [
    'The path so far.',
    'Computer Science student. Always experimenting.',
    'A dedicated timeline for education, collaborations and experience is planned for this station.',
  ],
  Contact: [
    'Start a conversation.',
    'Ideas are better when shared.',
    'A communications station for research, internship and collaboration enquiries. Contact details will be added in the next phase.',
  ],
  Resume: [
    'Resume',
    'A fuller picture, soon.',
    'The resume will be added here when it is ready. Explore the lab in the meantime.',
  ],
  core: [
    'The intelligence core.',
    'One space. Connected disciplines.',
    'This neural core connects the AI lab, project archive and security node. It is the spatial center of the digital lab.',
  ],
} as const;
export function SectionPanel() {
  const { section, navigate, reducedMotion } = useScene();
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (section !== 'home') heading.current?.focus({ preventScroll: true });
  }, [section]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('home');
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [navigate]);
  const intro = section === 'intro' || section === 'About';
  const preview = section !== 'home' && !intro ? previews[section as keyof typeof previews] : null;
  return (
    <AnimatePresence mode="wait">
      {section !== 'home' && (
        <motion.section
          key={section}
          className="section-panel"
          aria-labelledby="panel-heading"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
        >
          <div className="panel-top">
            <span className="eyebrow">
              {intro ? 'WELCOME TO THE LAB' : 'DIGITAL LAB / ' + section.toUpperCase()}
            </span>
            <button
              className="icon-button"
              aria-label="Close panel and return home"
              onClick={() => navigate('home')}
            >
              <X size={18} />
            </button>
          </div>
          <h2 id="panel-heading" ref={heading} tabIndex={-1}>
            {intro ? 'Hello, I’m Denyel.' : preview?.[0]}
          </h2>
          {intro ? (
            <>
              <p>{portfolio.intro}</p>
              <h3>Focus areas</h3>
              <div className="focus-tags">
                {portfolio.focus.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              <div className="panel-actions">
                <button className="button primary" onClick={() => navigate('Projects')}>
                  Explore projects <ArrowUpRight size={16} />
                </button>
                {section === 'intro' && (
                  <button className="text-button" onClick={() => navigate('About')}>
                    About me ↗
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="panel-lead">{preview?.[1]}</p>
              <p>{preview?.[2]}</p>
              <div className="coming-next">
                <span className="status-dot" />
                {section === 'core' ? 'RESEARCH NODE 01' : 'STATION PREVIEW / CONTENT COMING NEXT'}
              </div>
              <button className="text-button" onClick={() => navigate('intro')}>
                ← Back to the lab
              </button>
            </>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
