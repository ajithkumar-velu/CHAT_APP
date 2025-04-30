const ApiRoutes = {
    SIGNUP: "/api/auth/signup",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",

    ALLUSERS: "/api/user/users",
    PROFILEUPDATE: "/api/user/update",

    POSTCHAT: "/api/chat",
    GETCHAT: "/api/chat",
    CREATEGROUP: "/api/chat/group",
    RENAMEGROUP: "/api/chat/rename",
    DELETEGROUP: "/api/chat/deleteGroup",
    REMOVEFROMGROUP: "/api/chat/groupRemove",
    ADDTOGROUP: "/api/chat/groupAdd",
    
    GETALLMESSAGES: "/api/message",
    CREATEMESSAGE: "/api/message",
    CLEARMESSAGE: "/api/message/clearChat",
}
export default ApiRoutes