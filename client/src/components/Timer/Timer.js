import React from 'react';
import { useState, useEffect } from 'react';

const Timer = (props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  //console.log(props)

  const deadline2 = new Date(props.expirationDate).toString();


  const getTime = () => {
    const time = props.expirationDate - Date.now();
    // console.log(time)
    if (time < 0){
      // return window.location.reload(false);
      //createNewContest2(time);
    }

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(props.expirationDate), 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="timer">
      {hours >= 0 ? `${hours} hours ` : ''}{minutes >= 0 ? `${minutes} mins ` : ''}{seconds >= 0 ? `${seconds} sec ` : ''}
    </div>
  );
};

export default Timer;