"use client"

import React, { useEffect, useMemo, useState } from 'react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { Conversation } from '@prisma/client';
import useOtherUser from '@/app/hooks/useOtherUser';
import { format } from 'date-fns';
import AvatarProfile from '@/components/Avatar';
import { PiTrash, PiTrashSimple } from 'react-icons/pi';
import ConfirmDialog from './ConfirmDialog';

interface ProfileDrawerProps {
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer = ({ data }: ProfileDrawerProps) => {

    const otherUser = useOtherUser(data);

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), "PP")
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [data.name, otherUser.name])


    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }
        return "Active"
    }, [data])


    const [screenWidth, setScreenWidth] = useState<number>(0);
    useEffect(() => {
        // Function to update screen width
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        // Initial update
        updateScreenWidth();

        // Event listener for window resize
        window.addEventListener('resize', updateScreenWidth);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    return (
        <Drawer direction={screenWidth > 425 ? "right" : "bottom"} snapPoints={screenWidth < 425 ? ["600px"] : ["400px"]}>
            <DrawerTrigger>
                <HiEllipsisHorizontal
                    size={32}
                    className="
          text-main
          cursor-pointer
          hover:text-main/50
          transition
        "
                />
            </DrawerTrigger>
            <DrawerContent className='flex flex-col h-full'>
                <div className="md:w-[400px] h-[600px]">
                    <DrawerHeader className='border-b'>
                        <DrawerTitle className='text-main'>Chat Settings</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col justify-center items-center gap-6 mt-10">
                        <div className="flex flex-col justify-center items-center gap-1">
                            <AvatarProfile user={otherUser} />
                            <p className='text-lg'>{title}</p>
                            <p className='text-xs text-gray-400'>{statusText}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1">
                            <ConfirmDialog />
                            <p className='text-sm text-gray-400'>Excluir Chat</p>
                        </div>
                    </div>
                    <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                        {data.isGroup && (
                            <div>
                                <dt
                                    className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                >
                                    Emails
                                </dt>
                                <dd
                                    className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                                >
                                    {data.users.map((user) => user.email).join(', ')}
                                </dd>
                            </div>
                        )}
                        {!data.isGroup && (
                            <div>
                                <dt
                                    className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                >
                                    Email
                                </dt>
                                <dd
                                    className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                                >
                                    {otherUser.email}
                                </dd>
                            </div>
                        )}
                        {!data.isGroup && (
                            <>
                                <hr />
                                <div>
                                    <dt
                                        className="
                                    text-sm 
                                    font-medium 
                                    text-gray-500 
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  "
                                    >
                                        Joined
                                    </dt>
                                    <dd
                                        className="
                                    mt-1 
                                    text-sm 
                                    text-gray-900 
                                    sm:col-span-2
                                  "
                                    >
                                        <time dateTime={joinedDate}>
                                            {joinedDate}
                                        </time>
                                    </dd>
                                </div>
                            </>
                        )}
                    </dl>
                </div>
            </DrawerContent>
        </Drawer>

    )
}

export default ProfileDrawer