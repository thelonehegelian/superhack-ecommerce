import React, { useState, useEffect } from 'react';

const DecreasingTimer = ({ resetTimer }) => {
  const initialMinutes = 12;
  const initialSeconds = 0;

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div>
      <h1 className='text-black text-4xl font-bold'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
    </div>
  );
};

export default DecreasingTimer;
