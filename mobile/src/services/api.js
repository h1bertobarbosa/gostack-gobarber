import axios from 'axios';

// genymotion 10.0.3.2
const api = axios.create({
  baseURL: 'http://192.168.0.104:3333',
});

export default api;
