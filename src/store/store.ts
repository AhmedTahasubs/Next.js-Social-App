import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user.slice";
import { PostReducer } from "./slices/posts.slice";

export const store = configureStore({
    reducer: {
        userReducer,
        PostReducer,
    }
})
// 34an h7tag el type da 
type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]