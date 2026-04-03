import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import GlobalBackButton from "@/components/ui/GlobalBackButton";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-oswald"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lifecareacademy.org"),
  title: "LIFECARE ACADEMY - Occupational Health and Safety Consultancy",
  description:
    "LifeCare Academy offers internationally recognized occupational health and safety certifications including OTHM, IOSH, OSHA, ISO, and First Aid training.",
  openGraph: {
    title: "LIFECARE ACADEMY - Occupational Health and Safety Consultancy",
    description:
      "LifeCare Academy offers internationally recognized occupational health and safety certifications including OTHM, IOSH, OSHA, ISO, and First Aid training.",
    url: "/",
    siteName: "LifeCare Academy",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "LifeCare Academy"
      }
    ],
    locale: "en_PK",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LIFECARE ACADEMY - Occupational Health and Safety Consultancy",
    description:
      "LifeCare Academy offers internationally recognized occupational health and safety certifications including OTHM, IOSH, OSHA, ISO, and First Aid training.",
    images: ["/logo.png"]
  },
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${oswald.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`}
        </Script>
      </head>
      <body className="bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <GlobalBackButton />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
