import dayjs from 'dayjs'
import 'dayjs/locale/id'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('id')
dayjs.extend(relativeTime)

/**
 * Format date to Indonesian format
 */
export const formatDate = (date, format = 'DD MMMM YYYY') => {
  if (!date) return '-'
  const d = dayjs(date)
  if (!d.isValid()) return '-'
  return d.format(format)
}

/**
 * Get relative time (e.g., "2 jam yang lalu")
 */
export const getRelativeTime = (date) => {
  if (!date) return '-'
  const d = dayjs(date)
  if (!d.isValid()) return '-'
  return d.fromNow()
}

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, length = 100) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

/**
 * Strip HTML tags from string
 */
export const stripHtml = (html) => {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

/**
 * Get storage URL for images
 */
export const getStorageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const baseUrl = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'
  return `${baseUrl}/${path}`
}

/**
 * Get avatar URL (fallback to UI Avatars)
 */
export const getAvatarUrl = (user) => {
  if (user?.avatar_url) {
    return getStorageUrl(user.avatar_url)
  }
  if (user?.avatar) {
    return getStorageUrl(user.avatar)
  }
  const name = user?.name || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF8C42&color=fff&size=200`
}

/**
 * Calculate reading time in minutes
 */
export const calculateReadingTime = (text) => {
  if (!text) return 0
  const wordsPerMinute = 200
  const words = stripHtml(text).split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

/**
 * Format reading time
 */
export const formatReadingTime = (minutes) => {
  if (minutes < 1) return 'Kurang dari 1 menit'
  if (minutes === 1) return '1 menit'
  return `${minutes} menit`
}

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Generate slug from text
 */
export const slugify = (text) => {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

/**
 * Format number with thousand separators
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0'
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Scroll to element smoothly
 */
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

/**
 * Share via Web Share API
 */
export const shareContent = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data)
      return true
    } catch (err) {
      console.error('Error sharing:', err)
      return false
    }
  }
  return false
}

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Get query parameters from URL
 */
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Get file size in human readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export default {
  formatDate,
  getRelativeTime,
  truncate,
  stripHtml,
  getStorageUrl,
  getAvatarUrl,
  calculateReadingTime,
  formatReadingTime,
  debounce,
  throttle,
  capitalize,
  slugify,
  formatNumber,
  scrollToElement,
  copyToClipboard,
  shareContent,
  isMobile,
  getQueryParams,
  isValidEmail,
  formatFileSize,
}
