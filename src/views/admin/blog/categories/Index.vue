<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Kategori Blog</h2>
        <p class="text-xs text-gray-500">Kelompokkan artikel blog agar pembaca lebih mudah menjelajah</p>
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
            <div class="p-3 bg-orange-50 rounded-xl">
              <Folders class="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
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
          <h3 class="font-bold text-gray-900">Belum Ada Kategori Blog</h3>
          <p class="text-sm text-gray-500 mt-1">Buat kategori blog pertama Anda sekarang.</p>
        </div>
        <Button variant="outline" size="sm" @click="openCreateModal">Buat Kategori</Button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 border-b border-gray-100">
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Kategori</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Slug</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50/30 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Hash class="w-4 h-4 text-orange-600" />
                  </div>
                  <span class="font-bold text-gray-900">{{ category.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 font-mono">{{ category.slug }}</td>
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
          <DialogTitle>{{ editingId ? 'Edit Kategori Blog' : 'Tambah Kategori Blog Baru' }}</DialogTitle>
          <DialogDescription>
            Tentukan nama kategori yang sesuai untuk artikel blog Anda.
          </DialogDescription>
        </DialogHeader>
        
        <form @submit.prevent="handleSave" class="space-y-4 pt-4">
          <div class="space-y-2">
            <Label for="blog-cat-name">Nama Kategori</Label>
            <Input id="blog-cat-name" v-model="form.name" placeholder="Contoh: Tips, Kegiatan, Relawan" required />
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
  Folders, 
  FolderX, 
  Edit2, 
  Trash2,
  Hash
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import blogService from '@/services/blog.service'

const toast = useToast()
const categories = ref([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const isModalOpen = ref(false)
const editingId = ref(null)

const form = reactive({
  name: ''
})

async function fetchCategories() {
  isLoading.value = true
  try {
    const response = await blogService.adminGetCategories({ t: Date.now() })
    categories.value = response.data || []
  } catch (error) {
    toast.error('Gagal memuat kategori blog')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function openCreateModal() {
  editingId.value = null
  form.name = ''
  isModalOpen.value = true
}

function openEditModal(category) {
  editingId.value = category.id
  form.name = category.name
  isModalOpen.value = true
}

async function handleSave() {
  isSubmitting.value = true
  try {
    if (editingId.value) {
      await blogService.updateCategory(editingId.value, { ...form })
      toast.success('Kategori blog diperbarui')
    } else {
      await blogService.createCategory({ ...form })
      toast.success('Kategori blog ditambahkan')
    }
    await fetchCategories()
    isModalOpen.value = false
  } catch (error) {
    toast.error(error.response?.data?.message || 'Gagal menyimpan kategori blog')
  } finally {
    isSubmitting.value = false
  }
}

async function handleDelete(category) {
  if (!confirm(`Hapus kategori blog "${category.name}"?`)) return
  
  try {
    await blogService.deleteCategory(category.id)
    toast.success('Kategori blog dihapus')
    await fetchCategories()
  } catch (error) {
    toast.error('Gagal menghapus kategori')
  }
}

onMounted(fetchCategories)
</script>
