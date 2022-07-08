import axios from 'axios';
import { config } from 'config/config';
import {
  loginDataInterface,
  registerDataInterface,
} from 'interfaces/auth.interfaces';

const authApi = {
  register: (
    data: registerDataInterface,
  ) => axios.post(`${config.url}/auth/signup`, data),
  login: (
    data: loginDataInterface,
  ) => axios.post(`${config.url}/auth/signin`, data),
  logout: () => axios.get(`${config.url}/auth/logout`),
};

export default authApi;
