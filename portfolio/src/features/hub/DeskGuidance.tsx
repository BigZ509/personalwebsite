"use client";

import { useEffect, useState } from "react";
import { deskPortals, type DeskPortalId } from "./deskPortals";
import styles from "./desk-guidance.module.css";

const storageKey = "marc-workroom-hint-v2";

export default function DeskGuidance({
  disabled,
  onActivate,
  onPreview,
  onFocusPreview,
  registerButton,
  registerToggle,
}: {
  disabled: boolean;
  onActivate: (id: DeskPortalId, trigger: HTMLButtonElement) => void;
  onPreview: (id: DeskPortalId | null) => void;
  onFocusPreview: (id: DeskPortalId | null) => void;
  registerButton: (id: DeskPortalId, button: HTMLButtonElement | null) => void;
  registerToggle: (button: HTMLButtonElement | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    try {
      setShowHint(localStorage.getItem(storageKey) !== "dismissed");
    } catch {
      setShowHint(true);
    }
  }, []);

  const dismissHint = () => {
    try {
      localStorage.setItem(storageKey, "dismissed");
    } catch {
      setShowHint(false);
      return;
    }
    setShowHint(false);
  };

  return <aside className={styles.guidance} aria-label="Explore the workroom">
    {showHint && <div className={styles.hint} role="note">
      <p>Drag to look around. Select an object to explore.</p>
      <button type="button" onClick={dismissHint} aria-label="Dismiss workroom hint">Dismiss</button>
    </div>}
    <button
      ref={registerToggle}
      type="button"
      className={styles.guideToggle}
      aria-expanded={open}
      aria-controls="workroom-directory"
      onClick={() => setOpen(value => !value)}
    >
      {open ? "Close Explore" : "Explore the room"}
    </button>
    {open && <div id="workroom-directory" className={styles.directory} role="group" aria-label="Workroom destinations">
      {deskPortals.map(portal => <button
        key={portal.id}
        ref={button => registerButton(portal.id, button)}
        type="button"
        disabled={disabled}
        aria-label={`${portal.object} · ${portal.title}`}
        onPointerEnter={() => onPreview(portal.id)}
        onPointerLeave={() => onPreview(null)}
        onFocus={() => { onPreview(null); onFocusPreview(portal.id); }}
        onBlur={() => onFocusPreview(null)}
        onClick={event => onActivate(portal.id, event.currentTarget)}
      >
        <span>{portal.object}</span>
        <strong>{portal.title}</strong>
        <small>{portal.description}</small>
      </button>)}
    </div>}
  </aside>;
}
