import { defineStore } from 'pinia'
import { ref } from 'vue'
import newsletterService from '@/services/newsletter.service'

export const useNewsletterStore = defineStore('newsletter', () => {
  // State
  const isSubscribing = ref(false)
  const subscriptionSuccess = ref(false)
  const error = ref(null)

  // Actions
  async function subscribe(email) {
    isSubscribing.value = true
    error.value = null
    subscriptionSuccess.value = false

    try {
      await newsletterService.subscribe(email)
      subscriptionSuccess.value = true
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal mendaftar newsletter'
      return false
    } finally {
      isSubscribing.value = false
    }
  }

  function reset() {
    isSubscribing.value = false
    subscriptionSuccess.value = false
    error.value = null
  }

  return {
    // State
    isSubscribing,
    subscriptionSuccess,
    error,

    // Actions
    subscribe,
    reset,
  }
})
