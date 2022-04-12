import apiRequest from './request';

const api = apiRequest.init("users");
export const userService = {

  getAll: async () => {
    try {
      const res = await api.get("/api/admin/users")
      return {data: res.data, isLoading: false, isSuccess: true};
    } catch (error) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
}
