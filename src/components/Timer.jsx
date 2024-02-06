import React, { useState, useEffect, useRef } from 'react';
import { Button, Stack } from '@chakra-ui/react'

const Timer = () => {
  const [milisecondsPassed, setMilisecondsPassed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

    timerRef.current = setInterval(() => { setMilisecondsPassed(() => Date.now() - startTime) }, 100);
  }

  const resumeTimer = () => {
    setIsPaused(false);
    setIsStarted(true);

    clearInterval(timerRef.current)
    const resumeTime = Date.now() - milisecondsPassed;
    timerRef.current = setInterval(() => { setMilisecondsPassed(() => Date.now() - resumeTime) }, 100);
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-emerald-300 text-white">
      <div className="text-9xl font-mono mb-8">
        {timerLimit - milisecondsPassed}
      </div>
      <div className="mb-8">
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='outline' onClick={ timerButton().action }>
            { timerButton().name }
          </Button>
          <Button colorScheme='teal' variant='outline' onClick={resetTimer}>
            RESET
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default Timer
