"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { TfiExchangeVertical } from 'react-icons/tfi'


interface SettingsProps {
    currentUser: User;
}
const Settings = ({ currentUser }: SettingsProps) => {


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
                router.push("/chat")
                router.refresh()
            })
            .catch(() => toast.error("Alguma coisa deu errado 😔"))
            .finally(() => {
                setloading(false)
            })
    }

    return (
        <div className='flex flex-col max-w-2xl mx-auto p-10 lg:p-5 lg:ml-80 '   >
            <h1 className='text-3xl font-medium text-slate-800'>Configurações de Perfil</h1>

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
                                        width="800"
                                        height="800"
                                        className="rounded-full object-cover w-[100px] h-[100px]"
                                        src={image || currentUser?.image}
                                        alt="Avatar"
                                    />

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

                    <Button
                        className='bg-transparent text-gray-900 font-bold shadow-none  hover:text-main hover:bg-transparent transition ease-in-out'
                        type='button'
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        className='bg-transparent text-white font-bold shadow-none bg-main hover:shadow-md hover:bg-main hover:opacity-80 hover:scale-105 transition-all'
                        disabled={loading}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Settings