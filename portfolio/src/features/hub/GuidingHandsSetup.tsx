"use client";

import { useEffect, useMemo } from "react";
import { CatmullRomLine, Html, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import { Asset, Surface } from "../compositions/SceneAssets";
import styles from "./hub.module.css";

const base = "/models/guiding-hardware/";

// Original stylization from NVIDIA's hardware-layout reference, not an official
// mesh, electrical diagram or dimensional replica. Fan remains still.
function JetsonStudy() {
  return <group position={[-0.12, 0.16, 0.63]} rotation={[0, 0.48, 0]} scale={1.05} userData={{ hardware: "stylized-jetson-orin-nano" }}>
    <Surface position={[0, 0.025, 0]} size={[0.86, 0.05, 0.65]} color="#426e51" radius={0.025} />
    <Surface position={[-0.08, 0.16, -0.05]} size={[0.55, 0.22, 0.42]} color="#252f32" radius={0.025} />
    <mesh position={[-0.08, 0.278, -0.05]}><cylinderGeometry args={[0.19, 0.19, 0.018, 24]} /><meshStandardMaterial color="#111d21" roughness={0.8} /></mesh>
    {[0, 1, 2, 3, 4, 5].map(index => <group key={index} position={[-0.08, 0.29, -0.05]} rotation={[0, index * Math.PI / 3, 0]}>
      <Surface position={[0.095, 0, 0]} size={[0.135, 0.018, 0.045]} rotation={[0, 0.45, 0]} color="#465257" radius={0.008} />
    </group>)}
    <mesh position={[-0.08, 0.302, -0.05]}><cylinderGeometry args={[0.055, 0.055, 0.024, 16]} /><meshStandardMaterial color="#66706c" roughness={0.8} /></mesh>
    {/* Simplified connector silhouettes, not a pin-accurate implementation. */}
    {[-0.25, -0.02].map(x => <group key={x}><Surface position={[x, 0.11, 0.28]} size={[0.18, 0.16, 0.14]} color="#9aa7a2" radius={0.01} /><Surface position={[x, 0.11, 0.355]} size={[0.13, 0.105, 0.012]} color="#1e3037" radius={0.005} /></group>)}
    <Surface position={[0.23, 0.11, 0.26]} size={[0.19, 0.16, 0.19]} color="#9aa7a2" radius={0.01} />
    <Surface position={[0.23, 0.1, 0.365]} size={[0.13, 0.09, 0.012]} color="#263739" radius={0.005} />
    <Surface position={[0.31, 0.08, -0.1]} size={[0.12, 0.09, 0.39]} color="#17272b" radius={0.01} />
    {[0, 1, 2, 3, 4, 5].map(index => <Surface key={index} position={[0.31, 0.145, -0.26 + index * 0.06]} size={[0.06, 0.035, 0.02]} color="#cbbd8a" radius={0.004} />)}
  </group>;
}

// Original unedited repository capture, not a generated mockup or live feed.
function ProjectionBoard() {
  const source = useTexture("/images/guiding-hands/forest-motion-prototype.png");
  const image = useMemo(() => {
    const owned = source.clone(); owned.colorSpace = SRGBColorSpace;
    owned.needsUpdate = true; return owned;
  }, [source]);
  useEffect(() => () => image.dispose(), [image]);
  return <group position={[0.12, 0, -0.5]} rotation={[0, 0.5, 0]} userData={{ hardware: "projection-board" }}>
    {[-0.56, 0.56].map(x => <group key={x}>
      <Surface position={[x, 0.39, 0]} size={[0.045, 0.54, 0.045]} color="#a4afa2" radius={0.008} />
      <Surface position={[x, 0.14, 0.04]} size={[0.22, 0.04, 0.3]} color="#a4afa2" radius={0.01} />
    </group>)}
    <group position={[0, 1.14, 0]} rotation={[-0.16, 0, 0]}>
      <Surface position={[0, 0, 0]} size={[1.66, 1.16, 0.045]} color="#d4d6bc" radius={0.015} />
      <mesh position={[0, 0, 0.031]}>
        <planeGeometry args={[1.55, 1.55 * 760 / 1120]} />
        <meshBasicMaterial map={image} toneMapped={false} />
      </mesh>
      <Html center position={[0, -0.635, 0.05]} style={{ pointerEvents: "none" }} zIndexRange={[1, 0]}>
        <div className={styles.projectionCaption}>Repository prototype still</div>
      </Html>
    </group>
  </group>;
}

export default function GuidingHandsSetup() {
  return <group userData={{ hardware: "guiding-hands-illustrative-setup" }}>
    <ProjectionBoard />
    <Asset file={`${base}projector.glb`} position={[-0.96, 0.14, 0.06]} width={0.72} rotation={[0, 1.5, 0]} />
    <JetsonStudy />
    <Asset file={`${base}webcam.glb`} position={[0.92, 0.15, 0.42]} width={0.73} rotation={[0, 0.55, 0]} />
    <Asset file={`${base}office_plant.glb`} position={[1.13, 0.13, -0.76]} height={0.28} />
    <pointLight position={[0.1, 1.55, 1.6]} color="#d1e4e1" intensity={7} distance={3} decay={2} />
    <CatmullRomLine points={[[-0.88, 0.17, 0.28], [-0.67, 0.16, 0.59], [-0.4, 0.19, 0.65]]} color="#9fb7a6" lineWidth={1.7} />
    <CatmullRomLine points={[[0.3, 0.19, 0.72], [0.64, 0.15, 0.8], [0.93, 0.17, 0.48]]} color="#9fb7a6" lineWidth={1.7} />
    <Html center position={[-0.12, 0.02, 1.03]} style={{ pointerEvents: "none" }} zIndexRange={[1, 0]}>
      <div className={styles.hardwareNote}>Jetson Orin Nano</div>
    </Html>
  </group>;
}
