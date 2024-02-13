"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import LoadingDialog from '@/components/LoadingDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiCheck, PiEnvelopeSimple, PiX } from 'react-icons/pi'
import { Conversation, GroupInviteRequest, User } from '@prisma/client'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash'

interface GroupInviteDropdown {
  groupInviteRequest: (GroupInviteRequest & {
    conversation: Conversation
  })[]
  currentUser: User
}

interface GroupWithConversation {
  groupInviteRequest: GroupInviteRequest & {
    conversation: Conversation
  }
}

const GroupInviteDropdown = ({ groupInviteRequest, currentUser }: GroupInviteDropdown) => {
  const [groupRequestList, setGroupRequest] = useState<(GroupInviteRequest & {
    conversation: Conversation
  })[]>(groupInviteRequest)
  const [statusLength, setStatusLength] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const session = useSession()
  const router = useRouter()

  const handleAcceptRequest = useCallback((conversationId: string, senderId: string) => {
    setLoading(true)
    axios.put(`/api/conversations/${conversationId}/add-group`
      , { senderId: senderId })
      .then(() => {
        toast.success("Convite aceito com sucesso!")
        router.refresh()
      }).catch((error) => {
        toast.error("Erro ao aceitar o pedido😔")
        console.log(error)
        setLoading(false)
      }).finally(() => { setLoading(false) })
  }, [groupInviteRequest])

  const handleDeclineRequest = useCallback((conversationId: string, senderId: string) => {
    setLoading(true)
    console.log(conversationId, senderId)
    axios.post(`/api/conversations/${conversationId}/reject`
      , { senderId: senderId })
      .then(() => {
        toast.success("Pedido rejeitado com sucesso!")
        router.refresh()
      }).catch((error) => {
        toast.error("Erro ao rejeitar o pedido😔")
        console.log(error)
        setLoading(false)
      }).finally(() => { setLoading(false) })
  }, [groupInviteRequest])


  // pusher
  const pusherKey = useMemo(() => {
    return session?.data?.user.email
  }, [session?.data?.user.email])
  useEffect(() => {
    if (!pusherKey) return;
    console.log('pusher client', pusherKey)
    pusherClient.subscribe(pusherKey)

    const newHandler = (groupRequest: GroupInviteRequest) => {
      console.log('Received new group request:', groupRequest);
      setGroupRequest((current: any) => {
        if (find(current, { id: groupRequest.id })) {
          return current
        }

        return [groupRequest, ...current]
      })
    }

    // const newUpdate = (groupRequest: GroupInviteRequest) => {
    //   console.log('Received updated group request:', groupRequest);
    //   setStatusLength()
    // }

    const removeHandler = (removedRequest: any) => {
      setGroupRequest((current) => current.filter((request) => request.id !== removedRequest.id))
    }

    const acceptHandler = (acceptedRequest: GroupInviteRequest) => {
      console.log(acceptedRequest)
      // Atualize a lista após aceitar o pedido
      setGroupRequest((current) => current.filter(request => request.id !== acceptedRequest.id));
    };

    pusherClient.bind("groupRequest:new", newHandler)
    // pusherClient.bind("groupRequest:update", newUpdate)
    pusherClient.bind("groupRequest:remove", removeHandler)
    pusherClient.bind("groupRequest:accept", acceptHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("groupRequest:new", newHandler)
      pusherClient.unbind("groupRequest:remove", removeHandler)
      pusherClient.unbind("groupRequest:accept", acceptHandler)
    }
  }, [pusherKey])

  useEffect(() => {

    const statusLengthCal = () => {
      groupRequestList.map((g) => console.log(g))
      return groupRequestList?.filter(request => (request.recipientId === currentUser.id) && (request.status === "pending")).length
    }
    setStatusLength(statusLengthCal())
  }, [groupRequestList])


  return (
    <>
      {loading && <LoadingDialog />}
      <DropdownMenu>
        <DropdownMenuTrigger className='relative'>
          <PiEnvelopeSimple size={20} />
          <span
            className="
    absolute 
    rounded-full 
    bg-main 
    ring-2 
    ring-white 
    -top-2 
    -right-2
    h-4 
    w-4
    text-xs
    flex
    justify-center
    items-center
    text-white
  "
          >
            {statusLength}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Convites de Grupo</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {groupRequestList?.map((request) => {
            if (request?.status === "pending") {
              return (
                <DropdownMenuItem key={request.id} className='flex justify-between items-center gap-5'>
                  <div className="flex gap-1 items-center">
                    <p>{request?.conversation.name}</p>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <PiCheck size={20} className='text-emerald-500 hover:cursor-pointer' onClick={() => handleAcceptRequest(request?.conversationId, request.senderId)} />
                    <PiX size={20} className='text-main hover:cursor-pointer' onClick={() => handleDeclineRequest(request.conversationId, request.senderId)} />
                  </div>
                </DropdownMenuItem>
              )
            }
          })}
          {!groupInviteRequest?.length && <p className='text-sm p-5'>Sem convites de grupo eee😔</p>}
        </DropdownMenuContent>
      </DropdownMenu>


    </>


  )
}

export default GroupInviteDropdown