import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { Toaster } from "@/components/ui/sonner"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

export const metadata: Metadata = {
  title: "AES GCM Encrypt and Decrypt file online",
  description:
    "A free online tool for encryption and decryption of any file instantly with the AES 256 GCM algorithm also allows you to download your securely encrypted files effortlessly.",
  openGraph: {
    title: "AES GCM Encrypt and Decrypt file online",
    description:
      "A free online tool for encryption and decryption of any file instantly with the AES 256 GCM algorithm also allows you to download your securely encrypted files effortlessly.",
    url: "https://aes-gcm.vercel.app/",
    siteName: "aes-gcm.vercel.app",
    images: "https://aes-gcm.vercel.app/og-image.png",
    type: "website",
  },
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
          <SiteFooter />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
