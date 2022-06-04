import Cookie from "cookie-cutter";
import axios from "axios";
import {getHeaders} from "../utils/helpers";

export const accountService = {

  register: async (values) => {
    try {
      const res = await axios.post('/api/account/register', values);
      Cookie.set('userInfo', JSON.stringify(res.data));
      return {data: res.data, isLoading: false, isSuccess: true};
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
      Cookie.set('userInfo', JSON.stringify(data));
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

  me: async (userInfo) => {
    try {
      const res = await axios.get("/api/account/me", getHeaders())
      return {data: res.data, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        message: response?.data.message,
      };
    }
  }
}
