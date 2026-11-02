"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { approvedComposition } from "../compositions/presets";
import type { CameraBridge } from "../compositions/DeskScene";
import { abortable, createJourney, type Phase, type World } from "./journey";
import { visibleDeadline } from "./visibleDeadline";
import styles from "./hub.module.css";

const DeskScene = dynamic(() => import("../compositions/DeskScene"), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.error("Hub scene unavailable", error); this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

const messages: Record<Phase, string> = {
  desk: "Desk ready. Select the robot to visit the robotics workshop.",
  approaching: "Approaching the robot. Back to Desk cancels the visit.",
  entering: "Opening the robotics workshop.",
  workshop: "Robotics workshop. Use Back to Desk or Escape to return.",
  returning: "Returning to your desk view.",
};

export default function HubExperience() {
  const [phase, setPhase] = useState<Phase>("desk");
  const [scene, setScene] = useState<{ world: World; revision: number }>({ world: "desk", revision: 0 });
  const [active, setActive] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [locked, setLocked] = useState(false);
  // Start still until the client has checked its preference (no animated flash).
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(true);
  reduce.current = reduced || paused;
  const robotButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const cover = useRef<HTMLDivElement>(null);
  const settleCover = useRef<(() => void) | null>(null);
  const camera = useRef<CameraBridge | null>(null);
  const journey = useRef<ReturnType<typeof createJourney> | null>(null);
  const revision = useRef(0);
  const pending = useRef<{ revision: number; resolve: () => void; reject: (error: unknown) => void } | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setFailed(true); journey.current?.cancel();
    pending.current?.reject(new Error("The 3D scene is unavailable")); pending.current = null;
    if (cover.current) cover.current.style.opacity = "0";
  }, []);
  useEffect(() => {
    if (ready || failed) return;
    return visibleDeadline(onFailure, 15000);
  }, [ready, failed, onFailure]);
  useEffect(() => { if (reduced || paused) settleCover.current?.(); }, [reduced, paused]);
  const worldReady = useCallback((id: number) => {
    if (pending.current?.revision === id) { pending.current.resolve(); pending.current = null; }
  }, []);

  const cameraReady = useCallback((bridge: CameraBridge) => {
    camera.current = bridge;
    if (journey.current) return;
    journey.current = createJourney({
      capture: () => camera.current!.capture(),
      move: (pose, animate, signal) => camera.current!.move(pose, animate, signal),
      cover: async (covered, animate, signal) => {
        signal.throwIfAborted();
        const element = cover.current!;
        const opacity = covered ? "1" : "0";
        if (!animate || document.hidden || reduce.current) { element.style.opacity = opacity; return; }
        const animation = element.animate([{ opacity: getComputedStyle(element).opacity }, { opacity }], { duration: 240, easing: "ease-in-out", fill: "forwards" });
        const finish = () => animation.finish();
        settleCover.current = finish;
        const visibility = () => { if (document.hidden) finish(); };
        const cancel = () => { element.style.opacity = getComputedStyle(element).opacity; animation.cancel(); };
        signal.addEventListener("abort", cancel, { once: true });
        document.addEventListener("visibilitychange", visibility);
        try { await abortable(animation.finished, signal); element.style.opacity = opacity; }
        finally {
          animation.cancel(); signal.removeEventListener("abort", cancel);
          document.removeEventListener("visibilitychange", visibility);
          if (settleCover.current === finish) settleCover.current = null;
        }
      },
      show: (world, signal) => {
        signal.throwIfAborted();
        const id = ++revision.current;
        const rendered = new Promise<void>((resolve, reject) => { pending.current = { revision: id, resolve, reject }; });
        const cancelDeadline = visibleDeadline(() => {
          if (pending.current?.revision === id) { pending.current.reject(new Error("Scene load timed out")); pending.current = null; }
        }, 12000);
        setScene({ world, revision: id }); setActive(null); setFocused(false);
        return abortable(rendered, signal).finally(() => { cancelDeadline(); if (pending.current?.revision === id) pending.current = null; });
      },
      lock: setLocked,
      phase: setPhase,
      returned: () => { setActive(null); restoreFocus.current = true; },
      error: onFailure,
    }, () => reduce.current);
  }, [onFailure]);

  useEffect(() => () => { journey.current?.cancel(); pending.current?.reject(new DOMException("Unmounted", "AbortError")); }, []);
  const selectRobot = useCallback(() => { void journey.current?.enter(); }, []);
  const back = useCallback(() => { void journey.current?.back(); }, []);
  useLayoutEffect(() => {
    // Restore only after React has committed an enabled invoking button. A RAF
    // scheduled before that commit can silently focus the still-disabled button.
    if (phase === "desk" && restoreFocus.current) {
      restoreFocus.current = false; robotButton.current?.focus({ preventScroll: true });
    } else if (phase === "workshop") backButton.current?.focus({ preventScroll: true });
  }, [phase]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && phase !== "desk") { event.preventDefault(); back(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [phase, back]);

  const inWorkshop = scene.world === "workshop";
  const robotActive = phase === "desk" && (active === "Robotics" || focused);
  return <main className={styles.hub} data-phase={phase} data-world={scene.world} data-ready={ready && !failed} data-reduced-motion={reduced || paused} aria-label="Interactive workroom">
    {!failed && <div className={styles.scene} aria-hidden="true"><SceneBoundary onFailure={onFailure}>
      <DeskScene view="cinematic" themeOverride={approvedComposition} active={robotActive ? "Robotics" : null} reset={0} onActive={setActive} onReady={onReady} onFailure={onFailure}
        experience={{ ...scene, reducedMotion: reduced || paused, locked, onSelectRobot: selectRobot, onCameraReady: cameraReady, onWorldReady: worldReady }} />
    </SceneBoundary></div>}
    <div ref={cover} className={styles.cover} aria-hidden="true" />
    <header className={styles.header}>
      <div><span className={styles.signal} aria-hidden="true" /><strong>{inWorkshop ? "Robotics workshop" : "The workroom"}</strong><span className={styles.location}>{inWorkshop ? "Inside the robot’s world" : "A desk for things in progress"}</span></div>
      <div className={styles.actions}>
        <button onClick={() => setPaused(value => !value)} aria-pressed={paused} disabled={reduced || failed}>{reduced ? "Reduced motion on" : paused ? "Resume motion" : "Pause motion"}</button>
        {phase !== "desk" && !failed && <button ref={backButton} className={styles.back} onClick={back} disabled={phase === "returning"}>← Back to Desk</button>}
      </div>
    </header>
    {!failed && <>
      <section className={styles.caption} aria-label={inWorkshop ? "Workshop notes" : "Desk navigation"}>
        <p className={styles.place}>{inWorkshop ? "Robotics / workbench" : "After hours / at the desk"}</p>
        <h1>{inWorkshop ? "From an idea to a little life." : "There’s a world in the details."}</h1>
        <p>{inWorkshop ? "A small lab for mechanisms, code and things that move. Project stories will be added after this prototype is reviewed." : "Meet the robot. It has a workshop to show you."}</p>
        {!inWorkshop && <button ref={robotButton} className={styles.enter} onClick={selectRobot} disabled={!ready || phase !== "desk"} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onPointerEnter={() => setActive("Robotics")} onPointerLeave={() => setActive(null)}>Visit robotics workshop <span aria-hidden="true">↗</span></button>}
        {inWorkshop && <a className={styles.notes} href="/hub/robotics/">Read workshop notes without 3D</a>}
      </section>
      {robotActive && <div className={styles.robotLabel} aria-hidden="true">Robotics<span>Meet the workshop’s resident</span></div>}
      {!ready && <div className={styles.loading} role="status">Opening the workroom…</div>}
    </>}
    {failed && <section className={styles.fallback} role="alert"><h1>The workshop is still open.</h1><p>This browser couldn’t keep the 3D room running. You can read the robotics notes or try the room again.</p><a href="/hub/robotics/">Read robotics notes</a><a href="/hub/">Try the 3D room again</a></section>}
    <footer className={styles.footer}><span>{failed ? "3D unavailable · Robotics notes remain available" : phase === "desk" ? "Drag to look around · Select the robot to explore" : phase === "workshop" ? "Drag to look around · Escape returns to the desk" : messages[phase]}</span><a href="/hub/robotics/">Robotics notes</a><a href="/licenses/desk-compositions/ATTRIBUTION.md">Asset credits</a></footer>
    <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{failed ? "3D unavailable. Robotics notes and retry links are available." : ready ? messages[phase] : "Loading the 3D workroom."}</p>
    <noscript><div className={styles.fallback}><h1>Robotics workshop</h1><p>The interactive room requires JavaScript. Robotics notes are available as a regular page.</p><a href="/hub/robotics/">Read robotics notes</a></div></noscript>
  </main>;
}
