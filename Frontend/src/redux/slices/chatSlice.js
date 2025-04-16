import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    chat: [],
    selectedChat: null,
    newMessageRecived: [],
    allUsers: []
}

const chatSlice = createSlice({
    name: "myChat",
    initialState,
    reducers: {
        addMyChat: (state, action)=>{
            state.chat = action.payload
        },
        setAllUsers: (state, action)=>{
            state.allUsers = action.payload
        },
        addSelectedChat: (state, action)=>{
            state.selectedChat = action.payload
        },
        addNewChat: (state, action) => {
			const isExistChat = state.chat.find(
				(chat) => chat._id === action.payload._id
			);
			if (!isExistChat) {
				state.chat = [action.payload, ...state.chat];
			}
		},
    }
})

export const {addMyChat, setAllUsers, addNewChat, addSelectedChat} = chatSlice.actions
export default chatSlice.reducer