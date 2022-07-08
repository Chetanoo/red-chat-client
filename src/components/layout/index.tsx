import { Flex } from '@chakra-ui/react';

function Layout({ children }: {children: Array<JSX.Element>}): JSX.Element {
  return <Flex minH="100vh" flexDirection="column">{children}</Flex>;
}

export default Layout;
