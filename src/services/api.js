import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Create axios instance
// Handle potential 'undefined' string from Vite env
const getBaseURL = () => {
  const envBase = import.meta.env.VITE_API_BASE_URL
  if (!envBase || envBase === 'undefined' || envBase === '') {
    return '' // Fallback to relative path to use Vite proxy
  }
  return envBase
}

const API_BASE_URL = getBaseURL()
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1'

const api = axios.create({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/api/${API_VERSION}` : `/api/${API_VERSION}`,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request in development
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log('API Request:', {
        method: config.method,
        url: config.url,
        data: config.data,
        params: config.params,
      })
    }

    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      })
    }

    // Return data directly
    return response.data
  },
  (error) => {
    // Log error in development
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.error('API Error:', error)
    }

    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response

      switch (status) {
        case 400:
          toast.error(data.message || 'Permintaan tidak valid')
          break
        case 401:
          toast.error('Sesi Anda telah berakhir. Silakan login kembali')
          // Clear auth token
          localStorage.removeItem('auth_token')
          // Redirect to login if needed
          // window.location.href = '/login'
          break
        case 403:
          toast.error('Anda tidak memiliki akses')
          break
        case 404:
          toast.error(data.message || 'Data tidak ditemukan')
          break
        case 422:
          // Validation errors
          if (data.errors) {
            const firstError = Object.values(data.errors)[0]
            toast.error(Array.isArray(firstError) ? firstError[0] : firstError)
          } else {
            toast.error(data.message || 'Validasi gagal')
          }
          break
        case 429:
          toast.error('Terlalu banyak permintaan. Silakan coba lagi nanti')
          break
        case 500:
          toast.error('Terjadi kesalahan server. Silakan coba lagi')
          break
        case 503:
          toast.error('Layanan sedang dalam pemeliharaan')
          break
        default:
          toast.error(data.message || 'Terjadi kesalahan')
      }

      return Promise.reject(error.response.data)
    } else if (error.request) {
      // Request made but no response
      toast.error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda')
      return Promise.reject({
        message: 'Network error',
        error: error.request,
      })
    } else {
      // Something else happened
      toast.error('Terjadi kesalahan yang tidak terduga')
      return Promise.reject({
        message: error.message,
        error: error,
      })
    }
  },
)

// Helper function to handle file uploads
export const uploadFile = async (url, file, onProgress) => {
  const formData = new FormData()
  formData.append('file', file)

  return api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentCompleted)
      }
    },
  })
}

// Helper function to build query string
export const buildQueryString = (params) => {
  const query = new URLSearchParams()

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== null && value !== undefined && value !== '') {
      query.append(key, value)
    }
  })

  return query.toString()
}

export default api
