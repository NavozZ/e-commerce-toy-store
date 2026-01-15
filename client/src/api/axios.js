import axios from 'axios';

// Uses the environment variable, or falls back to localhost if not set
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true // Important for sessions/cookies
});

export default instance;