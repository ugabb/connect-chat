"use client"

import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { MdOutlineGroupAdd } from "react-icons/md"
import { useRouter } from 'next/navigation'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DialogClose } from '@radix-ui/react-dialog'
import { PiCircleNotch, PiX } from 'react-icons/pi'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import LoadingDialog from '@/components/LoadingDialog'


interface GroupChatDialogProps {
    users: User[]
}

interface IGroup {
    name: string
    description: string
    members: IMembers[];
    isPublic: boolean
}
interface IMembers {
    userId: string
}

const GroupChatDialog = ({ users }: GroupChatDialogProps) => {
    const [membersList, setMembersList] = useState<IMembers[]>([])
    const [loading, setloading] = useState(false)

    const router = useRouter()

    const form = useForm<IGroup>({
        defaultValues: {
            name: "",
            members: [],
            isPublic: false
        }
    })

    const onSubmit: SubmitHandler<IGroup> = (data: IGroup) => {
        setloading(true)
        data.members = membersList
        // data.isPublic = data.isPublic === "on" ? true : false
        if (data.members.length < 2) {
            setloading(false)
            return toast.error("Selecione mais de 2 pessoas")
        } else {
            console.log("data to send", data)
            axios.post("/api/conversations", {
                ...data, //name and members
                isGroup: true
            })
                .then(() => {
                    toast.success("Grupo criado com sucesso!")
                    router.refresh()
                    form.reset()
                    setMembersList([])
                })
                .catch(() => {
                    toast.error("Algo deu errado em criar o grupo 😔")
                    setloading(false)
                })
                .finally(() => setloading(false))
        }
    }

    const handleRemoveMember = (userId: string) => {
        const updatedMembers = membersList.filter((user) => user.userId !== userId)
        console.log(updatedMembers)
        return setMembersList(updatedMembers)
    }

    return (
        <>
            {loading && <LoadingDialog />}
            <Dialog>
                <DialogTrigger className='flex justify-center items-center h-5 w-5 rounded-full'>
                    <MdOutlineGroupAdd size={20} />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar grupo</DialogTitle>
                        <DialogDescription>
                            Crie grupo com os seus amigos!
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 flex flex-col gap-y-8">
                                    <label className='text-md text-slate-800'>
                                        Nome do Grupo
                                        <Input
                                            className='w-2/3'
                                            disabled={loading}
                                            {...form.register("name", { required: "Grupo precisa de um nome" })}
                                        />
                                        {form.formState.errors.name &&
                                            <span className='text-sm text-red-500'>
                                                {form.formState.errors?.name?.message}
                                            </span>
                                        }
                                    </label>
                                    <label className='text-md text-slate-800'>
                                        Descrição do Grupo
                                        <Textarea
                                            disabled={loading}
                                            {...form.register("description", { min: 20 })}
                                        />
                                        {form.formState.errors.name &&
                                            <span className='text-sm text-red-500'>
                                                {form.formState.errors?.description?.message}
                                            </span>
                                        }
                                    </label>

                                    <div className="flex items-center space-x-2">
                                        <FormField
                                            control={form.control}
                                            name='isPublic'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Switch
                                                            onCheckedChange={field.onChange}
                                                            checked={field.value}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />


                                        <Label htmlFor="isPublic">Grupo Público</Label>

                                    </div>

                                    <Select onValueChange={(value) => {
                                        if (value !== "") setMembersList(prev => [...prev, { userId: value }])
                                    }}>
                                        <SelectTrigger className="w-2/3">
                                            <SelectValue placeholder="Selecione alguém" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem value={user.id}>{user.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className='flex flex-wrap gap-1'>
                                        {
                                            membersList.map((selected) => {
                                                const selectedUser = users.find((user) => user.id === selected.userId)

                                                if (selectedUser) {
                                                    return (
                                                        <Badge variant="default" className='w-fit bg-main flex gap-1 items-center'>
                                                            {selectedUser.name}
                                                            <PiX className='cursor-pointer' onClick={() => handleRemoveMember(selectedUser.id)} />
                                                        </Badge>
                                                    )
                                                }
                                                return null
                                            })
                                        }

                                    </div>


                                    {/* <Select
                            disabled={isLoading}
                            label="Members"
                            options={users.map((user) => ({
                                value: user.id,
                                label: user.name
                            }))}
                            onChange={(value) => setValue('members', value, {
                                shouldValidate: true
                            })}
                            value={members}
                        /> */}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <DialogClose>
                                    <Button
                                        disabled={loading}
                                        type="button"
                                        className='bg-transparent text-black hover:text-main hover:bg-transparent '
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                {loading
                                    ?
                                    <PiCircleNotch size={20} className='animate-spin text-main' />
                                    :
                                    <Button disabled={loading} type="submit" className='bg-main hover:bg-main hover:scale-105'>
                                        Create
                                    </Button>
                                }
                            </div>

                        </form>
                    </Form>

                </DialogContent >
            </Dialog >
        </>

    )
}

export default GroupChatDialog