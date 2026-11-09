import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./tokens.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://personalwebsite-tan-theta.vercel.app"),
  title: "Marc Alexis — Software, Robotics & Interactive Work",
  description: "Explore the interactive workroom of Marc Alexis, a UCF computer science student building software, robotics, and computer vision projects.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Marc Alexis — Software, Robotics & Interactive Work",
    description: "Explore the interactive workroom of Marc Alexis, a UCF computer science student building software, robotics, and computer vision projects.",
    url: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}><body>{children}</body></html>;
}
