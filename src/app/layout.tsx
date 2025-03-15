import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"
import { TRPCProvider } from "@/trpc/client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Watchtube",
    description: "Watch video anywhere, anytime",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider
            appearance={{
                captcha: { theme: "light", size: "compact", language: "en" },
            }}
            afterSignOutUrl="/"
        >
            <html lang="en">
                <body className={inter.className}>
                    <TRPCProvider>{children}</TRPCProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
