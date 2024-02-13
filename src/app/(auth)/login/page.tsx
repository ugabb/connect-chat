"use client"

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGoogle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { userCredentialsValidation, userCredentialsValidationLogin } from '@/lib/validations/user-credentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import { PiCircleNotch } from 'react-icons/pi';
import Link from 'next/link';
import LoadingDialog from '@/components/LoadingDialog';

type FormData = z.infer<typeof userCredentialsValidationLogin>

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/chat')
    }
  }, [session?.status, router]);


  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(userCredentialsValidationLogin)
  })

  const loginWithGoogle = () => {
    try {
      setLoading(true)
      signIn('google', { redirect: false }).then((callback) => {
        if (callback?.ok) {
          toast.success(`Bem vindo!`);
          router.push("/chat")
        }
        if (callback?.error) {
          toast.error(`Erro ao conect com o Google!`);
        }
      }).finally(() => setLoading(false))
    } catch (error) {
      toast.error("Alguma coisa deu errado com o seu login ☹")
    } finally {
      setLoading(false)
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    setLoading(true)
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(() => {
      router.push("/chat")
      toast.success(`Bem vindo!`);
    }).catch((error) => {
      console.log(error)
      toast.error(`Erro ao logar usuário: ${error}`);
      setLoading(false)
    })
      .finally(() => setLoading(false));


  }


  return (
    <>
      {loading && <LoadingDialog />}
      <div className='flex flex-col justify-center items-center mx-auto p-5 max-w-sm space-y-5'>
        <h1 className='text-xl font-bold text-main'>Sign In to Chat!</h1>

        <form onSubmit={handleSubmit(onSubmit)} id="loginForm" className='flex flex-col gap-5'>
          <label className='text-sm'>
            Email
            <Input className='w-full' {...register("email", { required: true })} type='email' placeholder='gabriel@mail.com' />
          </label>
          <label className='text-sm'>
            Password
            <Input className='w-full' {...register("password", { required: true })} type='password' placeholder='password' />
          </label>
          <div className="flex items-center justify-center gap-3">
            <Button className='flex gap-1 bg-transparent border border-main text-main hover:text-white hover:bg-main' type='submit' form='loginForm'>Sign In</Button>
            <Button className='flex gap-1 bg-transparent border border-main text-main hover:text-white hover:bg-main' type='button' onClick={loginWithGoogle}>
              {loading ? <PiCircleNotch className='animate-spin text-main' /> : <FaGoogle />}
            </Button>
          </div>
        </form>

        <p>Não tem uma conta? <Link href={"/register"} className='text-main font-semibold hover:underline'>Crie uma conta!</Link> </p>
      </div>
    </>
  )



}

export default Login