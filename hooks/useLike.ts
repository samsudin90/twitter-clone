import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal"
import usePost from "./usePost"
import usePosts from "./usePosts"
import toast from "react-hot-toast"
import axios from "axios"

const useLike = ({postId, userId} : {postId : string, userId : string}) => {
    const {data: currentUser} = useCurrentUser()
    const {data: fetchedPost, mutate : mutatedFetchedPosts} = usePost(postId)
    const {mutate : mutatedFetchedPost} = usePosts(userId)

    const loginModal = useLoginModal()

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likeIds || []

        return list.includes(currentUser?.data?.id)
    }, [currentUser?.data?.id, fetchedPost?.likeIds])

    const toglleLike = useCallback(async () => {
        if(!currentUser) {
            loginModal.onOpen()
        }

        try {
            let request

            if(hasLiked) {
                request = () => axios.delete('/api/like', {data : {postId}})
            } else {
                request = () => axios.post('/api/like', {postId})
            }

            await request()

            mutatedFetchedPost()
            mutatedFetchedPosts()
            toast('success')
        } catch (error) {
            toast.error('something went wrong')
        }
    }, [currentUser, hasLiked, postId, mutatedFetchedPost, mutatedFetchedPosts, loginModal])

    return {
        hasLiked,
        toglleLike
    }
} 

export default useLike