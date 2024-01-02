import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Toaster } from "@/components/ui/sonner"
import SiteHeader from "@/components/site-header"

import "./globals.css"

export const metadata: Metadata = {
  title: "AES-GEM Tools",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
