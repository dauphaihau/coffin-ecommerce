import apiRequest from './request';
import axios from "axios";
import Cookie from "cookie-cutter";

const api = apiRequest.init("account");
export const accountService = {

  register: async (values) => {
    try {
      console.log('values', values)
      const res = await axios.post('/api/account/register', values);
      // const res = await api.post('/api/account/register', values);
      console.log('res', res)
      Cookie.set('userInfo', JSON.stringify(res.data));
      return {...res.data, isLoading: false, isSuccess: true};


    } catch ({response}) {
      console.log('response', response)
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  login: async (values) => {
    try {
      const res = await axios.post('/api/account/login', values);
      Cookie.set('userInfo', JSON.stringify(res.data));
      return {...res.data, isLoading: false, isSuccess: true,};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },


  me: async (user) => {
    try {
      const res = await api.get("/api/account/me")
      console.log('res', res)

      // const res = await api.get("/api/account/me", {
      //   headers: {
      //     authorization: `Bearer ${user.token}`
      //   }
      // })
      // console.log('res', res)
      return res.data;
    } catch (error) {
      if (error.message === 'Network Error') {
        return -1;
      }
      return false;
    }
  }
}
