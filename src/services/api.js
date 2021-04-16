import axios from 'axios';
import serverUrl from '../utils/serverUrl'

export default axios.create({
  baseURL: process.env.serverUrl,
});
