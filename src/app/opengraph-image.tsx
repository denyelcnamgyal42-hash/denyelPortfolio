import { ImageResponse } from 'next/og';
export const alt = 'Denyel — Digital Lab. AI, Data Science, Cybersecurity.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a1620',
        color: '#e7edf0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 90,
      }}
    >
      <div style={{ fontSize: 20, letterSpacing: 5, color: '#94e4ec' }}>DENYEL — DIGITAL LAB</div>
      <div style={{ fontSize: 76, marginTop: 45 }}>Denyel Chokey Namgyal.</div>
      <div style={{ fontSize: 28, color: '#99adbd', marginTop: 28 }}>
        Building intelligent systems. Exploring secure ones.
      </div>
      <div style={{ fontSize: 18, letterSpacing: 3, color: '#94e4ec', marginTop: 60 }}>
        AI / DATA SCIENCE / CYBERSECURITY
      </div>
    </div>,
    size,
  );
}
