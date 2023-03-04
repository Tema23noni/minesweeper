import { CellState, CellValue, ICell } from "../../core/@types";

type TPosition = {
    row: number,
    col: number
}
export const generateCells = (rows: number, cols: number, numOfMines: number) => {
    const currentCells = [];
    const minePos = getMinePos(rows, cols, numOfMines);
    for (let row = 0; row < rows; row++) {
        const rowBoard = []
        for (let col = 0; col < cols; col++) {
            let value = 0;
            if (minePos.some(positionMatch.bind(null, { row, col }))) {
                value = CellValue.BOMB
            }
            const closed = CellState.CLOSED;
            const red = false;
            const cell = {
                state: closed,
                value: value,
                row,
                col,
                get status() {
                    return { state: this.state, value: this.value }
                },
                set status(status) {
                    this.state = status.state;
                    this.value = status.value;
                }
            }
            rowBoard.push(cell)
        }

        currentCells.push(rowBoard)
    }
    return currentCells
}
export const revealCell = (cells: ICell[][], cell: ICell, bombOpen = false, win = false): [ICell[][], boolean?, boolean?] => {
    if (cell.state === CellState.OPEN || cell.state === CellState.FLAG) return [cells, false];
    console.log(cell.value)
    if (cell.value === CellValue.BOMB) {
        for (let row = 0; row < cells.length; row++) {
            for (let col = 0; col < cells[row].length; col++) {
                if (cell.row === row && cell.col === col) {
                    cells[row][col].state = CellState.OPEN;
                    cells[row][col].red = true;
                    bombOpen = true;
                }
            }
        }
        return [cells, true]
    } else {
        for (let row = 0; row < cells.length; row++) {
            for (let col = 0; col < cells[row].length; col++) {
                if (cell.row === row && cell.col === col) {
                    const adjacentCells = grabAllAdjacentCells(cells, row, col);
                    const mines = adjacentCells.filter((cell) => cell.value === CellValue.BOMB);
                    if (mines.length === 0) {
                        cells[row][col].state = CellState.OPEN
                        adjacentCells.forEach(c => revealCell(cells, c))
                    } else {
                        cells[row][col].value = mines.length;
                        cells[row][col].state = CellState.OPEN
                    }
                }
            }
        }

    }
    win = cells.every((row) => {
        return row.every((cellToWin) => {
            return (
                (cellToWin.value !== CellValue.BOMB && cellToWin.state === CellState.OPEN) ||
                (cellToWin.value === CellValue.BOMB && cellToWin.state === CellState.CLOSED ||
                    cellToWin.state === CellState.FLAG)
            );
        });
    });
    if (win) {
        return [cells, false, true];
    }
    return [cells]

}
const getMinePos = (rowsCount: number, colsCount: number, numOfMines: number): TPosition[] => {
    const positions: TPosition[] = [];
    while (positions.length < numOfMines) {
        const position = {
            row: randomNumber(rowsCount),
            col: randomNumber(colsCount)
        }
        if (!positions.some(positionMatch.bind(null, position))) {
            positions.push(position)
        }
    }
    return positions;
}
const randomNumber = (size: number) => {
    return Math.floor(Math.random() * size)
}
const positionMatch = (a: TPosition, b: TPosition) => {
    return a.row === b.row && a.col === b.col;
}
export const grabAllAdjacentCells = (cells: ICell[][], x: number, y: number) => {
    let countGrabCells = []
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const cell = cells[x + xOffset]?.[y + yOffset];
            if (cell) countGrabCells.push(cell)
        }
    }
    return countGrabCells
}