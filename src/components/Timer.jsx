import { Button, Stack } from '@chakra-ui/react'

const Timer = () => {
  return (
    <div>
      <Stack direction='row' spacing={4} align='center'>
        <Button colorScheme='teal' variant='outline'>
          START
        </Button>
        <Button colorScheme='teal' variant='outline'>
          STOP
        </Button>
        <Button colorScheme='teal' variant='outline'>
          RESUME
        </Button>
        <Button colorScheme='teal' variant='outline'>
          PAUSE
        </Button>
      </Stack>
    </div>
  )
}

export default Timer
