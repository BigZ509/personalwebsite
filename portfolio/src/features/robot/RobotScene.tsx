"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { AnimationMixer, Box3, Color, Group, MathUtils, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";

type Props = {
  active: boolean;
  activation: number;
  animate: boolean;
  suspended: boolean;
  cursor: RefObject<{ x: number; y: number }>;
  onReady: () => void;
  onFailure: () => void;
};

export function clearRobotAsset() {
  useGLTF.clear("/models/robot-expressive.glb");
}

function Robot({ active, activation, animate, cursor, onReady }: Props) {
  const { scene, animations } = useGLTF("/models/robot-expressive.glb", false);
  const group = useRef<Group>(null);
  const { invalidate, gl } = useThree();
  const elapsed = useRef(0);
  const lastActivation = useRef(activation);
  const accent = useRef(0);
  const ready = useRef(false);
  const prepared = useMemo(() => {
    const model = clone(scene);
    const materials = new Map<MeshStandardMaterial, MeshStandardMaterial>();
    model.traverse(object => {
      if (!(object instanceof Mesh)) return;
      const tint = (original: MeshStandardMaterial) => {
        if (materials.has(original)) return materials.get(original)!;
        const material = original.clone();
        material.color.set(original.name === "Main" ? "#a5b89d" : original.name === "Grey" ? "#607660" : "#24392f");
        material.roughness = 0.72;
        material.metalness = 0.12;
        material.emissive = new Color("#93b974");
        material.emissiveIntensity = 0;
        materials.set(original, material);
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(m => tint(m as MeshStandardMaterial)) : tint(object.material as MeshStandardMaterial);
    });
    model.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(model);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = 4.1 / size.y;
    model.scale.multiplyScalar(scale);
    model.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
    const mixer = new AnimationMixer(model);
    const idle = animations.find(clip => clip.name === "Idle");
    if (idle) mixer.clipAction(idle).play().setEffectiveTimeScale(0.6);
    const head = model.getObjectByName("Head");
    return { model, mixer, materials: [...materials.values()], head, headRest: head?.quaternion.clone() };
  }, [scene, animations]);

  useEffect(() => () => {
    prepared.mixer.stopAllAction();
    prepared.mixer.uncacheRoot(prepared.model);
    prepared.materials.forEach(material => material.dispose());
  }, [prepared]);

  useEffect(() => {
    if (activation !== lastActivation.current) { accent.current = 0.35; lastActivation.current = activation; }
    invalidate();
  }, [activation, active, animate, invalidate]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (animate) {
      elapsed.current += delta;
      if (prepared.head && prepared.headRest) prepared.head.quaternion.copy(prepared.headRest);
      prepared.mixer.update(delta);
      accent.current = Math.max(0, accent.current - delta);
      const turn = active ? cursor.current.x * 0.23 - 0.08 : -0.22;
      if (group.current) {
        group.current.rotation.y = MathUtils.damp(group.current.rotation.y, turn, 6, delta);
        group.current.position.y = -1.95 + Math.sin(elapsed.current * 1.5) * 0.018 + Math.sin(accent.current / 0.35 * Math.PI) * 0.1;
        group.current.rotation.z = MathUtils.damp(group.current.rotation.z, active ? -cursor.current.x * 0.025 : 0, 5, delta);
      }
      if (prepared.head && active) prepared.head.rotateY(cursor.current.x * 0.08);
    } else { accent.current = 0; }
    prepared.materials.forEach(material => { material.emissiveIntensity = animate ? MathUtils.damp(material.emissiveIntensity, active ? 0.14 : 0.015, 7, delta) : 0.015; });
    if (!ready.current) { ready.current = true; onReady(); }
    // Read-only renderer counters are inspectable in browser QA; no telemetry or global loop.
    gl.domElement.dataset.drawCalls = String(gl.info.render.calls);
    gl.domElement.dataset.triangles = String(gl.info.render.triangles);
    gl.domElement.dataset.renderFrame = String(gl.info.render.frame);
  });

  return <group ref={group} position={[0, -1.95, 0]} rotation={[0, -0.22, 0]}><primitive object={prepared.model} dispose={null} /></group>;
}

export default function RobotScene(props: Props) {
  return <Canvas camera={{ position: [4.2, 2.3, 10.5], fov: 30 }} dpr={[1, 1.5]} frameloop={props.suspended ? "never" : props.animate ? "always" : "demand"} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} onCreated={({ gl, camera }) => {
    camera.lookAt(0, 0.1, 0);
    gl.setClearColor(0x000000, 0);
  }} fallback={null}>
    <ContextGuard onFailure={props.onFailure} />
    <ambientLight intensity={1.6} />
    <hemisphereLight args={["#fff8e5", "#677b62", 2.0]} />
    <directionalLight position={[-3, 6, 5]} intensity={3.4} color="#fff3d6" />
    <directionalLight position={[4, 2, -3]} intensity={2} color="#e4efd7" />
    <Suspense fallback={null}><Robot {...props} /></Suspense>
  </Canvas>;
}

function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}
