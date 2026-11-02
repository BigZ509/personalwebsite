"use client";
import { RoundedBox, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { AnimationMixer, Box3, CanvasTexture, Mesh, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, Vector3 } from "three";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import type { Composition, Vec3 } from "./presets";
const base = "/models/desk-compositions/";

type AssetProps = {
  file: string; position: Vec3; height?: number; width?: number; dimensions?: Vec3;
  rotation?: Vec3; color?: string; robot?: boolean;
};

export function Asset({ file, position, height, width, dimensions, rotation = [0, 0, 0], color, robot = false }: AssetProps) {
  const { scene, animations } = useGLTF(file.startsWith("/") ? file : `${base}${file}`, false);
  const prepared = useMemo(() => {
    const model = clone(scene);
    const owned = new Map<MeshStandardMaterial, MeshStandardMaterial>();
    model.traverse(object => {
      if (!(object instanceof Mesh)) return;
      object.castShadow = true; object.receiveShadow = true;
      const prepareMaterial = (original: MeshStandardMaterial) => {
        if (owned.has(original)) return owned.get(original)!;
        const material = original.clone();
        material.roughness = Math.max(material.roughness ?? 0.8, 0.55);
        if (color && (!robot || original.name === "Main")) material.color.set(color);
        if (robot && original.name === "Grey") material.color.set("#56635b");
        if (file === "lamp.glb" && original.name === "White") { material.color.set("#fff0c0"); material.emissive.set("#ffca78"); material.emissiveIntensity = 0.7; }
        owned.set(original, material);
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(m => prepareMaterial(m as MeshStandardMaterial)) : prepareMaterial(object.material as MeshStandardMaterial);
    });
    if (robot) {
      const mixer = new AnimationMixer(model);
      const idle = animations.find(clip => clip.name === "Idle");
      if (idle) { mixer.clipAction(idle).play(); mixer.update(0.5); }
      // This is a composed still pose from the existing clip, not a new animation.
    }
    model.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(model);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = dimensions ? new Vector3(dimensions[0] / size.x, dimensions[1] / size.y, dimensions[2] / size.z) : new Vector3().setScalar(height ? height / size.y : width ? width / size.x : 1);
    model.scale.multiply(scale);
    model.position.set(-center.x * scale.x, -bounds.min.y * scale.y, -center.z * scale.z);
    return { model, materials: [...owned.values()] };
  }, [scene, animations, robot, color, dimensions, height, width]);

  useEffect(() => () => prepared.materials.forEach(material => material.dispose()), [prepared]);
  return <group position={position} rotation={rotation} userData={{ asset: file }}><primitive object={prepared.model} dispose={null} /></group>;
}

export function Surface({ position, size, color, rotation = [0, 0, 0], radius = 0.025 }: { position: Vec3; size: Vec3; color: string; rotation?: Vec3; radius?: number }) {
  return <RoundedBox args={size} radius={radius} smoothness={2} position={position} rotation={rotation} castShadow receiveShadow><meshStandardMaterial color={color} roughness={0.9} /></RoundedBox>;
}

export function usePrintedTextures(theme: Composition) {
  return useMemo(() => {
    const make = (w: number, h: number, paint: (context: CanvasRenderingContext2D) => void) => {
      const canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h;
      const context = canvas.getContext("2d")!; paint(context);
      const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace;
      texture.anisotropy = 4;
      return texture;
    };
    const floor = make(512, 512, c => {
      c.fillStyle = theme.floor; c.fillRect(0, 0, 512, 512);
      for (let row = 0; row < 8; row++) {
        c.fillStyle = row % 2 ? "#00000008" : "#ffffff08"; c.fillRect(0, row * 64, 512, 64);
        c.strokeStyle = "#251e1a30"; c.lineWidth = 2; c.beginPath(); c.moveTo(0, row * 64); c.lineTo(512, row * 64); c.stroke();
        const join = row % 2 ? 320 : 145; c.beginPath(); c.moveTo(join, row * 64); c.lineTo(join, row * 64 + 64); c.stroke();
        for (let j = 0; j < 20; j++) { const y = row * 64 + j * 3.2; c.strokeStyle = j % 2 ? "#211d1508" : "#fff1cf09"; c.beginPath(); c.moveTo(0, y); c.bezierCurveTo(180, y + 4, 330, y - 3, 512, y + 1); c.stroke(); }
      }
    });
    floor.wrapS = floor.wrapT = RepeatWrapping; floor.repeat.set(3, 2);
    const rug = make(512, 512, c => {
      c.fillStyle = theme.rug; c.fillRect(0, 0, 512, 512);
      c.strokeStyle = theme.rugLine;
      [16, 25, 42, 470, 487, 496].forEach(x => { c.lineWidth = x % 2 ? 3 : 2; c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 512); c.stroke(); c.beginPath(); c.moveTo(0, x); c.lineTo(512, x); c.stroke(); });
      for (let x = 80; x < 450; x += 88) for (let y = 80; y < 450; y += 88) { c.lineWidth = 2; c.beginPath(); c.moveTo(x, y - 22); c.lineTo(x + 18, y); c.lineTo(x, y + 22); c.lineTo(x - 18, y); c.closePath(); c.stroke(); }
      for (let y = 0; y < 512; y += 3) { c.fillStyle = "#ffffff08"; c.fillRect(0, y, 512, 1); }
    });
    const screen = make(768, 430, c => {
      c.fillStyle = "#182e31"; c.fillRect(0, 0, 768, 430);
      c.fillStyle = "#92bfa9"; c.font = "15px monospace"; c.fillText("WORKROOM / LOCAL SESSION", 42, 45);
      c.fillStyle = "#e4e5c9"; c.font = "29px monospace"; c.fillText("Making things move.", 42, 101);
      c.strokeStyle = "#42635d"; c.lineWidth = 1; c.beginPath(); c.moveTo(42, 124); c.lineTo(726, 124); c.stroke();
      c.fillStyle = "#809e90"; c.font = "15px monospace"; ["01  ROBOTICS", "02  SOFTWARE", "03  PHOTOGRAPHY"].forEach((text, i) => c.fillText(text, 42, 174 + i * 58));
      c.strokeStyle = "#d5ab69"; c.lineWidth = 3;
      for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(608, 238, 40 + i * 24, 0.1 + i, 5.5 + i); c.stroke(); }
      c.fillStyle = "#d5ab69"; c.beginPath(); c.arc(608, 238, 11, 0, Math.PI * 2); c.fill();
      c.font = "12px monospace"; c.fillStyle = "#78948a"; c.fillText("A space for experiments, images & ideas.", 42, 390);
    });
    const notes = make(512, 512, c => {
      c.fillStyle = theme.paper; c.fillRect(0, 0, 512, 512);
      c.strokeStyle = "#5f826035"; c.lineWidth = 1;
      for (let i = 24; i < 512; i += 24) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i, 512); c.stroke(); c.beginPath(); c.moveTo(0, i); c.lineTo(512, i); c.stroke(); }
      c.fillStyle = "#3d5647"; c.font = "bold 27px monospace"; c.fillText("ROBOT NOTES", 35, 55);
      c.font = "14px monospace"; c.fillText("small steps / new ideas", 35, 82);
      c.strokeStyle = "#536f5c"; c.lineWidth = 3; c.strokeRect(162, 164, 176, 153); c.strokeRect(195, 119, 108, 64);
      c.beginPath(); c.arc(221, 147, 7, 0, 7); c.arc(276, 147, 7, 0, 7); c.stroke();
      [[143, 188, 22, 110], [338, 188, 22, 110], [187, 317, 30, 75], [284, 317, 30, 75]].forEach(([x,y,w,h]) => c.strokeRect(x,y,w,h));
      c.font = "15px monospace"; c.fillText("idle → notice → explore", 67, 456);
    });
    const mat = make(512, 512, c => {
      c.fillStyle = "#385a51"; c.fillRect(0, 0, 512, 512); c.strokeStyle = "#b3cbb845"; c.lineWidth = 1;
      for (let i = 12; i < 512; i += 24) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i, 512); c.stroke(); c.beginPath(); c.moveTo(0, i); c.lineTo(512, i); c.stroke(); }
      c.fillStyle = "#d4d8b7"; c.font = "14px monospace"; c.fillText("PROTOTYPE / 03", 24, 477);
    });
    const window = make(512, 512, c => {
      const night = theme.id === "cinematic";
      const gradient = c.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, night ? "#132d46" : "#9bbdbb"); gradient.addColorStop(1, night ? "#477c8d" : "#e2dec2");
      c.fillStyle = gradient; c.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 7; i++) {
        const y = 260 + (i * 43 % 110); c.fillStyle = night ? "#173c4d" : "#829c8d"; c.fillRect(i * 85 - 10, y, 72, 512 - y);
        c.fillStyle = night ? "#d6ad6b" : "#a9b5a1";
        for (let j = 0; j < 4; j++) for (let k = 0; k < 3; k++) if ((i + j + k) % 3) c.fillRect(i * 85 + k * 20, y + 20 + j * 36, 8, 14);
      }
      c.fillStyle = night ? "#b4cbdc" : "#f1e6b8"; c.beginPath(); c.arc(374, 142, night ? 20 : 34, 0, 7); c.fill();
    });
    return { floor, rug, screen, notes, mat, window };
  }, [theme]);
}

export function FlatPrint({ position, size, texture, rotation = [-Math.PI / 2, 0, 0] }: { position: Vec3; size: [number, number]; texture: CanvasTexture; rotation?: Vec3 }) {
  return <mesh position={position} rotation={rotation} receiveShadow><planeGeometry args={size} /><meshStandardMaterial map={texture} roughness={0.95} /></mesh>;
}

