"use client"

import useConversation from '@/app/hooks/useConversation';
import { FullConversationType } from '@/app/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import ConversationBox from './ConversationBox';

import GroupChatDialog from './GroupChatDialog';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';

interface ConversationListProps {
  initialConversations: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList = ({ initialConversations, users, title }: ConversationListProps) => {
  const session = useSession()

  const [conversations, setConversations] = useState(initialConversations)

  const router = useRouter();

  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(() => {
    return session?.data?.user.email
  }, [session?.data?.user.email])

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    pusherClient.bind("conversation:new", newHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler)
    }
  }, [pusherKey])


  return (
    <aside className={clsx(`
    fixed 
    inset-y-0 
    pb-20
    lg:pb-0
    lg:left-20 
    lg:w-80 
    lg:block
    overflow-y-auto 
    border-r 
    border-gray-200 
  `, isOpen ? 'hidden' : 'block w-full left-0')}>
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Messages
          </div>
          <div
            className="
            rounded-full 
            p-2 
            bg-gray-100 
            text-gray-600 
            cursor-pointer 
            hover:opacity-75 
            transition
          "
          >
            <GroupChatDialog users={users} />
          </div>
        </div>
        {conversations.map((conv) => (
          <ConversationBox
            key={conv.id}
            data={conv}
            selected={conversationId === conv.id}
          />
        ))}
      </div>
    </aside>
  )
}

export default ConversationList