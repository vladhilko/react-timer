import React, { useState, useEffect, useRef } from 'react';
import { Button, Stack } from '@chakra-ui/react'

const Timer = () => {
  const [milisecondsPassed, setMilisecondsPassed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const timerRef = useRef(null);
  const timerLimit = 2000;

  useEffect(() => {
    if (milisecondsPassed >= timerLimit) {
      setMilisecondsPassed(timerLimit);
      clearInterval(timerRef.current);
      setIsStarted(false);
      setIsPaused(false);
    }
  }, [milisecondsPassed]);

  const startTimer = () => {
    setIsStarted(true);
    setIsPaused(false);

    clearInterval(timerRef.current)
    const startTime = Date.now();

    timerRef.current = setInterval(() => { setMilisecondsPassed(() => Date.now() - startTime) }, 10);
  }

  const resumeTimer = () => {
    setIsPaused(false);
    setIsStarted(true);

    clearInterval(timerRef.current)
    const resumeTime = Date.now() - milisecondsPassed;
    timerRef.current = setInterval(() => { setMilisecondsPassed(() => Date.now() - resumeTime) }, 10);
  }

  const pauseTimer = () => {
    setIsStarted(false);
    setIsPaused(true);
    clearInterval(timerRef.current)
  }

  const resetTimer = () => {
    setIsStarted(false);
    setIsPaused(false);

    clearInterval(timerRef.current)
    setMilisecondsPassed(0)
  }

  const timerButton = () => {
    if (isStarted) {
      return { name: 'PAUSE', action: pauseTimer }
    } else if (!isStarted && isPaused) {
      return { name: 'RESUME', action: resumeTimer }
    } else {
      return { name: 'START', action: startTimer }
    }
  }

  const msToTime = (duration) => {
    const milliseconds = Math.floor((duration % 1000) / 10).toString().padStart(2, '0');
    const seconds = Math.floor((duration / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');

    return `${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
  };

  const restrictInputSize = (event) => {
    const { value } = event.target;
    if (value.length > 2) {
      event.target.value = value.substring(1)
    }
  };

  const handleHoursChange = (e) => {
    const value = e.target.value;
    setHours(value.slice(-2));
  };

  const handleMinutesChange = (e) => {
    const value = e.target.value;
    setMinutes(value.slice(-2));

    if (value.length > 2) {
      setHours((prevHours) => (prevHours ? prevHours.slice(-1) + value[0] : value[0]));
    }
  };

  const handleSecondsChange = (e) => {
    const value = e.target.value;
    setSeconds(value.slice(-2));

    if (value.length > 2) {
      // Update minutes and potentially hours
      setMinutes((prevMinutes) => {
        // Add the new digit to the end of previous minutes
        const newMinutes = (prevMinutes + value[0]).slice(-2);

        // Check if updating minutes should also update hours
        if (prevMinutes.length >= 2) {
          setHours((prevHours) => (prevHours ? prevHours.slice(-1) + newMinutes[0] : newMinutes[0]));
          return newMinutes.slice(-2);
        }

        return newMinutes;
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-300 text-white">
      <div className="text-9xl font-mono mb-8">
        {msToTime(timerLimit - milisecondsPassed)}
      </div>
      <div className="mb-8 flex">
        <input
          className="text-9xl font-mono mb-8 bg-transparent text-center w-1/3 focus:outline-none focus:border-b-2 focus:border-emerald-600"
          type="number"
          value={hours}
          onChange={handleHoursChange}
          placeholder="00h"
        />
        <input
          className="text-9xl font-mono mb-8 bg-transparent text-center w-1/3 focus:outline-none focus:border-b-2 focus:border-emerald-600"
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          placeholder="00m"
        />
        <input
          className="text-9xl font-mono mb-8 bg-transparent text-center w-1/3 focus:outline-none focus:border-b-2 focus:border-emerald-600"
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          placeholder="00s"
        />
      </div>
      <div className="mb-8">
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='outline' size='lg' onClick={ timerButton().action }>
            { timerButton().name }
          </Button>
          <Button colorScheme='teal' variant='outline' size='lg' onClick={resetTimer}>
            RESET
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default Timer
