"use client"

import React, { useCallback, useState } from 'react'

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
import { Conversation, GroupInviteRequest } from '@prisma/client'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface GroupInviteDropdown {
  groupInviteRequest: (GroupInviteRequest & {
    sender: User
    conversation: Conversation
  })[]
}

const GroupInviteDropdown = ({ groupInviteRequest }: GroupInviteDropdown) => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleAcceptRequest = useCallback((conversationId: string, senderId: string) => {
    setLoading(true)
    console.log(conversationId,senderId)
    axios.put(`/api/conversations/${conversationId}/add-group`
    , { senderId: senderId })
      .then(() => {
        toast.success("Pedido aceito com sucesso!")
        router.refresh()
      }).catch((error) => {
        toast.error("Erro ao aceitar o pedido😔")
        console.log(error)
        setLoading(false)
      }).finally(() => { setLoading(false) })
  }, [groupInviteRequest])

  const handleDeclineRequest = () => { }

  const statusLengthCal = () => {
    return groupInviteRequest.filter(status => (status.recipientId === status.recipientId) && (status.status === "pending")).length
  }
  const statusLength = statusLengthCal()

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

          {groupInviteRequest?.map((request) => {
            if (request?.status === "pending") {
              return (
                <DropdownMenuItem key={request.id} className='flex justify-between items-center gap-5'>
                  <div className="flex gap-1 items-center">
                    <p>{request?.conversation.name}</p>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <PiCheck size={20} className='text-emerald-500 hover:cursor-pointer' onClick={() => handleAcceptRequest(request?.conversationId, request.senderId)} />
                    <PiX size={20} className='text-main hover:cursor-pointer' onClick={handleDeclineRequest} />
                  </div>
                </DropdownMenuItem>
              )
            } else {
              return (
                <p className='text-sm p-5'>Sem convites de grupo 😔</p>
              )
            }
          })}
          {!groupInviteRequest.length && <p className='text-sm p-5'>Sem pedidos de amizade 😔</p>}
        </DropdownMenuContent>
      </DropdownMenu>


    </>


  )
}

export default GroupInviteDropdown