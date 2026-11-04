"use client";

import { useEffect, useState } from "react";
import { deskPortals, type DeskPortalId } from "./deskPortals";
import styles from "./desk-guidance.module.css";

const storageKey = "marc-desk-guide-v1";

export default function DeskGuidance({ disabled, onPreview, onFocusPreview }: {
  disabled: boolean;
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
  return <aside className={styles.guidance} aria-label="Desk object previews">
    <div className={styles.previews} role="group" aria-label="Preview worlds in progress">
      {deskPortals.filter(portal => !portal.available).map(portal => <button key={portal.id} type="button" disabled={disabled}
        aria-label={`Preview ${portal.title} — in progress`}
        onPointerEnter={() => onPreview(portal.id)} onPointerLeave={() => onPreview(null)}
        onFocus={() => onFocusPreview(portal.id)} onBlur={() => onFocusPreview(null)}
        onClick={() => onFocusPreview(portal.id)}>{portal.object}</button>)}
    </div>
    <div className={styles.guideRow}>
      <p id="desk-guide" hidden={!showGuide}>The objects lead to worlds. Start with the robot; the others are in progress.</p>
      <button type="button" className={styles.guideToggle} aria-expanded={showGuide} aria-controls="desk-guide" onClick={toggleGuide}>{showGuide ? "Got it" : "Desk guide"}</button>
    </div>
  </aside>;
}
