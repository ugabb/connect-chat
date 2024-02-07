"use server"
import SignOutButton from '@/components/SignOutButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
interface LayoutProps {
    children: ReactNode
}

interface SideBarOption {
    id: number;
    name: string
    href: string
}

const sidebarOptions: SideBarOption[] = [
    {
        id: 1,
        name: "Dashboard",
        href: '/dashboard',
    },
    {
        id: 1,
        name: "Add friend",
        href: '/dashboard/add',
    },
]

const layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect(`/login`) 
    }

    return (
        <div className='w-full flex h-screen '>
            <div className="flex h-full max-w-sm grow flex-col gap-y-5 overflow-y-auto border-r border-gray bg-white px-6">
                <Link href={"/dashboard"} className='flex h-16 shrink-0 items-center'>Dashboard</Link>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                    your chats
                </div>

                <nav className="flex flex-1 flex-col">
                    <ul className='flex flex-1 flex-col gap-y-7'>
                        <li>Chats the user has</li>
                        <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                                Overview
                            </div>
                            <ul className="-mx-2 mt-2 space-y-1">
                                {sidebarOptions.map(op => (
                                    <li key={op.id}>
                                        <Link
                                            href={op.href}
                                            className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                                            <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
                                                user
                                            </span>

                                            <span className='truncate'>{op.name}</span>
                                        </Link>
                                    </li>
                                ))}


                            </ul>
                        </li>

                        <li className='-mx-6 mt-auto flex items-center'>
                            <div className='flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900'>
                                <div className='relative h-8 w-8 bg-gray-50'>
                                    <Image
                                        fill
                                        referrerPolicy='no-referrer'
                                        className='rounded-full'
                                        src={session.user.image ?? ''}
                                        alt='Your profile picture'
                                    />
                                </div>

                                <span className='sr-only'>Your profile</span>
                                <div className='flex flex-col'>
                                    <span aria-hidden='true'>{session.user.name}</span>
                                    <span className='text-xs text-zinc-400' aria-hidden='true'>
                                        {session.user.email}
                                    </span>
                                </div>
                            </div>

                            <SignOutButton />
                        </li>
                    </ul>

                </nav>

            </div>
            {children}
        </div >
    )
}

export default layout