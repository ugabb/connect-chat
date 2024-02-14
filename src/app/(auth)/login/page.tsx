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
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

type FormData = z.infer<typeof userCredentialsValidationLogin>

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter();
  const session = useSession();
  // useEffect(() => {
  //   if (session?.status === 'authenticated') {
  //     router.push('/chat')
  //   }
  // }, [session?.status, router]);


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
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/chat")
        toast.success(`Bem vindo!`);
      } else if (callback?.error) {
        toast.error(callback.error);
        console.log(callback.error)
      }
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
      <div className='flex flex-col lg:flex-row justify-center items-center mx-auto space-y-5'>

        <div className="hidden lg:flex flex-col justify-center items-center gap-3 w-full lg:w-1/2 lg:h-screen bg-gradient-to-r from-main to-rose-400">
          <h1 className='text-6xl font-bold text-white mb-10'>Fintalk Chat</h1>
          <Image className=' hidden lg:block mb-10' src={"/undraw_share_opinion_re_4qk7.svg"} width={250} height={250} alt='chat svg' />
          <p className='text-white text-lg'>"Converse, Conecte, Divirta-se!"</p>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center w-full lg:w-1/2 ">
          <Image className='lg:hidden mb-10' src={"/undraw_share_opinion_re_4qk7.svg"} width={250} height={250} alt='chat svg' />

          <h1 className='text-xl lg:text-3xl mb-10 font-bold text-main'>Sign In to Chat!</h1>

          <form onSubmit={handleSubmit(onSubmit)} id="loginForm" className='flex flex-col gap-5'>
            <label className='text-sm'>
              Email
              <Input className='w-full' {...register("email", { required: true })} type='email' placeholder='gabriel@mail.com' />
            </label>
            <label className='text-sm'>
              Password
              <Input className='w-full' {...register("password", { required: true })} type='password' placeholder='password' />
            </label>
            <div className="flex flex-col items-center justify-center gap-5">
            <Button className='flex tracking-widest w-full gap-1 bg-transparent  bg-main font-bold text-white transition-all hover:text-main hover:border hover:border-main hover:bg-transparent' type='submit'>Login</Button>

              <p className='text-sm font-light text-gray-500'>Não tem uma conta? <Link href={"/register"} className='text-main font-semibold hover:underline'>Crie uma conta!</Link> </p>
              <Separator />
              <p className='text-sm font-light text-gray-500'>Ou conecte com o Google</p>
              <Button className='flex gap-1 bg-transparent border border-main text-main hover:text-white hover:bg-main' type='button' onClick={loginWithGoogle}>
                {loading ? <PiCircleNotch className='animate-spin text-main' /> : <FaGoogle />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )



}

export default Login