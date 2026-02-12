<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-primary-navy">Kelola Komentar</h1>
        <p class="text-muted-foreground">Moderasi diskusi pada artikel berita dan blog.</p>
      </div>
    </div>

    <!-- Tabs -->
    <Tabs v-model="activeTab" class="w-full" @update:modelValue="fetchComments">
      <div class="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="news">Komentar Berita</TabsTrigger>
          <TabsTrigger value="blog">Komentar Blog</TabsTrigger>
        </TabsList>

        <!-- Filters & Search -->
        <div class="flex items-center gap-2">
          <div class="relative w-64">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              v-model="search"
              placeholder="Cari komentar..."
              class="pl-9"
              @input="handleSearch"
            />
          </div>
          <Select v-model="statusFilter" @update:modelValue="fetchComments">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="approved">Disetujui</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="mt-6">
        <TabsContent value="news">
          <CommentTable
            :comments="comments"
            :loading="loading"
            @approve="handleApprove"
            @reject="handleReject"
            @delete="handleDelete"
            @page-change="handlePageChange"
            :pagination="pagination"
          />
        </TabsContent>

        <TabsContent value="blog">
          <CommentTable
            :comments="comments"
            :loading="loading"
            @approve="handleApprove"
            @reject="handleReject"
            @delete="handleDelete"
            @page-change="handlePageChange"
            :pagination="pagination"
          />
        </TabsContent>
      </div>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { Search } from 'lucide-vue-next'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CommentTable from '@/components/admin/comments/CommentTable.vue'
import newsService from '@/services/news.service'
import blogService from '@/services/blog.service'
import _ from 'lodash'

const toast = useToast()
const activeTab = ref('news')
const search = ref('')
const statusFilter = ref('all')
const loading = ref(false)
const comments = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
})

const fetchComments = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.value.current_page,
      per_page: pagination.value.per_page,
      status: statusFilter.value === 'all' ? undefined : statusFilter.value,
      search: search.value,
    }

    let response
    if (activeTab.value === 'news') {
      if (statusFilter.value === 'pending') {
        response = await newsService.adminGetPendingComments(params)
      } else {
        response = await newsService.adminGetComments(params)
      }
    } else {
      response = await blogService.adminGetComments(params)
    }

    comments.value = response.data
    pagination.value = response.meta || response.pagination || pagination.value
  } catch (error) {
    console.error(error)
    toast.error('Gagal mengambil data komentar')
  } finally {
    loading.value = false
  }
}

const handleSearch = _.debounce(() => {
  pagination.value.current_page = 1
  fetchComments()
}, 500)

const handlePageChange = (page) => {
  pagination.value.current_page = page
  fetchComments()
}

const handleApprove = async (id) => {
  try {
    if (activeTab.value === 'news') {
      await newsService.adminApproveComment(id)
    } else {
      await blogService.adminApproveComment(id)
    }
    toast.success('Komentar berhasil disetujui')
    fetchComments()
  } catch (error) {
    toast.error('Gagal menyetujui komentar')
  }
}

const handleReject = async (id) => {
  try {
    if (activeTab.value === 'news') {
      await newsService.adminRejectComment(id)
    } else {
      await blogService.adminRejectComment(id)
    }
    toast.success('Komentar berhasil ditolak')
    fetchComments()
  } catch (error) {
    toast.error('Gagal menolak komentar')
  }
}

const handleDelete = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus komentar ini?')) return
  try {
    if (activeTab.value === 'news') {
      await newsService.adminDeleteComment(id)
    } else {
      await blogService.adminDeleteComment(id)
    }
    toast.success('Komentar berhasil dihapus')
    fetchComments()
  } catch (error) {
    toast.error('Gagal menghapus komentar')
  }
}

onMounted(() => {
  fetchComments()
})
</script>
