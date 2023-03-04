import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Face } from '../../core/@types';
import { setFace, setIsLive, setLose, setReset, setTime } from '../../store/gameSlice/gameSlice';
import { RootState } from '../../store/store';
import './TimeDisplay.scss';

const TimeDisplay: React.FC = () => {
 const { time, isLive } = useSelector((state: RootState) => state.game);
 const dispatch = useDispatch();
 useEffect(() => {
  if (isLive) {
   const timer = setInterval(() => {
    dispatch(setTime());
   }, 100000);
   if (time === 0) {
    dispatch(setLose(true));
    dispatch(setFace(Face.LOSE));
    dispatch(setIsLive(false));
   }
   return () => clearInterval(timer);
  }
 }, [time, isLive]);
 return <div className='TimeDisplay'>{time.toString().padStart(3, '0')}</div>;
};

export default TimeDisplay;
