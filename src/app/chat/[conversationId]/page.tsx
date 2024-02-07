import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import Empty from '@/components/Empty'
import React from 'react'
import Header from './components/Header'

interface IParams {
    conversationId: string
}

const ChatId = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    renderizou oconversationid
                    <Empty />
                </div>
            </div>
        )
    }
    return (
        <div className='lg:pl-80 h-full'>
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
            </div>
        </div>
    )
}

export default ChatId