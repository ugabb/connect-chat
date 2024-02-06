"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

import { signIn } from 'next-auth/react'

import { } from "react-icons";
import toast from 'react-hot-toast';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false)

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
  return (
    <div>
      <Button onClick={loginWithGoogle}>Google</Button>
      {loading && <p>Loading</p>}
    </div>
  )
}

export default Login