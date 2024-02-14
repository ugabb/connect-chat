"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { PiUsers, PiCheck, PiX } from "react-icons/pi"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FriendRequest, User } from '@prisma/client'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LoadingDialog from '@/components/LoadingDialog'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/lib/pusher'
import { find } from 'lodash'

interface FriendRequestDialogProps {
    friendRequest: FriendRequest[]
    currentUser: User
}

interface FriendRequestWithSender extends FriendRequest {
    sender: {
        id: string,
        name: string,
        image: string,
    };
}

const FriendRequestDialog = ({ friendRequest, currentUser }: FriendRequestDialogProps) => {
    const [friendRequestList, setFriendRequestList] = useState<FriendRequest[]>(friendRequest)


    const [loading, setLoading] = useState<boolean>(false)
    const [statusLength, setStatusLength] = useState<number>(0)

    const router = useRouter()

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

    // pusher
    const pusherKey = useMemo(() => {
        return currentUser?.id
    }, [currentUser?.id])

    useEffect(() => {
        if (!pusherKey) return;
        console.log('pusher client', pusherKey)
        pusherClient.subscribe(pusherKey)

        const newHandler = (friendReq: FriendRequest) => {
            console.log('Received new friend request:', friendReq);
            setFriendRequestList((current: any) => {
                if (find(current, { id: friendReq.id })) {
                    return current
                }

                return [friendReq, ...current]
            })
        }

        const acceptHandler = (acceptedRequest: FriendRequest) => {
            console.log(acceptedRequest)
            // Atualize a lista após aceitar o pedido
            setFriendRequestList((current) => current.filter(request => request.id !== acceptedRequest.id));
        };

        const deniedHandler = (deniedRequest: FriendRequest) => {
            // Atualize a lista após aceitar o pedido
            setFriendRequestList((current) => current.filter(request => request.id !== deniedRequest.id));
        }

        pusherClient.bind("friendRequest:new", newHandler)
        pusherClient.bind("friendRequest:accept", acceptHandler)
        pusherClient.bind("friendRequest:denied", deniedHandler)


        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("friendRequest:new", newHandler)
            pusherClient.unbind("friendRequest:accept", acceptHandler)
            pusherClient.unbind("friendRequest:denied", deniedHandler)
        }
    }, [pusherKey])


    useEffect(() => {
        const statusLengthCal = () => {
            return friendRequestList?.filter(request => (request?.recipientId === currentUser?.id) && (request?.status === "pending")).length
        }
        setStatusLength(statusLengthCal())
    }, [friendRequestList])

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

                        {friendRequestList?.filter((request: any) => request?.status === "pending" && request?.recipientId === currentUser?.id).map((request) => (
                            <DropdownMenuItem key={request?.id} className='flex justify-between items-center gap-5'>
                                <div className="flex gap-1 items-center">
                                    {/* @ts-ignore */}
                                    {request?.sender?.image && <Image className='h-8 w-8 rounded-full object-cover' src={request?.sender?.image} width={100} height={100} alt='profile image' />}

                                    {/* @ts-ignore */}
                                    <p>{request?.sender?.name}</p>
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <PiCheck size={20} className='text-emerald-500 hover:cursor-pointer' onClick={() => handleAcceptRequest(request?.senderId)} />
                                    <PiX size={20} className='text-main hover:cursor-pointer' onClick={() => handleDeclineRequest(request?.senderId)} />
                                </div>
                            </DropdownMenuItem>
                        ))}

                        {friendRequestList?.filter(request => request?.status === "pending" && request?.recipientId === currentUser?.id).length === 0 && (
                            <p className='text-sm p-5'>Sem pedidos de amizade pendentes 😔</p>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>




            </div>
        </>
    )
}

export default FriendRequestDialog