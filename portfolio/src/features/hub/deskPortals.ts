export const deskPortals = [
  { id: "Robotics", object: "Robot", title: "Robotics", description: "Open the robotics workshop", available: true, labelHeight: 1.9 },
  { id: "Software", object: "Microchip", title: "Software Engineering", description: "World in progress · Preview only", available: false, labelHeight: 0.65 },
  { id: "Photography", object: "Camera", title: "Photography", description: "World in progress · Preview only", available: false, labelHeight: 0.95 },
  { id: "Personal", object: "Basketball", title: "Basketball", description: "World in progress · Preview only", available: false, labelHeight: 1.2 },
] as const;

export type DeskPortalId = typeof deskPortals[number]["id"];
