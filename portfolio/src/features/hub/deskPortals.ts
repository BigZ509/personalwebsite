export const deskPortals = [
  { id: "Computer", object: "Computer", title: "Selected Work", description: "Open the featured project collection", available: true, labelHeight: 1.95 },
  { id: "Robotics", object: "Robot", title: "Robotics Lab", description: "Open robotics and computer-vision work", available: true, labelHeight: 1.9 },
  { id: "Software", object: "Microchip", title: "Software Lab", description: "Open software engineering work", available: true, labelHeight: .65 },
  { id: "Photography", object: "Camera", title: "Photography", description: "View the gallery status", available: true, labelHeight: 0.95 },
  { id: "Personal", object: "Basketball", title: "Off the Clock", description: "A little about life beyond the desk", available: true, labelHeight: 1.2 },
  { id: "Lamp", object: "Lamp", title: "Change lighting", description: "Cycle the desk lamp", available: true, labelHeight: 1.9 },
] as const;

export type DeskPortalId = typeof deskPortals[number]["id"];
