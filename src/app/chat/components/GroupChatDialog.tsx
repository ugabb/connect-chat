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
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DialogClose } from '@radix-ui/react-dialog'
import { PiCircleNotch, PiX } from 'react-icons/pi'


interface GroupChatDialogProps {
    users: User[]
}

interface IGroup {
    name: string
    members: IMembers[];
}
interface IMembers {
    userId: string
}

const GroupChatDialog = ({ users }: GroupChatDialogProps) => {
    const router = useRouter()
    const [membersList, setMembersList] = useState<IMembers[]>([])
    const [loading, setloading] = useState(false)

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IGroup>({
        defaultValues: {
            name: "",
            members: []
        }
    })

    const onSubmit: SubmitHandler<IGroup> = (data: IGroup) => {
        setloading(true)
        data.members = membersList
        console.log("data to send", data)
        if (data.members.length < 2) {
            setloading(false)
            return toast.error("Selecione mais de 2 pessoas")
        } else {
            axios.post("/api/conversations", {
                ...data,
                isGroup: true
            })
                .then(() => {
                    toast.success("Grupo criado com sucesso!")
                    router.refresh()
                })
                .catch(() => toast.error("Algo deu errado em criar o grupo 😔"))
                .finally(() => setloading(false))
        }
    }

    const handleRemoveMember = (userId: string) => {
        const updatedMembers = membersList.filter((user) => user.userId !== userId)
        console.log(updatedMembers)
        return setMembersList(updatedMembers)
    }

    return (
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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 flex flex-col gap-y-8">
                            <label className='text-md text-slate-800'>
                                Nome do Grupo
                                <Input
                                    className='w-2/3'
                                    // disabled={loading}
                                    {...register("name", { required: "Grupo precisa de um nome" })}
                                />
                                {errors.name &&
                                    <span className='text-sm text-red-500'>
                                        {errors?.name?.message}
                                    </span>
                                }
                            </label>

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
                                    <SelectItem value="7892525hn2bnf2">Naruto</SelectItem>
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

            </DialogContent >
        </Dialog >

    )
}

export default GroupChatDialog