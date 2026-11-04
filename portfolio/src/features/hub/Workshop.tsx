"use client";

import { useEffect, type ReactNode } from "react";
import { Html } from "@react-three/drei";
import { type ThreeEvent } from "@react-three/fiber";
import { Asset, Surface, FlatPrint, usePrintedTextures } from "../compositions/SceneAssets";
import type { Composition, Vec3 } from "../compositions/presets";
import { exhibits, type ExhibitId, type ExhibitInteraction } from "./exhibits";
import GuidingHandsSetup from "./GuidingHandsSetup";
import styles from "./hub.module.css";

function Exhibit({ id, position, interaction, children }: { id: ExhibitId; position: Vec3; interaction: ExhibitInteraction; children: ReactNode }) {
  const labelY = id === "guiding-hands" ? -0.45 : -0.05;
  const exhibit = exhibits.find(item => item.id === id)!;
  const selected = interaction.selected === id;
  const attentive = interaction.attention === id;
  const color = selected ? "#f1d193" : attentive ? "#fff0c6" : "#75958c";
  const hover = (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); interaction.onHover(id); };
  return <group position={position} userData={{ exhibit: id }}
    onPointerOver={interaction.disabled ? undefined : hover}
    onPointerOut={interaction.disabled ? undefined : () => interaction.onHover(null)}
    onClick={interaction.disabled ? undefined : event => { event.stopPropagation(); if (event.delta < 4) interaction.onSelect(id); }}>
    <Surface position={[0, 0.055, 0]} size={[2.7, 0.11, 2.1]} color="#293f3c" radius={0.06} />
    <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.02, selected || attentive ? 1.055 : 1.035, 64]} />
      <meshBasicMaterial color={color} />
    </mesh>
    {children}
    <Surface position={[0, 0.085, 1.055]} size={[selected ? 2.5 : 0.7, 0.035, 0.035]} color={color} radius={0.01} />
    <Html center position={[0, labelY, 1.3]} style={{ pointerEvents: "none" }} zIndexRange={[1, 0]}>
      <div className={styles.exhibitLabel} data-selected={selected} data-attention={attentive}>
        <strong>{exhibit.name}</strong><span className={styles.exhibitPrompt}>{selected ? "Selected · View project" : "Open project"}</span><span className={styles.placeholderBadge}>{exhibit.representation}</span>
      </div>
    </Html>
  </group>;
}

// One preserved workshop; each exhibit owns its explicit representation label.
export default function Workshop({ theme, interaction }: { theme: Composition; interaction: ExhibitInteraction }) {
  const textures = usePrintedTextures(theme);
  useEffect(() => () => Object.values(textures).forEach(texture => texture.dispose()), [textures]);
  return <group userData={{ world: "workshop" }}>
    <Surface position={[0, -0.2, 0]} size={[11, 0.4, 8]} color={theme.edge} radius={0.12} />
    <Surface position={[0, 3.3, -2.7]} size={[11, 6.6, 0.15]} color={theme.wall} />
    <Surface position={[-5.4, 3.3, -0.5]} size={[0.15, 6.6, 4.5]} color={theme.sideWall} />
    <Asset file="desk.glb" position={[0, 0, -0.2]} dimensions={[7.8, 2.6, 3.6]} color={theme.wood} />
    <Exhibit id="gesture-rover" position={[-1.85, 2.62, 0.05]} interaction={interaction}>
      <Asset file="/models/robot-expressive.glb" position={[0, 0.13, 0]} height={1.65} rotation={[0, 0.35, 0]} robot color={theme.robot} />
    </Exhibit>
    <Exhibit id="guiding-hands" position={[1.65, 2.62, 0.05]} interaction={interaction}>
      <GuidingHandsSetup />
    </Exhibit>
    <Asset file="lamp.glb" position={[3.3, 2.62, -1.35]} height={1.65} rotation={[0, -0.9, 0]} color={theme.metal} />
    <pointLight position={[2.9, 4.15, -0.45]} intensity={48} color="#ffce8b" distance={8} />
    <pointLight position={[-2.5, 3.8, 0.2]} intensity={5} color={theme.accent} distance={4} />
    <Asset file="books.glb" position={[-3.25, 2.61, -1.25]} width={0.65} />
    <Surface position={[0, 5.4, -2.55]} size={[7.6, 0.12, 0.18]} color={theme.wood} />
    {[-2.8, 0, 2.8].map((x, i) => <FlatPrint key={x} position={[x, 4.35, -2.58]} size={[0.72, 0.92]} texture={textures.notes} rotation={[0, 0, (i - 1) * 0.04]} />)}
    <Asset file="plant.glb" position={[-4.35, 0, 0.2]} height={1.8} />
    <Surface position={[0, 0.035, 2.55]} size={[7.7, 0.04, 0.12]} color={theme.accent} />
  </group>;
}
