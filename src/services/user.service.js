import api, { buildQueryString } from './api'

const userService = {
  /**
   * Get all users with pagination
   */
  async getAll(params = {}) {
    const queryString = buildQueryString(params)
    const url = `/users${queryString ? `?${queryString}` : ''}`
    return api.get(url)
  },

  /**
   * Get available roles
   */
  async getRoles() {
    return api.get('/roles')
  },

  /**
   * Get user by ID
   */
  async getById(id) {
    return api.get(`/users/${id}`)
  },

  /**
   * Search users
   */
  async search(query, params = {}) {
    const allParams = { ...params, q: query }
    const queryString = buildQueryString(allParams)
    return api.get(`/users/search?${queryString}`)
  },

  /**
   * Get user statistics
   */
  async getStatistics() {
    return api.get('/users/statistics')
  },

  /**
   * Create user
   */
  async create(data) {
    return api.post('/users', data)
  },

  async update(id, data) {
    if (data instanceof FormData) {
      data.append('_method', 'PUT')
      return api.post(`/users/${id}`, data)
    }
    return api.put(`/users/${id}`, data)
  },

  /**
   * Delete user
   */
  async delete(id) {
    return api.delete(`/users/${id}`)
  },

  /**
   * Activate user
   */
  async activate(id) {
    return api.post(`/users/${id}/activate`)
  },

  /**
   * Deactivate user
   */
  async deactivate(id) {
    return api.post(`/users/${id}/deactivate`)
  },

  /**
   * Bulk activate users
   */
  async bulkActivate(userIds) {
    return api.post('/users/bulk-activate', { user_ids: userIds })
  },

  /**
   * Bulk deactivate users
   */
  async bulkDeactivate(userIds) {
    return api.post('/users/bulk-deactivate', { user_ids: userIds })
  },

  /**
   * Import users from CSV
   */
  async import(file) {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/users/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Import users from JSON data
   */
  async importData(data) {
    return api.post('/users/import', { data })
  },

  // ========== PROFILE ==========

  /**
   * Get current user profile
   */
  async getProfile() {
    return api.get('/profile')
  },

  /**
   * Update profile
   */
  async updateProfile(data) {
    return api.put('/profile', data)
  },

  /**
   * Change password
   */
  async changePassword(data) {
    return api.post('/profile/change-password', data)
  },

  /**
   * Update profile photo
   */
  async updatePhoto(file) {
    const formData = new FormData()
    formData.append('photo', file)
    return api.post('/profile/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Delete profile photo
   */
  async deletePhoto() {
    return api.delete('/profile/photo')
  },

  // ========== ROLES & PERMISSIONS ==========

  /**
   * Get all available permissions
   */
  async getPermissions() {
    return api.get('/roles/permissions')
  },

  /**
   * Update permissions for a role
   */
  async updateRolePermissions(roleId, permissionIds) {
    return api.post(`/roles/${roleId}/permissions`, { permission_ids: permissionIds })
  },

  /**
   * Create a new role
   */
  async createRole(data) {
    return api.post('/roles', data)
  },

  /**
   * Update a role
   */
  async updateRole(id, data) {
    return api.put(`/roles/${id}`, data)
  },

  /**
   * Delete a role
   */
  async deleteRole(id) {
    return api.delete(`/roles/${id}`)
  },

  // ========== ACTIVITY LOGS ==========

  /**
   * Get user activity logs
   */
  async getActivities(userId) {
    return api.get(`/users/${userId}/activities`)
  },

  /**
   * Get all activity logs
   */
  async getAllActivities(params = {}) {
    const queryString = buildQueryString(params)
    return api.get(`/users/activities${queryString ? `?${queryString}` : ''}`)
  },
}

export default userService
