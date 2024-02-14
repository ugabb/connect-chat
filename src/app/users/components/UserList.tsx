"use client"

import { FriendRequest, User } from '@prisma/client'
import React, { useEffect, useMemo, useState } from 'react'
import UserBox from './UserBox'
import FriendRequestDialog from './FriendRequestDialog'

import FriendSearch from './FriendSearch'
import { pusherClient } from '@/lib/pusher'
import { find } from 'lodash'

interface UserListProps {
    users: User[]
    userFriends: User[]
    currentUser: User
    friendRequest: FriendRequest[]
}

const UserList = ({ users, currentUser, friendRequest, userFriends }: UserListProps) => {
    const [userFriendsList, setUserFriendsList] = useState<User[]>(userFriends)

    const pusherKey = useMemo(() => {
        return currentUser?.id
    }, [currentUser?.id])

    useEffect(() => {
        if (!pusherKey) return;
        pusherClient.subscribe(pusherKey)

        const updateListOfFriendsHandler = (acceptedRequest: User) => {
            console.log(acceptedRequest)
            // Atualize a lista após aceitar o pedido
            setUserFriendsList((current: any) => {
                if (find(current, { id: acceptedRequest.id })) {
                    return current
                }

                return [acceptedRequest, ...current]
            })
        };

        pusherClient.bind("friendRequest:addToListOfFriends", updateListOfFriendsHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("friendRequest:addToListOfFriends", updateListOfFriendsHandler)
        }
    }, [pusherKey])


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
                {userFriendsList?.map((user) => {
                    return (
                        <UserBox
                            key={user.id}
                            //@ts-ignore
                            data={user}
                        />
                    )
                })}
            </div>
        </aside >
    )
}

export default UserList