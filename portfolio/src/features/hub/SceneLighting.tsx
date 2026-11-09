"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { AmbientLight, CanvasTexture, Color, DirectionalLight, Group, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, PointLight, SRGBColorSpace } from 'three';
import { Asset } from '../compositions/SceneAssets';
import type { Vec3 } from '../compositions/presets';
import { blendStep, lampTarget, lightingTargets, type LightingState, type LampMode } from './lighting';
import type { World } from './journey';
import styles from './lighting.module.css';
const colorDistance = (a: Color, b: Color) => Math.abs(a.r-b.r) + Math.abs(a.g-b.g) + Math.abs(a.b-b.b);

export function SceneLighting({ state, world, reduced }: { state: LightingState; world: World; reduced: boolean }) {
  const ambient = useRef<AmbientLight>(null); const hemi = useRef<HemisphereLight>(null);
  const key = useRef<DirectionalLight>(null); const fill = useRef<DirectionalLight>(null);
  const { scene, gl, invalidate } = useThree();
  const target = useMemo(() => {
    const t = lightingTargets(state.environment, world);
    return { ...t, ambientColor: new Color(t.ambient), keyColor: new Color(t.key), fillColor: new Color(t.fill), backgroundColor: new Color(t.background) };
  }, [state.environment, world]);
  useEffect(() => { invalidate(); }, [target, reduced, invalidate]);
  useFrame((_root, delta) => {
    if (!ambient.current || !hemi.current || !key.current || !fill.current) return;
    const a = reduced ? 1 : 1 - Math.exp(-5 * Math.min(delta, .1));
    let unsettled = false;
    for (const [light, color, intensity] of [[ambient.current, target.ambientColor, target.ambientIntensity], [hemi.current, target.ambientColor, target.hemisphere], [key.current, target.keyColor, target.keyIntensity], [fill.current, target.fillColor, target.fillIntensity]] as const) {
      light.color.lerp(color, a); light.intensity += (intensity - light.intensity) * a;
      if (Math.abs(light.intensity - intensity) > .001 || colorDistance(light.color, color) > .001) unsettled = true;
      else { light.color.copy(color); light.intensity = intensity; }
    }
    if (scene.background instanceof Color) {
      scene.background.lerp(target.backgroundColor, a);
      if (colorDistance(scene.background, target.backgroundColor) > .001) unsettled = true;
      else scene.background.copy(target.backgroundColor);
    }
    gl.domElement.dataset.lighting = JSON.stringify({ environment: state.environment, world, ambient: ambient.current.intensity, key: key.current.intensity, keyColor: key.current.color.getHexString(), settled: !unsettled });
    if (unsettled) invalidate();
  });
  return <>
    <ambientLight ref={ambient} color="#8eb9d0" intensity={.8} />
    <hemisphereLight ref={hemi} args={['#8eb9d0', '#4c413e', .6]} />
    <directionalLight ref={key} position={[-4, 9, 3]} intensity={2.1} color="#ffc17c" castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-camera-near={.5} shadow-camera-far={30} shadow-bias={-.0002} shadow-normalBias={.025} shadow-radius={4} />
    <directionalLight ref={fill} position={[4, 7, -1]} intensity={2.3} color="#83c8e8" />
  </>;
}

// Asset clones its materials, so changing the shade never mutates the GLTF cache.
export function InteractiveLamp({ position, rotation, height, color, lightOffset, intensity, distance, mode, reduced, active, disabled, onHover, onCycle, evidence = false }: {
  position: Vec3; rotation: Vec3; height: number; color: string; lightOffset: Vec3; intensity: number; distance: number;
  mode: LampMode; reduced: boolean; active: boolean; disabled: boolean; onHover: (active: boolean) => void; onCycle: () => void; evidence?: boolean;
}) {
  const group = useRef<Group>(null); const light = useRef<PointLight>(null);
  const initialized = useRef(false);
  const materials = useRef<MeshStandardMaterial[]>([]);
  const { invalidate, gl } = useThree();
  const target = useMemo(() => ({ ...lampTarget(mode, intensity), shade: new Color(mode === 'cool' ? '#c0e0ff' : '#ffca78'), colorValue: new Color(lampTarget(mode, intensity).color) }), [mode, intensity]);
  const initialTarget = useRef(target);
  useLayoutEffect(() => {
    const owned = new Set<MeshStandardMaterial>();
    group.current?.traverse(object => { if (object instanceof Mesh) for (const material of Array.isArray(object.material) ? object.material : [object.material]) if (material instanceof MeshStandardMaterial && material.name === 'White') owned.add(material); });
    materials.current = [...owned];
    if (!initialized.current) {
      for (const material of materials.current) { material.emissive.copy(target.shade); material.emissiveIntensity = target.emission; }
      initialized.current = true;
    }
    invalidate();
  }, [target, reduced, invalidate]);
  useFrame((_root, delta) => {
    if (!light.current) return;
    const a = reduced ? 1 : 1 - Math.exp(-5 * Math.min(delta, .1));
    light.current.intensity = reduced ? target.intensity : blendStep(light.current.intensity, target.intensity, Math.min(delta, .1));
    light.current.color.lerp(target.colorValue, a);
    let unsettled = Math.abs(light.current.intensity - target.intensity) > .01 || colorDistance(light.current.color, target.colorValue) > .001;
    for (const material of materials.current) {
      material.emissive.lerp(target.shade, a); material.emissiveIntensity += (target.emission - material.emissiveIntensity) * a;
      if (Math.abs(material.emissiveIntensity - target.emission) > .001 || colorDistance(material.emissive, target.shade) > .001) unsettled = true;
      else { material.emissiveIntensity = target.emission; material.emissive.copy(target.shade); }
    }
    if (!unsettled) { light.current.intensity = target.intensity; light.current.color.copy(target.colorValue); }
    if (evidence) gl.domElement.dataset.lamp = JSON.stringify({ mode, intensity: light.current.intensity, color: light.current.color.getHexString(), emission: materials.current[0]?.emissiveIntensity, settled: !unsettled });
    if (unsettled) invalidate();
  });
  const hover = (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); onHover(true); };
  return <group ref={group} position={position} onPointerOver={disabled ? undefined : hover} onPointerOut={disabled ? undefined : () => onHover(false)} onClick={disabled ? undefined : event => { event.stopPropagation(); if (event.delta < 4) onCycle(); }}>
    <Asset file="lamp.glb" position={[0, 0, 0]} rotation={rotation} height={height} color={color} />
    <pointLight ref={light} position={lightOffset} intensity={initialTarget.current.intensity} color={initialTarget.current.color} distance={distance} decay={2} />
    {active && !disabled && <Html center position={[0, height + .3, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[2, 0]}><div className={styles.hint}>Desk lamp · {mode}<span>Click to change light</span></div></Html>}
  </group>;
}

export function DayWindow({ day, reduced }: { day: boolean; reduced: boolean }) {
  const material = useRef<MeshBasicMaterial>(null); const { invalidate } = useThree();
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 256;
    const c = canvas.getContext('2d')!; const gradient = c.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#8db9d3'); gradient.addColorStop(1, '#f0e1bc'); c.fillStyle = gradient; c.fillRect(0, 0, 256, 256);
    c.fillStyle = '#fff0bb'; c.beginPath(); c.arc(187, 65, 20, 0, Math.PI * 2); c.fill();
    for (let n = 0; n < 7; n++) { c.fillStyle = n % 2 ? '#819b99' : '#698f96'; const y = 130 + n * 23 % 55; c.fillRect(n * 43 - 5, y, 36, 256 - y); }
    const value = new CanvasTexture(canvas); value.colorSpace = SRGBColorSpace; return value;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  useEffect(() => { invalidate(); }, [day, reduced, invalidate]);
  useFrame((_state, delta) => { if (!material.current) return; const goal = day ? 1 : 0; material.current.opacity = reduced ? goal : blendStep(material.current.opacity, goal, Math.min(delta, .1)); if (Math.abs(material.current.opacity - goal) > .001) invalidate(); else material.current.opacity = goal; });
  return <mesh position={[-5.865, 4.65, -.55]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[3.1, 3.4]} /><meshBasicMaterial ref={material} map={texture} transparent opacity={0} depthWrite={false} /></mesh>;
}
