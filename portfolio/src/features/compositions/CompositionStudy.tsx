"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { compositionIds, compositions, isCompositionId, type CompositionId } from "./presets";
import styles from "./compositions.module.css";

const DeskScene = dynamic(() => import("./DeskScene"), { ssr: false });
const objectNames = ["Robotics", "Personal", "Photography", "Software"] as const;

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.error("Composition scene:", error); this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function CompositionStudy() {
  const [view, setView] = useState<CompositionId>("cozy");
  const [clean, setClean] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [reset, setReset] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const requested = query.get("view");
    if (isCompositionId(requested)) setView(requested);
    setClean(query.get("clean") === "1");
  }, []);

  const choose = (next: CompositionId) => {
    setReady(false); setActive(null); setView(next); setReset(value => value + 1);
    const url = new URL(window.location.href);
    url.searchParams.set("view", next);
    window.history.replaceState(null, "", url);
  };

  return <main className={styles.study} data-composition={view} data-scene-ready={ready && !failed} style={{ background: compositions[view].background }}>
    <div className={styles.scene}>
      <SceneBoundary onFailure={() => setFailed(true)}>
        <DeskScene view={view} active={active} reset={reset} onActive={setActive} onReady={() => setReady(true)} onFailure={() => setFailed(true)} />
      </SceneBoundary>
    </div>
    {!clean && <>
      <header className={styles.toolbar}>
        <div className={styles.identity}><span className={styles.mark}>◈</span><div><strong>The workroom</strong><span>Desk hub · composition studies</span></div></div>
        <nav className={styles.views} aria-label="Composition treatment">{compositionIds.map((id, index) => <button key={id} aria-pressed={id === view} onClick={() => choose(id)}><span>0{index + 1}</span>{compositions[id].name}</button>)}</nav>
      </header>
      <section className={styles.caption} aria-label="Current composition"><span>0{compositionIds.indexOf(view) + 1} / 03</span><h1>{compositions[view].name}</h1><p>{compositions[view].description}</p></section>
      <footer className={styles.footer}>
        <div className={styles.objects} aria-label="Desk objects">{objectNames.map((name, i) => <button key={name} onFocus={() => setActive(name)} onBlur={() => setActive(null)} onPointerEnter={() => setActive(name)} onPointerLeave={() => setActive(null)} onClick={() => setActive(name)} aria-label={`Inspect ${name} object`}><span>{["◉", "◎", "▣", "▦"][i]}</span>{name}</button>)}</div>
        <button className={styles.reset} onClick={() => setReset(value => value + 1)}>Reset view <span>↗</span></button>
      </footer>
      <p className={styles.scope}>A real 3D scene study. Mini-world transitions are reserved for the next phase. <a href="/licenses/desk-compositions/ATTRIBUTION.md" target="_blank" rel="noreferrer">Asset credits</a></p>
      {active && <div className={styles.objectLabel} role="status">{active}<span>Object study</span></div>}
    </>}
    {!ready && !failed && <div className={styles.loading} role="status">Arranging the workroom…</div>}
    {failed && <section className={styles.fallback} role="alert"><h1>The 3D scene couldn’t load.</h1><p>WebGL or a model download may be unavailable. The saved composition screenshots can still be reviewed.</p><a href="/compositions/">Try again</a><a href="/robotics/">Read the robotics placeholder</a></section>}
    <noscript><div className={styles.fallback}>This 3D composition study needs JavaScript. <a href="/robotics/">Read robotics</a>.</div></noscript>
  </main>;
}
