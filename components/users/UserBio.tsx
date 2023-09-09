import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser"
import {useMemo} from 'react'
import {format} from 'date-fns'
import Button from "../Button"
import { BiCalendar } from 'react-icons/bi'

interface userBioProps {
    userId : string
}

const UserBio : React.FC<userBioProps> = ({userId}) => {
    const {data : currentUser} = useCurrentUser()
    const {data : fetchedUser} = useUser(userId)

    const createdAt = useMemo(() => {
        if(!fetchedUser?.data?.createdAt) {
            return null
        }
        return format(new Date(fetchedUser.data.createdAt), 'MMMM yyyy')
    }, [fetchedUser?.createdAt])
    return (
        <div className="border-b-[1px] pb-4 border-neutral-800">
            <div className="flex justify-end p-2">
                {currentUser?.id === userId ? (
                    <Button scondary label="Edit" onClick={() => {}} />
                ) : (
                    <Button scondary label="follow" onClick={() => {}} />
                )}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">{fetchedUser?.data?.name}</p>
                    <p className="text-md text-neutral-500">@{fetchedUser?.data?.username}</p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">{fetchedUser?.data?.bio}</p>
                </div>
                <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
                    <BiCalendar size={24} />
                    <p>Joined {createdAt}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-6 mt-4 px-4">
                <div className="flex flex-row gap-1 items-center">
                    <p className="text-white">{fetchedUser?.data?.followingIds?.length}</p>
                    <p className="text-neutral-500">Following</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <p className="text-white">{fetchedUser?.data?.followersCount || 0}</p>
                    <p className="text-neutral-500">Followers</p>
                </div>
            </div>
        </div>
    )
}

export default UserBio