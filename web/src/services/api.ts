import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-proffy-version-one.herokuapp.com',
});

export default api;
