import api from '../api'

const analyticsService = {
  getOverview() {
    return api.get('/analytics/overview')
  },
  getContentPerformance() {
    return api.get('/analytics/content')
  },
  getUserStats() {
    return api.get('/analytics/users')
  }
}

export default analyticsService
