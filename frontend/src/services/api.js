import axios from 'axios';

const api = axios.create({
  // baseUrl: process.env.REACT_APP_SERVER_URL
  baseURL: process.env.REACT_APP_SERVER_URL
});

export default api;
