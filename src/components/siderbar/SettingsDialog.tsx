"use client"

import React, { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AvatarProfile from '../Avatar';
import { useRouter } from 'next/navigation';

import { signOut } from 'next-auth/react';
import { PiSignOut } from 'react-icons/pi';
import Link from 'next/link';
import { User } from '@prisma/client';

interface SettingsProps {
    currentUser: User
}


const SettingsDropdown = ({ currentUser }: SettingsProps) => {
    const router = useRouter()

    return (
        <DropdownMenu >
            <DropdownMenuTrigger>
                <div className="cursor-pointer hover:opacity-75  hover:text-main transition">
                    <AvatarProfile user={currentUser} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='ml-4'>
                <DropdownMenuLabel className='text-md'>{currentUser?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-md text-gray-60'>
                    <Link href={"/settings"}>
                        Configuração de Perfil
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex items-center gap-1 text-md text-gray-600 cursor-pointer' onClick={() => signOut()}>
                    Sair
                    <PiSignOut size={20} className='text-main' />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default SettingsDropdown