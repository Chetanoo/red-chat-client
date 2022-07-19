import axios from 'axios';
import { config } from 'configs/config';
import { MessageInterface } from 'interfaces/chat.interfaces';

const chatApi = {
  createRoom: (
    roomName: string,
    token: string,
  ) => axios.post(
    `${config.url}/rooms/create`,
    roomName,
    { headers: { Authorization: token } },
  ),
  createMessage: (
    data: MessageInterface,
    token: string,
  ) => axios.post(
    `${config.url}/messages/create`,
    data,
    { headers: { Authorization: token } },
  ),
};

export default chatApi;
