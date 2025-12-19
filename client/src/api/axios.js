import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost:82/api' // Port 82 is your backend in compose.yaml
});
export default instance;