import React from 'react';
import { useState, useEffect } from 'react';

type TimerProps = {
  expirationDate: number;
};

const Timer = ({ expirationDate }: TimerProps) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const getTime = () => {
      const time = expirationDate - Date.now();

      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [seconds, expirationDate]);

  return (
    <div className="timer">
      {hours >= 0 ? `${hours} hours ` : ''}
      {minutes >= 0 ? `${minutes} mins ` : ''}
      {seconds >= 0 ? `${seconds} sec ` : ''}
    </div>
  );
};

export default Timer;
