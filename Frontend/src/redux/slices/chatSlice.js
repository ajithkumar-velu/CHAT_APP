import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    chat: [],
    selectedChat: null,
    newMessageRecived: [],
    allUsers: [],
    groupData: {
        chatName: "",
        users: [],
        description: ""
    },
    groupRenameData: {
        name:"",
        chatId: ""
    },
    removeFromGroupUser: "",
    addNewUserToGroup: [],
    copyAddNewUserToGroup: [],
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
        addGroupDescription: (state, action) => {
            state.groupData.description = action.payload
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
            state.groupData = { chatName: '', users: [], description: "" };
        },
        setRenameGroupName: (state, action)=>{
            state.groupRenameData.name = action.payload.name
            state.groupRenameData.chatId = action.payload.chatId
        },
        addGroupRename: (state, action)=>{
            state.groupRenameData.name = action.payload
        },
        addRemoveFromGroupUser: (state, action)=>{
            state.removeFromGroupUser =  action.payload
        },
        setAddNewUserToGroup: (state, action)=>{
            state.addNewUserToGroup = action.payload
            state.copyAddNewUserToGroup = action.payload
        },
        removeAddNewUserToGroup: (state, action) => {
            const userIdToRemove = action.payload;
            state.addNewUserToGroup = state.addNewUserToGroup.filter(
                user => user._id !== userIdToRemove
            );
        },

        addAddNewUserToGroup: (state, action) => {
            const newUsers = Array.isArray(action.payload)
                ? action.payload
                : [action.payload];

            newUsers.forEach(newUser => {
                const exists = state.addNewUserToGroup.some(
                    user => user._id === newUser._id
                );
                if (!exists) {
                    state.addNewUserToGroup.push(newUser);
                }
            });
        },
        resetAddNewUserToGroup: (state) => {
            state.addNewUserToGroup = []
            state.copyAddNewUserToGroup = []
        },
    }
})

export const { addMyChat, setAllUsers, addNewChat, addSelectedChat, addGroupName, addUsersToGroup, removeUserFromGroup, resetGroupData, resetSelectedChat, addGroupDescription, setRenameGroupName, addGroupRename, addRemoveFromGroupUser, setAddNewUserToGroup, removeAddNewUserToGroup, addAddNewUserToGroup, resetAddNewUserToGroup } = chatSlice.actions
export default chatSlice.reducer