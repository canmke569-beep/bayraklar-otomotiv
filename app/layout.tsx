import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bayraklar Otomotiv | 52 Yıllık Deneyim - Premium Oto Galeri",
  description: "Bayraklar Otomotiv - 52 yıllık deneyim ile lüks ve premium araç satışı. Audi, BMW, Mercedes-Benz, Porsche, Volvo, Land Rover. Ankara'nın güvenilir oto galerisi.",
  keywords: "bayraklar otomotiv, ankara oto galeri, ikinci el araç, lüks araç, premium araç, mercedes, bmw, audi, porsche",
  authors: [{ name: "Bayraklar Otomotiv" }],
  openGraph: {
    title: "Bayraklar Otomotiv | 52 Yıllık Deneyim",
    description: "Lüks, Güven ve Tecrübe - Premium oto galeri deneyimi",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
