<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-primary-navy to-primary-blue rounded-lg p-8 text-white">
      <div class="max-w-3xl">
        <h2 class="text-3xl font-bold mb-2">Halo, {{ authStore.currentUser?.name }}!</h2>
        <p class="text-white/80 mb-6">
          Selamat datang kembali di panel administrasi Polinema Mengajar.
          {{
            authStore.isSuperAdmin
              ? 'Kelola seluruh aspek platform dari satu tempat.'
              : `Anda masuk sebagai ${authStore.userRole}. Pantau performa konten Anda di sini.`
          }}
        </p>
        <div class="flex flex-wrap gap-3">
          <router-link v-if="authStore.hasPermission('berita.create')" to="/admin/news/create">
            <Button class="bg-primary-orange hover:bg-primary-orange/90 text-white">
              <Plus class="w-4 h-4 mr-2" />
              Tulis Berita Baru
            </Button>
          </router-link>
          <router-link v-else-if="authStore.hasPermission('blog.create')" to="/admin/blog/create">
            <Button class="bg-primary-orange hover:bg-primary-orange/90 text-white">
              <Plus class="w-4 h-4 mr-2" />
              Tulis Artikel Baru
            </Button>
          </router-link>
          <router-link v-if="authStore.hasPermission('sistem.view')" to="/admin/analytics">
            <Button
              variant="outline"
              class="bg-white/10 border-white/30 hover:bg-white/20 text-white"
            >
              <BarChart3 class="w-4 h-4 mr-2" />
              Lihat Laporan Pengunjung
            </Button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Profile Completion Alert -->
    <div
      v-if="!isProfileComplete"
      class="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500"
    >
      <div
        class="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"
      >
        <AlertCircle class="h-6 w-6 text-amber-600" />
      </div>
      <div class="flex-1">
        <h3 class="text-sm font-bold text-amber-800">Lengkapi Profil Anda</h3>
        <p class="text-xs text-amber-700 mt-1">
          Profil Anda belum lengkap. Lengkapi informasi seperti bio, kutipan (quotes), nomor
          telepon, dan alamat untuk mendapatkan pengalaman terbaik.
        </p>
        <div class="mt-3">
          <Button
            size="sm"
            variant="outline"
            class="bg-amber-100/50 border-amber-200 text-amber-800 hover:bg-amber-200"
            @click="router.push('/admin/profile')"
          >
            Lengkapi Sekarang
            <ArrowRight class="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Default Password Alert -->
    <div
      v-if="isDefaultPassword"
      class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500"
    >
      <div class="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <ShieldAlert class="h-6 w-6 text-red-600" />
      </div>
      <div class="flex-1">
        <h3 class="text-sm font-bold text-red-800">Keamanan: Ubah Kata Sandi Anda</h3>
        <p class="text-xs text-red-700 mt-1">
          Anda masih menggunakan kata sandi bawaan. Kami sangat menyarankan Anda untuk segera
          mengubahnya demi keamanan akun Anda.
        </p>
        <div class="mt-3">
          <Button
            size="sm"
            variant="outline"
            class="bg-red-100/50 border-red-200 text-red-800 hover:bg-red-200"
            @click="router.push('/admin/profile')"
          >
            Ubah Kata Sandi
            <ArrowRight class="w-3.5 h-3.5 ml-2" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid (Filtered by Permission) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        v-for="stat in filteredStats"
        :key="stat.label"
        class="hover:shadow-md transition-shadow"
      >
        <CardContent class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div :class="`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`">
              <component :is="stat.icon" :class="`w-6 h-6 ${stat.color}`" />
            </div>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <p
              v-if="stat.change"
              :class="`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`"
            >
              {{ stat.change }} vs bulan lalu
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Analytics Section (Optional for non-admins) -->
    <div v-if="authStore.hasPermission('sistem.view')" class="grid grid-cols-1 gap-6">
      <!-- Any specific visitor charts would go here -->
    </div>

    <!-- Activity Section -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Recent News/Blog (Visible based on permission) -->
      <Card :class="authStore.hasPermission('pengguna.view') ? 'lg:col-span-2' : 'lg:col-span-3'">
        <CardHeader class="border-b">
          <div class="flex items-center justify-between">
            <CardTitle class="text-lg font-semibold flex items-center">
              <FileText class="w-5 h-5 mr-2 text-primary-orange" />
              Berita & Artikel Terbaru
            </CardTitle>
            <router-link to="/admin/news" class="text-sm text-primary-blue hover:underline">
              Lihat Semua
            </router-link>
          </div>
        </CardHeader>
        <CardContent class="p-0">
          <div v-if="isLoading" class="p-6 space-y-4">
            <div v-for="i in 5" :key="i" class="h-16 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <Table v-else>
            <TableBody>
              <TableRow v-for="item in recentNews" :key="item.id" class="hover:bg-gray-50">
                <TableCell class="py-4">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-12 h-12 rounded bg-gray-100 flex items-center justify-center overflow-hidden"
                    >
                      <img v-if="item.image" :src="item.image" class="w-full h-full object-cover" />
                      <Image v-else class="w-6 h-6 text-gray-400" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ item.title }}</p>
                      <p class="text-xs text-gray-500">{{ item.type }} • {{ item.date }}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="text-right">
                  <Badge :class="getStatusStyle(item.status)" class="text-xs">
                    {{ item.status }}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <!-- Active Users (Visible only to those with permission) -->
      <Card v-if="authStore.hasPermission('pengguna.view')">
        <CardHeader class="border-b">
          <CardTitle class="text-lg font-semibold flex items-center">
            <Users class="w-5 h-5 mr-2 text-primary-navy" />
            Anggota Aktif
          </CardTitle>
        </CardHeader>
        <CardContent class="p-6">
          <div class="space-y-4">
            <div v-for="user in recentUsers" :key="user.id" class="flex items-center space-x-3">
              <Avatar class="w-10 h-10">
                <AvatarImage :src="user.avatar" />
                <AvatarFallback class="bg-primary-navy/10 text-primary-navy font-semibold text-sm">
                  {{ user.initials }}
                </AvatarFallback>
              </Avatar>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ user.role }}</p>
              </div>
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <Button
            variant="outline"
            class="w-full mt-4 text-sm"
            @click="router.push('/admin/users')"
          >
            Lihat Semua Anggota
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  Newspaper,
  Users,
  Mail,
  Plus,
  BarChart3,
  FileText,
  Image,
  BookOpen,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  MessageSquare,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import api from '@/services/api'
import analyticsService from '@/services/admin/analytics.service'
import newsService from '@/services/news.service'
import { getStorageUrl } from '@/utils/helpers'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

const isProfileComplete = computed(() => {
  const user = authStore.currentUser
  if (!user) return true
  return !!(user.phone && user.gender && user.address && user.bio && user.quotes)
})

const isDefaultPassword = computed(() => {
  return authStore.currentUser?.is_default_password || false
})

const quickStats = ref([
  {
    label: 'Total Berita',
    value: '0',
    change: null,
    icon: Newspaper,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    permission: 'berita.view',
  },
  {
    label: 'Blog Posts',
    value: '0',
    change: null,
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    permission: 'blog.view',
  },
  {
    label: 'Anggota Aktif',
    value: '0',
    change: null,
    icon: Users,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    permission: 'pengguna.view',
  },
  {
    label: 'Komentar',
    value: '0',
    change: null,
    icon: MessageSquare,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    permission: 'blog.view',
  },
  {
    label: 'Newsletter',
    value: '0',
    change: null,
    icon: Mail,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    permission: 'sistem.view',
  },
  {
    label: 'Total Tayangan',
    value: '0',
    change: null,
    icon: BarChart3,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    permission: 'blog.view', // Authors can see their own views
  },
])

const filteredStats = computed(() => {
  return quickStats.value.filter((stat) => {
    if (!stat.permission) return true
    return authStore.hasPermission(stat.permission)
  })
})

const recentNews = ref([])
const recentUsers = ref([])

async function fetchDashboardData() {
  isLoading.value = true
  try {
    // 1. Fetch Overview (Admin Only)
    if (authStore.hasPermission('sistem.view')) {
      try {
        const overview = await analyticsService.getOverview()
        if (overview.data) {
          quickStats.value.find((s) => s.label === 'Total Berita').value =
            overview.data.news_count || 0
          quickStats.value.find((s) => s.label === 'Blog Posts').value =
            overview.data.blog_count || 0
          quickStats.value.find((s) => s.label === 'Anggota Aktif').value =
            overview.data.users_count || 0
          quickStats.value.find((s) => s.label === 'Newsletter').value =
            overview.data.subscribers_count || 0
          quickStats.value.find((s) => s.label === 'Komentar').value =
            (overview.data.blog_comments_count || 0) + (overview.data.news_comments_count || 0)
          quickStats.value.find((s) => s.label === 'Total Tayangan').value =
            overview.data.total_views || 0
        }
      } catch (e) {
        console.warn('Overview fetch failed:', e)
      }
    }

    // 2. Fetch Module Specific Stats (For non-admins)
    if (!authStore.isSuperAdmin) {
      if (authStore.hasPermission('blog.view')) {
        try {
          const blogStats = await blogService.getStatistics()
          quickStats.value.find((s) => s.label === 'Blog Posts').value = blogStats.data?.total || 0
          quickStats.value.find((s) => s.label === 'Komentar').value =
            blogStats.data?.comments_count || 0
          quickStats.value.find((s) => s.label === 'Total Tayangan').value =
            blogStats.data?.views || 0
        } catch (e) {
          console.warn('Blog stats fetch failed:', e)
        }
      }
      if (authStore.hasPermission('berita.view')) {
        try {
          const newsStats = await newsService.getStatistics()
          quickStats.value.find((s) => s.label === 'Total Berita').value =
            newsStats.data?.total || 0
        } catch (e) {
          console.warn('News stats fetch failed:', e)
        }
      }
    }

    // 3. Recent News/Blog Posts
    try {
      let postsRes
      if (authStore.hasPermission('berita.view')) {
        postsRes = await newsService.adminGetAll({ per_page: 5 })
      } else if (authStore.hasPermission('blog.view')) {
        postsRes = await blogService.adminGetAll({ per_page: 5 })
      }

      if (postsRes?.data) {
        recentNews.value = postsRes.data.map((item) => ({
          id: item.id,
          title: item.title,
          type: item.category?.name || 'Konten',
          status: item.status,
          date: formatDateDisplay(item.created_at),
          image: getStorageUrl(item.cover_photo_path || item.thumbnail),
        }))
      }
    } catch (e) {
      console.warn('Posts fetch failed:', e)
    }

    // 4. Recent Users (Admin Only)
    if (authStore.hasPermission('pengguna.view')) {
      try {
        const usersRes = await api.get('/users?per_page=5')
        recentUsers.value =
          usersRes.data?.map((user) => ({
            id: user.id,
            name: user.name,
            role: user.status === 'active' ? 'Member' : 'Inactive',
            initials:
              user.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2) || 'AD',
            avatar: getStorageUrl(user.avatar_url),
          })) || []
      } catch (e) {
        console.warn('Users fetch failed:', e)
      }
    }
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

const getStatusStyle = (status) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-700 border-none'
    case 'draft':
      return 'bg-gray-100 text-gray-600 border-none'
    case 'scheduled':
      return 'bg-blue-100 text-blue-700 border-none'
    default:
      return 'bg-gray-100 text-gray-600 border-none'
  }
}

function formatDateDisplay(date) {
  if (!date) return '-'
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(() => {
  fetchDashboardData()
})
</script>
