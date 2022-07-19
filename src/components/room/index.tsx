import {
  Box, Button, Flex, Input, Text, VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { handleSendMessageInterface, MessageInterface, RoomInterface } from 'interfaces/chat.interfaces';

function Room(
  {
    userId,
    handleSendMessage,
    activeRoom,
    messages,
  }:
        {
            userId: string
            messages: MessageInterface[]
            handleSendMessage: handleSendMessageInterface
            activeRoom: RoomInterface | null
        },
): JSX.Element {
  const [message, setMessage] = useState('');

  return (
    <Box>
      {
            activeRoom && (
            <VStack>
              <Flex>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  onClick={() => {
                    handleSendMessage(message, activeRoom._id);
                    setMessage('');
                  }}
                >
                  Send
                </Button>
              </Flex>
              <Flex
                flexDirection="column"
                w="100%"
              >
                {
                    messages && messages.map(
                      (m: MessageInterface) => (
                        <Flex
                          key={m._id}
                          flexDirection="column"
                          w="50px"
                          alignSelf={m.author._id === userId ? 'flex-end' : 'flex-start'}
                        >
                          <Text fontSize="xs">{m.author.username}</Text>
                          <Text fontSize="md">{m.text}</Text>
                        </Flex>
                      ),
                    )
                }
              </Flex>
            </VStack>
            )
        }
    </Box>

  );
}

export default Room;
