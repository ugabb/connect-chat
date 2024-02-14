"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

import { signIn, signOut } from 'next-auth/react'

import { FaGoogle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { userCredentialsValidation } from '@/lib/validations/user-credentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingDialog from '@/components/LoadingDialog';

type FormData = z.infer<typeof userCredentialsValidation>

const Register = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(userCredentialsValidation)
    })

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        setLoading(true)
        const credentialsValidated = userCredentialsValidation.parse(data)
        if (!credentialsValidated.name || !credentialsValidated.email || !credentialsValidated.password) {
            setLoading(false)
            return toast.error("Erro com seus dados. Verifique e tente novamente!")
        } else {

            try {
                const response = await axios.post('/api/register', data)
                if (response.statusText === "OK") {
                    toast.success("Registrado com sucesso.")
                    router.push("/login")
                }
            } catch (error) {
                toast.error(`Erro ao registrar usuário: ${error.response.data.error}`);
                setLoading(false)
            } finally {
                setLoading(false)

            }
        }
    }

    return (
        <>
            {loading && <LoadingDialog />}
            <div className='flex flex-col justify-center items-center mx-auto p-5 max-w-sm space-y-5'>
                <h1 className='text-xl font-bold text-main'>Sign In to Chat!</h1>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <label className='text-sm'>
                        Nome
                        <Input className='w-full' {...register("name", { required: true })} type='text' placeholder='Gabriel Barros' />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </label>
                    <label className='text-sm'>
                        Email
                        <Input className='w-full' {...register("email", { required: true })} type='email' placeholder='gabriel@mail.com' />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </label>
                    <label className='text-sm'>
                        Password
                        <Input className='w-full' {...register("password", { required: true, min: 6 })} type='password' placeholder='Password' />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </label>
                    <div className="flex items-center justify-center gap-3">
                        <Button className='flex gap-1 bg-transparent border border-main text-main hover:text-white hover:bg-main' type='submit'>Sign Up</Button>
                    </div>
                </form>

                <p>Já tem uma conta? <Link href={"/login"} className='text-main font-semibold hover:underline'>Entra na sua conta!</Link> </p>
            </div>
        </>
    )
}

export default Register