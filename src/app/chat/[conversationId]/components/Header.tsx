"use client"

import useOtherUser from '@/app/hooks/useOtherUser'
import AvatarProfile from '@/components/Avatar'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer'
import AvatarGroup from '@/components/AvatarGroup'

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
    userFriends: User[]
    currentUser: User
}

const Header = ({ conversation, userFriends,currentUser }: HeaderProps) => {
    const otherUser = useOtherUser(conversation)

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return 'Active'
    }, [conversation])

    return (
        <div
            className="
          bg-white 
          w-full 
          flex 
          border-b-[1px] 
          sm:px-4 
          py-3 
          px-4 
          lg:px-6 
          justify-between 
          items-center 
          shadow-sm
        "
        >
            <div className="flex gap-3 items-center">
                <Link
                    href="/chat"
                    className="
            lg:hidden 
            block 
            text-main
            hover:opacity-50
            transition 
            cursor-pointer
          "
                >
                    <HiChevronLeft size={32} />
                </Link>
                {conversation.isGroup ? (
                    <AvatarGroup users={conversation.users} />
                ) : (
                    <AvatarProfile user={otherUser} />
                )}
                <div className="flex flex-col">
                    <div>{conversation.name || otherUser.name}</div>
                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <ProfileDrawer data={conversation} userFriends={userFriends} currentUser={currentUser} />
        </div>
    )
}

export default Header