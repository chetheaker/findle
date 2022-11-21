import React from 'react';
import { useEffect } from 'react';

type TimerProps = {
  creationDate: number;
};

const Timer = ({ creationDate }: TimerProps) => {
const endDate = new Date(creationDate + 86400).getTime();
let hoursLeft = 0;
let minutesLeft = 0
let secondsLeft = 0
 useEffect(() => {
   setInterval(() => {
   
   const now = new Date().getTime();
   
   const remainingTime = endDate - now;
   
   const second = 1000;
   
   const minute = second * 60;
   
   const hour = minute * 60;
   
   
   hoursLeft = Math.trunc(remainingTime / hour);
   
   minutesLeft = Math.trunc((remainingTime % hour) / minute);
   
   secondsLeft = Math.trunc((remainingTime % minute) / second);
   
   }, 1000);
 })
return (
  <div>Timer:{hoursLeft} {minutesLeft} {secondsLeft}</div>
)
};


export default Timer;
