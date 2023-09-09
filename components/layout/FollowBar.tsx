import useUsers from "@/hooks/useUsers"
import Avatar from "../Avatar"

const FollowBar = () => {
    const { data: users = [] } = useUsers()

    if (users.length === 0) {
        return null
    }

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="rounded-xl p-4 bg-neutral-800">
                <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                    {users.data.map((user: Record<string, any>) => (
                        <div className="flex flex-row gap-4 mt-4" key={user.id}>
                            <Avatar userId={user.id} />
                            <div className="flex flex-col">
                                <p className="text-white text-sm font-semibold">{user.name}</p>
                                <p className="text-sm text-neutral-400">@{user.username}</p>
                            </div>
                        </div>
                    ))}
                    {/* {users[0].name} */}
                </div>
            </div>
        </div>
    )
}

export default FollowBar