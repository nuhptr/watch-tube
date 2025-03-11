"use client"

import { UserCircleIcon } from "lucide-react"
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export const AuthButton = () => {
    // TODO: Different auth states
    return (
        <>
            <SignedIn>
                <UserButton />
                {/* Add menu items for Studio and User profile */}
            </SignedIn>
            {/* if user logout render this & also make it to be a button */}
            <SignedOut>
                <SignInButton mode="modal">
                    <Button
                        variant="outline"
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 hover:bg-blue-50 cursor-pointer border-blue-500/20 rounded-full shadow-none [&_svg]:size-5"
                    >
                        <UserCircleIcon />
                        Sign In
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    )
}
