"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { approvedComposition } from "../compositions/presets";
import type { CameraBridge } from "../compositions/DeskScene";
import { abortable, createJourney, type Phase, type World } from "./journey";
import { visibleDeadline } from "./visibleDeadline";
import ComputerDashboard from "./ComputerDashboard";
import SoftwareDetails from "./SoftwareDetails";
import { softwareProjects, type SoftwareProjectId } from "./softwareProjects";
import LightingControls from "./LightingControls";
import { cycleLamp, type LightingState } from "./lighting";
import ProjectDetails from "./ProjectDetails";
import PortfolioIdentity from "./PortfolioIdentity";
import { profile } from "./profile";
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
  desk: "Desk ready. Select the robot for robotics, computer for the portfolio, microchip for software, or lamp for lighting.",
  approaching: "Approaching the robot. Back to Desk cancels the visit.",
  entering: "Opening the robotics workshop.",
  software: "Software workspace. Select a terminal for project notes, or return to the desk.",
  workshop: "Robotics workshop. Use Back to Desk or Escape to return.",
  returning: "Returning to your desk view.",
};

export default function HubExperience({ resumeAvailable = false }: { resumeAvailable?: boolean }) {
  const [computerOpen, setComputerOpen] = useState(false);
  const restoreComputerFocus = useRef(false);
  const [lighting, setLighting] = useState<LightingState>({ environment: "day", lamp: "warm" });
  const cycleLight = useCallback(() => setLighting(value => ({ ...value, lamp: cycleLamp(value.lamp) })), []);
  const [phase, setPhase] = useState<Phase>("desk");
  const main = useRef<HTMLElement>(null);
  const [scene, setScene] = useState<{ world: World; revision: number }>({ world: "desk", revision: 0 });
  const [active, setActive] = useState<string | null>(null);
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitId | null>(null);
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareProjectId | null>(null);
  const [softwareAttention, setSoftwareAttention] = useState<SoftwareProjectId | null>(null);
  const softwareButtons = useRef<Partial<Record<SoftwareProjectId, HTMLButtonElement | null>>>({});
  const restoreSoftwareFocus = useRef<SoftwareProjectId | null>(null);
  const computerButton = useRef<HTMLButtonElement>(null);
  const invoker = useRef<"workshop" | "software" | "computer">("workshop");
  const [destination, setDestination] = useState<"workshop" | "software">("workshop");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [exhibitExpanded, setExhibitExpanded] = useState(false);
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
    setFailed(true); setComputerOpen(false); setDetailsOpen(false); setExhibitExpanded(false); journey.current?.cancel();
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
        setSelectedSoftware(null); setSoftwareAttention(null);
        setSelectedExhibit(null); setDetailsOpen(false); setExhibitExpanded(false); setHoveredExhibit(null); setFocusedExhibit(null);
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
  const openComputer = useCallback(() => {
    if (phase !== "desk" || !ready || locked) return;
    const bridge = camera.current;
    // Freeze any settling orbit through the existing camera owner; the dialog
    // itself never moves the camera, and closing leaves this exact pose intact.
    if (bridge) void bridge.move(bridge.capture(), false, new AbortController().signal).catch(onFailure);
    setComputerOpen(true);
  }, [phase, ready, locked, onFailure]);
  const closeComputer = useCallback(() => { restoreComputerFocus.current = true; setComputerOpen(false); }, []);
  useLayoutEffect(() => {
    if (!computerOpen && restoreComputerFocus.current) { restoreComputerFocus.current = false; computerButton.current?.focus({ preventScroll: true }); }
  }, [computerOpen]);
  const navigateFromComputer = useCallback((world: "software" | "workshop", project?: SoftwareProjectId) => {
    setComputerOpen(false); invoker.current = "computer"; setDestination(world);
    const visit = journey.current;
    if (!visit || visit.phase !== "desk") return;
    // Reuse the existing abortable journey. Cancelled visits never open notes.
    void visit.enter(world).then(() => {
      if (project && visit.phase === "software") { setSelectedSoftware(project); setDetailsOpen(true); }
    });
  }, []);
  const selectRobot = useCallback(() => { invoker.current = "workshop"; setDestination("workshop"); void journey.current?.enter(); }, []);
  const selectSoftware = useCallback(() => { invoker.current = "software"; setDestination("software"); void journey.current?.enter("software"); }, []);
  const back = useCallback(() => { setDetailsOpen(false); setExhibitExpanded(false); void journey.current?.back(); }, []);
  const closeDetails = useCallback(() => {
    restoreExhibitFocus.current = selectedExhibit; restoreSoftwareFocus.current = selectedSoftware;
    setDetailsOpen(false); setExhibitExpanded(false);
  }, [selectedExhibit, selectedSoftware]);
  useLayoutEffect(() => {
    if (!detailsOpen && restoreSoftwareFocus.current) { softwareButtons.current[restoreSoftwareFocus.current]?.focus({ preventScroll: true }); restoreSoftwareFocus.current = null; }
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
      restoreFocus.current = false; (invoker.current === "workshop" ? robotButton.current : computerButton.current)?.focus({ preventScroll: true });
    } else if (phase === "workshop" || phase === "software") backButton.current?.focus({ preventScroll: true });
  }, [phase]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || phase === "desk") return;
      if (detailsOpen && phase === "workshop") return;
      event.preventDefault();
      if (detailsOpen) closeDetails();
      else back();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [phase, back, detailsOpen, closeDetails]);

  const selectExhibit = useCallback((id: ExhibitId) => { if (phase === "workshop" && !locked) { setExhibitExpanded(false); setSelectedExhibit(id); setDetailsOpen(true); } }, [phase, locked]);
  const selectSoftwareProject = useCallback((id: SoftwareProjectId) => { if (phase === "software" && !locked) { setSelectedSoftware(id); setDetailsOpen(true); } }, [phase, locked]);
  const softwareProject = softwareProjects.find(item => item.id === selectedSoftware);
  const selectedProject = exhibits.find(item => item.id === selectedExhibit);
  const inWorkshop = scene.world === "workshop";
  const inSoftware = scene.world === "software";
  const inWorld = inWorkshop || inSoftware;
  const status = phase === "approaching" ? `Approaching the ${destination === "software" ? "monitor" : "robot"}. Back to Desk cancels the visit.` : phase === "entering" ? `Opening the ${destination === "software" ? "software workspace" : "robotics workshop"}.` : messages[phase];
  const deskAttention = phase === "desk" && !locked ? active ?? focusedPortal ?? (focused ? "Robotics" : null) : null;
  const activePortal = deskPortals.find(portal => portal.id === deskAttention);
  return <main ref={main} className={styles.hub} data-computer-open={computerOpen} data-active-object={deskAttention ?? undefined} data-details-open={detailsOpen} data-exhibit-expanded={exhibitExpanded} data-phase={phase} data-world={scene.world} data-ready={ready && !failed} data-reduced-motion={reduced || paused} aria-label="Interactive workroom">
    {!failed && <div className={styles.scene} aria-hidden="true"><SceneBoundary onFailure={onFailure}>
      <DeskScene view="cinematic" themeOverride={approvedComposition} active={deskAttention} reset={0} onActive={setActive} onReady={onReady} onFailure={onFailure}
        experience={{ ...scene, lighting, onCycleLamp: cycleLight, reducedMotion: reduced || paused, locked: locked || computerOpen, onSelectComputer: openComputer, onSelectRobot: selectRobot, onSelectSoftware: selectSoftware, software: { selected: selectedSoftware, attention: softwareAttention, disabled: phase !== "software" || locked, onHover: setSoftwareAttention, onSelect: selectSoftwareProject }, exhibits: { selected: selectedExhibit, attention: hoveredExhibit ?? focusedExhibit, disabled: phase !== "workshop" || locked, onHover: setHoveredExhibit, onSelect: selectExhibit }, onCameraReady: cameraReady, onWorldReady: worldReady }} />
    </SceneBoundary></div>}
    <div ref={cover} className={styles.cover} aria-hidden="true" />
    <PortfolioIdentity resumeAvailable={resumeAvailable} />
    {computerOpen && !failed && <ComputerDashboard resumeAvailable={resumeAvailable} onClose={closeComputer} onNavigate={navigateFromComputer} />}
    <div className={`${styles.header} ${styles.sceneHeader}`} role="group" aria-label="Workroom controls">
      <div><span className={styles.signal} aria-hidden="true" /><strong>{inSoftware ? "Software workspace" : inWorkshop ? "Robotics workshop" : "The workroom"}</strong><span className={styles.location}>{inSoftware ? "Inside the monitor’s world" : inWorkshop ? "Inside the robot’s world" : "An interactive portfolio"}</span></div>
      <div className={styles.actions}>
        <LightingControls state={lighting} onEnvironment={environment => setLighting(value => ({ ...value, environment }))} onLamp={cycleLight} disabled={failed} />
        <button onClick={() => setPaused(value => !value)} aria-pressed={paused} disabled={reduced || failed}>{reduced ? "Reduced motion on" : paused ? "Resume motion" : "Pause motion"}</button>
        {phase !== "desk" && !failed && <button ref={backButton} className={styles.back} onClick={back} disabled={phase === "returning"}>← Back to Desk</button>}
      </div>
    </div>
    {!failed && <>
      <section className={`${styles.caption} ${inWorld ? styles.workshopCaption : styles.introduction}`} aria-label={inWorld ? "Project exhibits" : "Desk navigation"}>
        <p className={styles.place}>{inSoftware ? "Software / development console" : inWorkshop ? "Robotics / workbench" : "Hey, I’m"}</p>
        <h1>{inWorld ? "Choose a project." : "Marc Alexis."}</h1>
        <p>{inSoftware ? "Three terminals, three engineering projects. Select a screen to explore the work behind it." : inWorkshop ? "Two experiments on the workbench. Select an exhibit to read its project notes." : "Computer science student at UCF, building software and robotics projects."}</p>
        {!inWorld && <button ref={robotButton} className={styles.enter} onClick={selectRobot} disabled={!ready || phase !== "desk"} onFocus={() => { setActive(null); setFocused(true); }} onBlur={() => setFocused(false)} onPointerEnter={() => setActive("Robotics")} onPointerLeave={() => setActive(null)}>Explore robotics projects <span aria-hidden="true">↗</span></button>}
        {inWorkshop && <>
          <div className={styles.exhibitChoices} role="group" aria-label="Select a project exhibit">
            {exhibits.map(exhibit => <button key={exhibit.id} ref={element => { exhibitButtons.current[exhibit.id] = element; }} aria-label={exhibit.name} aria-pressed={selectedExhibit === exhibit.id} aria-haspopup="dialog" disabled={phase !== "workshop" || locked} onClick={() => selectExhibit(exhibit.id)} onFocus={() => setFocusedExhibit(exhibit.id)} onBlur={() => setFocusedExhibit(null)} onPointerEnter={() => setHoveredExhibit(exhibit.id)} onPointerLeave={() => setHoveredExhibit(null)}>{exhibit.name}</button>)}
          </div>
          <p className={styles.exhibitStatus} role="status" aria-live="polite">{selectedProject ? `${selectedProject.name} selected · ${selectedProject.model}.` : "Select an exhibit to open its project notes."}</p>
        </>}
      </section>
      {!inWorld && <DeskGuidance onComputer={openComputer} computerRef={computerButton} disabled={!ready || phase !== "desk" || locked} onPreview={setActive} onFocusPreview={setFocusedPortal} />}
      {inSoftware && <div className={`${styles.caption} ${styles.workshopCaption} ${styles.softwareChoices}`}>
        <div className={styles.exhibitChoices} role="group" aria-label="Select a software project">{softwareProjects.map(project => <button key={project.id} ref={element => { softwareButtons.current[project.id] = element; }} aria-pressed={selectedSoftware === project.id} disabled={phase !== "software" || locked} onClick={() => selectSoftwareProject(project.id)} onFocus={() => setSoftwareAttention(project.id)} onBlur={() => setSoftwareAttention(null)} onPointerEnter={() => setSoftwareAttention(project.id)} onPointerLeave={() => setSoftwareAttention(null)}>{project.name}</button>)}</div>
      </div>}
      {inSoftware && phase === "software" && detailsOpen && softwareProject && <SoftwareDetails project={softwareProject} onClose={closeDetails} onSelect={selectSoftwareProject} />}
      {inWorkshop && phase === "workshop" && detailsOpen && selectedProject && <ProjectDetails project={selectedProject} expanded={exhibitExpanded} onExpandedChange={setExhibitExpanded} onClose={closeDetails} onSelect={selectExhibit} />}
      <p className={styles.srOnly} role="status" aria-live="polite">{activePortal ? `${activePortal.title}. ${activePortal.description}.` : ""}</p>
      {!ready && <div className={styles.loading} role="status">Opening the workroom…</div>}
    </>}
    {failed && <section className={styles.fallback} role="alert"><h1>The workshop is still open.</h1><p>This browser couldn’t keep the 3D room running. You can read the robotics notes or try the room again.</p><a href="/hub/software/">Read software notes</a><a href="/hub/robotics/">Read robotics notes</a><a href="/hub/">Try the 3D room again</a></section>}
    <footer className={styles.footer}><span>{failed ? "3D unavailable · Robotics notes remain available" : phase === "desk" ? "Drag to look around · Robot: robotics · Computer: portfolio · Microchip: software · Lamp: light" : inWorld && (phase === "workshop" || phase === "software") ? detailsOpen ? "Escape closes project notes · Back to Desk returns to the room" : "Select an exhibit · Drag to look around · Escape returns to the desk" : status}</span><a href={`mailto:${profile.email}`} aria-label="Contact Marc by email">Contact</a><a href="/hub/software/">Software notes</a><a href="/hub/robotics/">Robotics notes</a><a href="/licenses/desk-compositions/ATTRIBUTION.md">Asset credits</a></footer>
    <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{failed ? "3D unavailable. Robotics notes and retry links are available." : ready ? status : "Loading the 3D workroom."}</p>
    <noscript><div className={styles.fallback}><h1>Robotics workshop</h1><p>The interactive room requires JavaScript. Robotics notes are available as a regular page.</p><a href="/hub/software/">Read software notes</a><a href="/hub/robotics/">Read robotics notes</a></div></noscript>
  </main>;
}
