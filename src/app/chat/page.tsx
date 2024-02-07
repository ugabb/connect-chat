"use client"
import Empty from '@/components/Empty'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import useConversation from '../hooks/useConversation'
import clsx from 'clsx'

const Chat = async () => {
    const { isOpen } = useConversation();
    return (
        <div className={
            clsx(
                'lg:pl-80 h-full lg:block',
                isOpen ? 'block' : 'hidden'
            )
        }>
            <Empty />
        </div>
    )
}


export default Chat
