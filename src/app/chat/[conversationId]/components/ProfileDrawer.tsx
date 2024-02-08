import React, { useMemo } from 'react'

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

    return (
        <Drawer direction='right' snapPoints={["400px"]}>
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
                <div className="w-[400px]">
                    <DrawerHeader className='border-b'>
                        <DrawerTitle className='text-main'>Chat Settings</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col justify-center items-center gap-6 mt-10">
                        <div className="flex flex-col justify-center items-center gap-1">
                            <AvatarProfile user={otherUser} />
                            <p className='text-lg'>{title}</p>
                            <p className='text-xs text-gray-400'>{statusText}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col justify-center items-center h-10 w-10 rounded-full bg-gray-100 hover:bg-main/50 transition cursor-pointer" onClick={() => { }}>
                                <PiTrash className=' text-main' size={20} />
                            </div>
                            <p className='text-sm text-gray-400'>Delete</p>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>

    )
}

export default ProfileDrawer