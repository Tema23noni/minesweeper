import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Face } from "../../core/@types";

const initialState = {
    win: false,
    lose: false,
    face: Face.SMILE,
    min: 40,
    sec: 0,
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
        setReset(state, action: PayloadAction<number>) {
            state.face = Face.SMILE;
            state.bombsFlag = action.payload;
            state.isLive = false;
            state.min = 40;
            state.sec = 0;
            state.win = false;
            state.lose = false;
        },
        setTime(state) {
            if (state.min === 0 && state.sec === 0) return;
            if (state.sec === 0) {
                state.min--;
                state.sec = 60;
            }
            state.sec--;
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