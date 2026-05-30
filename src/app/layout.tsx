import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreeToolBox - Free Online AI Tools",
    template: "%s | FreeToolBox",
  },
  description:
    "Free online tools powered by AI. AI writer, SEO meta generator, text summarizer, prompt optimizer, and more. No sign-up required.",
  keywords: [
    "free tools",
    "AI tools",
    "online tools",
    "AI writer",
    "SEO tools",
    "text summarizer",
    "prompt optimizer",
    "free online tools",
  ],
  authors: [{ name: "FreeToolBox" }],
  openGraph: {
    title: "FreeToolBox - Free Online AI Tools",
    description:
      "Free online tools powered by AI. No sign-up required. All tools are free to use.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
