export enum Face {
    SMILE = "😁",
    WIN = "😎",
    SCARED = "😨",
    PRELOSE = "🫡",
    LOSE = "😵"
}
export enum CellValue {
    EMPTY,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    BOMB,
}
export enum CellState {
    CLOSED,
    OPEN,
    FLAG
}
export type TCell = { value: CellValue, state: CellState, red?: boolean };
export interface ICell {
    red?: boolean;
    row: number;
    col: number;
    state: number;
    value: number;
    status: object;
};