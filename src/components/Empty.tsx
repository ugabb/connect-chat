import React from 'react'

const Empty = () => {
    return (
        <div className=' px-4 
        py-10 
        sm:px-6 
        lg:px-8 
        lg:py-6 
        h-full 
        flex 
        justify-center 
        items-center 
        bg-gray-100'>
            <div className="flex flex-col justify-center items-center">
                <h3 className='text-2xl font-semibold text-gray-900'>Seleciona um chat para conversar!</h3>
            </div>
        </div>
    )
}

export default Empty