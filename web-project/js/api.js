const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(config => {
  config.headers = config.headers || {};
  const token = window.localStorage.getItem("_TOKEN_");

  if (token) {
    config.headers.authorization = token;
  }
  return config;
});
