<template>
  <div class="h-screen flex overflow-hidden bg-gray-50 font-sans">
    <!-- Sidebar -->
    <AdminSidebar :is-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <!-- Main Content wrapper -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <AdminHeader :is-sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <!-- Scrollable content area -->
      <main class="flex-1 overflow-y-auto bg-gray-50/50">
        <div class="p-6 lg:p-8">
          <!-- Page Header -->
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">
              {{ route.meta.title?.split(' - ')[0] || 'Dashboard' }}
            </h1>
            <p v-if="route.meta.subtitle" class="text-sm text-gray-500 mt-1">
              {{ route.meta.subtitle }}
            </p>
          </div>

          <!-- Router View with Transition -->
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

        <!-- Desktop Footer -->
        <footer class="py-6 px-8 bg-white border-t border-gray-200 text-center mt-auto">
          <p class="text-xs text-gray-400">
            &copy; {{ new Date().getFullYear() }} Polinema Mengajar. All rights reserved. Version
            1.0.0
          </p>
        </footer>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
      @click="sidebarOpen = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminSidebar from '@/components/admin/layout/AdminSidebar.vue'
import AdminHeader from '@/components/admin/layout/AdminHeader.vue'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(true)

// Responsive sidebar
onMounted(() => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
})

onMounted(async () => {
  if (!authStore.currentUser && authStore.token) {
    try {
      await authStore.fetchUser()
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
