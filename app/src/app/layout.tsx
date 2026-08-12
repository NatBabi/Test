import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ITAPS — IT Asset & Provisioning System",
  description: "Full lifecycle management for student devices: collection, triage, repair, and automated reassignment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@300..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-on-surface bg-background selection:bg-primary-light selection:text-primary">
        <AppShell>{children}</AppShell>
      {/* impeccable-live-start */}
<script src="http://localhost:8400/live.js?token=c2df8bb3-aadf-446d-a1c6-238570296d2e"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
