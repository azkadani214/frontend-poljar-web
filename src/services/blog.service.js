import api, { buildQueryString } from './api'

const blogService = {
  /**
   * Get all blog posts with filters
   */
  async getAll(params = {}) {
    const queryString = buildQueryString(params)
    const url = `/public/blog/posts${queryString ? `?${queryString}` : ''}`
    return api.get(url)
  },

  /**
   * Get blog post by slug
   */
  async getBySlug(slug) {
    return api.get(`/public/blog/posts/${slug}`)
  },

  /**
   * Get related blog posts
   */
  async getRelated(slug, limit = 3) {
    return api.get(`/public/blog/posts/${slug}/related?limit=${limit}`)
  },

  /**
   * Increment blog post views
   */
  async incrementViews(slug) {
    return api.post(`/public/blog/posts/${slug}/views`)
  },

  /**
   * Get recent blog posts
   */
  async getRecent(limit = 5) {
    return api.get(`/public/blog/posts/latest?limit=${limit}`)
  },

  /**
   * Search blog posts
   */
  async search(query, params = {}) {
    const allParams = { ...params, q: query }
    const queryString = buildQueryString(allParams)
    return api.get(`/public/blog/posts/search?${queryString}`)
  },

  /**
   * Get posts by category slug
   */
  async getByCategory(slug, params = {}) {
    const queryString = buildQueryString(params)
    const url = `/public/blog/posts/category/${slug}${queryString ? `?${queryString}` : ''}`
    return api.get(url)
  },

  /**
   * Get posts by tag slug
   */
  async getByTag(slug, params = {}) {
    const queryString = buildQueryString(params)
    const url = `/public/blog/posts/tag/${slug}${queryString ? `?${queryString}` : ''}`
    return api.get(url)
  },

  // ========== CATEGORIES ==========

  /**
   * Get all categories
   */
  async getCategories() {
    return api.get('/public/blog/categories')
  },

  /**
   * Get categories with published posts
   */
  async getCategoriesWithPosts() {
    return api.get('/public/blog/categories/with-posts')
  },

  /**
   * Get popular categories
   */
  async getPopularCategories() {
    return api.get('/public/blog/categories/popular')
  },

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug) {
    return api.get(`/public/blog/categories/${slug}`)
  },

  // ========== TAGS ==========

  /**
   * Get all tags
   */
  async getTags() {
    return api.get('/public/blog/tags')
  },

  /**
   * Get tags with published posts
   */
  async getTagsWithPosts() {
    return api.get('/public/blog/tags/with-posts')
  },

  /**
   * Get popular tags
   */
  async getPopularTags(limit = 10) {
    return api.get(`/public/blog/tags/popular?limit=${limit}`)
  },

  /**
   * Get tag by slug
   */
  async getTagBySlug(slug) {
    return api.get(`/public/blog/tags/${slug}`)
  },

  /**
   * Get approved comments for a blog post
   */
  async getComments(slug, params = {}) {
    const queryString = buildQueryString(params)
    return api.get(`/public/blog/posts/${slug}/comments${queryString ? `?${queryString}` : ''}`)
  },

  /**
   * Post a new comment to a blog post
   */
  async postComment(slug, data) {
    return api.post(`/public/blog/posts/${slug}/comments`, data)
  },

  // ========== ADMIN POSTS ==========

  /**
   * Get all posts (admin)
   */
  async adminGetAll(params = {}) {
    const queryString = buildQueryString(params)
    return api.get(`/blog/posts${queryString ? `?${queryString}` : ''}`)
  },

  /**
   * Get post by ID (admin)
   */
  async adminGetById(id) {
    return api.get(`/blog/posts/${id}`)
  },

  /**
   * Create post (admin)
   */
  async adminCreate(formData) {
    return api.post('/blog/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Update post (admin)
   */
  async adminUpdate(id, formData) {
    return api.post(`/blog/posts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  /**
   * Delete post (admin)
   */
  async delete(id) {
    return api.delete(`/blog/posts/${id}`)
  },

  async adminDelete(id) {
    return this.delete(id)
  },

  /**
   * Bulk publish posts
   */
  async bulkPublish(ids) {
    return api.post('/blog/posts/bulk-publish', { ids })
  },

  /**
   * Bulk delete posts
   */
  async bulkDelete(ids) {
    return api.post('/blog/posts/bulk-delete', { ids })
  },

  /**
   * Get blog statistics
   */
  async getStatistics() {
    return api.get('/blog/posts/statistics')
  },

  // ========== ADMIN CATEGORIES ==========

  /**
   * Create category
   */
  async createCategory(data) {
    return api.post('/blog/categories', data)
  },

  /**
   * Update category
   */
  async updateCategory(id, data) {
    return api.put(`/blog/categories/${id}`, data)
  },

  /**
   * Delete category
   */
  async deleteCategory(id) {
    return api.delete(`/blog/categories/${id}`)
  },

  // ========== ADMIN TAGS ==========

  /**
   * Create tag
   */
  async createTag(data) {
    return api.post('/blog/tags', data)
  },

  /**
   * Update tag
   */
  async updateTag(id, data) {
    return api.put(`/blog/tags/${id}`, data)
  },

  /**
   * Delete tag
   */
  async deleteTag(id) {
    return api.delete(`/blog/tags/${id}`)
  },

  // ========== ADMIN COMMENTS ==========

  /**
   * Get all comments (admin)
   */
  async adminGetComments(params = {}) {
    const queryString = buildQueryString(params)
    return api.get(`/blog/comments${queryString ? `?${queryString}` : ''}`)
  },

  /**
   * Approve comment
   */
  async adminApproveComment(id) {
    return api.post(`/blog/comments/${id}/approve`)
  },

  /**
   * Reject comment
   */
  async adminRejectComment(id) {
    return api.post(`/blog/comments/${id}/reject`)
  },

  /**
   * Delete comment
   */
  async adminDeleteComment(id) {
    return api.delete(`/blog/comments/${id}`)
  },
}

export default blogService
