import AvatarProfile from '@/components/Avatar'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

interface UserBoxProps {
    data: User
}

const UserBox = ({ data }: UserBoxProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        // criar uma conversa
        axios.post('/api/conversations', { userId: data.id })
            .then((data) => {
                router.push(`/chat/${data.data.id}`);
            })
            .finally(() => setIsLoading(false));
    }, [data, router]);
    return (
        <div
            onClick={handleClick}
            className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-main/10
          rounded-lg
          transition
          cursor-pointer
        "
        >
            <AvatarProfile user={data} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox