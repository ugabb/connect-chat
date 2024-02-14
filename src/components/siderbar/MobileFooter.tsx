'use client';

import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import React from 'react'
import MobileItem from './MobileItem';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

interface MobileFooter {
    currentUser: User
}

const MobileFooter = ({ currentUser }: MobileFooter) => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }
    return (
        <div
            className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
      "
        >
            {routes.map((route) => (
                <MobileItem
                label={route.label}
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                />
            ))}
        </div>
    )
}

export default MobileFooter