"use server"

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/siderbar/Sidebar'
import getConversations from '@/app/actions/getConversations'
import getUsers from '@/app/actions/getUsers'
import ConversationList from '@/app/chat/components/ConversationList'
import getCurrentUser from '../actions/getCurrentUser'
import Settings from './components/Settings'
interface LayoutProps {
    children: ReactNode
}

const layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect(`/login`)
    }

    const conversations = await getConversations()
    const users = await getUsers()
    const currentUser = await getCurrentUser()

    return (
        <Sidebar>
            <div className="h-full">
                <Settings currentUser={currentUser} />
                <div className="hidden lg:block">
                    <ConversationList initialConversations={conversations} title='Messages' users={users} />
                </div>
                {children}
            </div>
        </Sidebar>
    )
}

export default layout