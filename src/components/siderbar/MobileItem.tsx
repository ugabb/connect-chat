import clsx from 'clsx';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import Link from 'next/link';
import React from 'react'


interface MobileFooterItemProps {
    label: string
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const MobileItem: React.FC<MobileFooterItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick }: MobileFooterItemProps) => {

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    return (
        <Link onClick={handleClick}
            href={href}
            className={clsx(`
          group 
          flex 
          flex-col
          items-center
          gap-x-3 
          text-sm 
          leading-6 
          font-semibold 
          w-full 
          justify-center 
          p-4 
          text-gray-500 
          hover:text-black 
          hover:bg-gray-100
        `,
                active && 'bg-main text-white',
            )}>
            <Icon />
            <p className='text-xs font-light'>{label}</p>
        </Link>
    )
}

export default MobileItem