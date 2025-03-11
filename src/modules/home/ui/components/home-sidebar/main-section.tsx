"use client"

import Link from "next/link"
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    { title: "Home", url: "/", icon: HomeIcon },
    { title: "Subscription", url: "/feed/subscriptions", icon: PlaySquareIcon, auth: true },
    { title: "Trending", url: "/feed/tranding", icon: FlameIcon },
]

export const MainSection = () => {
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={false} // TODO: change to look at current pathname
                                onClick={() => {}} // TODO: do something when click
                                className="h-fit"
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
