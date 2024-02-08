"use client"

import { Input } from '@/components/ui/input';
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const MessageInput = ({ id, register, errors, placeholder, required, type }: MessageInputProps) => {
    return (
        <div className="relative w-full">
            <Input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className="
            text-black
            font-light
            py-2
            px-4
            bg-neutral-100 
            w-full 
            
            hover:ring-main
          "
            />
        </div>
    )
}

export default MessageInput