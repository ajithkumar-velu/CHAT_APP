import { createSlice} from '@reduxjs/toolkit'
const initialState = {
    auth: null,
    isautenticated: false
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAuth: (state, action)=>{
            state.auth = action.payload,
            state.isautenticated = true
        },
        removeAuth: (state)=>{
            state.auth = null
            state.isautenticated = false
        }
    }
})
export const { addAuth, removeAuth} = authSlice.actions
export default authSlice.reducer