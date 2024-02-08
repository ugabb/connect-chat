

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';

// dialog
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { PiTrash, PiWarning } from 'react-icons/pi';
import { Button } from '@/components/ui/button';

const ConfirmDialog = () => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true)

        axios.delete(`api/conversations/${conversationId}`)
            .then(() => {
                // fecha dialog
                router.push("/chat")
                router.refresh()
            })
            .catch((error) => {
                toast.error("Alguma coisa deu errado 😔")
                console.log(error)
            })
            .finally(() => setIsLoading(false))
    }, [router, conversationId])

    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex flex-col justify-center items-center h-10 w-10 rounded-full bg-gray-100 hover:bg-main/50 transition cursor-pointer">
                    <PiTrash className=' text-main' size={20} />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Você tem certeza que deseja excluir?</DialogTitle>
                    <DialogDescription className='flex items-center gap-2'>
                        <PiWarning className=' text-main' size={20} />
                        <p>Essa ação <span className='text-main'>não</span> pode ser desfeita!</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' className='bg-transparent text-gray-900 font-bold shadow-none  hover:text-main hover:bg-transparent transition ease-in-out'>Não</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type='button' className='bg-transparent text-white font-bold shadow-none bg-main hover:shadow-md hover:bg-main hover:opacity-80 hover:scale-105 transition-all' onClick={onDelete}>Excluir</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default ConfirmDialog