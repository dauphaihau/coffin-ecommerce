import Cookie from 'cookie-cutter';
import axios from 'axios';
import {getHeaders, hashMD5} from '../utils/helpers';
import { parseCookies, setCookie, destroyCookie } from "nookies";
import config from '../config.json';

export const accountService = {

  register: async (values) => {
    try {
      const {data: {data}} = await axios.post('/api/account/register', values);
      Cookie.set('userInfo', JSON.stringify(data));
      return {data, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  login: async (values) => {
    try {
      const {data: {data}} = await axios.post('/api/account/login', values);
      // console.log('data', data)
      setCookie(null, hashMD5(config.cookies.auth), JSON.stringify(data.auth), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
      setCookie(null, hashMD5(config.cookies.profile), JSON.stringify(data.profile), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
      // cookies.set(Helper.hashMD5(key), data, { expires: expiredAt, path: '/' })
      return {data, isLoading: false, isSuccess: true,};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  changePassword: async (values) => {
    try {
      await axios.put('/api/account/change-pass', values, getHeaders());
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  updatePassword: async (values) => {
    console.log('values', values)
    try {
      await axios.put('/api/account/reset-password', values);
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  forgotPassword: async (values) => {
    try {
      const {data} = await axios.post('/api/account/forgot-password', values);
      return {status: data.status, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  me: async () => {
    try {
      const {data} = await axios.get('/api/account/me', getHeaders())
      return {data, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        message: response?.data.message,
      };
    }
  }
}
