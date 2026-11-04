import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc Alexis — Software, robotics & creative technology",
  description: "Marc Alexis is a computer science student and aspiring software engineer. Explore his interactive portfolio of software, robotics and creative technology.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
