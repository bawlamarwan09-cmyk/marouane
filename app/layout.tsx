import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marouane Baoulla — Web Developer & Automation Specialist",
  description:
    "I build fast, scalable web applications and automate business workflows using AI and modern tools.",
  keywords: [
    "Web Developer",
    "Automation Specialist",
    "n8n",
    "Next.js",
    "AI Integration",
    "Marouane Baoulla",
  ],
  openGraph: {
    title: "Marouane Baoulla — Web Developer & Automation Specialist",
    description:
      "I build fast, scalable web applications and automate business workflows using AI and modern tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#F8FAFC] text-slate-900 selection:bg-navy-700/10">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
