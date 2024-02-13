"use client"

import React, { useEffect, useMemo, useState } from 'react'

import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { Conversation } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import { format } from 'date-fns';
import AvatarProfile from '@/components/Avatar';
import ConfirmDialog from './ConfirmDialog';
import AvatarGroup from '@/components/AvatarGroup';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon } from "@radix-ui/react-icons"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingDialog from '@/components/LoadingDialog';

interface ProfileDrawerProps {
    data: Conversation & {
        users: User[]
    }
    userFriends: User[]
    currentUser: User
}

const GroupSettingsDialog = ({ data: conversations, userFriends, currentUser }: ProfileDrawerProps) => {

    const [loading, setLoading] = useState(false)

    const form = useForm()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        if (data.recipientId) {
            axios.post(`/api/conversations/${conversations.id}/group-invite-request`,
                {
                    recipientId: data.recipientId,
                    senderId: currentUser.id,
                    conversationId: conversations.id
                })
                .then(() => {
                    toast.success("Pedido enviado com sucesso!")
                    setLoading(false)
                }).catch((error) => {
                    toast.error("Erro ao mandar o convite😔")
                    setLoading(false)
                }).finally(() => setLoading(false))
        } else {
            toast.error("Esqueceu de escolher alguém🤷‍♂️")
            setLoading(false)
        };
    }

    const otherUser = useOtherUser(conversations);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), "PP")
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return conversations.name || otherUser.name
    }, [conversations.name, otherUser.name])


    const statusText = useMemo(() => {
        if (conversations.isGroup) {
            return `${conversations.users.length} membros`
        }
        return "Active"
    }, [conversations])


    return (
        <>
            {loading && <LoadingDialog />}

            <Dialog>
                <DialogTrigger>
                    <HiEllipsisHorizontal
                        size={32}
                        className="
          text-main
          cursor-pointer
          hover:text-main/50
          transition
        "
                    />
                </DialogTrigger>
                <DialogContent className='flex flex-col justify-center items-center'>
                    <div className="md:w-[400px]">
                        <DialogHeader className='border-b'>
                            <DialogTitle className='text-main'>Chat Settings</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col justify-center items-center gap-6 mt-10">
                            <div className="flex flex-col justify-center items-center gap-1">
                                {conversations.isGroup ?
                                    <AvatarGroup users={conversations.users} />
                                    :
                                    <AvatarProfile user={otherUser} />
                                }
                                <p className='text-xl font-semibold'>{title}</p>
                                {conversations.description &&  <p className='text-sm font-ligth text-gray-400'>{conversations.description}</p>}
                                <p className='text-xs text-gray-400'>{statusText}</p>
                                <p className='text-xs text-gray-400'>{conversations.isPublic ? "Público" : "Privado"}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-1">
                                <ConfirmDialog />
                                <p className='text-sm text-gray-400'>Excluir Chat</p>
                            </div>
                        </div>
                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {conversations.isGroup && (
                                <div>
                                    <dt
                                        className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                    >
                                        Emails
                                    </dt>
                                    <dd
                                        className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                                    >
                                        {conversations.users.map((user) => user.email).join(', ')}
                                    </dd>
                                </div>
                            )}
                            {!conversations.isGroup && (
                                <div>
                                    <dt
                                        className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                    >
                                        Email
                                    </dt>
                                    <dd
                                        className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                                    >
                                        {otherUser.email}
                                    </dd>
                                </div>
                            )}
                            {!conversations.isGroup && (
                                <>
                                    <hr />
                                    <div>
                                        <dt
                                            className="
                                    text-sm 
                                    font-medium 
                                    text-gray-500 
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  "
                                        >
                                            Joined
                                        </dt>
                                        <dd
                                            className="
                                    mt-1 
                                    text-sm 
                                    text-gray-900 
                                    sm:col-span-2
                                  "
                                        >
                                            <time dateTime={joinedDate}>
                                                {joinedDate}
                                            </time>
                                        </dd>
                                    </div>
                                </>
                            )}
                        </dl>
                    </div>
                    <div className="flex flex-col gap-3">
                        {(conversations.isGroup &&  !conversations.isPublic) &&
                            <Form {...form}>
                                <h1 className='font-medium'>Convide mais amigos para o grupo!😁</h1>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="recipientId"
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex flex-col items-center">
                                                    <FormLabel>Enviar pedido de amizade</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? userFriends.find(
                                                                            (user) => user.id === field.value
                                                                        )?.name
                                                                        : "Selecione um usuário"}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput
                                                                    placeholder="Procurando usuários"
                                                                    className="h-9"
                                                                />
                                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {userFriends.map((user) => (
                                                                        <CommandItem
                                                                            value={user.id}
                                                                            key={user.id}
                                                                            onSelect={() => {
                                                                                form.setValue("recipientId", user.id)
                                                                            }}
                                                                        >
                                                                            {user.name}
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    user.id === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }
                                        }
                                    />
                                    <Button type="submit" className='rounded-md p-2 bg-main hover:bg-main/50'>
                                        Enviar pedido
                                    </Button>
                                </form>
                            </Form>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default GroupSettingsDialog