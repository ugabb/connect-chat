import Sidebar from "@/components/siderbar/Sidebar";

export default async function UsersLayout({ children }: { children: React.ReactNode, }) {
    return (
        <Sidebar>
            <div className="h-full w-full">
                {/* <UserList items={users} /> */}
                {children}
            </div>
        </Sidebar>
    )
}