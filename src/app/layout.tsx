import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://adarshkakarla.dev";
const TITLE = "Adarsh Kakarla — I Don't Just Learn Technology. I Build With It.";
const DESC =
  "First-year CSE @ Atria Institute of Technology, Bengaluru. AI + tech builder, aspiring entrepreneur, creator. EduExam AI, web experiments, client content, leadership. Learn → Experiment → Build → Repeat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Adarsh Kakarla" },
  description: DESC,
  authors: [{ name: "Adarsh Kakarla" }],
  creator: "Adarsh Kakarla",
  keywords: ["Adarsh Kakarla","AI builder","CSE portfolio","EduExam AI","entrepreneur","videography","Next.js portfolio","Bengaluru developer"],
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "Adarsh Kakarla",
    firstName: "Adarsh",
    lastName: "Kakarla",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = { themeColor: "#0b0b0c", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Adarsh Kakarla",
        url: SITE_URL,
        jobTitle: "Computer Science Student & Builder",
        affiliation: { "@type": "CollegeOrUniversity", name: "Atria Institute of Technology" },
        address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
        knowsAbout: ["Artificial Intelligence","Web Development","Entrepreneurship","Videography","Machine Learning"],
        sameAs: [
          "https://github.com/AdarshKakarla-AK",
          "https://www.linkedin.com/in/adarsh-kakarla-7a83a2411",
        ],
      },
      {
        "@type": "WebSite",
        name: "Adarsh Kakarla — Portfolio",
        url: SITE_URL,
      },
    ],
  };
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23E10600'/><text x='50' y='72' font-size='58' text-anchor='middle' font-family='sans-serif' font-weight='900' fill='white'>A</text></svg>" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
