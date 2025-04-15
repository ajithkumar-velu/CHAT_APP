import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice'
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: 'auth',
    storage,
}
const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, //redux-persist
        }),
})
export const persistor = persistStore(store);
export default store