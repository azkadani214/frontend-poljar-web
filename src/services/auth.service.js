import api from './api'

const authService = {
  /**
   * Login with email and password
   */
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token)
    }
    return response
  },

  /**
   * Logout current session
   */
  async logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  /**
   * Logout all sessions
   */
  async logoutAll() {
    try {
      await api.post('/auth/logout-all')
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  /**
   * Get current authenticated user
   */
  async getMe() {
    return api.get('/auth/me')
  },

  /**
   * Refresh token
   */
  async refresh() {
    const response = await api.post('/auth/refresh')
    if (response.data?.token) {
      localStorage.setItem('auth_token', response.data.token)
    }
    return response
  },

  /**
   * Send password reset link
   */
  async forgotPassword(email) {
    return api.post('/auth/forgot-password', { email })
  },

  /**
   * Reset password with token
   */
  async resetPassword(token, password, password_confirmation) {
    return api.post('/auth/reset-password', {
      token,
      password,
      password_confirmation,
    })
  },

  /**
   * Validate reset token
   */
  async validateToken(token) {
    return api.post('/auth/validate-token', { token })
  },

  /**
   * Change password (authenticated)
   */
  async changePassword(current_password, password, password_confirmation) {
    return api.post('/auth/change-password', {
      current_password,
      password,
      password_confirmation,
    })
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  },

  /**
   * Get stored token
   */
  getToken() {
    return localStorage.getItem('auth_token')
  },
}

export default authService
