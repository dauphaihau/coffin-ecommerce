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


  me: async () => {
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
