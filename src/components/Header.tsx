

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import MenuMobile from './MenuMobile'

const Header = () => {
    return (
        <header className='flex items-center justify-between w-full text-main  py-4 lg:px-10 '>
            <div className="flex px-3 items-center">
                <Image src={"/logo.png"} width={128} height={47} alt='logo' />
                <h1 className='text-2xl font-bold'>Chat</h1>
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
                        <li className='bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:scale-105'>Cadastre-se</li>
                    </Link>
                    <Link href={"https://github.com/ugabb/fintalk-chat"}target='_blank'>
                        <li className='bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:scale-105'>GitHub</li>
                    </Link>
                    <Link href={"https://www.linkedin.com/in/ugab/"}target='_blank'>
                        <li className='bg-gradient-to-r from-main to-rose-300 text-md bg-clip-text text-transparent px-5 py-2 rounded-md font-bold hover:scale-105'>Linkedin</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header