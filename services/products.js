import axios from "axios";
import {getHeaders} from "../utils/helpers";

export const productService = {
  getAll: async () => {
    try {
      const res = await axios.get("/api/admin/products", getHeaders())
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
      const res = await axios.get(`/api/admin/products/${id}`, getHeaders())
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
      const res = await axios.post("/api/admin/products", data, getHeaders())
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
      await axios.put(`/api/admin/products/${_id}`, values, getHeaders())
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
      await axios.delete(`/api/admin/products/${_id}`, getHeaders())
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
