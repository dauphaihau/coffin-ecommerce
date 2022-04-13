import {api} from "./config";
import axios from "axios";

export const userService = {

  getAll: async (user) => {
    try {
      // const res = await api.get("/api/admin/users")
      const res = await axios.get("/api/admin/users", {
        headers: { authorization: `Bearer ${user.token}` },
      })



      return {data: res.data, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  detail: async (id) => {
    try {
      const res = await api.get(`/api/admin/users/${id}`)
      return {data: res.data, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  create: async (data) => {
    try {
      const res = await api.post("/api/admin/users", data)
      console.log('res', res)
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  update: async (values) => {
    const {_id} = values
    try {
      await api.put(`/api/admin/users/${_id}`, values)
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }

  },

  delete: async (_id) => {
    try {
      await api.delete(`/api/admin/users/${_id}`)
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
}
