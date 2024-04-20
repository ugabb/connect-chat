import React from 'react'
import { PiPaperPlaneTilt } from 'react-icons/pi'

interface IBoxIconTextProps{
    text: string;
    icon: React.ReactNode;
}

export default function BoxIconText({text, icon}: IBoxIconTextProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl p-5 bg-gradient-to-r from-main to-main/80 h-52 w-52 md:h-58 md:w-58 drop-shadow-xl hover:scale-105 transition-all">
            {/* <img src={"./chat.png"} width={700} height={400} alt='chat icon' className="h-32 w-32 lg:h-48 lg:w-48" /> */}
            {icon}
            <p className="text-white font-bold">{text}</p>
        </div>
    )
}
