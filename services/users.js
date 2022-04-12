import apiRequest from './request';

const api = apiRequest.init("users");
export const userService = {

  getAll: async () => {
    try {
      const res = await api.get("/api/admin/users")
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
      console.log('res', res)
      return {data: res.data, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  update: async (id) => {
    try {
      const res = await api.put("/api/admin/users", id)
      return {isLoading: false, isSuccess: true};
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
}
