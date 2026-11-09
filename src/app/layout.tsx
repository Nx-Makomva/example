import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brightside",
  description: "Student wellbeing check-ins for schools (example project).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <header className="border-b border-border bg-surface-raised">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-4 sm:gap-x-6">
            <Link href="/" className="whitespace-nowrap text-lg font-semibold text-brand">
              Brightside
            </Link>
            <Link href="/" className="whitespace-nowrap text-sm text-text-muted hover:text-text">
              Class overview
            </Link>
            <Link
              href="/check-in"
              className="whitespace-nowrap text-sm text-text-muted hover:text-text"
            >
              Student check-in
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
