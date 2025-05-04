import { createSlice } from "@reduxjs/toolkit";

const conditionSlice = createSlice({
    name: "condition",
    initialState: {
        isgetAllUsers: false,
        isgetMyChatUsers: false,

        newChatOpen: false,
        isTyping: false,
        isLoginLow: false,
        isChatLow: false,
        isProfileOpen: false,
        isGroup: false,
        createGroupUsersData: null,
        isChatThreeDotOpen: false,
        isProfileLow: false, 
        isGroupProfileLow: false,
        typingUser: [],
        onlineUsers: null,
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
        },
        setIsTyping: (state, action)=>{
            state.isTyping = action.payload
        },
        setIsLoginLow: (state, action)=>{
            state.isLoginLow = action.payload
        },
        setIsChatLow: (state, action)=>{
            state.isChatLow = action.payload
        },
        setIsProfileOpen: (state, action)=>{
            state.isProfileOpen = action.payload
        },
        setIsGroup: (state, action)=>{
            state.isGroup = action.payload
        },
        setCreateGroupUsersData: (state, action)=>{
            state.createGroupUsersData = action.payload
        },
        setIsChatThreeDotOpen: (state, action)=>{
            state.isChatThreeDotOpen = action.payload
        },
        setIsProfileLow: (state, action)=>{
            state.isProfileLow = action.payload
        },
        setGroupIsProfileLow: (state, action)=>{
            state.isGroupProfileLow = action.payload
        },
        addTypingUser: (state, action)=>{
            if(!state.typingUser.includes(action.payload)){
                state.typingUser.push(action.payload)
            }
        },
        removeTypingUser: (state, action)=>{
            state.typingUser = state.typingUser.filter(i=>i!==action.payload)
        },
        clearTypingUser: (state)=>{
            state.typingUser = []
        },
        setOnlineUsers: (state, action)=>{
            state.onlineUsers = action.payload
        }

    }
})
export const { setIsGetUsers, setNewChatOpen, setIsGetMyChatUsers, setIsTyping, setIsLoginLow, setIsChatLow, setIsProfileOpen, setIsGroup, setCreateGroupUsersData, setIsChatThreeDotOpen, setIsProfileLow, setGroupIsProfileLow, addTypingUser, removeTypingUser, clearTypingUser, setOnlineUsers } = conditionSlice.actions
export default conditionSlice.reducer