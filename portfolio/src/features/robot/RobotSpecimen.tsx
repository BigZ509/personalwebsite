"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import { canAnimate, initialRobotState, robotReducer } from "./interaction";

const RobotScene = dynamic(() => import("./RobotScene"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function RobotSpecimen({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(robotReducer, initialRobotState);
  const [reduced, setReduced] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [graphics, setGraphics] = useState<"poster" | "loading" | "live" | "failed">("poster");
  const [attempt, setAttempt] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const specimenRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const mounted = useRef(false);
  const wantScene = hydrated && enabled && !reduced;
  const animate = canAnimate({ reduced, paused, visible, inView });

  useEffect(() => {
    mounted.current = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(motion.matches);
    update();
    setEnabled(!window.matchMedia("(max-width: 760px), (pointer: coarse)").matches);
    setVisible(!document.hidden);
    setHydrated(true);
    motion.addEventListener("change", update);
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => { mounted.current = false; motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!wantScene) { setGraphics("poster"); return; }
    setGraphics("loading");
    let context: WebGL2RenderingContext | null = null;
    try { context = document.createElement("canvas").getContext("webgl2"); } catch { /* unsupported */ }
    if (!context) { setGraphics("failed"); return; }
    context.getExtension("WEBGL_lose_context")?.loseContext();
    const timeout = window.setTimeout(() => setGraphics(current => current === "loading" ? "failed" : current), 10_000);
    return () => window.clearTimeout(timeout);
  }, [wantScene, attempt]);

  useEffect(() => {
    if (state.revealed) headingRef.current?.focus({ preventScroll: true });
  }, [state.revealed]);

  const reset = () => { dispatch({ type: "reset" }); specimenRef.current?.focus({ preventScroll: true }); };
  const enableScene = () => {
    setEnabled(true);
    if (graphics !== "failed") { setAttempt(value => value + 1); return; }
    setGraphics("poster");
    void import("./RobotScene").then(module => {
      if (!mounted.current) return;
      module.clearRobotAsset();
      setAttempt(value => value + 1);
    }).catch(() => { if (mounted.current) setGraphics("failed"); });
  };
  const live = graphics === "live" && wantScene;
  const showScene = wantScene && (graphics === "loading" || graphics === "live");

  return <div className="hero-grid">
    <div className="hero-copy">
      {children}
      <div className="invitation"><span className="invitation-line" /><p>Start with a small interaction.<br /><span>There’s a curious little robot to meet.</span></p><span className="invitation-arrow" aria-hidden="true">⤴</span></div>
      <a className="text-link hero-link" href="/robotics/">Explore robotics <span aria-hidden="true">↗</span></a>
      <section id="robotics-preview" className="robotics-preview" hidden={!state.revealed} aria-labelledby="preview-title" onKeyDown={event => { if (event.key === "Escape") reset(); }}>
        <p className="section-index">A NEW FIELD NOTE / ROBOTICS</p>
        <h2 id="preview-title" tabIndex={-1} ref={headingRef}>Ideas, out in the real world.</h2>
        <p>A place for future builds, experiments, and lessons from things that move. This is a prototype placeholder.</p>
        <div><a href="/robotics/" className="text-link">Open the robotics note <span aria-hidden="true">↗</span></a><button className="quiet-button" onClick={reset}>Return to specimen</button></div>
      </section>
      <p className="prototype-note"><span className="status-dot" /> AN OPEN NOTEBOOK. A WORK IN PROGRESS.</p>
    </div>
    <section ref={panelRef} className={`specimen-panel ${state.hovered || state.focused ? "is-attentive" : ""} ${state.revealed ? "is-revealed" : ""}`} id="specimen" aria-label="Robot specimen">
      <div className="specimen-topline"><span><span className="small-cross" aria-hidden="true">+</span> SPECIMEN NO. 001</span><span>ROBOTICS / EXPLORATION</span></div>
      <div className="specimen-stage">
        <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
        <span className="coordinate coordinate-top" aria-hidden="true">FIG. 01</span><span className="coordinate coordinate-bottom" aria-hidden="true">A STUDY IN CURIOSITY</span>
        <img className={`robot-poster ${live ? "poster-hidden" : ""}`} src="/robot-poster.svg" alt="" width="600" height="620" />
        {showScene && <div className="scene-layer" aria-hidden="true"><SceneBoundary key={attempt} onFailure={() => setGraphics("failed")}><RobotScene active={state.hovered || state.focused} activation={state.activation} animate={animate} suspended={!visible || !inView} cursor={cursor} onReady={() => setGraphics("live")} onFailure={() => setGraphics("failed")} /></SceneBoundary></div>}
        <button ref={specimenRef} type="button" className="specimen-hit" aria-label="Meet the robot. Explore robotics." aria-expanded={state.revealed} aria-controls="robotics-preview" aria-describedby="interaction-hint" disabled={!hydrated} onClick={() => dispatch({ type: "activate" })} onPointerEnter={() => dispatch({ type: "hover", value: true })} onPointerLeave={() => { dispatch({ type: "hover", value: false }); cursor.current = { x: 0, y: 0 }; }} onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); cursor.current = { x: (event.clientX - box.left) / box.width * 2 - 1, y: (event.clientY - box.top) / box.height * 2 - 1 }; }} onFocus={() => dispatch({ type: "focus", value: true })} onBlur={() => dispatch({ type: "focus", value: false })}>
          <span className="meet-label"><span className="status-dot" /> {state.revealed ? "Hello, fellow explorer." : "A little curious. Just like you."}</span>
          <span className="specimen-arrow" aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="specimen-caption"><div><span className="section-index">THE FIRST EXPLORER</span><h2>A friendly introduction.</h2></div><span className="specimen-number" aria-hidden="true">01</span></div>
      <div className="specimen-toolbar"><p id="interaction-hint">Hover to say hello. Click to explore.<span>Tab + Enter or Space works, too.</span></p><div className="specimen-controls">{hydrated && !reduced && <>{live && <button type="button" className="control-button" onClick={() => setPaused(value => !value)} aria-pressed={paused}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Resume motion" : "Pause motion"}</button>}{(!enabled || graphics === "failed") && <button type="button" className="control-button" onClick={enableScene}>{graphics === "failed" ? "Retry 3D" : "Enable 3D"}</button>}</>}<span className="scene-status" role="status" aria-live="polite"><span className={`status-dot ${live ? "is-live" : ""}`} />{live ? "Live specimen" : graphics === "loading" ? "Preparing 3D" : "Static specimen"}</span></div></div>
      {reduced && hydrated && <p className="policy-note">Reduced motion is on. Enjoy the still specimen; every destination is available.</p>}
      {graphics === "failed" && <p className="policy-note">3D isn’t available right now. The still specimen and all controls work.</p>}
      <noscript><p className="policy-note">This is a still specimen. <a href="/robotics/">Visit the robotics note</a> without JavaScript.</p></noscript>
    </section>
  </div>;
}
