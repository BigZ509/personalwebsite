export type ExhibitId = "gesture-rover" | "guiding-hands";
export type Exhibit = {
  id: ExhibitId; name: string; model: string; representation: string; representationNote?: string; status: string; summary: string;
  inspiration: string | null; inspirationProvisional?: boolean; github: string | null; source: string | null;
  video: { url: string; title: string; note: string; source: string } | null;
};

// Confirmed facts and field provenance: docs/ROBOTICS_PROJECT_DATA.md.
// Null means unprovided/unverified; never substitute a guessed demo or URL.
export const exhibits: readonly Exhibit[] = [
  {
    id: "gesture-rover", name: "Gesture Rover", model: "Robot stand-in", representation: "Placeholder model",
    status: "Project notes pending",
    summary: "A robotics project in the workshop. A confirmed project summary is still to come.",
    inspiration: "Exploring gesture-based control of physical robots.", inspirationProvisional: true, github: null, source: null, video: null,
  },
  {
    id: "guiding-hands", name: "Guiding Hands", model: "Stylized CV setup", representation: "Illustrative setup",
    representationNote: "Webcam, projector and a stylized Jetson Orin Nano prop. This arrangement illustrates the intended setup; it is not an official NVIDIA model or a replica of the assembled project. The board shows an archived Forest Motion prototype screenshot from the repository.",
    status: "Gesture-control prototype",
    summary: "Camera-based hand gestures control a character through a forest game. The prototype combines local MediaPipe hand tracking, calibrated gesture controls and a browser game, with a projected play area as the intended setup.",
    inspiration: "Making hand-movement rehabilitation exercises more engaging through an interactive computer-vision game.",
    github: "https://github.com/BigZ509/guiding-hands",
    source: "https://github.com/BigZ509/guiding-hands/blob/main/CONTEXT.md",
    video: null,
  },
];
export type ExhibitInteraction = {
  selected: ExhibitId | null;
  attention: ExhibitId | null;
  disabled: boolean;
  onHover: (id: ExhibitId | null) => void;
  onSelect: (id: ExhibitId) => void;
};
