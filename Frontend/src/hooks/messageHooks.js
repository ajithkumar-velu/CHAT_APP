import { useDispatch } from "react-redux"
import { useMutation } from '@tanstack/react-query'
import { performCreateMessage, performGetAllMessages } from "../api/message"
import { addAllMessages } from "../redux/slices/messageSlice"
import toast from "react-hot-toast"
const useMessageMutation = () => {
    const dispatch = useDispatch()

    const getAllMessage = useMutation({
        mutationFn: performGetAllMessages,
        onSuccess: (data) => {
            dispatch(addAllMessages(data))
            console.log(data);

        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        }
        
    })

    const createMessage = useMutation({
        mutationFn: performCreateMessage,
        onSuccess: (data)=>{
            // dispatch(addAllMessages)
            console.log(data);
        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        }
    })
    return { getAllMessage, createMessage}
}

export default useMessageMutation