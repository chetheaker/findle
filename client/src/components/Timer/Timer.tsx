import React, { useState } from 'react';
import { useEffect } from 'react';
import './style.css';

type TimerProps = {
  creationDate: number;
};

const Timer = ({ creationDate }: TimerProps) => {
  const endDate = new Date(creationDate + 86400000).getTime();
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const now = new Date().getTime();

      const remainingTime = endDate - now;

      const second = 1000;

      const minute = second * 60;

      const hour = minute * 60;

      setHoursLeft(Math.trunc(remainingTime / hour));

      setMinutesLeft(Math.trunc((remainingTime % hour) / minute));

      setSecondsLeft(Math.trunc((remainingTime % minute) / second));
    }, 1000);
  });
  return (
    <div className="white">
      Next Contest in{' '}
      {hoursLeft !== 0 && hoursLeft < 2
        ? `${hoursLeft} hour`
        : `${hoursLeft} hours`}{' '}
      {minutesLeft !== 0 && minutesLeft < 2
        ? `${minutesLeft} minute`
        : `${minutesLeft} minutes`}{' '}
      {secondsLeft !== 0 && secondsLeft < 2
        ? `${secondsLeft} second`
        : `${secondsLeft} seconds`}
    </div>
  );
};

export default Timer;
