import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice'
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import myChatSlice from './slices/chatSlice'
import conditionSlice from './slices/conditionSlice'
import messagesSlice from './slices/messageSlice'

const persistConfig = {
    key: 'auth',
    storage,
}
const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        myChat: myChatSlice,
        condition: conditionSlice,
        messages: messagesSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, //redux-persist
    }),
})
export const persistor = persistStore(store);
export default store