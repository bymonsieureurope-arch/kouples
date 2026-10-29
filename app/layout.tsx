import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Kouples. — Notre belle aventure",
  description:
    "Votre mariage, votre couple, votre tribu. Démonstration du club Kouples.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
