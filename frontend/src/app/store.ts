// store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import postsReducer from "../features/posts/postsSlice";

const store = configureStore({
    reducer: {
        user:userReducer,
        post:postsReducer
      },
      middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
          serializableCheck:false,
        }),
      
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;