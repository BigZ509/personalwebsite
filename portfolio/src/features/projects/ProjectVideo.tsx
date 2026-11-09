"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectVideo as ProjectVideoData } from "./projectTypes";
import styles from "./projects.module.css";

export default function ProjectVideo({ media }: { media: ProjectVideoData }) {
  const player = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = player.current;
    const pauseWhenHidden = () => {
      if (document.hidden) video?.pause();
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, []);

  return (
    <figure className={styles.videoFigure}>
      <video
        ref={player}
        controls
        playsInline
        preload="none"
        poster={media.poster?.src}
        src={media.src}
        width={media.width}
        height={media.height}
        aria-label={media.title}
        onError={() => setFailed(true)}
      />
      <figcaption>{media.caption}</figcaption>
      {failed && <p className={styles.mediaStatus} role="status">This video could not be played here.</p>}
      {media.source && <a href={media.source.url} target="_blank" rel="noopener noreferrer">Open {media.source.label}<span className={styles.srOnly}> (opens in a new tab)</span></a>}
    </figure>
  );
}
