"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useTexture, CameraControls, CatmullRomLine, Html, OrthographicCamera, RoundedBox } from "@react-three/drei";
import { lazy, Suspense, useEffect, useRef } from "react";
import { ACESFilmicToneMapping, PCFShadowMap, SRGBColorSpace, Vector3 } from "three";
import { compositions, type Composition, type CompositionId, type Vec3 } from "./presets";
import { Asset, Surface, FlatPrint, usePrintedTextures } from "./SceneAssets";
import { SceneLighting, InteractiveLamp, DayWindow } from "../hub/SceneLighting";
import type { LightingState } from "../hub/lighting";
import RobotCharacter from "../hub/RobotCharacter";
import { abortable, type Pose, type World } from "../hub/journey";
import type { ExhibitInteraction } from "../hub/exhibits";
import { visibleDeadline } from "../hub/visibleDeadline";
import { deskPortals } from "../hub/deskPortals";
import portalStyles from "../hub/desk-guidance.module.css";
import type { SoftwareInteraction } from "../hub/softwareProjects";
const SoftwareWorld = lazy(() => import("../hub/SoftwareWorld"));
const Workshop = lazy(() => import("../hub/Workshop"));
export type CameraBridge = {
  capture: () => Pose;
  move: (pose: Pose, animate: boolean, signal: AbortSignal) => Promise<void>;
};
export type HubSceneProps = {
  world: World; revision: number; reducedMotion: boolean; locked: boolean;
  onSelectComputer: () => void; onSelectRobot: () => void; onSelectSoftware: () => void;
  software: SoftwareInteraction;
  lighting: LightingState; onCycleLamp: () => void;
  exhibits: ExhibitInteraction;
  onCameraReady: (camera: CameraBridge) => void;
  onWorldReady: (revision: number) => void;
};

type Props = { view: CompositionId; active: string | null; reset: number; onActive: (name: string | null) => void; onReady: () => void; onFailure: () => void; themeOverride?: Composition; experience?: HubSceneProps };
const top = 3.12;

function PortalObject({ name, position, radius, active, onActive, children, onSelect, disabled = false, label = false }: { name: string; position: Vec3; radius: number; active: string | null; onActive: Props["onActive"]; children: React.ReactNode; onSelect?: () => void; disabled?: boolean; label?: boolean }) {
  const point = (event: ThreeEvent<PointerEvent>) => { event.stopPropagation(); onActive(name); };
  const portal = label && active === name && !disabled ? deskPortals.find(item => item.id === name) : undefined;
  return <group position={position} onPointerOver={disabled ? undefined : point} onPointerOut={disabled ? undefined : () => onActive(null)} onClick={disabled ? undefined : event => { event.stopPropagation(); if (event.delta < 4) { onActive(name); onSelect?.(); } }}>
    {children}
    {active === name && <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}><ringGeometry args={[radius, radius + 0.025, 64]} /><meshBasicMaterial color="#efe5ad" transparent opacity={0.9} depthWrite={false} /></mesh>}
    {portal && <Html center position={[0, portal.labelHeight, 0]} style={{ pointerEvents: "none" }} zIndexRange={[2, 0]}
      calculatePosition={(object, camera, size) => {
        const projected = new Vector3().setFromMatrixPosition(object.matrixWorld).project(camera);
        return [Math.max(96, Math.min(size.width - 96, (projected.x + 1) * size.width / 2)), Math.max(44, Math.min(size.height - 44, (1 - projected.y) * size.height / 2))];
      }}>
      <div className={portalStyles.portalLabel} data-desk-label={portal.id}><strong>{portal.title}</strong><span>{portal.description}</span></div>
    </Html>}
  </group>;
}

function Workroom({ theme, active, onActive, experience }: { theme: Composition; active: Props["active"]; onActive: Props["onActive"]; experience?: HubSceneProps }) {
  const textures = usePrintedTextures(theme);
  const portfolioScreen = useTexture("/previews/portfolio-desktop.svg");
  portfolioScreen.colorSpace = SRGBColorSpace;
  useEffect(() => () => Object.values(textures).forEach(texture => texture.dispose()), [textures]);
  return <group>
    {/* Architectural planes are original set construction. Principal props below are source GLBs. */}
    <RoundedBox args={[12.8, 0.38, 10.4]} radius={0.16} smoothness={3} position={[0, -0.22, 0]} receiveShadow><meshStandardMaterial color={theme.edge} roughness={0.85} /></RoundedBox>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow><planeGeometry args={[12.4, 10]} /><meshStandardMaterial map={textures.floor} roughness={0.95} /></mesh>
    <Surface position={[0, 3.65, -3.1]} size={[12.4, 7.3, 0.18]} color={theme.wall} />
    <Surface position={[-6.1, 3.65, -0.5]} size={[0.18, 7.3, 5.2]} color={theme.sideWall} />
    <Surface position={[0, 0.13, -2.95]} size={[12.2, 0.25, 0.14]} color={theme.wood} />
    <Surface position={[-5.95, 0.13, -0.5]} size={[0.14, 0.25, 5]} color={theme.wood} />
    <FlatPrint position={[0.45, 0.017, 1.6]} size={[8.9, 5.8]} texture={textures.rug} />

    {/* A window with a visible sill and slats gives the room a light source and a scale. */}
    <Surface position={[-5.94, 4.65, -0.55]} size={[0.1, 3.7, 3.4]} color={theme.wood} />
    <mesh position={[-5.87, 4.65, -0.55]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[3.1, 3.4]} /><meshBasicMaterial map={textures.window} color={theme.id === "cinematic" ? "#f5e5bb" : "#f6f4e9"} /></mesh>
    {experience && <DayWindow day={experience.lighting.environment === "day"} reduced={experience.reducedMotion} />}
    <Surface position={[-5.79, 4.65, -0.55]} size={[0.12, 3.5, 0.085]} color={theme.paper} />
    <Surface position={[-5.79, 4.65, -0.55]} size={[0.12, 0.09, 3.2]} color={theme.paper} />
    <Surface position={[-5.7, 2.9, -0.55]} size={[0.4, 0.12, 3.5]} color={theme.wood} />
    {[0,1,2,3,4,5,6].map(i => <Surface key={i} position={[-5.76, 6.2 - i * 0.15, -0.55]} size={[0.13, 0.065, 3.24]} color={theme.paper} radius={0.01} />)}

    {/* Selected desk mesh remains provisional; its proportions are adapted for the study. */}
    <Asset file="desk.glb" position={[0, 0, -0.3]} dimensions={[8.6, 3.1, 3.8]} color={theme.wood} />
    <PortalObject label={!!experience} name="Computer" position={[.05, top, -1.35]} radius={1.1} active={active} onActive={onActive} onSelect={experience?.onSelectComputer} disabled={experience ? experience.locked || experience.world !== "desk" : false}>
      <Asset file="monitor.glb" position={[0, 0, 0]} height={1.72} rotation={[0, Math.PI, 0]} color={theme.metal} />
      <mesh position={[0, 1.07, .27]}><planeGeometry args={[2.38, 1.30]} /><meshStandardMaterial map={experience ? portfolioScreen : textures.screen} emissiveMap={experience ? portfolioScreen : textures.screen} emissive="#fffdf0" emissiveIntensity={active === "Computer" ? .85 : .5} roughness={.7} /></mesh>
    </PortalObject>
    <Asset file="keyboard.glb" position={[0.02, top + 0.02, -0.05]} width={1.9} rotation={[0, -0.04, 0]} />
    <Asset file="chair.glb" position={[0.3, 0.03, 2.65]} height={2.9} rotation={[0, Math.PI - 0.2, 0]} color={theme.metal} />
    <pointLight position={[0.05, top + 1.2, -0.7]} color="#ffe0ad" intensity={theme.id === "cinematic" ? 1.2 : 0.8} distance={4} decay={2} />
    {experience ? <InteractiveLamp position={[-3.45, top, -1.15]} height={1.9} rotation={[0, .7, 0]} color={theme.metal} lightOffset={[.5, 1.56, .35]} intensity={theme.lampIntensity} distance={7} mode={experience.lighting.lamp} reduced={experience.reducedMotion} active={active === "Lamp"} disabled={experience.locked || experience.world !== "desk"} onHover={value => onActive(value ? "Lamp" : null)} onCycle={experience.onCycleLamp} evidence /> : <><Asset file="lamp.glb" position={[-3.45, top, -1.15]} height={1.9} rotation={[0, .7, 0]} color={theme.metal} /><pointLight position={[-2.95, top + 1.56, -.8]} color="#ffd38d" intensity={theme.lampIntensity} distance={7} decay={2} /></>}
    <Asset file="books.glb" position={[-2.1, top, -1.25]} width={1.25} rotation={[0, 0.15, 0]} />
    <Asset file="mug.glb" position={[-1.2, top, 0.92]} height={0.43} rotation={[0, -0.6, 0]} color={theme.id === "stylized-game" ? "#e1b35c" : "#d5d0b4"} />
    <Asset file="plant.glb" position={[-4.85, 0, 2.0]} height={2.1} />
    <Asset file="plant.glb" position={[3.65, top, -1.64]} height={0.78} />
    <mesh position={[-1.2, top + 0.36, 0.92]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.145, 32]} /><meshStandardMaterial color="#483524" roughness={0.25} /></mesh>
    <CatmullRomLine points={[[0.02, top + 0.08, -0.4], [0.35, top + 0.04, -0.75], [0.6, top + 0.04, -1.1], [0.3, top + 0.06, -1.4]]} color="#2d3b32" lineWidth={2.5} />
    <CatmullRomLine points={[[-3.45, top + 0.025, -1.15], [-3.85, top + 0.025, -1.8], [-3.95, 2.9, -2.3], [-3.95, 0.22, -2.4], [-2.8, 0.14, -2.75]]} color="#383d30" lineWidth={2} />

    <FlatPrint position={[0.8, top + 0.012, 0.82]} size={[2.4, 1.42]} texture={textures.mat} />
    <FlatPrint position={[-1.7, top + 0.015, 0.25]} size={[1.24, 1.6]} texture={textures.notes} rotation={[-Math.PI / 2, 0, -0.23]} />
    <FlatPrint position={[-1.64, top + 0.01, 0.21]} size={[1.32, 1.66]} texture={textures.notes} rotation={[-Math.PI / 2, 0, -0.12]} />

    <PortalObject label={!!experience} name="Robotics" position={[2.25, top, -0.75]} radius={0.46} active={active} onActive={onActive} onSelect={experience?.onSelectRobot} disabled={experience ? experience.locked || experience.world !== "desk" : false}>{experience ? <group rotation={[0, 0.45, 0]}><RobotCharacter height={1.5} color={theme.robot} reacting={active === "Robotics"} reducedMotion={experience.reducedMotion} running={experience.world === "desk"} /></group> : <Asset file="/models/robot-expressive.glb" position={[0, 0, 0]} height={1.5} rotation={[0, -0.45, 0]} robot color={theme.robot} />}</PortalObject>
    <PortalObject label={!!experience} disabled={experience ? experience.locked || experience.world !== "desk" : false} name="Personal" position={[2.82, top, 0.95]} radius={0.48} active={active} onActive={onActive}><Asset file="basketball.glb" position={[0, 0.01, 0]} height={0.88} rotation={[0.15, 0.4, 0.2]} /></PortalObject>
    <PortalObject label={!!experience} disabled={experience ? experience.locked || experience.world !== "desk" : false} name="Photography" position={[-2.62, top, 0.73]} radius={0.62} active={active} onActive={onActive}><Asset file="camera.glb" position={[0, 0.015, 0]} height={0.62} rotation={[0, 2.7, 0]} /></PortalObject>
    <PortalObject label={!!experience} name="Software" position={[.9, top + .02, .93]} radius={.48} active={active} onActive={onActive} onSelect={experience?.onSelectSoftware} disabled={experience ? experience.locked || experience.world !== "desk" : false}><Asset file="chip.glb" position={[0, 0, 0]} width={.9} rotation={[0, -.25, 0]} /></PortalObject>

    {/* Inexpensive room dressing: shelf, sketch pins and work-in-progress papers, no game media. */}
    <Surface position={[2.95, 5.65, -2.78]} size={[4.3, 0.13, 0.58]} color={theme.wood} />
    <Asset file="books.glb" position={[1.65, 5.72, -2.78]} width={1.1} rotation={[0, Math.PI, 0]} />
    <Asset file="plant.glb" position={[4.2, 5.72, -2.78]} height={0.88} />
    <Surface position={[-2.4, 5.05, -2.94]} size={[2.65, 2.1, 0.09]} color="#92714b" />
    <FlatPrint position={[-2.65, 5.1, -2.88]} size={[1.1, 1.4]} texture={textures.notes} rotation={[0, 0, 0.08]} />
    <FlatPrint position={[-1.65, 5.23, -2.87]} size={[0.65, 0.76]} texture={textures.mat} rotation={[0, 0, -0.12]} />
    <Surface position={[2.7, 6.5, -2.95]} size={[1.9, 0.09, 0.05]} color={theme.accent} />
    <Surface position={[-2.5, 3.17, -1.7]} size={[1.5, 0.065, 0.36]} color={theme.metal} />
    <Surface position={[3.6, 3.14, 0.2]} size={[0.43, 0.04, 0.7]} color={theme.paper} rotation={[0, 0.15, 0]} />
  </group>;
}

function CameraRig({ theme, reset, experience }: { theme: Composition; reset: number; experience?: HubSceneProps }) {
  const controls = useRef<CameraControls>(null);
  const settleMove = useRef<(() => void) | null>(null);
  const reduced = useRef(experience?.reducedMotion ?? false);
  reduced.current = experience?.reducedMotion ?? false;
  const { camera, invalidate, size, gl } = useThree();
  useEffect(() => {
    // The wider portrait workshop projection keeps both exhibit silhouettes and
    // nameplates in view. Desk projection and all saved/travel poses stay intact.
    if ("fov" in camera) { camera.fov = size.width < 760 && experience?.world !== "desk" && experience ? (experience.world === "software" ? 88 : 76) : theme.fov + (size.width < 760 ? 15 : 0); camera.updateProjectionMatrix(); }
    else { camera.zoom = size.width / (size.width < 760 ? 16 : 20); camera.updateProjectionMatrix(); }
    invalidate();
  }, [theme, reset, camera, invalidate, size.width, experience?.world]);
  useEffect(() => {
    controls.current?.setLookAt(...theme.camera, ...theme.target, false);
    invalidate();
  }, [theme, reset, camera, invalidate]);
  const ready = experience?.onCameraReady;
  useEffect(() => { if (experience?.reducedMotion) settleMove.current?.(); }, [experience?.reducedMotion]);
  useEffect(() => {
    const controller = controls.current;
    if (!controller || !ready) return;
    const freeze = () => {
      const position = controller.getPosition(new Vector3(), false);
      const target = controller.getTarget(new Vector3(), false);
      void controller.setLookAt(position.x, position.y, position.z, target.x, target.y, target.z, false);
      invalidate();
    };
    ready({
      capture: () => ({ position: controller.getPosition(new Vector3(), false).toArray() as Vec3, target: controller.getTarget(new Vector3(), false).toArray() as Vec3 }),
      move: async (pose, animate, signal) => {
        signal.throwIfAborted();
        freeze();
        let settle!: () => void;
        const settled = new Promise<void>(resolve => { settle = resolve; });
        const finish = () => {
          if (signal.aborted) return;
          void controller.setLookAt(...pose.position, ...pose.target, false); invalidate(); settle();
        };
        settleMove.current = finish;
        const visibility = () => { if (document.hidden) finish(); };
        signal.addEventListener("abort", freeze, { once: true });
        document.addEventListener("visibilitychange", visibility);
        let cancelDeadline: (() => void) | undefined;
        const deadline = new Promise<void>((_resolve, reject) => {
          cancelDeadline = visibleDeadline(() => { freeze(); reject(new Error("Camera transition timed out")); }, 8000);
        });
        try {
          await abortable(Promise.race([controller.setLookAt(...pose.position, ...pose.target, animate && !reduced.current && !document.hidden), deadline, settled]), signal);
          signal.throwIfAborted();
          // CameraControls resolves at its rest threshold. Snap the final epsilon
          // with its public API so a return restores the saved pose exactly.
          await controller.setLookAt(...pose.position, ...pose.target, false);
          invalidate();
        } finally {
          cancelDeadline?.(); signal.removeEventListener("abort", freeze);
          document.removeEventListener("visibilitychange", visibility);
          if (settleMove.current === finish) settleMove.current = null;
        }
      },
    });
    return freeze;
  }, [ready, invalidate]);
  useFrame(() => {
    if (!experience || !controls.current) return;
    gl.domElement.dataset.cameraPosition = JSON.stringify(controls.current.getPosition(new Vector3(), false).toArray());
    gl.domElement.dataset.cameraTarget = JSON.stringify(controls.current.getTarget(new Vector3(), false).toArray());
  });
  return <>{theme.id === "stylized-game" && <OrthographicCamera makeDefault position={theme.camera} zoom={size.width / 20} near={0.1} far={100} />}<CameraControls ref={controls} makeDefault enabled={!experience?.locked} minDistance={experience ? 1.2 : 10} maxDistance={24} minPolarAngle={0.45} maxPolarAngle={1.25} minAzimuthAngle={-0.3} maxAzimuthAngle={1.25} dollySpeed={0.5} truckSpeed={0} smoothTime={0.24} /></>;
}

function SceneEvidence({ view, onReady, onFailure, experience }: Pick<Props, "view" | "onReady" | "onFailure" | "experience">) {
  const { gl, scene, camera, invalidate } = useThree();
  const count = useRef(0);
  const ready = useRef(false);
  const revision = experience?.revision;
  const worldReady = experience?.onWorldReady;
  const world = experience?.world;
  useEffect(() => { count.current = 0; ready.current = false; invalidate(); }, [view, revision, invalidate]);
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useFrame(() => {
    const data = gl.domElement.dataset;
    data.drawCalls = String(gl.info.render.calls);
    data.triangles = String(gl.info.render.triangles);
    data.renderFrame = String(gl.info.render.frame);
    data.world = world ?? "desk";
    if (experience) {
      const point = new Vector3(2.25, 3.95, -0.75).project(camera);
      const rect = gl.domElement.getBoundingClientRect();
      data.robotScreen = JSON.stringify([rect.x + (point.x + 1) * rect.width / 2, rect.y + (1 - point.y) * rect.height / 2]);
      const project = (point: number[]) => { const p = new Vector3(...point as Vec3).project(camera); return [rect.x + (p.x + 1) * rect.width / 2, rect.y + (1 - p.y) * rect.height / 2]; };
      data.monitorScreen = JSON.stringify(project([.05, 4.19, -1.08]));
      data.lampScreen = JSON.stringify(project([-3.05, 4.65, -.8]));
      data.softwareScreens = JSON.stringify([-2.8, 0, 2.8].map(x => project([x, 3.69, -.375])));
      scene.traverseVisible(object => {
        if (object.userData.robotAnimation) data.robotAnimation = JSON.stringify(object.userData.robotAnimation);
      });
    }
    if (!ready.current) {
      count.current++;
      if (count.current > 3) {
        const assets: string[] = []; scene.traverse(object => { if (object.userData.asset) assets.push(object.userData.asset); });
        data.loadedAssets = [...new Set(assets)].join(",");
        ready.current = true; onReady();
        if (revision !== undefined) worldReady?.(revision);
      } else invalidate();
    }
  });
  return null;
}

export default function DeskScene(props: Props) {
  const theme = props.themeOverride ?? compositions[props.view];
  return <Canvas shadows={{ type: PCFShadowMap }} dpr={[1, 1.5]} frameloop="demand" camera={{ position: theme.camera, fov: theme.fov, near: 0.1, far: 100 }} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.toneMapping = ACESFilmicToneMapping; }} fallback={<span>WebGL is unavailable. Robotics notes are linked outside the canvas.</span>}>
    <color attach="background" args={[theme.background]} />
    <RendererTheme theme={theme} />
    <CameraRig theme={theme} reset={props.reset} experience={props.experience} />
    {props.experience ? <SceneLighting state={props.experience.lighting} world={props.experience.world} reduced={props.experience.reducedMotion} /> : <>
    <ambientLight color={theme.ambient} intensity={theme.ambientIntensity} />
    <hemisphereLight args={[theme.ambient, theme.floor, 0.6]} />
    <directionalLight position={[-4, 9, 3]} intensity={theme.keyIntensity} color={theme.key} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-camera-near={0.5} shadow-camera-far={30} shadow-bias={-0.0002} shadow-normalBias={0.025} shadow-radius={4} />
    <directionalLight position={[4, 7, -1]} intensity={theme.fillIntensity} color={theme.fill} />
    </>}
    <Suspense fallback={null}>
      <group visible={!props.experience || props.experience.world === "desk"}>
        <Workroom theme={theme} active={props.active} onActive={props.onActive} experience={props.experience} />
      </group>
      {props.experience?.world === "workshop" && <Workshop theme={theme} interaction={props.experience.exhibits} lighting={props.experience.lighting} reduced={props.experience.reducedMotion} onCycleLamp={props.experience.onCycleLamp} />}
      {props.experience?.world === "software" && <SoftwareWorld theme={theme} interaction={props.experience.software} lighting={props.experience.lighting} reduced={props.experience.reducedMotion} onCycleLamp={props.experience.onCycleLamp} />}
      <SceneEvidence view={props.view} onReady={props.onReady} onFailure={props.onFailure} experience={props.experience} />
    </Suspense>
  </Canvas>;
}

function RendererTheme({ theme }: { theme: Composition }) {
  const { gl, invalidate } = useThree();
  useEffect(() => { gl.toneMappingExposure = theme.exposure; invalidate(); }, [gl, theme, invalidate]);
  return null;
}
