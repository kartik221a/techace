import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css"
import "./globals.css";

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'

import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechAce",
  description: "InterviewMate helps candidates and interviewers connect in real-time chat sessions. Practice interviews, get feedback, and level up your skills with our modern platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>

      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            {/* Only show the website if signed in */}
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <main className="px-4 sm:px-6 lg:px-8">
                  {children}
                </main>
              </div>
            </SignedIn>

            {/* Redirect to sign in if not logged in */}
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
