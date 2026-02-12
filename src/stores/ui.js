import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // State
  const isMobileMenuOpen = ref(false)
  const isLoading = ref(false)
  const scrollPosition = ref(0)
  const isNavbarScrolled = ref(false)

  // Getters
  const loading = computed(() => isLoading.value)
  const mobileMenuOpen = computed(() => isMobileMenuOpen.value)
  const navbarScrolled = computed(() => isNavbarScrolled.value)

  // Actions
  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value

    // Prevent body scroll when menu is open
    if (isMobileMenuOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }

  function setLoading(value) {
    isLoading.value = value
  }

  function setScrollPosition(position) {
    scrollPosition.value = position
    isNavbarScrolled.value = position > 50
  }

  return {
    // State
    isMobileMenuOpen,
    isLoading,
    scrollPosition,
    isNavbarScrolled,

    // Getters
    loading,
    mobileMenuOpen,
    navbarScrolled,

    // Actions
    toggleMobileMenu,
    closeMobileMenu,
    setLoading,
    setScrollPosition,
  }
})
