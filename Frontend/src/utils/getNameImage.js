import { images } from "../assets/assets"

export const getChatName = (chat, authUserId)=>{
    const chatName = chat.chatName == "Messanger" 
                        ? chat.users[0]._id === authUserId
                            ? chat.users[1]?.fullname
                            : chat.users[0]?.fullname
                        : chat.chatName
    return chatName
}

export const getChatImage = (chat, authUserId)=>{
    
    
    const chatImage = chat.chatName == "Messanger"
                        ? chat.users[0]._id == authUserId
                            ? chat.users[1]?.profile
                            : chat.users[0]?.profile
                        : images.groupAvatar
    return chatImage
}