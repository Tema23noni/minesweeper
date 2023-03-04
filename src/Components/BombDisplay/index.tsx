import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './BombDisplay.scss';
const BombDisplay: React.FC = () => {
 const flags = useSelector((state: RootState) => state.game.bombsFlag);
 return <div className='BombDisplay'>{flags.toString().padStart(3, '0')}</div>;
};

export default BombDisplay;
