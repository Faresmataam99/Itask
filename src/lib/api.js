const { default: axios } = require("axios");
const currentServer = typeof window == "undefined";
const token = !currentServer && localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export default api;
