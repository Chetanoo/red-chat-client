import axios from 'axios';
import { config } from 'config/config';
import { MessageInterface } from 'interfaces/chat.interfaces';

const chatApi = {
  create: (
    data: MessageInterface,
  ) => axios.post(`${config.url}/messages/create`, data),
};

export default chatApi;
