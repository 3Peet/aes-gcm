import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Toaster } from "@/components/ui/sonner"
import SiteHeader from "@/components/site-header"

import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "AES GCM Encrypt and Decrypt file online",
  description:
    "A free online tool for encryption and decryption of any file instantly with the AES 256 GCM algorithm also allows you to download your securely encrypted files effortlessly.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
