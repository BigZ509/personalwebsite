"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProjectImage, ProjectMedia } from "./projectTypes";
import MediaLightbox from "./MediaLightbox";
import ProjectVideo from "./ProjectVideo";
import styles from "./projects.module.css";

function isImage(media: ProjectMedia): media is ProjectImage {
  return media.type !== "video";
}

export default function ProjectMediaGallery({ media, heroMediaId }: { media: readonly ProjectMedia[]; heroMediaId: string }) {
  const orderedMedia = useMemo(() => {
    const hero = media.find((item) => item.id === heroMediaId);
    return hero ? [hero, ...media.filter((item) => item.id !== hero.id)] : media;
  }, [media, heroMediaId]);
  const images = useMemo(() => orderedMedia.filter(isImage), [orderedMedia]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (orderedMedia.length === 0) {
    return <p className={styles.mediaUnavailable}>Project media is not available yet.</p>;
  }

  let imageIndex = -1;
  return (
    <>
      <div className={styles.mediaGallery}>
        {orderedMedia.map((item, index) => {
          if (item.type === "video") {
            return <ProjectVideo key={item.id} media={item} />;
          }
          imageIndex += 1;
          const currentImage = imageIndex;
          const isHero = index === 0;
          return (
            <figure className={isHero ? styles.heroFigure : styles.galleryFigure} key={item.id}>
              <button
                type="button"
                className={styles.imageButton}
                onClick={() => setActiveIndex(currentImage)}
                aria-label={`View full-size image: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  unoptimized
                  priority={isHero}
                  sizes={isHero ? "(max-width: 760px) 100vw, 68vw" : "(max-width: 760px) 50vw, 25vw"}
                />
                <span className={styles.expandLabel}>View image full size</span>
              </button>
              <figcaption>{item.caption}</figcaption>
            </figure>
          );
        })}
      </div>
      <MediaLightbox images={images} activeIndex={activeIndex} onChange={setActiveIndex} onClose={() => setActiveIndex(null)} />
    </>
  );
}
