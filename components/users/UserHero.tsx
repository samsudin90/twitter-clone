import useUser from "@/hooks/useUser"
import Image from "next/image"
import Avatar from "../Avatar"

interface userHeroProps{
    userId : string
}

const UserHero : React.FC<userHeroProps> =({userId}) => {
    const {data : fetchedUser} = useUser(userId)

    return (
        <div className="">
            <div className="bg-neutral-700 h-44 relative">
                {fetchedUser?.coverImage && (
                    <Image fill src={fetchedUser.coverImage} alt="cover image" style={{ objectFit : 'cover' }} />
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    )
}

export default UserHero