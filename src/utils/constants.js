// Application Constants
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Polinema Mengajar'
export const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:3000'
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
export const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

// Social Media Links
export const SOCIAL_LINKS = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/polinemamengajar',
  youtube: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com/@polinemamengajar',
  tiktok: import.meta.env.VITE_TIKTOK_URL || 'https://tiktok.com/@polinemamengajar',
  email: import.meta.env.VITE_EMAIL || 'info@polinemamengajar.org',
  phone: import.meta.env.VITE_PHONE || '+62xxx',
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 12,
  NEWS_PAGE_SIZE: parseInt(import.meta.env.VITE_NEWS_PAGE_SIZE) || 9,
  BLOG_PAGE_SIZE: parseInt(import.meta.env.VITE_BLOG_PAGE_SIZE) || 10,
}

// Navigation Menu
export const NAVIGATION_MENU = [
  {
    name: 'Beranda',
    path: '/',
    icon: 'home',
  },
  {
    name: 'Tentang Kami',
    path: '/tentang-kami',
    icon: 'info',
  },
  {
    name: 'Program',
    path: '/program',
    icon: 'book',
  },
  {
    name: 'Berita',
    path: '/berita',
    icon: 'newspaper',
  },
  {
    name: 'Blog',
    path: '/blog',
    icon: 'edit',
  },
  {
    name: 'Organisasi',
    path: '/organisasi',
    icon: 'users',
  },
  {
    name: 'Kontak',
    path: '/kontak',
    icon: 'mail',
  },
]

// Footer Links
export const FOOTER_LINKS = {
  quickLinks: [
    { name: 'Tentang Kami', path: '/tentang-kami' },
    { name: 'Program', path: '/program' },
    { name: 'Berita', path: '/berita' },
    { name: 'Blog', path: '/blog' },
  ],
  organization: [
    { name: 'Struktur Organisasi', path: '/organisasi' },
    { name: 'Tim Inti', path: '/organisasi#core-team' },
    { name: 'Kontak', path: '/kontak' },
    { name: 'Kemitraan', path: '/kemitraan' },
  ],
}

// Post Status
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SCHEDULED: 'scheduled',
  ARCHIVED: 'archived',
}

// Comment Status
export const COMMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  AUTHOR: 'author',
  CONTRIBUTOR: 'contributor',
}

// Position Types
export const POSITION_TYPES = {
  CORE_TEAM: 'core_team',
  STAFF: 'staff',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
}

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
}

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
}

// Date Formats
export const DATE_FORMATS = {
  FULL: 'DD MMMM YYYY',
  SHORT: 'DD MMM YYYY',
  WITH_TIME: 'DD MMMM YYYY HH:mm',
  TIME_ONLY: 'HH:mm',
  ISO: 'YYYY-MM-DD',
}

// Animation Durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
}

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda',
  UNAUTHORIZED: 'Sesi Anda telah berakhir. Silakan login kembali',
  FORBIDDEN: 'Anda tidak memiliki akses',
  NOT_FOUND: 'Data tidak ditemukan',
  VALIDATION: 'Validasi gagal. Periksa kembali data Anda',
  SERVER_ERROR: 'Terjadi kesalahan server. Silakan coba lagi',
  UNKNOWN: 'Terjadi kesalahan yang tidak terduga',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVE: 'Data berhasil disimpan',
  UPDATE: 'Data berhasil diperbarui',
  DELETE: 'Data berhasil dihapus',
  SUBSCRIBE: 'Berhasil berlangganan newsletter',
  UNSUBSCRIBE: 'Berhasil berhenti berlangganan',
  COMMENT_POSTED: 'Komentar berhasil dikirim dan menunggu persetujuan',
}

export default {
  APP_NAME,
  APP_URL,
  API_BASE_URL,
  STORAGE_URL,
  SOCIAL_LINKS,
  PAGINATION,
  NAVIGATION_MENU,
  FOOTER_LINKS,
  POST_STATUS,
  COMMENT_STATUS,
  USER_ROLES,
  POSITION_TYPES,
  STORAGE_KEYS,
  TOAST_TYPES,
  FILE_UPLOAD,
  DATE_FORMATS,
  ANIMATION,
  BREAKPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
}
