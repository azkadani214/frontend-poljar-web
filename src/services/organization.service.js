import api from './api'

const organizationService = {
  /**
   * Get core team members (public)
   */
  async getCoreTeam() {
    return api.get('/public/organization/core-team')
  },

  /**
   * Get staff members (public)
   */
  async getStaff() {
    return api.get('/public/organization/staff')
  },

  /**
   * Get divisions (public)
   */
  async getPublicDivisions() {
    return api.get('/public/organization/divisions')
  },

  // ========== ADMIN: DIVISIONS ==========

  /**
   * Get all divisions
   */
  async getDivisions() {
    return api.get('/divisions')
  },

  /**
   * Get divisions with active members
   */
  async getDivisionsWithMembers() {
    return api.get('/divisions/with-active-members')
  },

  /**
   * Get division by ID
   */
  async getDivision(id) {
    return api.get(`/divisions/${id}`)
  },

  /**
   * Create division
   */
  async createDivision(data) {
    return api.post('/divisions', data)
  },

  /**
   * Update division
   */
  async updateDivision(id, data) {
    return api.put(`/divisions/${id}`, data)
  },

  /**
   * Delete division
   */
  async deleteDivision(id) {
    return api.delete(`/divisions/${id}`)
  },

  /**
   * Get division statistics
   */
  async getDivisionStats(id) {
    return api.get(`/divisions/${id}/statistics`)
  },

  /**
   * Get division members
   */
  async getDivisionMembers(id) {
    return api.get(`/divisions/${id}/members`)
  },

  // ========== ADMIN: POSITIONS ==========

  /**
   * Get all positions
   */
  async getPositions() {
    return api.get('/positions')
  },

  /**
   * Get core team positions
   */
  async getCoreTeamPositions() {
    return api.get('/positions/core-team')
  },

  /**
   * Get staff positions
   */
  async getStaffPositions() {
    return api.get('/positions/staff')
  },

  /**
   * Get positions by level
   */
  async getPositionsByLevel() {
    return api.get('/positions/by-level')
  },

  /**
   * Get positions by division
   */
  async getPositionsByDivision(divisionId) {
    return api.get(`/positions/division/${divisionId}`)
  },

  /**
   * Get position by ID
   */
  async getPosition(id) {
    return api.get(`/positions/${id}`)
  },

  /**
   * Create position
   */
  async createPosition(data) {
    return api.post('/positions', data)
  },

  /**
   * Update position
   */
  async updatePosition(id, data) {
    return api.put(`/positions/${id}`, data)
  },

  /**
   * Delete position
   */
  async deletePosition(id) {
    return api.delete(`/positions/${id}`)
  },

  // ========== ADMIN: MEMBERSHIPS ==========

  /**
   * Get all memberships
   */
  async getMemberships(params = {}) {
    return api.get('/memberships', { params })
  },

  /**
   * Get memberships by period
   */
  async getMembershipsByPeriod() {
    return api.get('/memberships/by-period')
  },

  /**
   * Get memberships by user
   */
  async getMembershipsByUser(userId) {
    return api.get(`/memberships/user/${userId}`)
  },

  /**
   * Get memberships by division
   */
  async getMembershipsByDivision(divisionId) {
    return api.get(`/memberships/division/${divisionId}`)
  },

  /**
   * Get membership by ID
   */
  async getMembership(id) {
    return api.get(`/memberships/${id}`)
  },

  /**
   * Create membership
   */
  async createMembership(data) {
    return api.post('/memberships', data)
  },

  /**
   * Update membership
   */
  async updateMembership(id, data) {
    return api.put(`/memberships/${id}`, data)
  },

  /**
   * Delete membership
   */
  async deleteMembership(id) {
    return api.delete(`/memberships/${id}`)
  },

  /**
   * Activate membership
   */
  async activateMembership(id) {
    return api.post(`/memberships/${id}/activate`)
  },

  /**
   * Deactivate membership
   */
  async deactivateMembership(id) {
    return api.post(`/memberships/${id}/deactivate`)
  },

  /**
   * Get organization chart data
   */
  async getChartData() {
    return api.get('/organization/chart')
  },
}

export default organizationService
