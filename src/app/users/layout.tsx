import Sidebar from "@/components/siderbar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

export default async function UsersLayout({ children }: { children: React.ReactNode, }) {
    const users = await getUsers()
    return (
        <Sidebar>
            <div className="h-full w-full">
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    )
}