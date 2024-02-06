"use client"

import { signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { PiCircleNotch, PiSignOut } from 'react-icons/pi'
import { Button } from './ui/button'
import toast from 'react-hot-toast'

const SignOutButton = () => {
    const [isSignOut, setIsSignOut] = useState<boolean>(false)
    return (
        <Button className='h-full aspect-square bg-transparent border text-gray-400' onClick={async () => {
            setIsSignOut(true)
            try {
                await signOut();
            } catch (error) {
                toast.error("Houve um problema ao Desconectar")
            } finally {
                setIsSignOut(false)
            }
        }}>
            {isSignOut ? <PiCircleNotch size={25} className='animate-spin text-main' /> : <PiSignOut size={25} className='text-main' />}
        </Button>
    )
}

export default SignOutButton