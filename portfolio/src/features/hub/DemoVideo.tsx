"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './demo-video.module.css';

// Native dialog owns focus trapping/restoration; iframe exists only while open.
// This component never calls the world or camera coordinator.
export default function DemoVideo({ title, youtubeId, url }: { title: string; youtubeId: string; url: string }) {
  const [open, setOpen] = useState(false); const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => { dialog.current?.close(); setOpen(false); trigger.current?.focus({ preventScroll: true }); };
  useEffect(() => {
    if (open) dialog.current?.showModal();
    return () => { dialog.current?.close(); };
  }, [open]);
  return <>
    <button ref={trigger} className={styles.watch} onClick={() => setOpen(true)}>▷ Watch Demo</button>
    {open && <dialog ref={dialog} className={styles.dialog} aria-labelledby="demo-title" aria-describedby="demo-keyboard-hint" onCancel={event => { event.preventDefault(); event.stopPropagation(); close(); }} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); } }} onClick={event => { if (event.target === event.currentTarget) { const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); } }}>
      <header><div><span>Project screening</span><h2 id="demo-title">{title} · Demo</h2></div><button autoFocus onClick={close} aria-label="Close demo video">Close ×</button></header>
      <div className={styles.player}><iframe src={`https://www.youtube.com/embed/${encodeURIComponent(youtubeId)}?playsinline=1`} title={`${title} demo on YouTube`} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>
      <footer><div><p>If the player is unavailable, watch directly on YouTube.</p><p id="demo-keyboard-hint">Escape closes this window. Inside the player, use Tab to reach Close first.</p></div><a href={url} target="_blank" rel="noopener noreferrer">Open on YouTube ↗<span className={styles.srOnly}> (opens in a new tab)</span></a></footer>
    </dialog>}
  </>;
}
