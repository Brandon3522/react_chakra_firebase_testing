import React, { useState } from 'react';
import { Text, Flex, Link, Input, Button, Box } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

function Nav() {
  const [scroll, setScroll] = useState(false);

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener('scroll', changeScroll);

  return (
    <Box>
      <Flex
        h="10vh"
        alignItems="center"
        p="6"
        boxShadow={scroll ? 'base' : 'none'}
        position="sticky"
        top="0"
        zIndex="sticky"
        w="full"
        backgroundColor="grey"
        color="white"
        fontSize="large"
        justifyContent="space-between"
      >
        {/* Change to Image */}
        <Link fontSize="xl" fontWeight="bold" mr="10" as={ReachLink} to="/Home">
          Logo
        </Link>

        <Link mr="10">View Study Decks</Link>
        <Link>Study Session</Link>

        <Flex>
          <Input
            placeholder="Search"
            backgroundColor="white"
            textColor="grey"
            ml="10"
            size="md"
            htmlSize={40}
            width="auto"
          ></Input>
          <Button fontSize="large" ml="3" color="white" variant="link">
            Search
          </Button>
        </Flex>

        <Flex>
          <Link mr="10">Settings</Link>
          <Link>Profile</Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Nav;
