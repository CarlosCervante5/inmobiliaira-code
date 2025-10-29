import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ConditionalHeader } from "@/components/layout/ConditionalHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Catálogo Inmobiliario - Encuentra tu hogar ideal",
  description: "Plataforma inmobiliaria para encontrar propiedades, consultar créditos INFONAVIT y conectar con brókers profesionales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <div className="min-h-screen bg-gray-50">
            <ConditionalHeader />
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
