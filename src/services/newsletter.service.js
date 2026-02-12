import api from './api'

const newsletterService = {
  /**
   * Subscribe to newsletter
   */
  async subscribe(data) {
    return api.post('/newsletter/subscribe', data)
  },

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(data) {
    return api.post('/newsletter/unsubscribe', data)
  },

  /**
   * Verify email subscription
   */
  async verify(token) {
    return api.get(`/newsletter/verify?token=${token}`)
  },

  /**
   * Get preferences
   */
  async getPreferences(token) {
    return api.get(`/newsletter/preferences?token=${token}`)
  },

  /**
   * Update preferences
   */
  async updatePreferences(token, topicIds) {
    return api.post('/newsletter/preferences', { token, topic_ids: topicIds })
  },

  /**
   * Admin: Get newsletter statistics
   */
  async getStatistics() {
    return api.get('/newsletter/statistics')
  },

  /**
   * Admin: Get all subscribers
   */
  async getSubscribers() {
    return api.get('/newsletter/subscribers')
  },

  /**
   * Admin: Get topics
   */
  async getTopics() {
    return api.get('/newsletter/topics')
  },

  /**
   * Admin: Get campaigns
   */
  async getCampaigns() {
    return api.get('/newsletter/campaigns')
  },

  /**
   * Admin: Get templates
   */
  async getTemplates() {
    return api.get('/newsletter/templates')
  },

  /**
   * Admin: Send campaign
   */
  async sendCampaign(id) {
    return api.post(`/newsletter/campaigns/${id}/send`)
  },
}

export default newsletterService
