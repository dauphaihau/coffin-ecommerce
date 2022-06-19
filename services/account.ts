import axios from 'axios';
import {setCookie} from 'nookies';
import {encryptText, getHeaders, hashMD5} from '../utils/helpers';
import config from '../config.json';

const handleSetCookie = (data) => {
  setCookie(null, hashMD5(config.cookies.auth), JSON.stringify(data.auth), {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  });
  setCookie(null, hashMD5(config.cookies.profile), JSON.stringify(data.profile), {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  });
}

export const accountService = {
  register: async (values) => {
    const {password} = values
    const modifiedValues = {...values, password: encryptText(password, config.cryptoKey)}
    try {
      const {data: {data}} = await axios.post('/api/account/register', modifiedValues);
      handleSetCookie(data)
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
    const {password} = values
    const modifiedValues = {...values, password: encryptText(password, config.cryptoKey)}
    try {
      const {data: {data}} = await axios.post('/api/account/login', modifiedValues);
      handleSetCookie(data)
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
  forgotPassword: async (email) => {
    try {
      const {data} = await axios.post('/api/account/forgot-password', email);
      return {status: data.status, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  updatePassword: async (values) => {
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
  changePassword: async (values) => {

    // const {password} = values
    const modifiedValues = {
      ...values,
      password: encryptText(values.password, config.cryptoKey),
      newPassword: encryptText(values.newPassword, config.cryptoKey)
    }
    try {
      await axios.put('/api/account/change-pass', modifiedValues, getHeaders());
      return {isLoading: false, isSuccess: true};
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
      const {data: {data}} = await axios.get('/api/account/me', getHeaders())
      return {data, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        message: response?.data.message,
      };
    }
  },
}
