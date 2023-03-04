import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Face } from '../../core/@types';
import { setFace, setIsLive, setLose, setReset, setTime } from '../../store/gameSlice/gameSlice';
import { RootState } from '../../store/store';
import './TimeDisplay.scss';
type TimeDisplayProps = {
 time: number;
};
const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
 return <div className='TimeDisplay'>{time.toString().padStart(3, '0')}</div>;
};

export default TimeDisplay;
