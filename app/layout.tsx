import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolionovastackdigital.netlify.app"),
  title: "Portfolio - Développeur Full Stack | React, Next.js, TypeScript",
  description: "Développeur Full Stack passionné spécialisé en React, Next.js et TypeScript. Découvrez mes projets innovants et contactez-moi pour vos besoins en développement web.",
  keywords: ["développeur full stack", "React", "Next.js", "TypeScript", "portfolio", "développement web", "JavaScript", "frontend", "backend"],
  authors: [{ name: "Votre Nom" }],
  creator: "MFOLOUM ULRICH",
  publisher: "Votre Nom",
  openGraph: {
    title: "Portfolio - Développeur Full Stack",
    description: "Découvrez mes compétences et projets en développement web moderne.",
    url: "https://votre-portfolio.com",
    siteName: "Portfolio Développeur",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Développeur Full Stack",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Développeur Full Stack",
    description: "Découvrez mes compétences et projets en développement web moderne.",
    images: ["/og-image.jpg"],
    creator: "@votre_twitter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}