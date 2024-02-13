import { usePathname } from "next/navigation";
import { PiUserList, PiChat, PiUsers, PiUser } from "react-icons/pi";

import useConversation from "./useConversation";
import { useMemo } from "react";
import { useSession } from "next-auth/react";


const useRoutes = () => {
  const pathName = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/chat",
        icon: PiChat,
        active: pathName === "/chat" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: PiUserList,
        active: pathName === "/users",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: PiUser,
        active: pathName === "/settings" || !!conversationId,
      },
    ],
    [pathName, conversationId]
  );

  return routes;
};
export default useRoutes;
