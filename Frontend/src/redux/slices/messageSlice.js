import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        newMessage: ""
    },
    reducers: {
        addAllMessages: (state, action)=>{
            state.messages = action.payload
        },
        addNewMessage: (state, action)=>{
            state.messages= [...state.messages, action.payload]
        },
        addNewMessageId: (state, action)=>{
            state.newMessage = action.payload 
        }
    }
})

export const { addAllMessages, addNewMessage, addNewMessageId} = messageSlice.actions
export default messageSlice.reducer