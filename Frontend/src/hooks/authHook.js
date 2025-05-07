
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { performLogin, performLogout, performProfileUpdate, performSignup } from '../api/auth'
import { addAuth, removeAuth } from '../redux/slices/authSlice'
import { data, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { setIsLoginLow, setIsProfileLow } from '../redux/slices/conditionSlice'
import socket from '../config/socket'
const useAuthMutations = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signupUser = useMutation({
        mutationFn: performSignup,
        onSuccess: (data)=>{
            toast.success(data.message)
            dispatch(addAuth(data))
            navigate('/login')
        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        }
    })

    const loginUser = useMutation({
        mutationFn: async (data)=>{
            dispatch(setIsLoginLow(true))
            return performLogin(data)
        },
        onSuccess: (data)=>{
            console.log(data);
            
            toast.success(data.message)
            dispatch(addAuth(data))
            
            navigate('/')
        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        },
        onSettled: ()=>{
            dispatch(setIsLoginLow(false))
        }
    }
)
    const logoutUser = useMutation({
        mutationFn: performLogout,
        onSuccess: (data)=>{
            dispatch(removeAuth())
            navigate('/login')
            toast.success(data.message)
        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        }
    })

    const profileUpdate = useMutation({
        mutationFn: performProfileUpdate,
        onMutate: ()=>{
            
                dispatch(setIsProfileLow(true))
            
        },
        onSuccess: (data)=>{
            
            dispatch(addAuth(data))
            toast.success("Profile Updated")
            socket.emit("update profile", data)
        },
        onError: (err)=>{
            toast(err.reponse?.data?.message)
        },
        onSettled: ()=>{
            dispatch(setIsProfileLow(false))
        }
    })

    

    return {signupUser, loginUser, logoutUser, profileUpdate}
}

export default useAuthMutations