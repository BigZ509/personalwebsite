"use client";
import { useEffect, useRef, useState } from 'react';
import type { EnvironmentMode, LightingState } from './lighting';
import styles from './lighting.module.css';

export default function LightingControls({ state, onEnvironment, onLamp, disabled }: { state: LightingState; onEnvironment: (mode: EnvironmentMode) => void; onLamp: () => void; disabled: boolean }) {
  const [open, setOpen] = useState(false); const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      // A native modal takes precedence. Otherwise dismiss lighting before the
      // inspector/world, even after a mesh click moved focus outside this menu.
      if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
      event.preventDefault(); event.stopImmediatePropagation();
      setOpen(false); trigger.current?.focus({ preventScroll: true });
    };
    window.addEventListener('keydown', escape, true);
    return () => window.removeEventListener('keydown', escape, true);
  }, [open]);
  return <div className={styles.controls}>
    <button ref={trigger} aria-label={`Lighting: ${state.environment === 'day' ? 'Day' : 'Night'}`} aria-expanded={open} aria-controls="lighting-controls" onClick={() => setOpen(value => !value)} disabled={disabled}>{state.environment === 'day' ? 'Day' : 'Night'}</button>
    {open && <div id="lighting-controls" className={styles.popover} role="group" aria-label="Lighting">
      <p>Room atmosphere</p><div>{(['day', 'night'] as const).map(mode => <button key={mode} aria-pressed={state.environment === mode} onClick={() => onEnvironment(mode)}>{mode === 'day' ? 'Day' : 'Night'}</button>)}</div>
      <p>Desk lamp · independent</p><button onClick={onLamp} aria-label={`Desk lamp: ${state.lamp}. Change light`}>Lamp: {state.lamp} <span aria-hidden="true">↻</span></button>
      <button className={styles.dismiss} onClick={() => { setOpen(false); trigger.current?.focus(); }}>Close lighting</button>
    </div>}
  </div>;
}
