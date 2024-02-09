

import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogPortal,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { DialogOverlay } from '@radix-ui/react-dialog';


interface ImageDialog {
    src: string;
}

const ImageDialog = ({ src }: ImageDialog) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Image height={800} width={800} src={src} className='object-cover cursor-pointer hover:scale-105 trasition translate w-52 h-52' alt='Image' />
            </DialogTrigger>
            <DialogContent className='bg-transparent border-none outline-none flex justify-center items-center shadow-none'>
                <Image height={1000} width={1000} src={src} className='object-cover trasition translate h-full w-full' alt='Image' />
            </DialogContent>
        </Dialog>

    )
}

export default ImageDialog