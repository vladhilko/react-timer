import React, { useState, useEffect, useRef } from 'react';
import { Button, Stack } from '@chakra-ui/react'

const Timer = () => {
  const defaultTimerValue = 300000;

  const [milisecondsPassed, setMilisecondsPassed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timerLimit, setTimerLimit] = useState(defaultTimerValue);

  const timerRef = useRef(null);

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
    const milliseconds = Math.floor((duration % 1000) / 10);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    let timeString = '';

    if (days > 0) timeString += `${days}d `;
    if (days > 0 || hours > 0) timeString += `${hours.toString().padStart(2, '0')}h `;
    if (days > 0 || hours > 0 || minutes > 0) timeString += `${minutes.toString().padStart(2, '0')}m `;
    if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) timeString += `${seconds.toString().padStart(2, '0')}s `;
    timeString += `${milliseconds.toString().padStart(2, '0')}ms`;

    return timeString.trim();
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

  const handleFormSubmit= (e) => {
    if (e.key === 'Enter') {
      submitTimerLimit();
      startTimer();
      setIsEditing(false);
    }
  };

  const submitTimerLimit = () => {
    // Convert hours, minutes, and seconds to milliseconds and sum them up
    const totalMilliseconds = ((parseInt(hours) || 0) * 3600000 + (parseInt(minutes) || 0) * 60000 + (parseInt(seconds) || 0) * 1000) || defaultTimerValue;
    setTimerLimit(totalMilliseconds);
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-300 text-white p-4">
      {!isEditing && (
        <div
          className="font-mono mb-8 cursor-pointer text-5xl  md:text-7xl md:leading-snug lg:text-9xl lg:leading-normal xl:text-9xl xl:leading-normal"
          onClick={toggleEditing}
        >
          {msToTime(timerLimit - milisecondsPassed)}
        </div>
      )}

      {isEditing && (
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex flex-col items-center space-y-4 w-full md:flex-row md:w-1/3">
            <input
              className="text-6xl md:text-9xl font-mono mb-8 bg-transparent text-center w-full focus:outline-none focus:border-b-2 focus:border-emerald-600"
              type="number"
              value={hours}
              onChange={handleHoursChange}
              placeholder="00h"
              onKeyDown={handleFormSubmit}
            />
            {hours && <button className="text-6xl md:text-9xl font-mono">h</button>}
          </div>
          <div className="flex flex-col items-center space-y-4 w-full md:flex-row md:w-1/3">
            <input
              className="text-6xl md:text-9xl font-mono mb-8 bg-transparent text-center w-full focus:outline-none focus:border-b-2 focus:border-emerald-600"
              type="number"
              value={minutes}
              onChange={handleMinutesChange}
              placeholder="00m"
              onKeyDown={handleFormSubmit}
            />
            {minutes && <button className="text-6xl md:text-9xl font-mono">m</button>}
          </div>
          <div className="flex flex-col items-center space-y-4 w-full md:flex-row md:w-1/3">
            <input
              className="text-6xl md:text-9xl font-mono mb-8 bg-transparent text-center w-full focus:outline-none focus:border-b-2 focus:border-emerald-600"
              type="number"
              value={seconds}
              onChange={handleSecondsChange}
              placeholder="00s"
              onKeyDown={handleFormSubmit}
            />
            {seconds && <button className="text-6xl md:text-9xl font-mono">s</button>}
          </div>
        </div>
      )}

      <div className="mb-8">
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='outline' size='lg' onClick={(e) => { submitTimerLimit(); timerButton().action(); setIsEditing(false); }}>
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
