import React, { useState, useEffect, useRef } from 'react';
import { Button, Stack } from '@chakra-ui/react'

const Timer = () => {

  const [milisecondsPassed, setMilisecondsPassed] = useState(0);
  const timerRef = useRef(null);
  const timerLimit = 2000;

  useEffect(() => {
    if (milisecondsPassed >= timerLimit) {
      setMilisecondsPassed(timerLimit);
      clearInterval(timerRef.current);
    }
  }, [milisecondsPassed]);

  const startTimer = () => {
    clearInterval(timerRef.current)
    const startTime = Date.now();

    timerRef.current = setInterval(() => { setMilisecondsPassed(() => Date.now() - startTime) }, 100);
  }

  const resumeTimer = () => {
    clearInterval(timerRef.current)
    const resumeTime = Date.now() - milisecondsPassed;
    timerRef.current = setInterval(() => { setMilisecondsPassed(() => Date.now() - resumeTime) }, 100);
  }

  const pauseTimer = () => {
    clearInterval(timerRef.current)
  }

  const resetTimer = () => {
    clearInterval(timerRef.current)
    setMilisecondsPassed(0)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-300 text-white">
      <div className="text-9xl font-mono mb-8">
        {timerLimit - milisecondsPassed}
      </div>
      <div className="mb-8">
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='outline' onClick={startTimer}>
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
