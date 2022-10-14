import React from 'react';
import {
  ChakraProvider,
  theme,
  Flex,
  Container,
} from '@chakra-ui/react';
import Header from './Header';
import Header1 from './Header1';
import NavExample from './NavExample.js';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      
      <Home />
      {/* {/* <NavExample /> */}
    </ChakraProvider>
  );
}

export default App;
