"use client"

import React, { useCallback, useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import clsx from 'clsx'
import { FullConversationType } from '@/app/types'
import AvatarGroup from '@/components/AvatarGroup'
import { Button } from '@/components/ui/button'
import { MdOutlinePublic } from "react-icons/md";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LoadingDialog from '@/components/LoadingDialog'

interface PublicGroupDialog {
    publicGroups: FullConversationType
}

const PublicGroupDialog = ({ publicGroups }: PublicGroupDialog) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handlerAddToGroup = useCallback((conversationId: string) => {
        setLoading(true)
        axios.put(`/api/conversations/${conversationId}/add-group`)
            .then(() => {
                setLoading(false)
                toast.success("Você agora faz parte do grupo!😁")
                router.push(`/chat/${conversationId}`)
            })
            .catch(() => {
                setLoading(false)
                toast.error("Algo de errado em entrar no grupo😔")
            })
            .finally(() => setLoading(false))

    }, [publicGroups])

    return (
        <>
            {loading && <LoadingDialog />}
            <Dialog>
                <DialogTrigger>
                    <div
                        className={clsx(`
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
          `
                        )}
                    >
                        <AvatarGroup users={publicGroups.users} />

                        <div className="min-w-0 flex-1">
                            <div className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true" />
                                <div className="flex justify-between mb-1">
                                    <p className="flex gap-1 items-center text-md font-medium text-gray-900">
                                        {publicGroups.name}
                                    </p>
                                    <MdOutlinePublic />
                                </div>
                                <p className='text-xs text-left font-light text-gray-400'>
                                    {publicGroups.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='mb-10'>Quer entrar no grupo: <span className='text-main'>{publicGroups.name}</span>?</DialogTitle>
                        <div className="flex gap-3 items-center justify-end">
                            <DialogClose>
                                <Button className='bg-transparent text-black hover:text-main hover:bg-transparent ' >Cancelar</Button>
                            </DialogClose>
                            <DialogClose>
                                <Button className='bg-main hover:bg-main hover:scale-105' onClick={() => handlerAddToGroup(publicGroups.id)}>Entrar</Button>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default PublicGroupDialog