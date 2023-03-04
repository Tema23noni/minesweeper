import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    rows: 9,
    cols: 9,
    bombsCount: 10
}
export const difficultSlice = createSlice({
    name: "difficult",
    initialState,
    reducers: {
        setDifficult(state, action: PayloadAction<number[]>) {
            state.rows = action.payload[0];
            state.cols = action.payload[1];
            state.bombsCount = action.payload[2]
        }
    }
})

export const { setDifficult } = difficultSlice.actions;
export default difficultSlice.reducer