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
import Auth_test from './Auth_test';

function App() {
  return (
    <ChakraProvider theme={theme}>
      
      {/* <Auth_test /> */}
      <Home />
      {/* {/* <NavExample /> */}
    </ChakraProvider>
  );
}

export default App;
