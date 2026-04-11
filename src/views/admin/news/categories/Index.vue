<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Kategori Berita</h2>
        <p class="text-xs text-gray-500">Kelompokkan informasi Anda agar lebih mudah ditemukan</p>
      </div>
      <Button
        class="bg-primary-navy hover:bg-primary-navy/90 text-white"
        @click="openCreateModal"
      >
        <Plus class="w-4 h-4 mr-2" />
        Tambah Kategori
      </Button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="bg-gradient-to-br from-white to-gray-50/50 border-gray-100">
        <CardContent class="pt-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Kategori</p>
              <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ categories.length }}</h3>
            </div>
            <div class="p-3 bg-blue-50 rounded-xl">
              <FolderTree class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <!-- You can add more stats here if needed by the backend -->
    </div>

    <!-- Categories Table -->
    <Card class="bg-white border-gray-100 shadow-sm overflow-hidden">
      <div v-if="isLoading" class="p-12 flex flex-col items-center justify-center space-y-4">
        <Loader2 class="w-8 h-8 text-primary-navy animate-spin" />
        <p class="text-sm text-gray-500 animate-pulse">Memuat data kategori...</p>
      </div>

      <div v-else-if="categories.length === 0" class="p-12 text-center space-y-4">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
          <FolderX class="w-8 h-8 text-gray-300" />
        </div>
        <div>
          <h3 class="font-bold text-gray-900">Belum Ada Kategori</h3>
          <p class="text-sm text-gray-500 mt-1">Mulai organisir berita Anda dengan membuat kategori baru.</p>
        </div>
        <Button variant="outline" size="sm" @click="openCreateModal">Buat Kategori Pertama</Button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100">
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Kategori</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Slug</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-lg bg-primary-orange/10 flex items-center justify-center">
                    <Hash class="w-4 h-4 text-primary-orange" />
                  </div>
                  <span class="font-bold text-gray-900">{{ category.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 font-mono">{{ category.slug }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {{ category.description || '-' }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <Button variant="ghost" size="icon" class="h-8 w-8 text-blue-500 hover:bg-blue-50" @click="openEditModal(category)">
                    <Edit2 class="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" class="h-8 w-8 text-red-500 hover:bg-red-50" @click="handleDelete(category)">
                    <Trash2 class="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Upsert Modal -->
    <Dialog :open="isModalOpen" @update:open="isModalOpen = $event">
      <DialogContent class="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{{ editingId ? 'Edit Kategori' : 'Tambah Kategori Baru' }}</DialogTitle>
          <DialogDescription>
            Tentukan nama kategori yang mudah diingat untuk berita Anda.
          </DialogDescription>
        </DialogHeader>
        
        <form @submit.prevent="handleSave" class="space-y-4 pt-4">
          <div class="space-y-2">
            <Label for="cat-name">Nama Kategori</Label>
            <Input id="cat-name" v-model="form.name" placeholder="Contoh: Pendidikan, Event, dll" required />
          </div>
          <div class="space-y-2">
            <Label for="cat-desc">Deskripsi (Opsional)</Label>
            <Textarea id="cat-desc" v-model="form.description" placeholder="Penjelasan singkat kategori..." rows="3" />
          </div>
          
          <DialogFooter class="pt-4">
            <Button type="button" variant="ghost" @click="isModalOpen = false" :disabled="isSubmitting">Batal</Button>
            <Button class="bg-primary-navy text-white hover:bg-primary-navy/90" :disabled="isSubmitting">
              <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
              {{ editingId ? 'Simpan Perubahan' : 'Buat Kategori' }}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { 
  Plus, 
  Loader2, 
  FolderTree, 
  FolderX, 
  Edit2, 
  Trash2,
  Hash
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import newsService from '@/services/news.service'

const toast = useToast()
const categories = ref([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const editingId = ref(null)

const form = reactive({
  name: '',
  description: ''
})

async function fetchCategories() {
  isLoading.value = true
  try {
    const response = await newsService.getCategories()
    categories.value = response.data || []
  } catch (error) {
    toast.error('Gagal memuat kategori')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function openCreateModal() {
  editingId.value = null
  form.name = ''
  form.description = ''
  isModalOpen.value = true
}

function openEditModal(category) {
  editingId.value = category.id
  form.name = category.name
  form.description = category.description || ''
  isModalOpen.value = true
}

async function handleSave() {
  isSubmitting.value = true
  try {
    if (editingId.value) {
      await newsService.updateCategory(editingId.value, { ...form })
      toast.success('Kategori berhasil diperbarui')
    } else {
      await newsService.createCategory({ ...form })
      toast.success('Kategori baru ditambahkan')
    }
    await fetchCategories()
    isModalOpen.value = false
  } catch (error) {
    toast.error(error.response?.data?.message || 'Gagal menyimpan kategori')
  } finally {
    isSubmitting.value = false
  }
}

async function handleDelete(category) {
  if (!confirm(`Hapus kategori "${category.name}"? Berita di kategori ini akan kehilangan kategorinya.`)) return
  
  try {
    await newsService.deleteCategory(category.id)
    toast.success('Kategori dihapus')
    await fetchCategories()
  } catch (error) {
    toast.error('Gagal menghapus kategori')
  }
}

onMounted(fetchCategories)
</script>
