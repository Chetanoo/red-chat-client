import Lobby from 'components/lobby';
import Room from 'components/room';
import { Flex } from '@chakra-ui/react';

function Main(): JSX.Element {
  return (
    <Flex h="100%" justifyContent="space-evenly">
      <Lobby />
      <Room />
    </Flex>
  );
}

export default Main;
