import axios from 'axios';
import { config } from 'configs/config';
import {
  loginDataInterface,
  registerDataInterface,
} from 'interfaces/auth.interfaces';

const authApi = {
  register: (
    data: registerDataInterface,
  ) => axios.post(`${config.url}/auth/register`, data),
  login: (
    data: loginDataInterface,
  ) => axios.post(`${config.url}/auth/login`, data),
  logout: () => axios.get(`${config.url}/auth/logout`),
};

export default authApi;
