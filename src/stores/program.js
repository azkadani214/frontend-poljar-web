import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import programService from '@/services/program.service'

export const useProgramStore = defineStore('program', () => {
  // State
  const programs = ref([])
  const currentProgram = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const allPrograms = computed(() => programs.value)
  const current = computed(() => currentProgram.value)
  const isLoading = computed(() => loading.value)

  // Actions
  async function fetchPrograms(params = {}) {
    loading.value = true
    try {
      const response = await programService.getAll(params)
      programs.value = response.data || response
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchProgramBySlug(slug) {
    loading.value = true
    try {
      const response = await programService.getBySlug(slug)
      currentProgram.value = response.data || response
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearCurrentProgram() {
    currentProgram.value = null
  }

  return {
    programs,
    currentProgram,
    loading,
    error,
    allPrograms,
    current,
    isLoading,
    fetchPrograms,
    fetchProgramBySlug,
    clearCurrentProgram,
  }
})
