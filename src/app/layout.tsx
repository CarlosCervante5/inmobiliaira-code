import type { Metadata } from "next";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ConditionalHeader } from "@/components/layout/ConditionalHeader";
import "./globals.css";

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
      <body className="font-sans antialiased">
        <SessionProvider>
          <div className="min-h-screen bg-brand-off-white">
            <ConditionalHeader />
            <main>{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
