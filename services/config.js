// const env = process.env.RUN_ENV || 'develop';
const env = process.env.RUN_ENV || 'production' ;
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

console.log('config', config)

export {config};

