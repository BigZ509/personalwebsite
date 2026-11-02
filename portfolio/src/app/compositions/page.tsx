import type { Metadata } from "next";
import CompositionStudy from "@/features/compositions/CompositionStudy";

export const metadata: Metadata = {
  title: "Desk hub — three composition studies",
  description: "Cozy, cinematic and stylized-game studies of one real 3D desk environment.",
};

export default function CompositionsPage() {
  return <CompositionStudy />;
}
