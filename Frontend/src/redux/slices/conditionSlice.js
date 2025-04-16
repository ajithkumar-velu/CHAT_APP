import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
    name: "condition",
    initialState: {
        isgetAllUsers: false,
        isgetMyChatUsers: false,

        newChatOpen: false,
    },
    reducers: {
        setIsGetUsers: (state, action)=>{
            state.isgetAllUsers = action.payload
        },
        setIsGetMyChatUsers: (state, action)=>{
            state.isgetMyChatUsers = action.payload
        },



        setNewChatOpen: (state, action)=>{
            state.newChatOpen = action.payload
        }
    }
})
export const { setIsGetUsers, setNewChatOpen, setIsGetMyChatUsers } = conditionSlice.actions
export default conditionSlice.reducer