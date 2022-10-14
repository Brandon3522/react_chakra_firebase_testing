import React from 'react'
import {
    ChakraProvider,
    theme,
    Flex,
    Container,
    Heading,
    Text,
    Box,

  } from '@chakra-ui/react';

function Home() {
  return (
    <Box>
    <Heading size={"4xl"} textAlign="center" top="50%" transform= "translate(0, 500%)">Home</Heading>
    <Text>BOB</Text>
    </Box>
    
  )
}

export default Home