import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal"
import useUser from "./useUser"
import toast from "react-hot-toast"
import axios from "axios"

const useFollow = (userId : string) => {
    const {data : currentUser, mutate : mutatedCurrentUser} = useCurrentUser()
    const {mutate : mutatedFetchedUser} = useUser(userId)

    const loginModal = useLoginModal()

    const isFollowing = useMemo(() => {
        const list = currentUser?.data?.followingIds || []

        return list.includes(userId)
    }, [currentUser?.data?.followingIds])

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            loginModal.onOpen()
        }

        try {
            let request

            if (isFollowing) {
                request = () => axios.delete('/api/follow', {data : {userId}})
            } else {
                request = () => axios.post('/api/follow', {userId})
            }

            await request()

            mutatedCurrentUser()
            mutatedFetchedUser()

            toast.success('success')
        } catch (error) {
            toast.error('something went wrong')
        }
    }, [isFollowing, currentUser, mutatedCurrentUser, mutatedFetchedUser, userId, loginModal])

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow