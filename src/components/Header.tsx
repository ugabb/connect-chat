

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import MenuMobile from './MenuMobile'
import {  PiChatCircleText } from 'react-icons/pi'

const Header = () => {
    return (
        <header className='flex items-center justify-between w-full text-main  py-4 lg:px-10 '>
            <div className="flex gap-3 px-3 items-center">
                <h1 className='text-2xl font-bold'>Connect Chat</h1>
                <PiChatCircleText size={30}/>
            </div>
            {/* Mobile Navlinks */}
            <div className="lg:hidden ">
                <MenuMobile />
            </div>

            <nav className='hidden lg:block'>
                <ul className=' lg:flex justify-around gap-3'>
                    <Link href={"/login"}>
                        <li className='bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:scale-105'>Login</li>
                    </Link>
                    <Link href={"/register"}>
                        <li className='bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:scale-105'>Sign Up</li>
                    </Link>
                    <Link href={"https://github.com/ugabb/fintalk-chat"} target='_blank'>
                        <li className='bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:scale-105'>GitHub</li>
                    </Link>
                    <Link href={"https://www.linkedin.com/in/ugab/"} target='_blank'>
                        <li className='bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:scale-105'>Linkedin</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header