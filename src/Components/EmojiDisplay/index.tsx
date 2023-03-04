import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Face } from '../../core/@types';
import { setFace, setReset } from '../../store/gameSlice/gameSlice';
import { RootState } from '../../store/store';
import './EmojiDisplay.scss';
type EmojiDisplayProps = {
 restart(): void;
};
const EmojiDisplay: React.FC<EmojiDisplayProps> = ({ restart }) => {
 const face = useSelector((state: RootState) => state.game.face);
 const dispatch = useDispatch();
 useEffect(() => {
  const mouseDown = () => {
   dispatch(setFace(Face.SCARED));
  };
  const mouseUp = () => {
   dispatch(setFace(Face.SMILE));
  };
  window.addEventListener('mousedown', mouseDown);
  window.addEventListener('mouseup', mouseUp);
  return () => {
   window.removeEventListener('mousedown', mouseDown);
   window.removeEventListener('mouseup', mouseUp);
  };
 }, []);
 return (
  <div onClick={() => restart()} className='EmojiDisplay'>
   <span>{face}</span>
  </div>
 );
};

export default EmojiDisplay;
