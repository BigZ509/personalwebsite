"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { approvedComposition } from "../compositions/presets";
import type { CameraBridge } from "../compositions/DeskScene";
import { abortable, createJourney, type Phase, type World } from "./journey";
import { visibleDeadline } from "./visibleDeadline";
import ProjectDetails from "./ProjectDetails";
import PortfolioIdentity from "./PortfolioIdentity";
import DeskGuidance from "./DeskGuidance";
import { deskPortals, type DeskPortalId } from "./deskPortals";
import { exhibits, type ExhibitId } from "./exhibits";
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

export default function HubExperience({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const [phase, setPhase] = useState<Phase>("desk");
  const main = useRef<HTMLElement>(null);
  const [scene, setScene] = useState<{ world: World; revision: number }>({ world: "desk", revision: 0 });
  const [active, setActive] = useState<string | null>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitId | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const restoreExhibitFocus = useRef<ExhibitId | null>(null);
  const exhibitButtons = useRef<Partial<Record<ExhibitId, HTMLButtonElement | null>>>({});
  const [hoveredExhibit, setHoveredExhibit] = useState<ExhibitId | null>(null);
  const [focusedExhibit, setFocusedExhibit] = useState<ExhibitId | null>(null);
  const [focused, setFocused] = useState(false);
  const [focusedPortal, setFocusedPortal] = useState<DeskPortalId | null>(null);
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
    setFailed(true); setDetailsOpen(false); journey.current?.cancel();
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
        setScene({ world, revision: id }); setActive(null); setFocused(false); setFocusedPortal(null);
        setSelectedExhibit(null); setDetailsOpen(false); setHoveredExhibit(null); setFocusedExhibit(null);
        return abortable(rendered, signal).finally(() => { cancelDeadline(); if (pending.current?.revision === id) pending.current = null; });
      },
      lock: setLocked,
      phase: setPhase,
      returned: () => { setActive(null); restoreFocus.current = true; },
      error: onFailure,
    }, () => reduce.current);
  }, [onFailure]);

  useEffect(() => () => { journey.current?.cancel(); pending.current?.reject(new DOMException("Unmounted", "AbortError")); }, []);
  useLayoutEffect(() => { main.current?.scrollTo({ top: 0, behavior: "instant" }); }, [scene.world]);
  const selectRobot = useCallback(() => { void journey.current?.enter(); }, []);
  const back = useCallback(() => { setDetailsOpen(false); void journey.current?.back(); }, []);
  const closeDetails = useCallback(() => {
    restoreExhibitFocus.current = selectedExhibit;
    setDetailsOpen(false);
  }, [selectedExhibit]);
  useLayoutEffect(() => {
    // Mobile controls become visible only after the closing state is committed.
    if (!detailsOpen && restoreExhibitFocus.current) {
      exhibitButtons.current[restoreExhibitFocus.current]?.focus({ preventScroll: true });
      restoreExhibitFocus.current = null;
    }
  }, [detailsOpen]);
  useLayoutEffect(() => {
    // Restore only after React has committed an enabled invoking button. A RAF
    // scheduled before that commit can silently focus the still-disabled button.
    if (phase === "desk" && restoreFocus.current) {
      restoreFocus.current = false; robotButton.current?.focus({ preventScroll: true });
    } else if (phase === "workshop") backButton.current?.focus({ preventScroll: true });
  }, [phase]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && phase !== "desk") { event.preventDefault(); if (detailsOpen) closeDetails(); else back(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [phase, back, detailsOpen, closeDetails]);

  const selectExhibit = useCallback((id: ExhibitId) => { if (phase === "workshop" && !locked) { setSelectedExhibit(id); setDetailsOpen(true); } }, [phase, locked]);
  const selectedProject = exhibits.find(item => item.id === selectedExhibit);
  const inWorkshop = scene.world === "workshop";
  const deskAttention = phase === "desk" && !locked ? active ?? focusedPortal ?? (focused ? "Robotics" : null) : null;
  const activePortal = deskPortals.find(portal => portal.id === deskAttention);
  return <main ref={main} className={styles.hub} data-details-open={detailsOpen} data-phase={phase} data-world={scene.world} data-ready={ready && !failed} data-reduced-motion={reduced || paused} aria-label="Interactive workroom">
    {!failed && <div className={styles.scene} aria-hidden="true"><SceneBoundary onFailure={onFailure}>
      <DeskScene view="cinematic" themeOverride={approvedComposition} active={deskAttention} reset={0} onActive={setActive} onReady={onReady} onFailure={onFailure}
        experience={{ ...scene, reducedMotion: reduced || paused, locked, onSelectRobot: selectRobot, exhibits: { selected: selectedExhibit, attention: hoveredExhibit ?? focusedExhibit, disabled: phase !== "workshop" || locked, onHover: setHoveredExhibit, onSelect: selectExhibit }, onCameraReady: cameraReady, onWorldReady: worldReady }} />
    </SceneBoundary></div>}
    <div ref={cover} className={styles.cover} aria-hidden="true" />
    <PortfolioIdentity resumeAvailable={resumeAvailable} />
    <div className={`${styles.header} ${styles.sceneHeader}`} role="group" aria-label="Workroom controls">
      <div><span className={styles.signal} aria-hidden="true" /><strong>{inWorkshop ? "Robotics workshop" : "The workroom"}</strong><span className={styles.location}>{inWorkshop ? "Inside the robot’s world" : "An interactive portfolio"}</span></div>
      <div className={styles.actions}>
        <button onClick={() => setPaused(value => !value)} aria-pressed={paused} disabled={reduced || failed}>{reduced ? "Reduced motion on" : paused ? "Resume motion" : "Pause motion"}</button>
        {phase !== "desk" && !failed && <button ref={backButton} className={styles.back} onClick={back} disabled={phase === "returning"}>← Back to Desk</button>}
      </div>
    </div>
    {!failed && <>
      <section className={`${styles.caption} ${inWorkshop ? styles.workshopCaption : styles.introduction}`} aria-label={inWorkshop ? "Project exhibits" : "Desk navigation"}>
        <p className={styles.place}>{inWorkshop ? "Robotics / workbench" : "Hey, I’m"}</p>
        <h1>{inWorkshop ? "Choose a project." : "Marc Alexis."}</h1>
        <p>{inWorkshop ? "Two experiments on the workbench. Select an exhibit to read its project notes." : "A computer science student building software and experimenting with robotics."}</p>
        {!inWorkshop && <button ref={robotButton} className={styles.enter} onClick={selectRobot} disabled={!ready || phase !== "desk"} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onPointerEnter={() => setActive("Robotics")} onPointerLeave={() => setActive(null)}>Visit robotics workshop <span aria-hidden="true">↗</span></button>}
        {inWorkshop && <>
          <div className={styles.exhibitChoices} role="group" aria-label="Select a project exhibit">
            {exhibits.map(exhibit => <button key={exhibit.id} ref={element => { exhibitButtons.current[exhibit.id] = element; }} aria-label={exhibit.name} aria-pressed={selectedExhibit === exhibit.id} aria-haspopup="dialog" disabled={phase !== "workshop" || locked} onClick={() => selectExhibit(exhibit.id)} onFocus={() => setFocusedExhibit(exhibit.id)} onBlur={() => setFocusedExhibit(null)} onPointerEnter={() => setHoveredExhibit(exhibit.id)} onPointerLeave={() => setHoveredExhibit(null)}>{exhibit.name}</button>)}
          </div>
          <p className={styles.exhibitStatus} role="status" aria-live="polite">{selectedProject ? `${selectedProject.name} selected · ${selectedProject.model}.` : "Select an exhibit to open its project notes."}</p>
        </>}
      </section>
      {!inWorkshop && <DeskGuidance disabled={!ready || phase !== "desk" || locked} onPreview={setActive} onFocusPreview={setFocusedPortal} />}
      {inWorkshop && phase === "workshop" && detailsOpen && selectedProject && <ProjectDetails project={selectedProject} onClose={closeDetails} onSelect={selectExhibit} />}
      <p className={styles.srOnly} role="status" aria-live="polite">{activePortal ? `${activePortal.title}. ${activePortal.description}.` : ""}</p>
      {!ready && <div className={styles.loading} role="status">Opening the workroom…</div>}
    </>}
    {failed && <section className={styles.fallback} role="alert"><h1>The workshop is still open.</h1><p>This browser couldn’t keep the 3D room running. You can read the robotics notes or try the room again.</p><a href="/hub/robotics/">Read robotics notes</a><a href="/hub/">Try the 3D room again</a></section>}
    <footer className={styles.footer}><span>{failed ? "3D unavailable · Robotics notes remain available" : phase === "desk" ? "Drag to look around · Select the robot to explore" : phase === "workshop" ? detailsOpen ? "Escape closes project notes · Back to Desk returns to the room" : "Select an exhibit · Drag to look around · Escape returns to the desk" : messages[phase]}</span><a href="/hub/robotics/">Robotics notes</a><a href="/licenses/desk-compositions/ATTRIBUTION.md">Asset credits</a></footer>
    <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{failed ? "3D unavailable. Robotics notes and retry links are available." : ready ? messages[phase] : "Loading the 3D workroom."}</p>
    <noscript><div className={styles.fallback}><h1>Robotics workshop</h1><p>The interactive room requires JavaScript. Robotics notes are available as a regular page.</p><a href="/hub/robotics/">Read robotics notes</a></div></noscript>
  </main>;
}
