"use client"

import React, { useState } from 'react'

//dialog
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { User } from '@prisma/client'
import AvatarProfile from '../Avatar';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import { TfiExchangeVertical } from "react-icons/tfi";
import UploadImage from '../UploadImage';


interface SettingsProps {
    currentUser: User;
}

const SettingsDialog = ({ currentUser }: SettingsProps) => {
    const [loading, setloading] = useState<boolean>(false)
    const router = useRouter()

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })
    // image upload
    const image = watch("image")
    const handleUpload = (result: any) => {
        // valor vindo do cloudinary
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setloading(true)
        axios.post("/api/settings", data)
            .then(() => {
                router.refresh()
            })
            .catch(() => toast.error("Alguma coisa deu errado 😔"))
            .finally(() => setloading(false))
    }


    return (
        <Dialog>
            <DialogTrigger>
                <div className="cursor-pointer hover:opacity-75  hover:text-main transition">
                    <AvatarProfile user={currentUser} />
                </div>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Configuração de Perfil</DialogTitle>
                    <DialogDescription className="mt-1 text-sm leading-6 text-gray-600">Edite suas informações!</DialogDescription>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-5 flex flex-col gap-y-8">
                                    <div>
                                        <label
                                            htmlFor="photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Photo
                                        </label>
                                        <div className="mt-2 flex flex-col items-center gap-x-3  z-[100] relative">
                                            <Image
                                                width="100"
                                                height="100"
                                                className="rounded-full"
                                                src={image || currentUser?.image}
                                                alt="Avatar"
                                            />
                                            <DialogClose>
                                                <CldUploadButton
                                                    options={{ maxFiles: 1 }}
                                                    onUpload={handleUpload}
                                                    uploadPreset='fintalk-chat'
                                                >
                                                    <Button
                                                        className='flex gap-1 items-center bg-transparent text-gray-900 shadow-none hover:text-main hover:bg-transparent transition ease-in-out text-sm font-medium leading-6'
                                                        disabled={loading}
                                                        type="button"
                                                    >
                                                        Change
                                                        <TfiExchangeVertical size={20} />
                                                    </Button>
                                                </CldUploadButton>
                                            </DialogClose>
                                        </div>
                                    </div>
                                    <label className='text-sm font-medium leading-6'>
                                        Nome
                                        <Input
                                            disabled={loading}
                                            {...register("name")}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <DialogClose>
                                <Button
                                    className='bg-transparent text-gray-900 font-bold shadow-none  hover:text-main hover:bg-transparent transition ease-in-out'
                                    type='button'
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose>
                                <Button
                                    className='bg-transparent text-white font-bold shadow-none bg-main hover:shadow-md hover:bg-main hover:opacity-80 hover:scale-105 transition-all'
                                    disabled={loading}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </DialogClose>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default SettingsDialog