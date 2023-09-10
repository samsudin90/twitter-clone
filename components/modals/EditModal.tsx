import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal"
import useUser from "@/hooks/useUser"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Modal from "../Modal"
import Input from "../Input"
import ImageUpload from "../ImageUpdload"

const EditModal = () => {
    const {data : currentUser} = useCurrentUser()
    const {mutate : mutatedFetchedUser} = useUser(currentUser?.data?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {
        setProfileImage(currentUser?.data?.profileImage)
        setCoverImage(currentUser?.data?.coverImage)
        setName(currentUser?.data?.name)
        setUsername(currentUser?.data?.username)
        if (currentUser?.data?.bio != null) {
            setBio(currentUser?.data?.bio)
        }
    }, [currentUser?.data?.profileImage, currentUser?.data?.coverImage, currentUser?.data?.name, currentUser?.data?.username, currentUser?.data?.bio])

    const [isLoading, setIsloading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsloading(true)
            
            await axios.patch('/api/edit', {
                name, username, bio, profileImage, coverImage
            })
            mutatedFetchedUser()

            toast.success('updated')

            editModal.onClose()
        } catch (error) {
            toast.error('something went wrong')
        } finally {
            setIsloading(false)
        }
    }, [name, username, bio, profileImage, coverImage, editModal, mutatedFetchedUser])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
            <Input placeholder="Bio" onChange={(e) => setBio(e.target.value)} value={bio} disabled={isLoading} />
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={editModal.isOpen} title="Edit Profile" actionLabel="Save" onClose={editModal.onClose} onSubmit={onSubmit} body={bodyContent} />
    )
}

export default EditModal