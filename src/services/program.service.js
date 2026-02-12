import api from './api'

const programService = {
  /**
   * Get all programs with optional filtering
   */
  async getAll(params = {}) {
    const response = await api.get('/public/programs', { params })
    return response.data
  },

  /**
   * Get specific program by slug
   */
  async getBySlug(slug) {
    const response = await api.get(`/public/programs/${slug}`)
    return response.data
  },

  /**
   * Get highlighted/featured programs for home page
   */
  async getFeatured() {
    const response = await api.get('/public/programs/featured')
    return response.data
  },
}

export default programService
