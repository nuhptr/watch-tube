"use client"

import Link from "next/link"
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
    { title: "History", url: "/playlists/history", icon: HistoryIcon, auth: true },
    { title: "Liked Videos", url: "/playlists/liked", icon: ThumbsUpIcon, auth: true },
    { title: "All Playlist", url: "/playlists", icon: ListVideoIcon, auth: true },
]

export const PersonalSection = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
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
