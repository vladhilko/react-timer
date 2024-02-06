import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

import Timer from './components/Timer';

const App = () => {
  return (
    <ChakraProvider>
      <Timer></Timer>
    </ChakraProvider>
  );
}

export default App;
