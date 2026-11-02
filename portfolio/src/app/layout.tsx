import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Field Notes — a robotics specimen",
  description: "An interactive field note on robotics. A small prototype about curiosity, engineering, and things that move.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
