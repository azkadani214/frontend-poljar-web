import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  const isSuperAdmin = computed(() => {
    const roleName = user.value?.role_name?.toLowerCase()
    if (roleName === 'administrator') return true
    if (user.value?.roles?.some((r) => r.name?.toLowerCase() === 'administrator')) return true
    return false
  })

  const isAdmin = computed(() => {
    // This maintains backward compatibility for UI sections that just need to know if we are in admin mode
    if (isSuperAdmin.value) return true
    // Check if is_admin flag is true (from backend model - includes admin and penulis)
    if (user.value?.is_admin) return true
    return false
  })

  function hasPermission(permission) {
    if (isSuperAdmin.value) return true
    if (!user.value || !user.value.permissions) return false
    return user.value.permissions.includes(permission)
  }
  const userRole = computed(() => user.value?.role_display || user.value?.role_name || 'guest')

  // Actions
  async function login(email, password) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authService.login(email, password)

      // Axios response data contains the API response
      const data = response.data

      if (data.token?.access_token) {
        token.value = data.token.access_token
        localStorage.setItem('auth_token', data.token.access_token)
      }

      if (data.user) {
        user.value = data.user
        localStorage.setItem('user_data', JSON.stringify(data.user))
      }

      return { success: true, data: data }
    } catch (err) {
      const message = err.response?.data?.message || 'Email atau password salah.'
      error.value = message
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      clearAuth()
      isLoading.value = false
      router.push('/admin-gate')
    }
  }

  async function fetchUser() {
    if (!token.value) return null

    isLoading.value = true
    try {
      const response = await authService.getMe()
      user.value = response.data
      localStorage.setItem('user_data', JSON.stringify(user.value))
      return user.value
    } catch (err) {
      if (err.response?.status === 401) {
        clearAuth()
      }
      return null
    } finally {
      isLoading.value = false
    }
  }

  function clearAuth() {
    user.value = null
    token.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  function initAuth() {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user_data')

    if (storedToken) {
      token.value = storedToken
      // Trigger background sync
      fetchUser()
    }

    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        user.value = null
      }
    }
  }

  // Initialize
  initAuth()

  return {
    // State
    user,
    token,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    currentUser,
    userRole,
    isAdmin,
    isSuperAdmin,
    hasPermission,

    // Actions
    login,
    logout,
    fetchUser,
    clearAuth,
    initAuth,
  }
})
