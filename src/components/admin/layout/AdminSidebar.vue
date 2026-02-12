<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-primary-navy transform transition-all duration-300 lg:static lg:inset-0',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:ml-[-256px]',
    ]"
  >
    <!-- Logo Section -->
    <div class="h-20 flex items-center px-6 border-b border-white/10 bg-white">
      <router-link to="/admin/dashboard" class="flex items-center space-x-3 group">
        <img
          src="/images/logo-poljar.png"
          alt="Poljar Admin"
          class="h-10 w-auto transition-transform group-hover:scale-110"
        />
        <div class="flex flex-col">
          <span
            class="font-serif text-sm font-black text-primary-navy leading-none uppercase tracking-tighter"
            >Polinema Mengajar</span
          >
          <span class="text-[9px] font-black tracking-[0.2em] text-primary-orange uppercase"
            >Administrator</span
          >
        </div>
      </router-link>
    </div>

    <!-- Navigation Section -->
    <div
      class="flex-1 py-6 px-4 space-y-8 overflow-y-auto max-h-[calc(100vh-64px-100px)] custom-scrollbar"
    >
      <div v-for="group in filteredMenu" :key="group.title">
        <h3
          v-if="group.title"
          class="px-3 mb-3 text-[10px] font-bold text-white/30 uppercase tracking-[2px]"
        >
          {{ group.title }}
        </h3>

        <div class="space-y-1">
          <template v-for="item in group.items" :key="item.name">
            <!-- Simple Link -->
            <router-link
              v-if="!item.children"
              :to="item.path"
              class="flex items-center px-3 py-2.5 text-sm text-white/60 rounded-md hover:bg-white/5 hover:text-white transition-all group"
              active-class="bg-white/10 text-white font-medium"
            >
              <component
                :is="item.icon"
                class="w-4 h-4 mr-3 opacity-50 group-hover:opacity-100 transition-opacity"
              />
              {{ item.name }}
            </router-link>

            <!-- Collapsible Menu -->
            <div v-else class="space-y-1">
              <button
                @click="toggleSubmenu(item.name)"
                class="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white/60 rounded-md hover:bg-white/5 hover:text-white transition-all group"
                :class="{ 'text-white bg-white/5': isSubmenuOpen(item.name) }"
              >
                <div class="flex items-center">
                  <component
                    :is="item.icon"
                    class="w-4 h-4 mr-3 opacity-50 group-hover:opacity-100"
                  />
                  {{ item.name }}
                </div>
                <ChevronDown
                  class="w-3.5 h-3.5 transition-transform duration-200"
                  :class="{ 'rotate-180': isSubmenuOpen(item.name) }"
                />
              </button>

              <div v-show="isSubmenuOpen(item.name)" class="pl-10 space-y-1 py-1">
                <router-link
                  v-for="sub in item.children"
                  :key="sub.path"
                  :to="sub.path"
                  class="block py-2 text-xs text-white/40 hover:text-primary-orange transition-colors"
                  active-class="text-primary-orange font-medium"
                >
                  {{ sub.name }}
                </router-link>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- User Footer Section -->
    <div
      class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 bg-primary-navy/95 backdrop-blur-sm"
    >
      <div
        class="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
      >
        <Avatar class="w-9 h-9 border border-white/10">
          <AvatarImage :src="authStore.currentUser?.avatar" />
          <AvatarFallback class="bg-primary-orange text-white font-bold text-xs">{{
            userInitials
          }}</AvatarFallback>
        </Avatar>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-white truncate">{{ authStore.currentUser?.name }}</p>
          <p class="text-[10px] text-white/40 truncate">
            {{ authStore.userRole }}
          </p>
        </div>
        <button
          @click="showLogoutConfirm = true"
          class="p-2 text-white/30 hover:text-red-400 transition-colors"
        >
          <LogOut class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Beautiful Logout Confirmation Modal -->
    <Dialog v-model:open="showLogoutConfirm">
      <DialogContent class="sm:max-w-[425px] border-none bg-white p-0 overflow-hidden shadow-2xl">
        <div class="h-2 bg-red-500 w-full"></div>
        <div class="p-8">
          <DialogHeader class="mb-6">
            <div
              class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <LogOut class="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle class="text-2xl font-bold text-center text-gray-900"
              >Konfirmasi Keluar</DialogTitle
            >
            <DialogDescription class="text-center text-gray-500 mt-2 text-base">
              Apakah Anda yakin ingin mengakhiri sesi ini? Anda perlu masuk kembali untuk mengakses
              panel administrasi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter class="flex sm:flex-row flex-col gap-3 mt-4">
            <Button
              variant="outline"
              class="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 h-12 text-base font-semibold"
              @click="showLogoutConfirm = false"
            >
              Batalkan
            </Button>
            <Button
              class="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 text-base font-semibold shadow-lg shadow-red-200"
              @click="confirmLogout"
            >
              Ya, Keluar Sekarang
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Users,
  Building2,
  Mail,
  MessageSquare,
  Settings,
  ChevronDown,
  LogOut,
  BarChart3,
  History,
  AlertTriangle,
} from 'lucide-vue-next'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from 'vue-toastification'

const props = defineProps({
  isOpen: Boolean,
})

const authStore = useAuthStore()
const toast = useToast()
const openSubmenus = ref(['Konten'])
const showLogoutConfirm = ref(false)

const menuGroups = [
  {
    title: 'Utama',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Statistik', path: '/admin/analytics', icon: BarChart3, permission: 'sistem.view' },
    ],
  },
  {
    title: 'Konten',
    items: [
      {
        name: 'Berita',
        icon: Newspaper,
        permission: 'berita.view',
        children: [
          { name: 'Semua Berita', path: '/admin/news', permission: 'berita.view' },
          { name: 'Tambah Baru', path: '/admin/news/create', permission: 'berita.create' },
          { name: 'Kategori', path: '/admin/news/categories', permission: 'berita.update' },
        ],
      },
      {
        name: 'Blog',
        icon: BookOpen,
        permission: 'blog.view',
        children: [
          { name: 'Semua Artikel', path: '/admin/blog', permission: 'blog.view' },
          { name: 'Tulis Artikel', path: '/admin/blog/create', permission: 'blog.create' },
          { name: 'Kategori', path: '/admin/blog/categories', permission: 'blog.update' },
        ],
      },
      {
        name: 'Komentar',
        path: '/admin/comments',
        icon: MessageSquare,
        permission: 'komentar.view',
      },
    ],
  },
  {
    title: 'Sistem',
    permission: 'sistem.view',
    items: [
      {
        name: 'Pengguna',
        icon: Users,
        permission: 'pengguna.view',
        children: [
          { name: 'Daftar Pengguna', path: '/admin/users', permission: 'pengguna.view' },
          { name: 'Peran & Izin', path: '/admin/roles', permission: 'sistem.view' },
        ],
      },
      {
        name: 'Organisasi',
        path: '/admin/organization',
        icon: Building2,
        permission: 'organisasi.view',
      },
      {
        name: 'Log Aktivitas',
        path: '/admin/activities',
        icon: History,
        permission: 'sistem.view',
      },
      { name: 'Newsletter', path: '/admin/newsletter', icon: Mail, permission: 'sistem.view' },
      { name: 'Pengaturan', path: '/admin/settings', icon: Settings, permission: 'sistem.update' },
    ],
  },
]

const userInitials = computed(() => {
  return (
    authStore.currentUser?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AD'
  )
})

const filteredMenu = computed(() => {
  if (!authStore.currentUser) return []

  return menuGroups
    .filter((group) => {
      if (group.permission) return authStore.hasPermission(group.permission)
      return true
    })
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => {
          if (item.permission) return authStore.hasPermission(item.permission)
          if (item.isAdminOnly) return authStore.isSuperAdmin
          return true
        })
        .map((item) => {
          if (item.children) {
            return {
              ...item,
              children: item.children.filter((child) => {
                if (child.permission) return authStore.hasPermission(child.permission)
                return true
              }),
            }
          }
          return item
        })
        .filter((item) => !item.children || item.children.length > 0),
    }))
    .filter((group) => group.items.length > 0)
})

function toggleSubmenu(name) {
  const index = openSubmenus.value.indexOf(name)
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
  } else {
    openSubmenus.value.push(name)
  }
}

function isSubmenuOpen(name) {
  return openSubmenus.value.includes(name)
}

async function confirmLogout() {
  showLogoutConfirm.value = false
  try {
    toast.info('Sedang keluar...')
    await authStore.logout()
    toast.success('Berhasil keluar dari sistem')
  } catch (error) {
    toast.error('Gagal keluar, silakan coba lagi')
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
