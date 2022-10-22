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
  const [flashcards, setFlashcards] = useState([]);
  const [studyDecks, setStudyDecks] = useState([]);

  const collectionRef = collection(database, 'users');
  const flashcards_ref = collection(
    database,
    'users',
    'j5ZaxdlYUNE5w3GA4emp',
    'study-decks',
    'Q1DbwfMjkkyvNRH7Ne30',
    'flashcards'
  );
  const studyDecks_ref = collection(
    database,
    'users',
    'j5ZaxdlYUNE5w3GA4emp',
    'study-decks'
  )

  const handleInput = event => {
    let newInput = { [event.target.name]: event.target.value };

    // ...data = everything in the previous state ?
    setuserData({ ...userData, ...newInput });
  };

  // Retrieve the flashcards under the specified user when called
  const getData = () => {
    getDocs(flashcards_ref).then(response => {
      console.log(
        response.docs.map(item => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  // get all study decks from user on page load
  useEffect(() => {
    const getStudyDecks = async () => {
      const data =  await getDocs(studyDecks_ref);

      setStudyDecks(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

    }
    getStudyDecks();
  }, [])

  // get all flashcards from study deck on page load
  useEffect(() => {
    const getFlashcards = async () => {
      const data = await getDocs(flashcards_ref);

      setFlashcards(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    }

    getFlashcards()
  }, [])


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
      {/* <Heading
        size={'4xl'}
        textAlign="center"
        top="50%"
        transform="translate(0, 500%)"
      >
        Home
      </Heading> */}
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <br></br>
      <Button onClick={getData}>Get Flashcards</Button>

      <Box>
        <Heading>FLASHCARDS</Heading>
        {flashcards.map((flashcard) => {
          return (
            <Box>
              <Text>ID: {flashcard.id}</Text>
              <Text>Question: {flashcard.question}</Text>
              <Text>Answer: {flashcard.answer}</Text>
            </Box>
          )
        })}
      </Box>
      <br></br>
      <Box>
        <Heading>STUDY DECKS</Heading>
        {studyDecks.map((studyDeck) => {
          return (
            <Box>
              <Text>ID: {studyDeck.id}</Text>
              <Text>Name: {studyDeck.name}</Text>
            </Box>
          )
        })}
      </Box>

      <br></br>
      {/* Get all users */}
      <Box>
        <Heading>USERS</Heading>
        {users.map((user, i) => {
          return (
            <Box key={i}>
              <Text key={i}>ID: {user.id}</Text>
              <Text key={i}>Email: {user.email}</Text>
              <Text key={i}>Password: {user.password}</Text>
              <Text key={i}>Score: {user.score}</Text>
            </Box>
          )
        })}
      </Box>
      {/* Get all users */}

      <br></br>
      <br></br>
      <Text>
        Database data: {userData.score} {userData.email} {userData.password}
      </Text>

    </Box>
  );
}

export default Home;
