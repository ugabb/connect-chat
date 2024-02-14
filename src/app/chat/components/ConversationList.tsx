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
import PublicGroupDialog from './PublicGroupDialog';
import { GroupInviteRequest } from '@prisma/client';
import GroupInviteDropdown from './GroupInviteDronpdown';

interface ConversationListProps {
  initialConversations: FullConversationType[];
  publicGroups: FullConversationType[];
  users: User[];
  currentUser: User;
  title?: string;
  groupInviteRequest: GroupInviteRequest[]
}

const ConversationList = ({ initialConversations, users, title, currentUser, publicGroups, groupInviteRequest }: ConversationListProps) => {
  const session = useSession()
  const [conversations, setConversations] = useState(initialConversations)

  const router = useRouter();

  const { conversationId, isOpen } = useConversation()

  const pusherKey = useMemo(() => {
    return session?.data?.user.email
  }, [session?.data?.user.email])

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey) // email

    // automaticamente renderizar uma conversa nova iniciada na lista de conversas
    const newHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    // atualiza a ultima mensagem para aparecer na determinada conversation box, como um preview da ultima mensagem
    const updateHandler = (conversation: FullConversationType) => {
      setConversations((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation
      }));

    }

    const removeHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        return [...current.filter((conv) => conv.id !== conversation.id)]
      })

      if (conversationId === conversation.id) {
        router.push('/chat')
      }
    }

    const groupUpdateHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current
        }

        return [conversation, ...current]
      })
    }

    pusherClient.bind("conversation:new", newHandler)
    pusherClient.bind("conversation:update", updateHandler)
    pusherClient.bind("conversation:remove", removeHandler)
    pusherClient.bind("groupRequest:add", groupUpdateHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler)
      pusherClient.unbind("conversation:update", newHandler)
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
      <div className="px-5 flex flex-col">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">
            Mensagens
          </div>
          <div className="flex gap-3 items-center">
            <div
              className="
              flex
              justify-center
              items-center
              h-8
              w-8
            rounded-full 
            p-2 
            bg-gray-100 
            text-gray-600 
            cursor-pointer 
            hover:opacity-75 
            transition
          "
            >
              <GroupInviteDropdown currentUser={currentUser} groupInviteRequest={groupInviteRequest} />
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
        </div>
        {conversations.map((conv) => (
          <ConversationBox
            key={conv.id}
            data={conv}
            selected={conversationId === conv.id}
          />
        ))}
        {publicGroups?.map((group) => (
          <PublicGroupDialog key={group.id} publicGroups={group} />
        ))}
      </div>
    </aside>
  )
}

export default ConversationList