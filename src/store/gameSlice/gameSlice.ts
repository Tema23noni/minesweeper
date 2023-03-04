import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Face } from "../../core/@types";

const initialState = {
    win: false,
    lose: false,
    face: Face.SMILE,
    time: 40,
    isLive: false,
    bombsFlag: 9,
    reset: false,
}
export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setFace(state, action: PayloadAction<Face>) {
            state.face = action.payload
        },
        setReset(state) {
            state.face = Face.SMILE;
            state.bombsFlag = 10;
            state.isLive = false;
            state.time = 40;
            state.win = false;
            state.lose = false;
        },
        setTime(state) {
            if (state.time === 0) return;
            state.time--
        },
        setWin(state, action: PayloadAction<boolean>) {
            state.win = action.payload
        },
        setLose(state, action: PayloadAction<boolean>) {
            state.lose = action.payload
        },
        setIsLive(state, action: PayloadAction<boolean>) {
            state.isLive = action.payload
        },
        setBombsFlag(state, action: PayloadAction<number>) {
            state.bombsFlag = action.payload
        },
        incrementBombsFlag(state) {
            state.bombsFlag++
        },
        decrementBombsFlag(state) {
            state.bombsFlag--
        }
    }
})

export const { setFace, setReset, incrementBombsFlag, decrementBombsFlag, setTime, setWin, setLose, setIsLive, setBombsFlag } = gameSlice.actions;
export default gameSlice.reducer