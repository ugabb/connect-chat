import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast';

interface ProviderProps {
    children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
    return (
        <>
            <Toaster position='top-center' reverseOrder={false} />
            {children}
        </>
    )
}

export default Providers