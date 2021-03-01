import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CharGrid from './components/CharGrid';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CharGrid />
    </ChakraProvider>
  );
}

export default App;
