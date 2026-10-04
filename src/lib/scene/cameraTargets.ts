export type CameraTarget = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  duration: number;
};
export const cameraTargets = {
  home: { position: [19, 14, 25], lookAt: [-5, 1, 0], fov: 43, duration: 3 },
  lab: { position: [13, 10, 18], lookAt: [-3.5, 1.4, 0], fov: 46, duration: 2.4 },
} satisfies Record<string, CameraTarget>;
export type CameraDestination = keyof typeof cameraTargets;
