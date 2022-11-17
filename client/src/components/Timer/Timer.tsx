import React from 'react';
import { useState, useEffect } from 'react';

type TimerProps = {
  expirationDate: number;
};

const Timer = ({ expirationDate }: TimerProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    const getTime = () => {
      const time = expirationDate - Date.now();
      setRemainingSeconds(Math.floor(time / 1000));
    };
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [remainingSeconds, expirationDate]);

  const formatTime = () => {
    const hours = Math.floor(remainingSeconds / (60 * 60)) % 24;
    const mins = Math.floor(remainingSeconds / 60) % 60;
    const seconds = Math.floor(remainingSeconds % 60);

    if (hours === 0 && mins === 0) {
      return `${seconds} seconds`;
    } else if (hours === 0) {
      return `${mins} minutes ${seconds}`;
    } else {
      return `${hours} hours ${mins} minutes ${seconds} seconds`;
    }
  };

  return <div className="timer">{formatTime()}</div>;
};

export default Timer;
