"use client"

import React, { useCallback, useState } from 'react'

import { PiUsers, PiCheck, PiX } from "react-icons/pi"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FriendRequest } from '@prisma/client'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LoadingDialog from '@/components/LoadingDialog'

interface FriendRequestDialogProps {
    friendRequest: FriendRequest[]
    currentUser: User
}

const FriendRequestDialog = ({ friendRequest, currentUser }: FriendRequestDialogProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const statusLengthCal = () => {
        return friendRequest.filter(status => (status.recipientId === currentUser.id) && (status.status === "pending")).length
    }
    const statusLength = statusLengthCal()

    const handleAcceptRequest = useCallback((userId: string) => {
        setLoading(true)
        console.log(userId)
        axios.post("/api/friends/add", { userId })
            .then(() => {
                toast.success("Pedido aceito com sucesso!")
                router.refresh()
            }).catch((error) => {
                toast.error("Erro ao aceitar o pedido😔")
                console.log(error)
                setLoading(false)
            }).finally(() => { setLoading(false) })
    }, [friendRequest])


    const handleDeclineRequest = useCallback((userId: string) => {
        setLoading(true)
        axios.post("/api/friends/reject", { userId })
            .then(() => {
                toast.success("Pedido rejeitado com sucesso!")
                router.refresh()
            }).catch((error) => {
                toast.error("Erro ao rejeitar o pedido😔")
                console.log(error)
                setLoading(false)
            }).finally(() => { setLoading(false) })
    }, [friendRequest])

    return (
        <>
            {loading && <LoadingDialog />}
            <div >
                <DropdownMenu>
                    <DropdownMenuTrigger className='relative'>
                        <PiUsers size={20} />
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
                        <DropdownMenuLabel>Pedidos de Amizade</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {friendRequest?.map((request) => {
                            if (request.status === "pending") {
                                return (
                                    <DropdownMenuItem key={request.id} className='flex justify-between items-center gap-5'>
                                        <div className="flex gap-1 items-center">
                                            <Image className='h-8 w-8 rounded-full' src={request?.sender.image} width={100} height={100} alt='profile image' />
                                            <p>{request?.sender.name}</p>
                                        </div>
                                        <div className="flex justify-center items-center gap-1">
                                            <PiCheck size={20} className='text-emerald-500 hover:cursor-pointer' onClick={() => handleAcceptRequest(request.senderId)} />
                                            <PiX size={20} className='text-main hover:cursor-pointer' onClick={handleDeclineRequest} />
                                        </div>
                                    </DropdownMenuItem>
                                )
                            }else{
                                return (
                                    <p className='text-sm p-5'>Sem pedidos de amizade 😔</p>
                                )
                            }
                        })}
                        {!friendRequest.length && <p className='text-sm p-5'>Sem pedidos de amizade 😔</p>}
                    </DropdownMenuContent>
                </DropdownMenu>




            </div>
        </>
    )
}

export default FriendRequestDialog