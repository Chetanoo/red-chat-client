import { Link } from 'react-router-dom';
import React from 'react';
import { Flex } from '@chakra-ui/react';

function Navigation(): JSX.Element {
  return (
    <Flex>
      <Link to="/">main</Link>
      <Link to="signin">Sign In</Link>
      <Link to="signup">Sign Up</Link>
    </Flex>
  );
}

export default Navigation;
