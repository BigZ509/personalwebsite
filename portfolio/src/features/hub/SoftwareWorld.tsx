"use client";
import { useState } from 'react';
import { Html, useTexture } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { SRGBColorSpace } from 'three';
import { Asset, Surface } from '../compositions/SceneAssets';
import type { Composition } from '../compositions/presets';
import { softwareProjects, type SoftwareInteraction, type SoftwareProject } from './softwareProjects';
import { InteractiveLamp } from './SceneLighting';
import type { LightingState } from './lighting';
import styles from './hub.module.css';

function Terminal({ project, index, interaction, theme }: { project: SoftwareProject; index: number; interaction: SoftwareInteraction; theme: Composition }) {
  const attentive = interaction.attention === project.id || interaction.selected === project.id;
  const texture = useTexture(project.preview);
  texture.colorSpace = SRGBColorSpace;
  const hover = (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); interaction.onHover(project.id); };
  return <group position={[(index - 1) * 2.8, 2.62, -.65]} rotation={[0, (1 - index) * .1, 0]} userData={{ softwareProject: project.id }} onPointerOver={interaction.disabled ? undefined : hover} onPointerOut={interaction.disabled ? undefined : () => interaction.onHover(null)} onClick={interaction.disabled ? undefined : event => { event.stopPropagation(); if (event.delta < 4) interaction.onSelect(project.id); }}>
    <Asset file="monitor.glb" position={[0, 0, 0]} rotation={[0, Math.PI, 0]} height={1.72} color={theme.metal} />
    <mesh position={[0, 1.07, .275]}><planeGeometry args={[1.3 * 16 / 9, 1.3]} /><meshBasicMaterial map={texture} color={attentive ? "#ffffff" : "#ecf0f4"} toneMapped={false} /></mesh>
    <Asset file="keyboard.glb" position={[0, .02, 1.04]} width={1.85} />
    <Surface position={[0, .015, 1.72]} size={[attentive ? 2.25 : .7, .025, .035]} color={attentive ? '#f1d193' : project.color} radius={.01} />
    <Html center position={[0, -.04, 1.94]} style={{ pointerEvents: 'none' }} zIndexRange={[1, 0]}><div className={`${styles.exhibitLabel} ${styles.softwareLabel}`} data-selected={interaction.selected === project.id} data-attention={attentive}><strong>{project.name}</strong><span className={styles.exhibitPrompt}>Open project</span></div></Html>
  </group>;
}

export default function SoftwareWorld({ theme, interaction, lighting, reduced, onCycleLamp }: { theme: Composition; interaction: SoftwareInteraction; lighting: LightingState; reduced: boolean; onCycleLamp: () => void }) {
  const [lampHover, setLampHover] = useState(false);
  return <group userData={{ world: 'software' }}>
    <Surface position={[0, -.2, 0]} size={[12.4, .4, 8.8]} color={theme.edge} radius={.12} />
    <Surface position={[0, 3.4, -2.9]} size={[12.4, 6.8, .16]} color="#344e5a" />
    <Surface position={[-6.1, 3.4, -.7]} size={[.16, 6.8, 4.5]} color={theme.sideWall} />
    <Asset file="desk.glb" position={[0, 0, -.1]} dimensions={[9.6, 2.6, 4.1]} color={theme.wood} />
    {softwareProjects.map((project, index) => <Terminal key={project.id} project={project} index={index} interaction={interaction} theme={theme} />)}
    <InteractiveLamp position={[-4.35, 2.62, -1.35]} rotation={[0, .7, 0]} height={1.75} color={theme.metal} lightOffset={[.5, 1.45, .35]} intensity={65} distance={8} mode={lighting.lamp} reduced={reduced} active={lampHover} disabled={interaction.disabled} onHover={setLampHover} onCycle={onCycleLamp} />
    <pointLight position={[0, 4, .5]} intensity={5} color="#9bcbe6" distance={6} decay={2} />
    <Surface position={[0, 5.4, -2.65]} size={[9.4, .12, .5]} color={theme.wood} />
    <Asset file="books.glb" position={[-3.25, 5.47, -2.65]} width={1.2} />
    <Asset file="plant.glb" position={[3.6, 5.47, -2.65]} height={.9} />
    <Asset file="plant.glb" position={[5.4, 0, .2]} height={1.8} />
    <Asset file="books.glb" position={[4.35, 2.62, -1.15]} width={.65} rotation={[0, Math.PI, 0]} />
    <Surface position={[0, 5.65, -2.78]} size={[3.8, .035, .035]} color="#9bcbe6" radius={.01} />
    <Surface position={[0, .035, 2.8]} size={[8.8, .04, .12]} color="#8caeb6" />
  </group>;
}
