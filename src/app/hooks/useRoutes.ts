import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { PiUserList, PiChat, PiUsers } from "react-icons/pi";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";
import { useMemo } from "react";

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
    ],
    [pathName, conversationId]
  );

  return routes;
};
export default useRoutes;
