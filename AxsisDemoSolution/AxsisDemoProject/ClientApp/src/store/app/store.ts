import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/API/userApi";


// Get the application-wide store instance, prepopulating with state from the server where available.
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(userApi.middleware)
    ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;