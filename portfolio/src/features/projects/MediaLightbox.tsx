"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectImage } from "./projectTypes";
import styles from "./projects.module.css";

export default function MediaLightbox({
  images,
  activeIndex,
  onChange,
  onClose,
}: {
  images: readonly ProjectImage[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (activeIndex !== null && element && !element.open) {
      element.showModal();
      closeButton.current?.focus({ preventScroll: true });
    } else if (activeIndex === null && element?.open) {
      element.close();
    }
  }, [activeIndex]);

  const activeImage = activeIndex === null ? null : images[activeIndex];
  if (activeIndex === null || !activeImage) return null;
  const currentIndex = activeIndex;

  return (
    <dialog
      ref={dialog}
      className={styles.lightbox}
      aria-label="Full-size project image"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          dialog.current?.close();
        }
        if (event.key === "ArrowRight" && images.length > 1) {
          event.preventDefault();
          event.stopPropagation();
          onChange((currentIndex + 1) % images.length);
        }
        if (event.key === "ArrowLeft" && images.length > 1) {
          event.preventDefault();
          event.stopPropagation();
          onChange((currentIndex - 1 + images.length) % images.length);
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
      <div className={styles.lightboxBar}>
        <p>{activeImage.caption}</p>
        <button ref={closeButton} type="button" onClick={() => dialog.current?.close()} aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button>
      </div>
      <figure>
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          width={activeImage.width}
          height={activeImage.height}
          unoptimized
          sizes="100vw"
        />
        <figcaption>{activeImage.source.note ?? activeImage.caption}</figcaption>
      </figure>
      {images.length > 1 && (
        <div className={styles.lightboxControls} aria-label="Image navigation">
          <button type="button" onClick={() => onChange((currentIndex - 1 + images.length) % images.length)}>Previous image</button>
          <span aria-live="polite">{currentIndex + 1} of {images.length}</span>
          <button type="button" onClick={() => onChange((currentIndex + 1) % images.length)}>Next image</button>
        </div>
      )}
    </dialog>
  );
}
