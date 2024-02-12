import Sidebar from "@/components/siderbar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";
import getCurrentUser from "../actions/getCurrentUser";
import getFriendRequest from "../actions/getFriendRequest";
import getUserFriends from "../actions/getUserFriends";

export default async function UsersLayout({ children }: { children: React.ReactNode, }) {
    const users = await getUsers()
    const currentUser = await getCurrentUser()
    const userFriends = await getUserFriends()
    console.log({ userFriends })

    let friendRequest;
    if (currentUser?.id) {
        friendRequest = await getFriendRequest(currentUser.id)
    }
    return (
        <Sidebar>
            <div className="h-full w-full">
                <UserList users={users} userFriends={userFriends} currentUser={currentUser} friendRequest={friendRequest} />
                {children}
            </div>
        </Sidebar>
    )
}