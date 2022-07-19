import { Flex, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import { useCookies } from 'react-cookie';
import authApi from 'services/api/auth.api';
import { messages } from '../../configs/toastConfig';
import { constants } from '../../configs/constants';

function Header(): JSX.Element {
  const [cookies, setCookie, removeCookie] = useCookies([constants.cookieName]);
  const toast = useToast();
  const handleLogout = (): void => {
    authApi.logout()
      .then((res) => {
        const { data } = res;
        toast({
          title: messages.logout,
          description: data?.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        removeCookie(constants.cookieName, { path: '/' });
      })
      .catch((err) => {
        const { error } = err.response.data;
        toast({
          title: messages.logoutError,
          description: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };
  return (
    <Flex p=".5rem">
      <Flex mr="auto">
        <Link to="/"><Text fontSize="lg">Main</Text></Link>
      </Flex>
      { cookies?.userData
        ? <Flex direction="column"><Text onClick={() => handleLogout()}>Logout</Text></Flex>
        : (
          <Flex>
            <Link to="login"><Text fontSize="lg" mr=".5rem">Login</Text></Link>
            <Link to="register"><Text fontSize="lg">Register</Text></Link>
          </Flex>
        )}

    </Flex>
  );
}

export default Header;
