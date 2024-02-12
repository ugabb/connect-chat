"use client"

import { FriendRequest, User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'
import FriendRequestDialog from './FriendRequestDialog'

import FriendSearch from './FriendSearch'

interface UserListProps {
    users: User[]
    userFriends: User[]
    currentUser: User
    friendRequest: FriendRequest[]
}

const UserList = ({ users, currentUser, friendRequest,userFriends }: UserListProps) => {

    return (
        <aside
            className="
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200
        block w-full left-0
      "
        >
            <div className="px-5">
                <div className="flex flex-col mb-4 pt-4">
                    <div className="flex justify-between items-center w-full">
                        <div
                            className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
              "
                        >
                            People
                        </div> 
                        <FriendRequestDialog friendRequest={friendRequest} currentUser={currentUser} />
                    </div>
                    <FriendSearch users={users} currentUser={currentUser} />
                </div>
                {userFriends.map((user) => (
                    <UserBox
                        key={user.id}
                        data={user}
                    />
                ))}
            </div>
        </aside >
    )
}

export default UserList