"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { User } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import LoadingDialog from "@/components/LoadingDialog"
import Image from "next/image"


interface FriendSearchProps {
    users: User[]
    currentUser: User
}

export default function FriendSearch({ users, currentUser }: FriendSearchProps) {
    const [loading, setLoading] = useState(false)
    const form = useForm()
    // console.log(users)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        // console.log(data.user)
        // console.log({ currentUser })
        axios.post("/api/friends/request", {
            senderId: currentUser.id,
            recipientId: data.user
        }).then(() => {
            toast.success("Pedido enviado com sucesso!")
        }).catch((error) => {
            console.log(error)
            toast.error(`${error.response.statusText} 😔`)
            setLoading(false)
        }).finally(() => setLoading(false))
    }

    return (
        <>
            {loading && <LoadingDialog />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => {
                            return (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Enviar pedido de amizade</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? users.find(
                                                            (user) => user.id === field.value
                                                        )?.name
                                                        : "Selecione um usuário"}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                {/* <CommandInput
                                                    placeholder="Procurando usuários"
                                                    className="h-9"
                                                /> */}
                                                <CommandEmpty>Usuário não achado.</CommandEmpty>
                                                <CommandGroup>
                                                    {users.map((user) => (
                                                        <CommandItem
                                                            value={user.id}
                                                            key={user.id}
                                                            onSelect={() => {
                                                                form.setValue("user", user.id)
                                                            }}
                                                            className="flex gap-1 items-center cursor-pointer"
                                                        >
                                                            {user.image && <Image className="rounded-full h-6 w-6" src={user.image} width={100} height={100} alt="profile image" />}
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
        </>
    )
}
