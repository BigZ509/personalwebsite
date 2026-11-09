"use client";

import { useEffect, useState, type RefObject } from "react";
import { deskPortals, type DeskPortalId } from "./deskPortals";
import styles from "./desk-guidance.module.css";

const storageKey = "marc-desk-guide-v1";

export default function DeskGuidance({ disabled, onPreview, onFocusPreview, onComputer, computerRef }: {
  disabled: boolean; onComputer: () => void; computerRef: RefObject<HTMLButtonElement | null>;
  onPreview: (id: DeskPortalId | null) => void;
  onFocusPreview: (id: DeskPortalId | null) => void;
}) {
  const [showGuide, setShowGuide] = useState(false);
  useEffect(() => {
    try { setShowGuide(localStorage.getItem(storageKey) !== "dismissed"); }
    catch { setShowGuide(true); }
  }, []);
  const toggleGuide = () => {
    if (showGuide) {
      try { localStorage.setItem(storageKey, "dismissed"); } catch { /* Guide still dismisses when storage is blocked. */ }
    }
    setShowGuide(value => !value);
  };
  return <aside className={styles.guidance} aria-label="Desk objects">
    <div className={styles.previews} role="group" aria-label="Explore desk objects">
      {deskPortals.filter(portal => portal.id === "Computer" || !portal.available).map(portal => <button key={portal.id} type="button" disabled={disabled}
        ref={portal.id === "Computer" ? computerRef : undefined} aria-label={portal.id === "Computer" ? "Open portfolio dashboard" : `Preview ${portal.title} — in progress`}
        onPointerEnter={() => onPreview(portal.id)} onPointerLeave={() => onPreview(null)}
        onFocus={() => { onPreview(null); onFocusPreview(portal.id); }} onBlur={() => onFocusPreview(null)}
        onClick={() => { if (portal.id === "Computer") onComputer(); else onFocusPreview(portal.id); }}>{portal.object}</button>)}
    </div>
    <div className={styles.guideRow}>
      <p id="desk-guide" hidden={!showGuide}>Computer: portfolio dashboard. Robot: robotics. Microchip: software. Click the lamp to change its light.</p>
      <button type="button" className={styles.guideToggle} aria-expanded={showGuide} aria-controls="desk-guide" onClick={toggleGuide}>{showGuide ? "Got it" : "Desk guide"}</button>
    </div>
  </aside>;
}
