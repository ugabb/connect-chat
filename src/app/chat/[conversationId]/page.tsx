import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import Empty from '@/components/Empty'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Form from './components/Form'
import getUserFriends from '@/app/actions/getUserFriends'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { Conversation, User } from '@prisma/client'

interface IParams {
    conversationId: string
}

const ChatId = async ({ params }: { params: IParams }) => {
    const currentUser: User | null = await getCurrentUser()
    const userFriends = await getUserFriends()
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <Empty />
                </div>
            </div>
        )
    }
    return (
        <div className='lg:pl-80 h-full'>
            <div className="h-full flex flex-col">
                <Header conversation={conversation} userFriends={userFriends} currentUser={currentUser} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
}

export default ChatId