import getCurrentUser from '@/app/actions/getCurrentUser';
import getFriendRequest from '@/app/actions/getFriendRequest';
import { FriendRequest } from '@prisma/client';
import clsx from 'clsx';
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
}



const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
}) => {

  return (
    <li key={label} className='relative'>
      <Link
        href={href}
        className={clsx(`
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-gray-500 
            hover:text-white
            hover:bg-main
          `,
          active && ' text-main'
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        {/* {label === "Users" &&
          <span
            className="
            absolute 
            rounded-full 
            bg-main 
            ring-2 
            ring-white 
            -top-2 
            -right-2
            h-4 
            w-4
            text-xs
            flex
            justify-center
            items-center
            text-white
          "
          >
         
          </span>
        } */}
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}

export default DesktopItem;