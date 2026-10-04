'use client';
import { useState } from 'react';
import { ArrowUpRight, Menu, X, Hexagon } from 'lucide-react';
import { sections } from '@/lib/constants/portfolio';
import { useScene } from '@/lib/scene/SceneContext';
export function Navbar() {
  const { navigate, section } = useScene();
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <button
        className="brand"
        aria-label="Denyel, return home"
        onClick={() => {
          navigate('home');
          setOpen(false);
        }}
      >
        <Hexagon size={23} strokeWidth={1.3} />
        <span>
          DENYEL<span className="brand-dot">.</span>
        </span>
      </button>
      <button
        className="mobile-menu icon-button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="navigation"
        className={open ? 'nav-links open' : 'nav-links'}
        aria-label="Main navigation"
      >
        {sections.map((item) => (
          <button
            key={item}
            aria-current={section === item ? 'page' : undefined}
            onClick={() => {
              navigate(item);
              setOpen(false);
            }}
          >
            {item}
          </button>
        ))}
      </nav>
      <button className="resume-button" onClick={() => navigate('Resume')}>
        Resume <ArrowUpRight size={14} />
      </button>
    </header>
  );
}
