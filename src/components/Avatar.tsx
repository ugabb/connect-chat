import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { User } from '@prisma/client'
import { PiUser } from 'react-icons/pi'
import Image from 'next/image'

interface AvatarProps {
    user?: User
}

const AvatarProfile: React.FC<AvatarProps> = ({ user }: AvatarProps) => {
    return (
        <div className="relative">
            <div className="
          relative 
          inline-block 
          rounded-full 
          h-9 
          w-9 
          md:h-11 
          md:w-11
        ">
                {user?.image ?
                    <Image className='rounded-full' width={50} height={50} alt='profile avatar' src={user?.image} />
                    :
                    <PiUser className='w-full h-full' />

                }

                <span
                    className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
                />

            </div>
        </div>
    )
}

export default AvatarProfile