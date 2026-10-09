import type { Metadata } from "next";
import { Manrope, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/layout/Analytics";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hqequilibrium.com"),
  verification: {
    other: { "p:domain_verify": "96168f019aa36ad5c75bf9af2e3b8dab" },
  },
  title: "Equilibrium: Expense Tracker & Budget Planner, Just Say It",
  description:
    "Track spending by typing or saying it: \"120 petrol, 60 lunch\" and it's logged. See what you can spend today and where your month is heading. Free to start, no bank login.",
  openGraph: {
    type: "website",
    url: "https://www.hqequilibrium.com",
    siteName: "Equilibrium",
    title: "Equilibrium: Track spending by just saying it",
    description: "Type or say what you spent. See what you can spend today. Free to start, no bank login.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Equilibrium: track spending by just saying it" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${newsreader.variable} ${spaceGrotesk.variable} h-full antialiased selection:bg-gray-200 selection:text-black`}
    >
      <head>
        {/* Apply the saved theme before first paint (no light flash for dark-mode visitors) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("eq-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`,
          }}
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla adds cz-shortcut-listen) edit <body> before React loads */}
      <body className="min-h-full flex flex-col font-sans bg-bg-main text-text-primary" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
