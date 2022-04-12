// const env = process.env.RUN_ENV || 'develop';
const env = process.env.RUN_ENV || 'local';

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

export {config};

