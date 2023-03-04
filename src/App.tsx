import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BombDisplay from './Components/BombDisplay';
import Button from './Components/Button';
import EmojiDisplay from './Components/EmojiDisplay';
import TimeDisplay from './Components/TimeDisplay';
import { generateCells } from './Components/utils/generateCells';
import { CellValue, ICell } from './core/@types';
import { EASY_ROWS_COLS, HARD_ROWS_COLS, MEDIUM_ROWS_COLS } from './core/constants';
import { setDifficult } from './store/difficultSlice/difficultSlice';
import { setBombsFlag, setReset } from './store/gameSlice/gameSlice';
import { RootState } from './store/store';

const App: React.FC = () => {
 const { rows, cols, bombsCount } = useSelector((state: RootState) => state.difficult);
 const dispatch = useDispatch();
 const [cells, setCells] = useState<ICell[][]>(generateCells(rows, cols, bombsCount));
 const restart = (): void => {
  dispatch(setReset());
  setCells(generateCells(rows, cols, bombsCount));
 };
 const generateNewCells = () => {
  setCells(generateCells(rows, cols, bombsCount));
  restart();
 };
 useEffect(() => {
  generateNewCells();
 }, [rows, cols, bombsCount]);
 useEffect(() => {
  if (bombsCount) {
   dispatch(setBombsFlag(bombsCount));
  }
 }, [bombsCount]);

 return (
  <div className='App'>
   <div className='DiffOfGame'>
    <button className='btn-easy' onClick={() => dispatch(setDifficult(EASY_ROWS_COLS))}>
     Easy
    </button>
    <button className='btn-medium' onClick={() => dispatch(setDifficult(MEDIUM_ROWS_COLS))}>
     Meddium
    </button>
    <button className='btn-hard' onClick={() => dispatch(setDifficult(HARD_ROWS_COLS))}>
     Hard
    </button>
   </div>
   <div className='GameZone'>
    <div className='Header'>
     <BombDisplay />
     <EmojiDisplay restart={restart} />
     <TimeDisplay />
    </div>
    <div
     className='Body'
     style={{
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
     }}>
     {cells.map(
      (row, rowIndex): React.ReactNode =>
       row.map(
        (cell, colIndex): React.ReactNode => (
         <Button cell={cell} setCells={setCells} cells={cells} key={`${rowIndex - colIndex}`} />
        ),
       ),
     )}
    </div>
   </div>
  </div>
 );
};

export default App;
