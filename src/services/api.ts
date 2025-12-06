import axios from 'axios'
import { BACKEND_URL } from '../config'

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// attach token if present in localStorage
api.interceptors.request.use((cfg) => {
  try {
    const token = localStorage.getItem('token') || ''
    if (token && cfg.headers) {
      cfg.headers.token = token
    }
  } catch (e) {
    // ignore
  }
  return cfg
})

export default api
