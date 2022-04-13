import axios from 'axios'
import Cookie from "cookie-cutter";
import {config} from "./config";

const api = {
  instances: {},
  init: (instanceName) => {
    if (!api.instances[instanceName]) {
      api.instances[instanceName] = axios.create({
        baseURL: config.endpoint,
        timeout: 1000,
      });
      api.instances[instanceName].interceptors.request.use(
        function (config) {
          let user = Cookie.get("userInfo");
          user = JSON.parse(user)
          if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
          }
          // const token = Cookie.get("accessToken");
          // if (token) {
          //   config.headers.Authorization = `Bearer ${token}`;
          // }
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
      api.instances[instanceName].interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
    return api.instances[instanceName];
  },
};

export default api;
