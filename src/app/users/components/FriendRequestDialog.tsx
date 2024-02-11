"use client"

import React from 'react'

import { PiUsers, PiCheck, PiX } from "react-icons/pi"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const FriendRequestDialog = () => {
    return (
        <div >
            <DropdownMenu>
                <DropdownMenuTrigger className='relative'>
                    <PiUsers size={20} />
                    <span
                        className="
            absolute 
            rounded-full 
            bg-main 
            ring-2 
            ring-white 
            -top-2 
            -right-2
            h-4 
            w-4
            text-xs
            flex
            justify-center
            items-center
            text-white
          "
                    >
                        3
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Pedidos de Amizade</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex justify-between items-center gap-5'>
                        Gabriel Silva Barros Damazio
                        <div className="flex justify-center items-center gap-1">
                            <PiCheck size={20}  className='text-emerald-500'/>
                            <PiX size={20}  className='text-main'/>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex justify-between items-center gap-5'>
                        Gabriel Silva Barros Damazio
                        <div className="flex justify-center items-center gap-1">
                            <PiCheck size={20}  className='text-emerald-500'/>
                            <PiX size={20}  className='text-main'/>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex justify-between items-center gap-5'>
                        Gabriel Silva Barros Damazio
                        <div className="flex justify-center items-center gap-1">
                            <PiCheck size={20}  className='text-emerald-500'/>
                            <PiX size={20}  className='text-main'/>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>




        </div>
    )
}

export default FriendRequestDialog