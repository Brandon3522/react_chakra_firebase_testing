import React from 'react';
import {
  ChakraProvider,
  theme,
  Flex,
  Container,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';
import { app, database } from './firebase.js';
import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDoc,
  get,
} from 'firebase/firestore';

function Home() {
  const [userData, setuserData] = useState({
    score: 0,
    email: 'email',
    password: 'password',
  });
  const [users, setUsers] = useState([]);

  const collectionRef = collection(database, 'users');
  const subcollection = collection(
    database,
    'users',
    'j5ZaxdlYUNE5w3GA4emp',
    'study-decks',
    'Q1DbwfMjkkyvNRH7Ne30',
    'flashcards'
  );

  const handleInput = event => {
    let newInput = { [event.target.name]: event.target.value };

    // ...data = everything in the previous state ?
    setuserData({ ...userData, ...newInput });
  };

  // Retrieve the flashcards under the specified user
  const getData = () => {
    getDocs(subcollection).then(response => {
      console.log(
        response.docs.map(item => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  // called when page renders
  // get all users
  useEffect(() => {

    // Asynchronous function
    const getUsers = async () => {
      const data = await getDocs(collectionRef);
      //console.log(data);
      setUsers(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    }

    getUsers()
  }, [])

  // fetchData();

  return (
    <Box>
      <Heading
        size={'4xl'}
        textAlign="center"
        top="50%"
        transform="translate(0, 500%)"
      >
        Home
      </Heading>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <br></br>
      <Button onClick={getData}>Get Data</Button>
      <Text>
        Database data: {userData.score} {userData.email} {userData.password}
      </Text>
      {/* Get all users */}
      <Box>
        {users.map((user) => {
          return (
            <Box>
              <Text>ID: {user.id}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Password: {user.password}</Text>
              <Text>Score: {user.score}</Text>
            </Box>
          )
        })}
      </Box>
      {/* Get all users */}
    </Box>
  );
}

export default Home;
