import axios from 'axios';

const API_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  BOOKS: '/books',
};

export type API_ENDPOINTS_TYPE = {
  REGISTER: {
    BODY: {
      username: string;
      password: string;
    };
    SUCCESS: {
      user: {
        id: string;
        username: string;
        token: string;
      };
    };
    ERROR: {
      message: string;
    };
  };
};

const restAPI = axios.create({
  baseURL: 'http://104.248.26.141:3000/api',
});

export const registerUser = ({
  username,
  password,
}: API_ENDPOINTS_TYPE['REGISTER']['BODY']) =>
  restAPI.post(API_ENDPOINTS.REGISTER, {
    username,
    password,
  });

export default restAPI;
