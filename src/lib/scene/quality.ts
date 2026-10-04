export type QualityMode = 'high' | 'medium' | 'low';
export const qualitySettings = {
  high: { dpr: 1.6, particles: 220, mountainCount: 19, segments: 64 },
  medium: { dpr: 1.25, particles: 100, mountainCount: 14, segments: 40 },
  low: { dpr: 1, particles: 40, mountainCount: 9, segments: 24 },
};
