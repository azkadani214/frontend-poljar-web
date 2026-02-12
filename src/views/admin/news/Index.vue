<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-orange/10 p-2 rounded-lg">
          <Newspaper class="w-6 h-6 text-primary-orange" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Manajemen Berita</h2>
          <p class="text-xs text-gray-500">Kelola informasi dan publikasi terbaru</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" @click="fetchNews" :disabled="isLoading">
          <RefreshCcw class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button>
        <router-link to="/admin/news/create">
          <Button class="bg-primary-navy hover:bg-primary-navy/90 text-white">
            <Plus class="w-4 h-4 mr-2" />
            Berita Baru
          </Button>
        </router-link>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="stat in stats" :key="stat.label" class="bg-white">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
            {{ stat.label }}
          </CardTitle>
          <component :is="stat.icon" class="w-4 h-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
          <p class="text-[10px] text-gray-500 mt-1">{{ stat.description }}</p>
        </CardContent>
      </Card>
    </div>

    <!-- Filters & Table -->
    <Card class="bg-white overflow-hidden">
      <div class="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
        <div class="flex flex-wrap gap-3 items-center flex-1">
          <div class="relative w-full max-w-xs">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              v-model="filters.search"
              placeholder="Cari judul berita..."
              class="pl-10 h-9"
              @input="debouncedSearch"
            />
          </div>

          <Select v-model="filters.status" @update:modelValue="fetchNews">
            <SelectTrigger class="w-[140px] h-9">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="published">Dipublikasikan</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Terjadwal</SelectItem>
            </SelectContent>
          </Select>

          <Select v-model="filters.category" @update:modelValue="fetchNews">
            <SelectTrigger class="w-[160px] h-9">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.id.toString()">
                {{ cat.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div v-if="selectedIds.length > 0" class="flex items-center gap-2 animate-fade-in">
          <span class="text-xs font-medium text-gray-500 mr-2"
            >{{ selectedIds.length }} Terpilih</span
          >
          <Button variant="destructive" size="sm" @click="handleBulkDelete">Hapus Massal</Button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[40px]">
                <Checkbox :checked="isAllSelected" @update:checked="toggleSelectAll" />
              </TableHead>
              <TableHead>Berita</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Terakhir Diubah</TableHead>
              <TableHead class="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="isLoading && news.length === 0" v-for="i in 5" :key="i">
              <TableCell v-for="j in 7" :key="j">
                <div class="h-4 bg-gray-100 animate-pulse rounded"></div>
              </TableCell>
            </TableRow>

            <TableRow v-else-if="news.length === 0">
              <TableCell colspan="7" class="h-32 text-center text-gray-500">
                Tidak ada berita ditemukan.
              </TableCell>
            </TableRow>

            <TableRow v-for="item in news" :key="item.id" class="group">
              <TableCell>
                <Checkbox
                  :checked="selectedIds.includes(item.id)"
                  @update:checked="(val) => toggleSelect(item.id, val)"
                />
              </TableCell>
              <TableCell>
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      v-if="item.cover_photo_path"
                      :src="getStorageUrl(item.cover_photo_path)"
                      class="w-full h-full object-cover"
                    />
                    <Image v-else class="w-full h-full p-2 text-gray-300" />
                  </div>
                  <div class="min-w-0">
                    <p
                      class="text-sm font-bold text-gray-900 truncate hover:text-primary-blue cursor-pointer"
                      @click="editItem(item.id)"
                    >
                      {{ item.title }}
                    </p>
                    <p class="text-[10px] text-gray-500 flex items-center">
                      <User class="w-3 h-3 mr-1" />
                      {{ item.author?.name || 'Unknown' }}
                      <span
                        v-if="item.is_featured"
                        class="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-amber-100 text-amber-700 uppercase"
                      >
                        Featured
                      </span>
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" class="font-normal border-gray-200">
                  {{ item.categories?.[0]?.name || 'Uncategorized' }}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge :class="getStatusStyle(item.status)">
                  {{ getStatusLabel(item.status) }}
                </Badge>
              </TableCell>
              <TableCell>
                <div class="flex items-center text-xs text-gray-600">
                  <Eye class="w-3.5 h-3.5 mr-1 text-gray-400" />
                  {{ item.views || 0 }}
                </div>
              </TableCell>
              <TableCell class="text-xs text-gray-500">
                {{ formatDate(item.updated_at) }}
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8 text-gray-400 hover:text-primary-blue"
                    @click="editItem(item.id)"
                  >
                    <Edit3 class="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8 text-gray-400 hover:text-red-500"
                    @click="confirmDelete(item)"
                  >
                    <Trash2 class="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" class="h-8 w-8 text-gray-400">
                        <MoreVertical class="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="toggleFeatured(item)">
                        <Star
                          class="w-4 h-4 mr-2"
                          :class="{ 'fill-amber-400 text-amber-400': item.is_featured }"
                        />
                        {{ item.is_featured ? 'Hapus dari Unggulan' : 'Jadikan Unggulan' }}
                      </DropdownMenuItem>
                      <DropdownMenuItem @click="viewPublic(item.slug)">
                        <ExternalLink class="w-4 h-4 mr-2" />
                        Lihat di Web
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Pagination -->
      <div class="p-4 border-t border-gray-100 flex items-center justify-between">
        <p class="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          Total {{ pagination.total }} Berita
        </p>

        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            :disabled="pagination.page === 1"
            @click="handlePrevPage"
          >
            Sebelumnya
          </Button>
          <div class="flex items-center gap-1">
            <Button
              v-for="p in displayedPages"
              :key="p"
              variant="outline"
              size="sm"
              :class="{ 'bg-primary-navy text-white': p === pagination.page }"
              @click="handlePageClick(p)"
            >
              {{ p }}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            :disabled="pagination.page >= totalPages"
            @click="handleNextPage"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </Card>

    <!-- Delete Dialog -->
    <Dialog :open="showDeleteModal" @update:open="showDeleteModal = $event">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus berita ini? Tindakan ini akan menghapus data secara
            permanen dari server.
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <p class="text-sm font-semibold text-gray-900">{{ itemToDelete?.title }}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showDeleteModal = false">Batal</Button>
          <Button variant="destructive" :disabled="isDeleting" @click="deleteItem">
            <Loader2 v-if="isDeleting" class="w-4 h-4 mr-2 animate-spin" />
            Ya, Hapus Berita
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import {
  Newspaper,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  User,
  Image,
  RefreshCcw,
  Star,
  ExternalLink,
  Loader2,
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import newsService from '@/services/news.service'
import { useAuthStore } from '@/stores/auth'
import { getStorageUrl } from '@/utils/helpers'
import dayjs from 'dayjs'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const news = ref([])
const categories = ref([])
const isLoading = ref(false)
const isDeleting = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const selectedIds = ref([])

const filters = reactive({
  search: '',
  status: 'all',
  category: 'all',
})

const pagination = reactive({
  page: 1,
  perPage: 10,
  total: 0,
})

const statsData = reactive({ total: 0, published: 0, draft: 0, scheduled: 0 })

const stats = computed(() => {
  const isAdmin = authStore.user?.roles?.some((r) => r.name === 'administrator')
  return [
    {
      label: isAdmin ? 'Total Berita' : 'Total Upload Anda',
      value: statsData.total,
      icon: FileText,
      description: isAdmin ? 'Semua artikel terdaftar' : 'Semua berita yang anda tulis',
    },
    {
      label: 'Published',
      value: statsData.published,
      icon: CheckCircle2,
      description: 'Aktif di website',
    },
    {
      label: 'Draft',
      value: statsData.draft,
      icon: LayoutDashboard,
      description: 'Masih dalam penulisan',
    },
    {
      label: 'Terjadwal',
      value: statsData.scheduled,
      icon: Clock,
      description: 'Menunggu waktu tayang',
    },
  ]
})

const totalPages = computed(() => {
  if (!pagination.total || !pagination.perPage) return 1
  return Math.ceil(pagination.total / pagination.perPage)
})
const isAllSelected = computed(
  () => news.value.length > 0 && selectedIds.value.length === news.value.length,
)

const displayedPages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 ||
      i === totalPages.value ||
      (i >= pagination.page - 1 && i <= pagination.page + 1)
    ) {
      pages.push(i)
    }
  }
  return pages
})

const formatDate = (date) => {
  if (!date) return '-'
  return dayjs(date).format('DD MMM YYYY, HH:mm')
}

const getStatusLabel = (status) => {
  const labels = {
    published: 'Published',
    draft: 'Draft',
    scheduled: 'Scheduled',
    archived: 'Archived',
  }
  return labels[status] || status
}

const getStatusStyle = (status) => {
  const styles = {
    published: 'bg-green-100 text-green-700 hover:bg-green-200 border-none',
    draft: 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-none',
    scheduled: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-none',
    archived: 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-none',
  }
  return styles[status] || 'bg-gray-100 text-gray-700'
}

let searchTimeout = null
function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.page = 1
    fetchNews()
  }, 500)
}

const fetchNews = async () => {
  isLoading.value = true
  try {
    const params = {
      page: pagination.page,
      per_page: pagination.perPage,
      search: filters.search,
    }

    if (filters.status !== 'all') params.status = filters.status
    if (filters.category !== 'all') params.category_id = filters.category

    const response = await newsService.adminGetAll(params)
    news.value = response.data || []
    pagination.total = response.meta?.total || 0

    // Update stats from statistics endpoint
    const statsRes = await newsService.getStatistics()
    if (statsRes.data) {
      statsData.total = statsRes.data.total || 0
      statsData.published = statsRes.data.published || 0
      statsData.draft = statsRes.data.draft || 0
      statsData.scheduled = statsRes.data.scheduled || 0
    }
  } catch (error) {
    console.error('Failed to fetch news:', error)
    toast.error('Gagal memuat daftar berita')
  } finally {
    isLoading.value = false
  }
}

async function fetchCategories() {
  try {
    const response = await newsService.getCategories()
    categories.value = response.data || []
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

const toggleSelect = (id, checked) => {
  if (checked) {
    selectedIds.value.push(id)
  } else {
    selectedIds.value = selectedIds.value.filter((i) => i !== id)
  }
}

const toggleSelectAll = (checked) => {
  if (checked) {
    selectedIds.value = news.value.map((item) => item.id)
  } else {
    selectedIds.value = []
  }
}

const editItem = (id) => {
  router.push(`/admin/news/${id}/edit`)
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const deleteItem = async () => {
  if (!itemToDelete.value) return
  isDeleting.value = true
  try {
    await newsService.delete(itemToDelete.value.id)
    toast.success('Berita berhasil dihapus')
    showDeleteModal.value = false
    fetchNews()
  } catch (error) {
    toast.error('Gagal menghapus berita')
  } finally {
    isDeleting.value = true
    itemToDelete.value = null
  }
}

const toggleFeatured = async (item) => {
  try {
    if (item.is_featured) {
      await newsService.unfeature(item.id)
      toast.success('Berita tidak lagi unggulan')
    } else {
      await newsService.feature(item.id)
      toast.success('Berita dijadikan unggulan')
    }
    fetchNews()
  } catch (error) {
    toast.error('Gagal mengubah status unggulan')
  }
}

const viewPublic = (slug) => {
  window.open(`${import.meta.env.VITE_APP_URL || 'http://localhost:3000'}/berita/${slug}`, '_blank')
}

const handlePrevPage = () => {
  if (pagination.page > 1) {
    pagination.page--
    fetchNews()
  }
}

const handleNextPage = () => {
  if (pagination.page < totalPages.value) {
    pagination.page++
    fetchNews()
  }
}

const handlePageClick = (p) => {
  pagination.page = p
  fetchNews()
}

const handleBulkDelete = async () => {
  if (confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.value.length} berita terpilih?`)) {
    try {
      await Promise.all(selectedIds.value.map((id) => newsService.delete(id)))
      toast.success('Berita terpilih berhasil dihapus')
      selectedIds.value = []
      fetchNews()
    } catch (error) {
      toast.error('Beberapa berita gagal dihapus')
    }
  }
}

onMounted(() => {
  fetchNews()
  fetchCategories()
})
</script>
