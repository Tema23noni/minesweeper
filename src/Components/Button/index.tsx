import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CellState, CellValue, Face, ICell } from '../../core/@types';
import {
 decrementBombsFlag,
 incrementBombsFlag,
 setFace,
 setIsLive,
 setLose,
 setWin,
} from '../../store/gameSlice/gameSlice';
import { RootState } from '../../store/store';
import { generateCells, revealCell } from '../utils/generateCells';
import './Button.scss';
type TCellProps = {
 cell: ICell;
 cells: ICell[][];
 setCells: React.Dispatch<React.SetStateAction<ICell[][]>>;
};
const Button: React.FC<TCellProps> = ({ cell, cells, setCells }) => {
 const { rows, cols, bombsCount } = useSelector((state: RootState) => state.difficult);
 const { isLive, bombsFlag, lose, win } = useSelector((state: RootState) => state.game);
 const dispatch = useDispatch();
 const handleClickCell = () => {
  if (lose || win) return;
  let newCells: ICell[][] = cells.slice();
  let newCell = cell;
  if (!isLive) {
   let isBomb = newCells[newCell.row][newCell.col].value === CellValue.BOMB;
   while (isBomb) {
    newCells = generateCells(rows, cols, bombsCount);
    newCell = newCells[newCell.row][newCell.col];
    if (newCells[newCell.row][newCell.col].value !== CellValue.BOMB) {
     isBomb = false;
     break;
    }
   }
   dispatch(setIsLive(true));
  }
  let currentCells: [ICell[][], boolean?, boolean?] = [newCells];
  console.log(currentCells[0]);
  currentCells = revealCell(currentCells[0], newCell, false, false);
  setCells(currentCells[0]);
  if (currentCells[1]) {
   currentCells[0].forEach((row) =>
    row.forEach((col) => {
     if (col.value === CellValue.BOMB) {
      col.state = CellState.OPEN;
     }
    }),
   );
   dispatch(setFace(Face.LOSE));
   dispatch(setLose(true));
   dispatch(setIsLive(false));
  }

  if (currentCells[2]) {
   currentCells[0].forEach((row) =>
    row.forEach((col) => {
     if (col.value === CellValue.BOMB) {
      col.state = CellState.FLAG;
     }
    }),
   );
   dispatch(setFace(Face.WIN));
   dispatch(setWin(true));
   dispatch(setIsLive(false));
  }
 };
 const handleContextCell = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.preventDefault();
  if (!isLive) return;
  if (cell.state !== CellState.FLAG) {
   if (bombsFlag === 0) return;
   cell.state = CellState.FLAG;
   dispatch(decrementBombsFlag());
  } else {
   cell.state = CellState.CLOSED;
   dispatch(incrementBombsFlag());
  }
 };
 const createContent = (): React.ReactNode => {
  if (cell.state === CellState.OPEN) {
   if (cell.value === CellValue.BOMB) {
    return <span>💣</span>;
   } else if (cell.value === CellValue.EMPTY) {
    return null;
   }
   return cell.value;
  } else if (cell.state === CellState.FLAG) {
   return <span>🚩</span>;
  }
  return null;
 };
 return (
  <div
   onClick={handleClickCell}
   onContextMenu={handleContextCell}
   className={`Button ${cell.state === CellState.OPEN ? 'open' : ''} ${cell.red ? 'red' : ''}`}>
   {createContent()}
  </div>
 );
};

export default Button;
