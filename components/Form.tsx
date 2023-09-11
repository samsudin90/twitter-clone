import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

interface FormProps {
    placeholder: string;
    isCommnet?: boolean;
    postId?: string
}

const Form: React.FC<FormProps> = ({ placeholder, isCommnet, postId }) => {
    const registerModal = useRegisterModal()

    const { data: currentUser } = useCurrentUser()
    const { mutate: mutatedPosts } = usePosts()
    const {mutate : mutatedPost} = usePost(postId as string) 

    const [body, setBody] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsloading(true)

            const url = isCommnet ? `/api/comments?postId=${postId}` : '/api/posts'

            await axios.post(url, { body })
            toast.success('tweet created')
            setBody('')
            mutatedPosts()
            mutatedPost()
        } catch (error) {
            toast.error('something when wrong')
        } finally {
            setIsloading(false)
        }
    }, [body, mutatedPosts, isCommnet, postId, mutatedPost])

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4">
                    <div>
                        <Avatar userId={currentUser?.data?.id} />
                    </div>
                    <div className="w-full">
                        <textarea
                            disabled={isLoading}
                            onChange={(event) => setBody(event.target.value)}
                            value={body}
                            className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
                            placeholder={placeholder}>
                        </textarea>
                        <hr
                            className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
                        />
                        <div className="mt-4 flex flex-row justify-end">
                            <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Litter</h1>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Button label="Register" onClick={registerModal.onOpen} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form