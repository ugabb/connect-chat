"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

import { signIn, signOut } from 'next-auth/react'

import { FaGoogle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { userCredentialsValidation } from '@/lib/validations/user-credentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof userCredentialsValidation>

const Register = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(userCredentialsValidation)
    })

    const loginWithGoogle = async () => {
        try {
            setLoading(true)
            await signIn('google')
        } catch (error) {
            toast.error("Alguma coisa deu errado com o seu login ☹")
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = (data: any) => {
        console.log(data)
        axios.post("/api/register", data)
    }

    return (
        <div className='flex flex-col justify-center items-center mx-auto p-5 max-w-sm'>
            <h1 className='text-xl font-bold text-main'>Sign In to Chat!</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <label className='text-sm'>
                    Nome
                    <Input className='w-full' {...register("name")} type='text' placeholder='Gabriel' />
                </label>
                <label className='text-sm'>
                    Email
                    <Input className='w-full' {...register("email")} type='email' placeholder='gabriel@mail.com' />
                </label>
                <label className='text-sm'>
                    Password
                    <Input className='w-full' {...register("password")} type='password' placeholder='Gabriel' />
                </label>
                <div className="flex items-center justify-center gap-3">
                    <Button className='flex gap-1 bg-transparent border border-main text-main hover:text-white hover:bg-main' type='submit'>Sign Up</Button>
                    <Button className='flex gap-1 bg-transparent border border-main text-main hover:text-white hover:bg-main' onClick={loginWithGoogle}><FaGoogle /></Button>
                    {loading && <p>Loading</p>}
                    <Button className='bg-transparent border border-main text-main hover:text-white hover:bg-main' onClick={() => signOut()}>Sign out</Button>
                </div>
            </form>
        </div>
    )
}

export default Register