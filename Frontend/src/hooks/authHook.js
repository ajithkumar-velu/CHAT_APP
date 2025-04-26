
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { performLogin, performLogout, performSignup } from '../api/auth'
import { addAuth, removeAuth } from '../redux/slices/authSlice'
import { useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { setIsLoginLow } from '../redux/slices/conditionSlice'
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

    

    return {signupUser, loginUser, logoutUser}
}

export default useAuthMutations