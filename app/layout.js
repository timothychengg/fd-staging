import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata = {
  title: {
    default: "F&D Staging – Luxury Home Staging & Styling",
    template: "%s | F&D Staging",
  },
  description:
    "Luxury home staging studio in Los Angeles creating aspirational interiors that sell. Professional staging services for vacant homes, occupied listings, and new developments.",
  keywords: [
    "home staging",
    "luxury staging",
    "real estate staging",
    "Los Angeles staging",
    "interior staging",
    "vacant home staging",
    "occupied staging",
    "model home staging",
  ],
  authors: [{ name: "F&D Staging" }],
  creator: "F&D Staging",
  publisher: "F&D Staging",
  metadataBase: new URL("https://fanddstaging.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "F&D Staging – Luxury Home Staging & Styling",
    description:
      "Luxury home staging studio in Los Angeles creating aspirational interiors that sell.",
    url: "https://fanddstaging.com",
    siteName: "F&D Staging",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "F&D Staging - Luxury Home Staging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "F&D Staging – Luxury Home Staging & Styling",
    description:
      "Luxury home staging studio in Los Angeles creating aspirational interiors that sell.",
    creator: "@fanddstaging",
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
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f6f4f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-luxbg text-luxtxt antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
