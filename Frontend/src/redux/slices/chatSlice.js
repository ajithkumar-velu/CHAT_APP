import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    chat: [],
    selectedChat: null,
    newMessageRecived: [],
    allUsers: [],
    groupData: {
        chatName: "",
        users: []
    },
}

const chatSlice = createSlice({
    name: "myChat",
    initialState,
    reducers: {
        addMyChat: (state, action) => {
            state.chat = action.payload
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        addSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        },
        resetSelectedChat: (stare)=>{
            stare.selectedChat = null
        },
        addNewChat: (state, action) => {
            const isExistChat = state.chat.find(
                (chat) => chat._id === action.payload._id
            );
            if (!isExistChat) {
                state.chat = [action.payload, ...state.chat];
            }
        },
        addGroupName: (state, action) => {
            state.groupData.chatName = action.payload
        },
        addUsersToGroup: (state, action) => {
            const newUsers = Array.isArray(action.payload)
                ? action.payload
                : [action.payload];

            newUsers.forEach(newUser => {
                const exists = state.groupData.users.some(
                    user => user._id === newUser._id
                );
                if (!exists) {
                    state.groupData.users.push(newUser);
                }
            });
        },
        removeUserFromGroup: (state, action) => {
            const userIdToRemove = action.payload;
            state.groupData.users = state.groupData.users.filter(
                user => user._id !== userIdToRemove
            );
        },
        resetGroupData: (state) => {
            state.groupData = { chatName: '', users: [] };
        }

    }
})

export const { addMyChat, setAllUsers, addNewChat, addSelectedChat, addGroupName, addUsersToGroup, removeUserFromGroup, resetGroupData, resetSelectedChat } = chatSlice.actions
export default chatSlice.reducer