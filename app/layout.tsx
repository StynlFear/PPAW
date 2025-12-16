import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { UserProvider } from "@/lib/user-context"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "App",
  description: "",
  generator: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProvider>{children}</UserProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
