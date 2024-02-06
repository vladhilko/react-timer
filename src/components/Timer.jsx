import { Button, Stack } from '@chakra-ui/react'

const Timer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-600 text-white">
      <div className="mb-8">
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
    </div>
  )
}

export default Timer
