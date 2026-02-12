<template>
  <div class="space-y-6">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-blue/10 p-2 rounded-lg">
          <BookOpen class="w-6 h-6 text-primary-blue" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Artikel Blog</h2>
          <p class="text-xs text-gray-500">Kelola konten edukasi dan berbagi pengalaman</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" @click="fetchPosts" :disabled="isLoading">
          <RefreshCcw class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button>
        <router-link to="/admin/blog/create">
          <Button class="bg-primary-navy hover:bg-primary-navy/90 text-white">
            <Plus class="w-4 h-4 mr-2" />
            Tulis Artikel
          </Button>
        </router-link>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="stat in statsDisplay" :key="stat.label" class="bg-white">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle
            class="text-[10px] font-bold uppercase text-gray-500 tracking-wider transition-colors group-hover:text-primary-blue"
          >
            {{ stat.label }}
          </CardTitle>
          <component :is="stat.icon" class="w-4 h-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
          <p class="text-[10px] text-gray-500 mt-1 flex items-center">
            {{ stat.description }}
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content Tabs -->
    <Tabs v-model="activeTab" class="w-full">
      <TabsList class="mb-4">
        <TabsTrigger value="posts">Artikel</TabsTrigger>
        <TabsTrigger value="categories">Kategori</TabsTrigger>
        <TabsTrigger value="tags">Tag</TabsTrigger>
      </TabsList>

      <!-- POSTS TAB -->
      <TabsContent value="posts">
        <Card class="bg-white overflow-hidden">
          <div
            class="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between"
          >
            <div class="flex flex-wrap gap-3 items-center flex-1">
              <div class="relative w-full max-w-xs">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  v-model="filters.search"
                  placeholder="Cari judul artikel..."
                  class="pl-10 h-9"
                  @input="debouncedSearch"
                />
              </div>

              <Select v-model="filters.status" @update:modelValue="fetchPosts">
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

              <Select v-model="filters.category" @update:modelValue="fetchPosts">
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

            <div v-if="selectedIds.length > 0" class="flex items-center gap-2">
              <span class="text-xs font-medium text-gray-500 mr-2"
                >{{ selectedIds.length }} Terpilih</span
              >
              <Button variant="outline" size="sm" @click="bulkPublish">Terbitkan</Button>
              <Button variant="destructive" size="sm" @click="bulkDelete">Hapus Massal</Button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[40px]">
                    <Checkbox :checked="isAllSelected" @update:checked="toggleSelectAll" />
                  </TableHead>
                  <TableHead>Artikel</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead class="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-if="isLoading && posts.length === 0" v-for="i in 5" :key="i">
                  <TableCell v-for="j in 7" :key="j">
                    <div class="h-4 bg-gray-100 animate-pulse rounded"></div>
                  </TableCell>
                </TableRow>

                <TableRow v-else-if="posts.length === 0">
                  <TableCell colspan="7" class="h-32 text-center text-gray-500">
                    Tidak ada artikel ditemukan.
                  </TableCell>
                </TableRow>

                <TableRow v-for="item in posts" :key="item.id" class="group">
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
                          @click="editPost(item.id)"
                        >
                          {{ item.title }}
                        </p>
                        <p class="text-[10px] text-gray-400 truncate">{{ item.slug }}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="flex flex-wrap gap-1">
                      <Badge
                        v-for="cat in item.categories"
                        :key="cat.id"
                        variant="outline"
                        class="font-normal text-[10px] px-1.5 py-0"
                      >
                        {{ cat.name }}
                      </Badge>
                      <span v-if="!item.categories?.length" class="text-xs text-gray-400">-</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge :class="getStatusStyle(item.status)">
                      {{ getStatusLabel(item.status) }}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div class="flex items-center text-xs">
                      <Avatar class="w-5 h-5 mr-1.5">
                        <AvatarFallback class="text-[8px] bg-gray-200">{{
                          item.user?.name?.charAt(0)
                        }}</AvatarFallback>
                      </Avatar>
                      <span class="text-gray-700 truncate max-w-[80px]">{{ item.user?.name }}</span>
                    </div>
                  </TableCell>
                  <TableCell class="text-xs text-gray-500 whitespace-nowrap">
                    {{ formatDate(item.published_at || item.created_at) }}
                  </TableCell>
                  <TableCell class="text-right">
                    <div class="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-gray-400 hover:text-primary-blue"
                        @click="editPost(item.id)"
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
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <!-- Pagination -->
          <div class="p-4 border-t border-gray-100 flex items-center justify-between">
            <p class="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              Halaman {{ pagination.page }} dari {{ totalPages }}
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
      </TabsContent>

      <!-- CATEGORIES TAB -->
      <TabsContent value="categories">
        <Card class="bg-white overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-sm font-bold text-gray-900">Kategori Artikel</h3>
            <Button size="sm" class="bg-primary-navy text-white" @click="openCategoryModal()">
              <Plus class="w-3.5 h-3.5 mr-1.5" />
              Tambah Kategori
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Jumlah Artikel</TableHead>
                <TableHead class="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="cat in categories" :key="cat.id">
                <TableCell class="font-medium">{{ cat.name }}</TableCell>
                <TableCell class="text-gray-500 text-xs">{{ cat.slug }}</TableCell>
                <TableCell>
                  <Badge variant="secondary" class="font-normal">{{ cat.posts_count || 0 }}</Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8"
                      @click="openCategoryModal(cat)"
                    >
                      <Edit3 class="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8 text-red-400 hover:text-red-600"
                      @click="confirmDeleteCategory(cat)"
                    >
                      <Trash2 class="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </TabsContent>

      <!-- TAGS TAB -->
      <TabsContent value="tags">
        <Card class="bg-white overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-sm font-bold text-gray-900">Tag Artikel</h3>
            <Button size="sm" class="bg-primary-navy text-white" @click="openTagModal()">
              <Plus class="w-3.5 h-3.5 mr-1.5" />
              Tambah Tag
            </Button>
          </div>
          <div class="p-6 flex flex-wrap gap-2">
            <Badge
              v-for="tag in tags"
              :key="tag.id"
              variant="outline"
              class="group pr-1 py-1 cursor-pointer hover:bg-gray-50"
              @click="openTagModal(tag)"
            >
              {{ tag.name }}
              <span class="text-[10px] text-gray-400 ml-1.5 mr-1"
                >({{ tag.posts_count || 0 }})</span
              >
              <Button
                variant="ghost"
                size="icon"
                class="h-4 w-4 rounded-full p-0 text-gray-300 group-hover:text-red-400"
                @click.stop="confirmDeleteTag(tag)"
              >
                <X class="w-3 h-3" />
              </Button>
            </Badge>
          </div>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- Modals & Dialogs (Delete/CRUD) -->
    <!-- Reuse News delete dialog logic or create a generic one -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Trash2,
  RefreshCcw,
  Image,
  User,
  Eye,
  MoreVertical,
  X,
  FileText,
  CheckCircle2,
  Clock,
  LayoutDashboard,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import blogService from '@/services/blog.service'
import { useAuthStore } from '@/stores/auth'
import { getStorageUrl } from '@/utils/helpers'
import dayjs from 'dayjs'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const storageUrl = import.meta.env.VITE_STORAGE_URL || 'http://localhost:8000/storage'

const posts = ref([])
const categories = ref([])
const tags = ref([])
const isLoading = ref(false)
const selectedIds = ref([])
let searchTimeout = null

const activeTab = ref('posts')
const filters = reactive({
  search: '',
  status: 'all',
  category: 'all',
})

const stats = reactive({ total: 0, published: 0, draft: 0, scheduled: 0 })

const pagination = reactive({
  page: 1,
  perPage: 10,
  total: 0,
})

const statsDisplay = computed(() => {
  const isAdmin = authStore.user?.roles?.some((r) => r.name === 'administrator')
  return [
    {
      label: isAdmin ? 'Total Artikel' : 'Total Upload Anda',
      value: stats.total,
      icon: FileText,
      description: isAdmin ? 'Semua konten blog' : 'Semua blog yang anda tulis',
    },
    {
      label: 'Published',
      value: stats.published,
      icon: CheckCircle2,
      description: 'Aktif di website',
    },
    { label: 'Draft', value: stats.draft, icon: LayoutDashboard, description: 'Masih ditulis' },
    {
      label: 'Terjadwal',
      value: stats.scheduled,
      icon: Clock,
      description: 'Akan tayang otomatis',
    },
  ]
})

const totalPages = computed(() => {
  if (!pagination.total || !pagination.perPage) return 1
  return Math.ceil(pagination.total / pagination.perPage)
})

const displayedPages = computed(() => {
  const pages = []
  if (totalPages.value <= 0) return [1]
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

const isAllSelected = computed(
  () => posts.value.length > 0 && selectedIds.value.length === posts.value.length,
)

const toggleSelect = (id, checked) => {
  if (checked) selectedIds.value.push(id)
  else selectedIds.value = selectedIds.value.filter((i) => i !== id)
}

const toggleSelectAll = (checked) => {
  selectedIds.value = checked ? posts.value.map((p) => p.id) : []
}

const editPost = (id) => {
  router.push(`/admin/blog/${id}/edit`)
}

const formatDate = (date) => {
  if (!date) return '-'
  return dayjs(date).format('DD MMM YYYY')
}

const getStatusLabel = (status) => {
  const labels = { published: 'Dipublikasi', draft: 'Draft', scheduled: 'Terjadwal' }
  return labels[status] || status
}

const getStatusStyle = (status) => {
  const styles = {
    published: 'bg-green-100 text-green-700 hover:bg-green-200 border-none',
    draft: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none',
    scheduled: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-none',
  }
  return styles[status] || 'bg-gray-100'
}

const fetchStats = async () => {
  try {
    const response = await blogService.getStatistics()
    if (response.data) {
      Object.assign(stats, response.data)
    }
  } catch (error) {
    console.error('Failed to fetch blog statistics:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await blogService.getCategories()
    categories.value = response.data || []
  } catch (error) {
    console.error('Failed to fetch blog categories:', error)
  }
}

const fetchTags = async () => {
  try {
    const response = await blogService.getTags()
    tags.value = response.data || []
  } catch (error) {
    console.error('Failed to fetch blog tags:', error)
  }
}

const fetchPosts = async () => {
  isLoading.value = true
  try {
    const params = {
      page: pagination.page,
      per_page: pagination.perPage,
      search: filters.search,
    }
    if (filters.status !== 'all') params.status = filters.status
    if (filters.category !== 'all') params.category_id = filters.category

    const response = await blogService.adminGetAll(params)
    posts.value = response.data || []
    pagination.total = response.meta?.total || 0

    // Auto refresh stats
    fetchStats()
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    toast.error('Gagal memuat artikel blog')
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async (id) => {
  try {
    await blogService.delete(id)
    toast.success('Artikel berhasil dihapus')
    fetchPosts()
  } catch (error) {
    toast.error('Gagal menghapus artikel')
  }
}

const confirmDelete = (item) => {
  if (confirm(`Apakah Anda yakin ingin menghapus artikel "${item.title}"?`)) {
    handleDelete(item.id)
  }
}

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.page = 1
    fetchPosts()
  }, 500)
}

const handlePrevPage = () => {
  if (pagination.page > 1) {
    pagination.page--
    fetchPosts()
  }
}

const handleNextPage = () => {
  if (pagination.page < totalPages.value) {
    pagination.page++
    fetchPosts()
  }
}

const handlePageClick = (p) => {
  pagination.page = p
  fetchPosts()
}

const bulkPublish = async () => {
  try {
    await blogService.bulkPublish(selectedIds.value)
    toast.success('Artikel terpilih berhasil diterbitkan')
    selectedIds.value = []
    fetchPosts()
  } catch (error) {
    toast.error('Gagal memproses bulk action')
  }
}

const bulkDelete = async () => {
  if (!confirm('Hapus massal artikel terpilih?')) return
  try {
    await blogService.bulkDelete(selectedIds.value)
    toast.success('Artikel terpilih berhasil dihapus')
    selectedIds.value = []
    fetchPosts()
  } catch (error) {
    toast.error('Gagal memproses bulk action')
  }
}

const openCategoryModal = (cat = null) => {
  toast.info('Fitur kategori sedang dalam pengembangan')
}

const confirmDeleteCategory = (cat) => {
  toast.info('Fitur hapus kategori sedang dalam pengembangan')
}

const openTagModal = (tag = null) => {
  toast.info('Fitur tag sedang dalam pengembangan')
}

const confirmDeleteTag = (tag) => {
  toast.info('Fitur hapus tag sedang dalam pengembangan')
}

onMounted(() => {
  fetchPosts()
  fetchCategories()
  fetchStats()
})

watch(activeTab, (val) => {
  if (val === 'categories') fetchCategories()
  if (val === 'tags') fetchTags()
})
</script>
