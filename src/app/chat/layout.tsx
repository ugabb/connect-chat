"use server"
import SignOutButton from '@/components/SignOutButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/siderbar/Sidebar'
import ConversationList from './components/ConversationList'
import getConversations from '../actions/getConversations'
interface LayoutProps {
    children: ReactNode
}

const layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect(`/login`)
    }

    const conversations = await getConversations()

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialConversations={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}

export default layout