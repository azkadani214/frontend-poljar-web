import api, { buildQueryString } from './api'

const newsService = {
  /**
   * Get all news posts with filters (public)
   */
  async getAll(params = {}) {
    const queryString = buildQueryString(params)
    const url = `/public/news/posts${queryString ? `?${queryString}` : ''}`
    return api.get(url)
  },

  /**
   * Get featured news
   */
  async getFeatured(limit = 3) {
    return api.get(`/public/news/posts/featured?limit=${limit}`)
  },

  /**
   * Get latest news
   */
  async getLatest(limit = 6) {
    return api.get(`/public/news/posts/latest?limit=${limit}`)
  },

  /**
   * Get popular news
   */
  async getPopular(limit = 5) {
    return api.get(`/public/news/posts/popular?limit=${limit}`)
  },

  /**
   * Get news by slug
   */
  async getBySlug(slug) {
    return api.get(`/public/news/posts/${slug}`)
  },

  /**
   * Get related news
   */
  async getRelated(id, limit = 3) {
    return api.get(`/public/news/posts/${id}/related?limit=${limit}`)
  },

  /**
   * Get news categories
   */
  async getCategories() {
    return api.get('/public/news/categories')
  },

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug) {
    return api.get(`/public/news/categories/${slug}`)
  },

  /**
   * Get popular categories
   */
  async getPopularCategories() {
    return api.get('/public/news/categories/popular')
  },

  /**
   * Get news tags
   */
  async getTags() {
    return api.get('/public/news/tags')
  },

  /**
   * Get popular tags
   */
  async getPopularTags(limit = 10) {
    return api.get(`/public/news/tags/popular?limit=${limit}`)
  },

  /**
   * Get tag by slug
   */
  async getTagBySlug(slug) {
    return api.get(`/public/news/tags/${slug}`)
  },

  /**
   * Search news
   */
  async search(query, params = {}) {
    const allParams = { ...params, q: query }
    const queryString = buildQueryString(allParams)
    return api.get(`/public/news/search?${queryString}`)
  },

  /**
   * Get approved comments for a news post
   */
  async getComments(postId, params = {}) {
    const queryString = buildQueryString({ ...params, post_id: postId })
    return api.get(`/public/news/comments?${queryString}`)
  },

  /**
   * Post a new comment to a news post
   */
  async postComment(data) {
    return api.post('/public/news/comments', data)
  },

  // ========== ADMIN METHODS (Protected) ==========

  /**
   * Get all news for admin (includes drafts)
   */
  async adminGetAll(params = {}) {
    const queryString = buildQueryString(params)
    const url = `/news/posts${queryString ? `?${queryString}` : ''}`
    return api.get(url)
  },

  /**
   * Get news statistics
   */
  async getStatistics() {
    return api.get('/news/posts/statistics')
  },

  /**
   * Create news post
   */
  async create(formData) {
    return api.post('/news/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Update news post
   */
  async update(id, data) {
    if (data instanceof FormData) {
      return api.post(`/news/posts/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    return api.put(`/news/posts/${id}`, data)
  },

  /**
   * Delete news post
   */
  async delete(id) {
    return api.delete(`/news/posts/${id}`)
  },

  /**
   * Publish news post
   */
  async publish(id) {
    return api.post(`/news/posts/${id}/publish`)
  },

  /**
   * Unpublish news post
   */
  async unpublish(id) {
    return api.post(`/news/posts/${id}/unpublish`)
  },

  /**
   * Schedule news post
   */
  async schedule(id, publishAt) {
    return api.post(`/news/posts/${id}/schedule`, { publish_at: publishAt })
  },

  /**
   * Feature news post
   */
  async feature(id) {
    return api.post(`/news/posts/${id}/feature`)
  },

  /**
   * Unfeature news post
   */
  async unfeature(id) {
    return api.post(`/news/posts/${id}/unfeature`)
  },

  // ========== CATEGORY ADMIN ==========

  /**
   * Create category
   */
  async createCategory(data) {
    return api.post('/news/categories', data)
  },

  /**
   * Update category
   */
  async updateCategory(id, data) {
    return api.put(`/news/categories/${id}`, data)
  },

  /**
   * Delete category
   */
  async deleteCategory(id) {
    return api.delete(`/news/categories/${id}`)
  },

  // ========== TAG ADMIN ==========

  /**
   * Create tag
   */
  async createTag(data) {
    return api.post('/news/tags', data)
  },

  /**
   * Update tag
   */
  async updateTag(id, data) {
    return api.put(`/news/tags/${id}`, data)
  },

  /**
   * Delete tag
   */
  async deleteTag(id) {
    return api.delete(`/news/tags/${id}`)
  },

  // ========== ADMIN COMMENTS ==========

  /**
   * Get all comments (admin)
   */
  async adminGetComments(params = {}) {
    const queryString = buildQueryString(params)
    return api.get(`/news/comments/all?${queryString}`)
  },

  /**
   * Get pending comments (admin)
   */
  async adminGetPendingComments(params = {}) {
    const queryString = buildQueryString(params)
    return api.get(`/news/comments/pending?${queryString}`)
  },

  /**
   * Approve comment
   */
  async adminApproveComment(id) {
    return api.post(`/news/comments/${id}/approve`)
  },

  /**
   * Reject comment
   */
  async adminRejectComment(id) {
    return api.post(`/news/comments/${id}/reject`)
  },

  /**
   * Delete comment
   */
  async adminDeleteComment(id) {
    return api.delete(`/news/comments/${id}`)
  },

  /**
   * Bulk approve
   */
  async adminBulkApprove(ids) {
    return api.post('/news/comments/bulk-approve', { comment_ids: ids })
  },

  /**
   * Bulk reject
   */
  async adminBulkReject(ids) {
    return api.post('/news/comments/bulk-reject', { comment_ids: ids })
  },
}

export default newsService
