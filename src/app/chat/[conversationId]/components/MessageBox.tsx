"use client"

import { FullMessageType } from '@/app/types';
import AvatarProfile from '@/components/Avatar';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react'
import ImageDialog from './ImageDialog';

interface MessageBoxProps {
    isLast?: boolean;
    data: FullMessageType;
}

const MessageBox = ({ isLast, data }: MessageBoxProps) => {
    const session = useSession();

    const isOwn = session?.data?.user.email === data.sender.email;
    const seenList = (data.seen || [])
        .filter(user => user.email !== data.sender.email) // retirando a pessoa que mandou a mensagem, pois nao precisar estar no array de quem viu a mensagem
        .map(user => user.name)
        .join(", ") // lista os usuarios separados com virgula. ex: Gabriel, Gabigol, Arrascaeta

    // estilos dinamicos com clsx
    const container = clsx(
        "flex gap-3 p-4",
        isOwn && "justify-end"
    )

    const avatar = clsx(isOwn && "order-2")

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isOwn ? "bg-main text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0 " : "rounded-lg py-2 px-3"
    )

    return (
        <div className={container}>
            <div className={avatar}>
                <AvatarProfile user={data.sender} />
            </div>

            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="txt-xs text-gray-400">
                        {format(new Date(data.createdAt), "p")}
                    </div>
                </div>
                <div className={message}>
                    {data.image
                        ?
                        (
                            <ImageDialog src={data.image} />
                        )
                        :
                        (
                            <div>{data.body}</div>
                        )
                    }
                </div>

                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500">
                        {`Visto - ${seenList}`}
                    </div>
                )}
            </div>

        </div>
    )
}

export default MessageBox