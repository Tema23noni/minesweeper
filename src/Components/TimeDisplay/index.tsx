import React from 'react';
import './TimeDisplay.scss';
type TimeDisplayProps = {
 time: number;
};
const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
 return <div className='TimeDisplay'>{time.toString().padStart(3, '0')}</div>;
};

export default TimeDisplay;
