import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Domine,
  Bebas_Neue,
  Roboto_Condensed,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "transportsense",
  keywords: ["transportation", "urban planning", "cities", "sustainability"],
  description: "using data to advocate for better transport policies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${domine.variable} ${bebas.variable} ${robotoCondensed.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
