import { configureStore } from "@reduxjs/toolkit";
import {sessionApi, sessionApiReducer} from "../features/API/sessionApi";
import tokenReducer from "../features/tokenReducer";

import userCollectionReducer from "../features/userCollectionReducer";

// Get the application-wide store instance, prepopulating with state from the server where available.
export const store = configureStore({
    reducer: {
        [sessionApi.reducerPath]: sessionApi.reducer,
        token: tokenReducer,
        userCollection: userCollectionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(sessionApi.middleware)
    ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;