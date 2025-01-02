import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.1.162:3100/api/v1/',
  });