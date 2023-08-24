import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import fetchOpenAI from "./resSlice"

export const store = configureStore({
    reducer: {
        fetchOpenAI,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;