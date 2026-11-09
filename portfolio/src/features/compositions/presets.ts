export type CompositionId = "cozy" | "cinematic" | "stylized-game";
export type Vec3 = [number, number, number];

export type Composition = {
  id: CompositionId;
  name: string;
  description: string;
  camera: Vec3;
  target: Vec3;
  fov: number;
  background: string;
  wall: string;
  sideWall: string;
  floor: string;
  edge: string;
  wood: string;
  rug: string;
  rugLine: string;
  metal: string;
  paper: string;
  accent: string;
  robot: string;
  ambient: string;
  ambientIntensity: number;
  key: string;
  keyIntensity: number;
  fill: string;
  fillIntensity: number;
  lampIntensity: number;
  exposure: number;
};

export const compositions: Record<CompositionId, Composition> = {
  cozy: {
    id: "cozy", name: "Cozy", description: "Late afternoon. A desk with a life outside the screen.",
    camera: [10.5, 9.4, 12.7], target: [0, 2.45, -0.25], fov: 38,
    background: "#a4b2af", wall: "#adb5a5", sideWall: "#d3c6a7", floor: "#8e6952", edge: "#485853",
    wood: "#745039", rug: "#b36143", rugLine: "#d8b881", metal: "#354c47", paper: "#e9dec2", accent: "#9cb8a0", robot: "#d19a59",
    ambient: "#c7ded9", ambientIntensity: 1.0, key: "#ffe0ad", keyIntensity: 4.5,
    fill: "#c4e4ee", fillIntensity: 1.6, lampIntensity: 22, exposure: 1.15,
  },
  cinematic: {
    id: "cinematic", name: "Cinematic", description: "After hours. Warm work light against a cool, quiet room.",
    camera: [9.3, 7.15, 11.4], target: [0, 2.9, -0.1], fov: 38,
    background: "#162d3a", wall: "#324e52", sideWall: "#40514d", floor: "#4c413e", edge: "#1f3540",
    wood: "#725039", rug: "#864636", rugLine: "#bb925b", metal: "#304e50", paper: "#d5c3a0", accent: "#71c1bd", robot: "#d99850",
    ambient: "#8eb9d0", ambientIntensity: 0.65, key: "#ffc17c", keyIntensity: 1.5,
    fill: "#83c8e8", fillIntensity: 2.7, lampIntensity: 65, exposure: 1.2,
  },
  "stylized-game": {
    id: "stylized-game", name: "Stylized game", description: "A small, tactile world. Clear silhouettes and playful color.",
    camera: [11.6, 11.2, 13.8], target: [0, 2.2, -0.1], fov: 35,
    background: "#879b9c", wall: "#84a5a0", sideWall: "#c5b78c", floor: "#b27e56", edge: "#3b6261",
    wood: "#a16b42", rug: "#c26d4b", rugLine: "#efd8a0", metal: "#356e6c", paper: "#f1e0b4", accent: "#d7b958", robot: "#e5af55",
    ambient: "#dbede7", ambientIntensity: 1.1, key: "#ffedbd", keyIntensity: 4.2,
    fill: "#a5d6df", fillIntensity: 2.0, lampIntensity: 18, exposure: 1.2,
  },
};

export const compositionIds = Object.keys(compositions) as CompositionId[];

// Keep the Cinematic camera with a warm afternoon palette; comparison presets stay unchanged.
export const approvedComposition: Composition = {
  ...compositions.cinematic,
  name: "Sunlit creative studio",
  description: "A bright, warm studio for building and making.",
  background: "#c5d3d0", wall: "#f2e7d4", sideWall: "#dfd2bb", floor: "#c5a987", edge: "#8a7560",
  wood: "#956344", rug: "#d8a27a", rugLine: "#f5d894", metal: "#536c83", paper: "#fff5df",
  accent: "#d95d35", robot: "#e5aa58",
  ambient: "#eee5d3", ambientIntensity: 1.15, key: "#fff0d5", keyIntensity: 4.2,
  fill: "#c9ddec", fillIntensity: 1.8, lampIntensity: 22, exposure: 1.16,
};

export function isCompositionId(value: string | null): value is CompositionId {
  return value !== null && Object.hasOwn(compositions, value);
}
