"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimationMixer, Box3, Group, LoopOnce, LoopRepeat, Mesh,
  MeshStandardMaterial, Vector3,
} from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";

export type RobotCharacterProps = {
  height?: number;
  color: string;
  reacting: boolean;
  reducedMotion: boolean;
  running: boolean;
};

const neutralTime = 0.5;
const fadeDuration = 0.18;

/** Parent supplies placement, interaction state and the canvas lifecycle. */
export default function RobotCharacter({
  height = 1, color, reacting, reducedMotion, running,
}: RobotCharacterProps) {
  const { scene, animations } = useGLTF("/models/robot-expressive.glb", false);
  const invalidate = useThree(state => state.invalidate);
  const group = useRef<Group>(null);
  const wasReacting = useRef(false);
  const waving = useRef(false);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );
  const prepared = useMemo(() => {
    const model = clone(scene);
    const materials = new Map<MeshStandardMaterial, MeshStandardMaterial>();
    model.traverse(object => {
      if (!(object instanceof Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const own = (original: MeshStandardMaterial) => {
        let material = materials.get(original);
        if (!material) {
          material = original.clone();
          materials.set(original, material);
        }
        return material;
      };
      object.material = Array.isArray(object.material)
        ? object.material.map(material => own(material as MeshStandardMaterial))
        : own(object.material as MeshStandardMaterial);
    });

    // Measure the authored neutral pose; leave the cached GLTF and rig untouched.
    const sampler = new AnimationMixer(model);
    const idleClip = animations.find(clip => clip.name === "Idle");
    if (idleClip) {
      const idle = sampler.clipAction(idleClip).play();
      idle.time = neutralTime;
      sampler.update(0);
    }
    model.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    sampler.stopAllAction();
    sampler.uncacheRoot(model);
    return {
      model, materials: [...materials.values()],
      unitScale: 1 / Math.max(size.y, 0.0001),
      offset: [-center.x, -bounds.min.y, -center.z] as [number, number, number],
      head: model.getObjectByName("Head"),
      // The skinned HandR/HandL mesh origins do not follow their animated palms.
      rightHand: model.getObjectByName("Palm2R"),
      leftHand: model.getObjectByName("Palm2L"),
    };
  }, [scene, animations]);
  const { actions, mixer } = useAnimations(animations, prepared.model);
  const evidence = useMemo(() => ({
    asset: "/models/robot-expressive.glb",
    action: "Idle" as "Idle" | "Wave",
    actionTime: neutralTime, idleTime: neutralTime, waveTime: 0, mixerTime: 0,
    running: false, reducedMotion: false, documentVisible: true, playing: false,
    waveStarts: 0, waveCompletions: 0, samples: 0,
    headWorld: [0, 0, 0], rightHandWorld: [0, 0, 0], leftHandWorld: [0, 0, 0],
    headNode: "Head", rightHandNode: "Palm2R", leftHandNode: "Palm2L",
  }), []);
  const userData = useMemo(() => ({
    asset: "/models/robot-expressive.glb", robotAnimation: evidence,
  }), [evidence]);
  const point = useMemo(() => new Vector3(), []);

  useEffect(() => () => {
    // Geometry/textures are shared with useGLTF's cache; dispose only our copies.
    prepared.materials.forEach(material => material.dispose());
  }, [prepared]);

  useLayoutEffect(() => {
    for (const material of prepared.materials) {
      if (material.name === "Main") {
        material.color.set(color);
        material.emissive.set(color);
        material.emissiveIntensity = reacting ? 0.16 : 0;
      } else if (material.name === "Grey") {
        material.color.set("#56635b");
      }
    }
    if (running && !document.hidden) invalidate();
  }, [color, reacting, prepared, running, invalidate]);

  useEffect(() => {
    const onVisibility = () => {
      // Pause synchronously, before React commits the visibility state change.
      if (document.hidden) mixer.timeScale = 0;
      setDocumentVisible(!document.hidden);
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [mixer]);

  useLayoutEffect(() => {
    mixer.stopAllAction();
    waving.current = false;
    evidence.action = "Idle";
    const idle = actions.Idle;
    if (idle) {
      idle.reset().setLoop(LoopRepeat, Infinity).setEffectiveWeight(1).play();
      idle.time = neutralTime;
      idle.paused = reducedMotion;
      // Evaluate the neutral Idle pose even while the mixer is paused.
      mixer.update(0);
    }
    return () => { mixer.stopAllAction(); };
  }, [actions, mixer, reducedMotion, evidence]);

  useLayoutEffect(() => {
    mixer.timeScale = running && documentVisible && !reducedMotion ? 1 : 0;
    evidence.running = running;
    evidence.reducedMotion = reducedMotion;
    evidence.documentVisible = documentVisible;
    evidence.playing = mixer.timeScale !== 0;
    if (running && documentVisible) invalidate();
  }, [running, documentVisible, reducedMotion, mixer, evidence, invalidate]);

  useEffect(() => {
    const onFinished = (event: { action: typeof actions.Wave }) => {
      if (event.action !== actions.Wave || !waving.current) return;
      waving.current = false;
      evidence.action = "Idle";
      evidence.waveCompletions += 1;
      actions.Wave?.fadeOut(fadeDuration);
      actions.Idle?.reset().setEffectiveTimeScale(1).setEffectiveWeight(1)
        .fadeIn(fadeDuration).play();
    };
    mixer.addEventListener("finished", onFinished);
    return () => mixer.removeEventListener("finished", onFinished);
  }, [actions, mixer, evidence]);

  useLayoutEffect(() => {
    const freshInteraction = reacting && !wasReacting.current;
    // Consume intent while paused too: resuming a held hover must not replay Wave.
    wasReacting.current = reacting;
    if (!freshInteraction || waving.current || !running || !documentVisible
      || document.hidden || reducedMotion) return;
    const wave = actions.Wave;
    const idle = actions.Idle;
    if (!wave || !idle) return;
    wave.reset().setLoop(LoopOnce, 1).setEffectiveTimeScale(1)
      .setEffectiveWeight(1).play();
    wave.clampWhenFinished = true;
    idle.crossFadeTo(wave, fadeDuration, false);
    waving.current = true;
    evidence.action = "Wave";
    evidence.waveStarts += 1;
    invalidate();
  }, [reacting, running, documentVisible, reducedMotion, actions, evidence, invalidate]);

  // Drei already updates this mixer at priority 0. Gate it before that update;
  // cap a delayed frame's step so a restored background tab cannot skip a Wave.
  useFrame((_, delta) => {
    const playing = running && !reducedMotion && !document.hidden;
    mixer.timeScale = playing ? Math.min(1, (1 / 15) / Math.max(delta, 0.0001)) : 0;
  }, -1);

  useFrame(() => {
    evidence.running = running;
    evidence.reducedMotion = reducedMotion;
    evidence.documentVisible = !document.hidden;
    evidence.playing = running && !reducedMotion && !document.hidden;
    evidence.idleTime = actions.Idle?.time ?? 0;
    evidence.waveTime = actions.Wave?.time ?? 0;
    evidence.actionTime = evidence.action === "Wave" ? evidence.waveTime : evidence.idleTime;
    evidence.mixerTime = mixer.time;
    evidence.samples += 1;
    group.current?.updateWorldMatrix(true, true);
    prepared.head?.getWorldPosition(point).toArray(evidence.headWorld);
    prepared.rightHand?.getWorldPosition(point).toArray(evidence.rightHandWorld);
    prepared.leftHand?.getWorldPosition(point).toArray(evidence.leftHandWorld);
    if (evidence.playing) invalidate();
  });

  return (
    <group ref={group} name="RobotCharacter" userData={userData} dispose={null}>
      <group scale={height * prepared.unitScale}>
        <group position={prepared.offset}>
          <primitive object={prepared.model} dispose={null} />
        </group>
      </group>
    </group>
  );
}
