<template>
  <div id="app" class="min-h-screen flex flex-col">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

onMounted(() => {
  // Initialize app
  console.log('Polinema Mengajar App Mounted')

  // Setup scroll listener
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  uiStore.setScrollPosition(window.scrollY)
}
</script>

<style>
/* Additional global styles if needed */
</style>
