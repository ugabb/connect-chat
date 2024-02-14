

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='flex justify-between items-center  text-main w-full py-4 px-10 '>
            <div className="flex  items-center">
                <Image src={"/logo.png"} width={128} height={47} alt='logo' />
                <h1 className='text-2xl font-bold'>Chat</h1>
            </div>
            <nav className=''>
                <ul className='hidden lg:flex justify-around gap-3'>
                    <Link href={"/login"}>
                        <li className='text-main px-5 py-2 rounded-md font-bold hover:underline'>Login</li>
                    </Link>
                    <Link href={"/register"}>
                        <li className='text-main px-5 py-2 rounded-md font-bold hover:underline'>Cadastre-se</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header