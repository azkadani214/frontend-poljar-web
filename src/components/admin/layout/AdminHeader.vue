<template>
  <header class="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 transition-all duration-300">
    <div class="h-full px-4 flex items-center justify-between">
      <!-- Left: Sidebar Toggle & Breadcrumb -->
      <div class="flex items-center space-x-4">
        <button
          @click="$emit('toggle-sidebar')"
          class="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu v-if="!isSidebarOpen" class="w-5 h-5" />
          <PanelLeftClose v-else class="w-5 h-5" />
        </button>

        <!-- Breadcrumb (Simple for now) -->
        <div class="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
          <router-link to="/admin/dashboard" class="hover:text-primary-navy transition-colors">Admin</router-link>
          <ChevronRight class="w-4 h-4" />
          <span class="font-medium text-gray-900">{{ currentRouteName }}</span>
        </div>
      </div>

      <!-- Right: Search & User Actions -->
      <div class="flex items-center space-x-3">
        <!-- Quick Search -->
        <div class="hidden md:flex relative group">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-orange transition-colors" />
          <input
            type="text"
            placeholder="Cari fitur..."
            class="pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-orange/20 focus:border-primary-orange transition-all w-64"
          />
        </div>

        <div class="h-6 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

        <!-- Notifications (Placeholder) -->
        <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell class="w-5 h-5" />
          <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <!-- Profile Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button class="flex items-center space-x-2 p-1 pl-2 hover:bg-gray-100 rounded-full transition-colors group">
              <span class="hidden sm:block text-xs font-semibold text-gray-700 group-hover:text-primary-navy">{{ authStore.currentUser?.name }}</span>
              <Avatar class="w-8 h-8 border-2 border-white shadow-sm">
                <AvatarImage :src="authStore.currentUser?.avatar" />
                <AvatarFallback class="bg-primary-navy text-white font-bold text-[10px]">{{ userInitials }}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuLabel>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-gray-900">{{ authStore.currentUser?.name }}</span>
                <span class="text-[10px] text-gray-500 font-normal">{{ authStore.currentUser?.email }}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="router.push('/admin/profile')">
              <User class="mr-2 h-4 w-4" />
              Profil Saya
            </DropdownMenuItem>
            <DropdownMenuItem @click="router.push('/admin/settings')">
              <Settings class="mr-2 h-4 w-4" />
              Pengaturan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="handleLogout" class="text-red-600 focus:text-red-600">
              <LogOut class="mr-2 h-4 w-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { 
  Menu, 
  PanelLeftClose,
  ChevronRight, 
  Search, 
  Bell,
  User,
  Settings,
  LogOut
} from 'lucide-vue-next'
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

defineProps({
  isSidebarOpen: Boolean
})

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const currentRouteName = computed(() => route.meta.title?.split(' - ')[0] || 'Dashboard')

const userInitials = computed(() => {
  const name = authStore.currentUser?.name || 'Admin'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

async function handleLogout() {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    await authStore.logout()
  }
}
</script>
