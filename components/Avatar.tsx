import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import {useCallback} from 'react'
import Image from 'next/image'

interface AvatarProps {
    userId : string;
    isLarge? : boolean;
    hasBorder? : boolean
}

const Avatar : React.FC<AvatarProps> = ({userId, isLarge, hasBorder}) => {
    const router = useRouter()
    const {data : fetchedUser} = useUser(userId)

    const onClick = useCallback((e : any) => {
        e.stopPropagation()
        const url = `/users/${userId}`
        router.push(url)
    }, [router, userId])
    return (
        <div className={`rounded-full hover:opacity-90 transition relative cursor-pointer ${hasBorder ? 'border-4 border-black' : ''} ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}`}>
            <Image fill style={{ objectFit : 'cover', borderRadius: '100%' }} alt="Avatar" onClick={onClick} src={fetchedUser?.profileImage || '/images/avatar.jpg'} />
        </div>
    )
} 

export default Avatar