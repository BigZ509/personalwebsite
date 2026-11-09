import type { ProjectCaseStudy } from "./projectTypes";

export const projectCaseStudies: readonly ProjectCaseStudy[] = [
  {
    slug: "guiding-hands",
    name: "Guiding Hands",
    category: "Robotics",
    focus: "Computer vision · gesture control",
    summary: "A local hand-tracking prototype that turns calibrated gestures into movement through a forest game.",
    status: "Gesture-control prototype",
    teamContext: "The repository describes a team project but does not assign Marc individual responsibilities. This page explains the documented system without claiming solo authorship.",
    technologies: ["Python", "MediaPipe", "OpenCV", "Pygame", "UDP", "WebSockets"],
    repository: {
      label: "Guiding Hands on GitHub",
      url: "https://github.com/BigZ509/guiding-hands",
    },
    demo: null,
    demoUnavailableNote: "No verified demo video is available.",
    mediaContext: "The available visual is an archived experimental-control still, not a recording of a current run.",
    heroMediaId: "forest-motion-prototype",
    media: [
      {
        id: "forest-motion-prototype",
        type: "screenshot",
        src: "/images/guiding-hands/forest-motion-prototype.png",
        alt: "Archived FOREST MOTION prototype screenshot showing a top-down forest arena beside hand-control diagnostics.",
        caption: "An archived Forest Motion experimental-control screenshot from the repository. Diagnostic values visible in the image are not current measurements.",
        width: 1120,
        height: 760,
        source: {
          label: "Guiding Hands repository",
          url: "https://github.com/BigZ509/guiding-hands/blob/main/benchmark-results/smol-live-smoke.png",
          note: "Original repository image, unchanged. It is a static prototype still, not a demo recording.",
        },
      },
    ],
    sections: [
      {
        id: "motivation",
        title: "A different way to move through a game",
        layout: "prose",
        paragraphs: [
          "Guiding Hands explores hand movement as an input for a forest game. The project concept connects camera-based gesture recognition with a projected play area, so a player can move a character with their hand rather than a conventional controller.",
          "The repository frames this as a rehabilitation-oriented idea to explore. Therapeutic effectiveness has not been established, and exercise selection still needs review with appropriate rehabilitation expertise and user feedback.",
        ],
      },
      {
        id: "system",
        title: "From hand movement to game input",
        layout: "flow",
        paragraphs: [
          "The repository documents a local processing path with a separate game-input bridge. The projected hardware arrangement is an intended setup; this diagram describes software components, not a verified physical installation.",
        ],
        items: [
          { label: "Hand movement", description: "The player presents a hand toward the camera." },
          { label: "Camera capture", description: "The local Python controller reads camera frames through OpenCV." },
          { label: "Hand landmarks", description: "MediaPipe detects hand landmarks for the gesture-control logic." },
          { label: "Calibration and mapping", description: "Captured poses are calibrated and mapped to directional game input." },
          { label: "Local relay", description: "The controller can send movement packets over UDP to a relay that forwards them over WebSockets." },
          { label: "Forest game", description: "A browser game consumes the input and moves the character through the arena." },
        ],
      },
      {
        id: "controls",
        title: "Calibrated gestures, with a stop state",
        layout: "editorial",
        paragraphs: [
          "The documented default mode calibrates a relaxed hand, a comfortable fist and an open hand. If one pose fails, calibration can retry it without discarding already completed recordings.",
        ],
        items: [
          { label: "Open hand", description: "Move up." },
          { label: "Comfortable fist", description: "Move down." },
          { label: "Index-thumb pinch", description: "Move left." },
          { label: "Pinkie-thumb pinch", description: "Move right." },
          { label: "Relaxed, unclear or lost tracking", description: "Stop movement rather than continue with an uncertain gesture." },
        ],
      },
      {
        id: "engineering",
        title: "Decisions that shape the prototype",
        layout: "editorial",
        paragraphs: [
          "The repository separates hand capture and gesture interpretation from the browser game. Local packets form the boundary between the controller and game relay, while calibration handles differences in a player's captured poses.",
        ],
        items: [
          { label: "Calibrate poses, not a fixed threshold story", description: "Record the poses used by the control logic, retry failed steps and keep successful recordings." },
          { label: "Make ambiguous input safe", description: "Partially relaxed or unclear poses, tracking loss and manual pause stop movement in the documented control behavior." },
          { label: "Keep camera input local", description: "The README says the controller does not record camera images. The project still needs its target hardware and complete setup verified." },
        ],
      },
      {
        id: "current-state",
        title: "What is documented today",
        layout: "prose",
        paragraphs: [
          "The repository contains a local Python hand-control prototype, gesture calibration and mappings, a forest game, and a UDP-to-WebSocket input path for a browser game. The available image is an archived interface still, not evidence of a current live run.",
          "No approved demo video has been supplied. The project README also says the intended Orin Nano environment has not yet been tested as a complete setup. This page makes no latency, accuracy, device-performance or clinical-outcome claim.",
        ],
      },
      {
        id: "next-checks",
        title: "Questions for the next build",
        layout: "editorial",
        paragraphs: [
          "The project documentation identifies these as checks to complete, not results already achieved.",
        ],
        items: [
          { label: "Verify the intended setup", description: "Test the selected camera, Jetson, projector and software together before presenting the projected experience as working hardware." },
          { label: "Measure the full input path", description: "Record gesture-to-character response and tracking behavior in the actual lighting and camera positions." },
          { label: "Review the exercise design", description: "Get appropriate rehabilitation expertise and participant feedback before making therapeutic or accessibility claims." },
        ],
      },
    ],
  },
];

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return projectCaseStudies.find((project) => project.slug === slug);
}
