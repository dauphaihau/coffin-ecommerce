import axios from "axios";
import Cookie from "cookie-cutter";

export const accountService = {

  register: async (values) => {
    try {
      console.log('values', values)
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
      const res = await axios.post('/api/account/login', values);
      Cookie.set('userInfo', JSON.stringify(res.data));
      return {data: res.data, isLoading: false, isSuccess: true,};
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
      const res = await axios.get("/api/account/me", {
        headers: {authorization: `Bearer ${user.token}`}
      })
      return {data: res.data, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        message: response?.data.message,
      };
    }
  }
}
