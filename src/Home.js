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
  setDoc,
  limit,
} from 'firebase/firestore';

function Home() {
  const userID = 'j5ZaxdlYUNE5w3GA4emp'
  const studyDeck_ID = 'Q1DbwfMjkkyvNRH7Ne30'

  const [userData, setuserData] = useState({
    score: 0,
    email: 'email',
    password: 'password',
  });
  const [users, setUsers] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [studyDecks, setStudyDecks] = useState([]);
  const [studyDecks_limit, setStudyDecks_limit] = useState([]);
  const [studyDeck_name, setStudyDeck_name] = useState('');
  const [flashcard_question, setFlashcard_question] = useState('');
  const [flashcard_answer, setFlashcard_answer] = useState('');
  const [user_score, setUsers_score] = useState(0);

  const collectionRef = collection(database, 'users');
  const user_ref = doc(database, 'users', userID);
  const user_studyDeck_ref = collection(database, 'users', userID, 'study-decks');
  const flashcards_ref = collection(
    database,
    'users',
    userID,
    'study-decks',
    studyDeck_ID,
    'flashcards'
  );
  const studyDecks_ref = collection(
    database,
    'users',
    userID,
    'study-decks'
  )

  // Examples in my github repo: react_chakra_firebase_testing - src/home.js

  // Add study deck to database
  // Database reference: const user_studyDeck_ref = collection(database, 'users', userID, 'study-decks');
  // State: const [studyDeck_name, setStudyDeck_name] = useState('');
  function add_studyDeck() {
    addDoc(user_studyDeck_ref, {
        name: studyDeck_name,
    })
        .then(() => {
            alert('Data Added');
        })
        .catch((err) => {
            alert(err.message);
        });
  };

  // Get user score
  // Database reference: const user_ref = doc(database, 'users', userID);
  // State: const [user_score, setUsers_score] = useState(0);
  useEffect(() => {
    const getUser_score = async () => {
      const data =  await getDoc(user_ref);

      const score = data.data().score;
      console.log(score)
      setUsers_score(score)

    }
    getUser_score();
  }, [])


  // Create a flashcard subcollection within a studydeck, and add a flashcard
  // Database reference: In function
  // State: const [flashcard_question, setFlashcard_question] = useState('');
  //        const [flashcard_answer, setFlashcard_answer] = useState('');
  const add_flashcard = () => {
    const ref = collection(database, 'users', userID, 'study-decks', 'bVNiowOIVvDtSMffcsCc', 'flashcards');
    addDoc(ref, {
      question: flashcard_question,
      answer: flashcard_answer,
     })
      .then(() => {
          alert('Data Added');
      })
      .catch((err) => {
          alert(err.message);
      });

  }

  // const handleInput = event => {
  //   let newInput = { [event.target.name]: event.target.value };

  //   // ...data = everything in the previous state ?
  //   setuserData({ ...userData, ...newInput });
  // };

  // Retrieve the flashcards under the specified user when called
  // Database reference: const flashcards_ref = collection(database,'users',userID,'study-decks',studyDeck_ID,'flashcards');
  // State: None, console.log info
  const getData = () => {
    getDocs(flashcards_ref).then(response => {
      console.log(
        response.docs.map(item => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  // Get all study decks from user on page load
  // Database reference: const studyDecks_ref = collection(database,'users',userID,'study-decks')
  // State: const [studyDecks, setStudyDecks] = useState([]);
  useEffect(() => {
    const getStudyDecks = async () => {
      const data =  await getDocs(studyDecks_ref);

      setStudyDecks(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

    }
    getStudyDecks();
  }, [])

  // Retrieve study decks, limit the number of study decks retrieved to 4
  // Database reference: const studyDecks_ref = collection(database,'users',userID,'study-decks')
  // and query located in function
  // State: const [studyDecks_limit, setStudyDecks_limit] = useState([]);
  useEffect(() => {
    const q = query(studyDecks_ref, limit(4))
    const getStudyDecks_limit = async () => {
      const data =  await getDocs(q);

      setStudyDecks_limit(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

    }
    getStudyDecks_limit();
  }, [])

  // Get all flashcards from study deck on page load
  // Database reference: const flashcards_ref = collection(database,'users',userID,'study-decks',studyDeck_ID,'flashcards');
  // State: const [flashcards, setFlashcards] = useState([]);
  useEffect(() => {
    const getFlashcards = async () => {
      const data = await getDocs(flashcards_ref);

      setFlashcards(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    }

    getFlashcards()
  }, [])


  // Get all users on page load
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

  return (
    <Box>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <br></br>
      <Button onClick={getData}>Get Flashcards</Button>

      {/* Get all flashcards from study deck */}
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
      {/* Get all flashcards from study deck */}
      <br></br>

      {/* Get all study decks */}
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
      {/* Get all study decks */}
      <br></br>

      {/* Get limited study decks */}
      <Box>
        <Heading>STUDY DECKS</Heading>
        {studyDecks_limit.map((studyDeck) => {
          return (
            <Box>
              <Text>ID: {studyDeck.id}</Text>
              <Text>Name: {studyDeck.name}</Text>
            </Box>
          )
        })}
      </Box>
      {/* Get limited study decks */}
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

      {/* Get user score */}
      <Box>
        <Heading>USERS SCORE</Heading>
        <Text>User Score: {user_score}</Text>
      </Box>
      {/* Get user score */}
      <br></br>

      {/* Add study deck by name */}
      <Box>
      <FormControl>
        <FormLabel>Study Deck</FormLabel>
        <Input type="text" onChange={e => setStudyDeck_name(e.target.value)} />
        <Button onClick={add_studyDeck}>Add study deck</Button>
      </FormControl>
      <Text>Study deck {studyDeck_name}</Text>
      </Box>
      {/* Add study deck by name */}
      <br></br>
      <br></br>

      {/* Add flashcard subcollection and values */}
      <Box>
      <FormControl>
        <FormLabel>Flashcard Question</FormLabel>
        <Input type="text" onChange={e => setFlashcard_question(e.target.value)} />
        <FormLabel>Flashcard Answer</FormLabel>
        <Input type="text" onChange={e => setFlashcard_answer(e.target.value)} />
        <Button onClick={add_flashcard}>Add flashcard</Button>
      </FormControl>
      </Box>
      {/* Add flashcard subcollection and values */}
      <br></br>

      <Text>
        Database data: {userData.score} {userData.email} {userData.password}
      </Text>

    </Box>
  );
}

export default Home;
