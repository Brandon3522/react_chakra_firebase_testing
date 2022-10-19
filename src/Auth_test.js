import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as RouteLink,
} from 'react-router-dom';
// import { SignUp } from './routes';
import { Link as ReachLink } from 'react-router-dom';
import { useState } from 'react';

function Auth_test() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign In
              </Button>
            </Stack>
            <Stack spacing={10}>
              <Button 
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}>
                  <Link as={ReachLink} to='/signup'>Sign Up</Link>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Auth_test;
