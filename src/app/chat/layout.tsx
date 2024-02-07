"use server"
import SignOutButton from '@/components/SignOutButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/siderbar/Sidebar'
interface LayoutProps {
    children: ReactNode
}

interface SideBarOption {
    id: number;
    name: string
    href: string
}

const sidebarOptions: SideBarOption[] = [
    {
        id: 1,
        name: "Chat",
        href: '/chat',
    },
    {
        id: 1,
        name: "Add friend",
        href: '/chat/add',
    },
]

const layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect(`/login`)
    }

    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}

export default layout