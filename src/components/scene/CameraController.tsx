import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Vector3, MathUtils } from 'three';
import { cameraTargets } from '@/lib/scene/cameraTargets';
import { useScene } from '@/lib/scene/SceneContext';
export function CameraController() {
  const { entered, reducedMotion, quality } = useScene();
  const look = useRef(new Vector3(-5, 1, 0));
  const desired = useRef(new Vector3());
  const targetLook = useRef(new Vector3());
  useFrame(({ camera, pointer }, delta) => {
    const target = cameraTargets[entered ? 'lab' : 'home'];
    const mobile = quality === 'low';
    desired.current.set(...target.position);
    targetLook.current.set(...target.lookAt);
    if (mobile) {
      desired.current.set(22, 19, 29);
      targetLook.current.set(0, 7, 0);
    }
    if (!reducedMotion && !mobile) {
      desired.current.x += pointer.x * 0.45;
      desired.current.y += pointer.y * 0.25;
    }
    const blend = reducedMotion ? 1 : 1 - Math.exp((-delta * 5) / target.duration);
    camera.position.lerp(desired.current, blend);
    look.current.lerp(targetLook.current, blend);
    camera.lookAt(look.current);
    if (camera instanceof PerspectiveCamera) {
      camera.fov = MathUtils.lerp(camera.fov, mobile ? 48 : target.fov, blend);
      camera.updateProjectionMatrix();
    }
  });
  return null;
}
