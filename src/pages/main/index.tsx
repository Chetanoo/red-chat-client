import Lobby from 'components/lobby';
import Room from 'components/room';
import { Flex } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Navigate } from 'react-router-dom';
import { config } from '../../configs/config';
import { MessageInterface, RoomInterface } from '../../interfaces/chat.interfaces';

function Main(): JSX.Element {
  const [cookies] = useCookies(['userData']);
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [activeRoom, setActiveRoom] = useState<RoomInterface | null>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(config.url);
    socketRef.current.emit('requestRooms');
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current?.on('initialRooms', (initialRooms) => {
      console.log(initialRooms);
      if (initialRooms) setRooms(initialRooms);
    });
    socketRef.current?.on('roomCreated', (room: RoomInterface) => {
      setRooms([...rooms, room]);
    });
    socketRef.current?.on('roomJoined', (room: RoomInterface) => {
      setRooms([...rooms, room]);
    });
    socketRef.current?.on('messageSent', (message: MessageInterface) => {
      if (message) setMessages([...messages, message]);
    });
  }, [rooms, messages]);

  if (!cookies.userData) {
    return <Navigate to="/login" />;
  }

  const {
    id, email, username, token,
  } = cookies.userData;

  const handleCreateRoom = (roomName: string): void => {
    socketRef.current?.emit('createRoom', { roomName, userId: id });
  };

  const handleJoinRoom = (roomId: string): void => {
    socketRef.current?.emit('joinRoom', { roomId, userId: id }, (room: RoomInterface) => {
      setActiveRoom(room);
      const { messages: activeRoomMessages } = room;
      if (messages) setMessages(activeRoomMessages || []);
    });
  };

  const handleSendMessage = (text: string, roomId: string): void => {
    socketRef.current?.emit('sendMessage', { text, userId: id, roomId }, () => {
      console.log('message send');
    });
  };

  return (
    <Flex h="100%" justifyContent="space-evenly">
      <Lobby
        activeRoom={activeRoom}
        rooms={rooms}
        handleCreateRoom={handleCreateRoom}
        handleJoinRoom={handleJoinRoom}
      />
      <Room
        userId={id}
        activeRoom={activeRoom}
        messages={messages}
        handleSendMessage={handleSendMessage}
      />
    </Flex>
  );
}

export default Main;
