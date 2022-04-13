import axios from "axios";
import Cookie from "cookie-cutter";

const env = process.env.RUN_ENV || 'production';
console.log('process-env-run-env', process.env.RUN_ENV)

const config = {
  local: {
    endpoint: "http://localhost:3000",
  },
  develop: {
    // endpoint: "http://10.0.0.38:1000",
  },
  production: {
    endpoint: "https://coffin-ecommerce.vercel.app",
  },
}[env];

export const api = axios.create({
  baseURL: config.endpoint,
  timeout: 1000,
})

api.interceptors.request.use((config) => {
  let user = JSON.parse(Cookie.get("userInfo"))
  console.log('user', user)
  config.headers = {
    authorization: `Bearer ${user.token}`

      // headers: { authorization: `Bearer ${user.token}` },
  }
  // console.log('config', config)
  return config
}, (errors) => {
  console.log('errors', errors)
  return Promise.reject(errors)
})