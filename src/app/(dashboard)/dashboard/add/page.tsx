
"use client"
import { Input } from '@/components/ui/input'
import { addFriendValidator } from '@/lib/validations/add-friend'
import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

type FormData = z.infer<typeof addFriendValidator>

const Add = () => {
    const [showSuccess, setShowSuccess] = useState<boolean>(false)

    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator)
    })

    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator.parse({ email })
            await axios.post('/api/friends/add', { email: validatedEmail })

            setShowSuccess(true)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError('email', {
                    message: error.message
                })
                return
            }

            if (error instanceof AxiosError) {
                setError('email', { message: error.response?.data })
                return
            }
            setError('email', { message: "Something went wrong" })

            return
        }
    }

    const onSubmit = (data: FormData) => {
        addFriend(data.email)
    }

    return (
        <main className='p-5'>
            <h1 className='font-bold text-5xl mb-8'>add a friend</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='max-w-sm space-y-5'>
                <label htmlFor="email">
                    Add friend by email
                    <Input {...register("email")} type='email' placeholder='Enter an email' />
                </label>

                <Button type='submit'>Add</Button>
                <p className='text-red-500'>{errors.email?.message}</p>

                {showSuccess && (
                    <p className='text-emerald-500'>Pedido de amizade Enviado!</p>
                )}
            </form>
        </main>
    )
}

export default Add