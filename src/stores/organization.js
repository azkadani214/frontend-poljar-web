import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import organizationService from '@/services/organization.service'

export const useOrganizationStore = defineStore('organization', () => {
  // State
  const members = ref([])
  const divisions = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const allMembers = computed(() => members.value)
  const allDivisions = computed(() => divisions.value)
  const isLoading = computed(() => loading.value)

  // Actions
  async function fetchMembers(params = {}) {
    loading.value = true
    try {
      const response = await organizationService.getMembers(params)
      members.value = response.data || response
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchDivisions() {
    loading.value = true
    try {
      const response = await organizationService.getDivisions()
      divisions.value = response.data || response
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    members,
    divisions,
    loading,
    error,
    allMembers,
    allDivisions,
    isLoading,
    fetchMembers,
    fetchDivisions,
  }
})
