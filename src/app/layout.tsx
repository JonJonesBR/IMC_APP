import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de IMC - Calcule seu Índice de Massa Corporal",
  description: "Calculadora de IMC online com histórico, validação e armazenamento local. Calcule seu Índice de Massa Corporal e acompanhe sua evolução.",
  keywords: ["IMC", "Índice de Massa Corporal", "calculadora de IMC", "peso ideal", "saúde", "fitness", "nutrição"],
  authors: [{ name: "Z.ai Team" }],
  openGraph: {
    title: "Calculadora de IMC",
    description: "Calcule seu Índice de Massa Corporal online com histórico e validação",
    url: "https://chat.z.ai",
    siteName: "Calculadora de IMC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de IMC",
    description: "Calcule seu Índice de Massa Corporal online",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
