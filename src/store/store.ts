import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import difficult from "./difficultSlice/difficultSlice";
import game from "./gameSlice/gameSlice"
export const store = configureStore({
    reducer: {
        difficult,
        game
    }
})
export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();