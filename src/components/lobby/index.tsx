import {
  Box, Button, Flex, Input, Text, VStack,
} from '@chakra-ui/react';
import {
  handleCreateRoomInterface,
  handleJoinRoomInterface,
  RoomInterface,
} from 'interfaces/chat.interfaces';
import React, { useState } from 'react';

function Lobby(
  {
    rooms,
    handleCreateRoom,
    handleJoinRoom,
    activeRoom,
  }: {
      activeRoom: RoomInterface | null,
      rooms: RoomInterface[],
      handleCreateRoom: handleCreateRoomInterface,
      handleJoinRoom: handleJoinRoomInterface},
): JSX.Element {
  const [roomName, setRoomName] = useState('');
  return (
    <Box>
      <Flex>
        <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        <Button
          onClick={() => {
            handleCreateRoom(roomName);
            setRoomName('');
          }}
        >
          Create
        </Button>
      </Flex>
      <VStack>
        {
            rooms && rooms.map(
              (room: RoomInterface) => (
                <Text
                  key={room._id}
                  onClick={() => handleJoinRoom(room._id)}
                  style={
                    {
                      background: activeRoom && activeRoom._id === room._id ? 'red' : 'white',
                    }
                }
                >
                  {room.roomName}
                </Text>
              ),
            )
        }
      </VStack>
    </Box>
  );
}

export default Lobby;
