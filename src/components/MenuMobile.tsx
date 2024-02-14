

import React from 'react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { PiList } from 'react-icons/pi'
import Link from 'next/link'


const MenuMobile = () => {
    return (
        <Drawer direction='right'>
            <DrawerTrigger className='px-5'>
                <PiList size={30} />
            </DrawerTrigger>
            <DrawerContent className='h-full bg-gradient-to-t from-main/20 to-transparent rounded-none'>
                <DrawerHeader>
                    <DrawerTitle className='text-main text-xl'>Fintalk Chat</DrawerTitle>
                    <DrawerDescription><span className='text-main font-semibold'>Explore</span> as possibilidades</DrawerDescription>
                </DrawerHeader>
                <nav className=''>
                    <ul className='flex flex-col justify-around gap-3'>
                        <Link href={"/login"}>
                            <li className='bg-gradient-to-r from-main to-indigo-500 text-xl bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:underline'>Login</li>
                        </Link>
                        <Link href={"/register"}>
                            <li className='bg-gradient-to-r from-main to-indigo-500 text-xl bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:underline'>Cadastre-se</li>
                        </Link>
                        <Link href={"https://github.com/ugabb"} target='_blank'>
                            <li className='bg-gradient-to-r from-main to-indigo-500 text-xl bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:underline'>GitHub</li>
                        </Link>
                        <Link href={"https://www.linkedin.com/in/ugab/"} target='_blank'>
                            <li className='bg-gradient-to-r from-main to-indigo-500 text-xl bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:underline'>Linkedin</li>
                        </Link>
                    </ul>
                </nav>
            </DrawerContent>
        </Drawer>

    )
}

export default MenuMobile