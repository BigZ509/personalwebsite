"use client";

import { useEffect } from "react";
import { CatmullRomLine } from "@react-three/drei";
import { Asset, Surface, FlatPrint, usePrintedTextures } from "../compositions/SceneAssets";
import type { Composition } from "../compositions/presets";
import RobotCharacter from "./RobotCharacter";

// One small destination, built from the same credited props as the desk.
// No second Canvas, live render target, downloaded model or generated asset.
export default function Workshop({ theme, reducedMotion }: { theme: Composition; reducedMotion: boolean }) {
  const textures = usePrintedTextures(theme);
  useEffect(() => () => Object.values(textures).forEach(texture => texture.dispose()), [textures]);
  return <group userData={{ world: "workshop" }}>
    <Surface position={[0, -0.2, 0]} size={[11, 0.4, 8]} color={theme.edge} radius={0.12} />
    <Surface position={[0, 3.3, -2.7]} size={[11, 6.6, 0.15]} color={theme.wall} />
    <Surface position={[-5.4, 3.3, -0.5]} size={[0.15, 6.6, 4.5]} color={theme.sideWall} />
    <Asset file="desk.glb" position={[0, 0, -0.2]} dimensions={[7.8, 2.6, 3.6]} color={theme.wood} />
    <FlatPrint position={[0, 2.615, 0.22]} size={[3.7, 2.25]} texture={textures.mat} />
    <group position={[0, 2.64, 0.1]} rotation={[0, 0.2, 0]}><RobotCharacter height={2.05} color={theme.robot} reacting={false} running reducedMotion={reducedMotion} /></group>
    <mesh position={[0, 2.63, 0.1]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.9, 0.93, 64]} /><meshBasicMaterial color={theme.accent} /></mesh>
    <Asset file="monitor.glb" position={[-2.3, 2.62, -0.75]} height={1.45} rotation={[0, Math.PI + 0.18, 0]} color={theme.metal} />
    <Asset file="keyboard.glb" position={[-2.3, 2.62, 0.42]} width={1.4} rotation={[0, 0.18, 0]} />
    <Asset file="lamp.glb" position={[2.65, 2.62, -0.85]} height={1.7} rotation={[0, -0.9, 0]} color={theme.metal} />
    <pointLight position={[2.2, 4.15, -0.25]} intensity={48} color="#ffce8b" distance={8} />
    <pointLight position={[-2.5, 3.8, 0.2]} intensity={5} color={theme.accent} distance={4} />
    <mesh position={[-2.19, 3.52, -0.52]} rotation={[0, 0.18, 0]}><planeGeometry args={[1.95, 1.08]} /><meshStandardMaterial map={textures.screen} emissiveMap={textures.screen} emissive="#c7efdb" emissiveIntensity={0.7} /></mesh>
    <Asset file="chip.glb" position={[1.7, 2.63, 0.7]} width={0.85} rotation={[0, -0.25, 0]} />
    <Asset file="chip.glb" position={[2.8, 2.63, 0.6]} width={0.5} rotation={[0, 0.3, 0]} />
    <Asset file="books.glb" position={[-3.1, 2.61, -0.8]} width={0.7} />
    <Asset file="mug.glb" position={[-3.15, 2.61, 0.8]} height={0.38} color={theme.paper} />
    <FlatPrint position={[1.9, 2.62, -0.6]} size={[1.1, 1.35]} texture={textures.notes} rotation={[-Math.PI / 2, 0, -0.12]} />
    <CatmullRomLine points={[[0.65, 2.66, 0.2], [1.1, 2.65, 0.8], [1.55, 2.65, 0.8]]} color={theme.accent} lineWidth={2} />
    <Surface position={[0, 5.4, -2.55]} size={[7.6, 0.12, 0.18]} color={theme.wood} />
    {[-2.8, -1.4, 0, 1.4, 2.8].map((x, i) => <FlatPrint key={x} position={[x, 4.35 + (i % 2) * 0.1, -2.58]} size={[0.9, 1.15]} texture={textures.notes} rotation={[0, 0, (i - 2) * 0.04]} />)}
    <Asset file="plant.glb" position={[-4.35, 0, 0.2]} height={1.8} />
    <Surface position={[0, 0.035, 2.55]} size={[7.7, 0.04, 0.12]} color={theme.accent} />
  </group>;
}
