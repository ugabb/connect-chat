"use client"

import useOtherUser from '@/app/hooks/useOtherUser'
import AvatarProfile from '@/components/Avatar'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo } from 'react'

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header = ({ conversation }: HeaderProps) => {
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
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
                >
                    <HiChevronLeft size={32} />
                </Link>
                {/* {conversation.isGroup ? (
                    <AvatarGroup users={conversation.users} />
                ) : (
                    <Avatar user={otherUser} />
                )} */}
                <AvatarProfile user={otherUser} />
                <div className="flex flex-col">
                    <div>{conversation.name || otherUser.name}</div>
                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal
                size={32}
                className="
          text-main
          cursor-pointer
          hover:text-main/50
          transition
        "
            />
        </div>
    )
}

export default Header