import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const Dashboard = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <h1>Dashborad</h1>
            <p>{session?.user.name}</p>
            <p>{session?.user.email}</p>
            <Image src={session?.user.image} alt='user image' width={50} height={50} />
        </div>
    )
}

export default Dashboard