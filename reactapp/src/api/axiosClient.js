import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'https://blogapp-production-66d9.up.railway.app',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Request interceptor for auth
api.interceptors.request.use(config => {
  try {
    // Do not attach Authorization header for public registration endpoints
    const skipAuthPaths = ['/api/users/register', '/api/users/debug']
    const requestPath = config.url || ''
    const shouldSkip = skipAuthPaths.some(p => requestPath.includes(p))
    
    if (!shouldSkip) {
      const basic = localStorage.getItem('basicAuth')
      
      // Use admin credentials for DELETE operations
      if (config.method?.toLowerCase() === 'delete') {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Basic ${btoa('admin:admin')}`
      } else if (basic) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Basic ${basic}`
      } else {
        // For unauthenticated requests, try with default user credentials
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Basic ${btoa('user:password')}`
      }
    }
  } catch (e) {
    console.error('Auth error:', e)
  }
  return config
}, error => {
  console.error('Request error:', error)
  return Promise.reject(error)
})

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('Backend server is not reachable.')
    }
    return Promise.reject(error)
  }
)

export default api
