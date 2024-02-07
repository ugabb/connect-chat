import Empty from '@/components/Empty'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
const Chat = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className='h-full'>
            <Empty />
        </div>
    )
}


export default Chat
