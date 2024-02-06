import React, { useState, useEffect, useRef } from 'react';
import { Button, Stack } from '@chakra-ui/react'

const Timer = () => {

  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(resumeCountdown, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const resumeCountdown= () => {
    setSeconds(prevValue => prevValue + 1);
  }

  const pauseTimer = () => {
    clearInterval(timerRef.current)
  }

  const resetTimer = () => {
    clearInterval(timerRef.current)
    setSeconds(0);
  }

  const resumeTimer = () => {
    clearInterval(timerRef.current);
    resumeCountdown();
    timerRef.current = setInterval(resumeCountdown, 1000);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-300 text-white">
      <div className="text-9xl font-mono mb-8">
        10:{seconds}
      </div>
      <div className="mb-8">
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='outline'>
            START
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={resetTimer}>
            RESET
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={resumeTimer}>
            RESUME
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={pauseTimer}>
            PAUSE
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default Timer
