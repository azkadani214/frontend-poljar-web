<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <Button variant="ghost" size="icon" @click="router.back()">
          <ArrowLeft class="w-5 h-5" />
        </Button>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Tulis Artikel Baru</h2>
          <p class="text-xs text-gray-500">
            Berbagi ilmu dan inspirasi melalui tulisan
            <span v-if="isRestored" class="ml-2 text-amber-500 font-medium"
              >(Memulihkan Draft)</span
            >
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button
          v-if="isRestored"
          variant="ghost"
          size="sm"
          @click="clearDraft"
          class="text-red-500 hover:text-red-600"
        >
          Hapus Draft
        </Button>
        <Button variant="outline" @click="handleSaveDraft" :disabled="isLoading">
          Simpan Draft
        </Button>
        <Button
          class="bg-primary-navy hover:bg-primary-navy/90 text-white"
          @click="handleSubmit"
          :disabled="isLoading"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          <Send v-else class="w-4 h-4 mr-2" />
          Publikasikan
        </Button>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-xs font-bold uppercase text-gray-400 tracking-wider"
              >Isi Artikel</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="title">Judul Artikel</Label>
              <Input
                id="title"
                v-model="form.title"
                placeholder="Masukkan judul artikel yang memikat..."
                class="text-lg font-bold h-12"
              />
            </div>

            <div class="space-y-2">
              <Label for="sub_title">Sub Judul</Label>
              <Input
                id="sub_title"
                v-model="form.sub_title"
                placeholder="Masukkan sub judul artikel (opsional)..."
              />
            </div>

            <div class="space-y-2">
              <Label>Konten</Label>
              <RichTextEditor v-model="form.body" />
            </div>
          </CardContent>
        </Card>

        <!-- SEO -->
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-xs font-bold uppercase text-gray-400 tracking-wider"
              >Optimasi SEO</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label>SEO Title</Label>
              <Input v-model="form.seo_title" placeholder="Judul untuk Google..." />
            </div>
            <div class="space-y-2">
              <Label>Meta Description</Label>
              <Textarea
                v-model="form.seo_description"
                placeholder="Deskripsi singkat untuk mesin pencari..."
                rows="2"
                class="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-xs font-bold uppercase text-gray-400 tracking-wider"
              >Status & Jadwal</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label>Status</Label>
              <Select v-model="form.status">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Publikasi</SelectItem>
                  <SelectItem value="scheduled">Terjadwal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div v-if="form.status === 'scheduled'" class="space-y-2 animate-slide-down">
              <Label>Waktu Tayang</Label>
              <Input type="datetime-local" v-model="form.published_at" />
            </div>
          </CardContent>
        </Card>

        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-xs font-bold uppercase text-gray-400 tracking-wider"
              >Kategori</CardTitle
            >
          </CardHeader>
          <CardContent>
            <div class="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="cat in categories" :key="cat.id" class="flex items-center space-x-2">
                <Checkbox
                  :id="`cat-${cat.id}`"
                  :checked="form.category_ids.includes(cat.id)"
                  @update:checked="(val) => toggleCategory(cat.id, val)"
                />
                <Label :for="`cat-${cat.id}`" class="text-sm font-normal cursor-pointer">{{
                  cat.name
                }}</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-xs font-bold uppercase text-gray-400 tracking-wider"
              >Label (Tags)</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex flex-wrap gap-1.5">
              <Badge v-for="tag in form.tags" :key="tag" variant="secondary" class="pr-1 py-1">
                {{ tag }}
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-3 w-3 ml-1 hover:bg-transparent"
                  @click="removeTag(tag)"
                >
                  <X class="w-2 h-2" />
                </Button>
              </Badge>
            </div>
            <div class="flex gap-2">
              <Input
                v-model="newTag"
                placeholder="Add tag..."
                class="h-8 text-xs"
                @keydown.enter.prevent="addTag"
              />
              <Button size="sm" variant="outline" class="h-8" @click="addTag">Add</Button>
            </div>
          </CardContent>
        </Card>

        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-xs font-bold uppercase text-gray-400 tracking-wider"
              >Cover Artikel</CardTitle
            >
          </CardHeader>
          <CardContent>
            <ImageUploader v-model="form.cover_photo" />
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Restore Draft Modal -->
    <AlertDialog :open="showRestoreModal" @update:open="showRestoreModal = $event">
      <AlertDialogContent class="max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
        <div class="bg-gradient-to-br from-primary-navy to-blue-900 p-6 text-white relative">
          <div class="absolute top-0 right-0 p-8 opacity-10">
            <RotateCcw class="w-24 h-24 rotate-12" />
          </div>
          <div class="relative z-10 flex flex-col items-center text-center space-y-4">
            <div class="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <RotateCcw class="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 class="text-xl font-bold">Pulihkan Draft?</h3>
              <p class="text-white/70 text-sm mt-1">
                Kami menemukan tulisan yang belum selesai dari sesi sebelumnya.
              </p>
            </div>
          </div>
        </div>
        <div class="p-6 bg-white space-y-4">
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div class="w-10 h-10 rounded-lg bg-primary-orange/10 flex items-center justify-center">
              <FileText class="w-5 h-5 text-primary-orange" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-gray-900 truncate">
                {{ pendingDraft?.title || 'Draft tanpa judul' }}
              </p>
              <p class="text-[10px] text-gray-400">Terakhir disimpan {{ formatLastSaved }}</p>
            </div>
          </div>
          <div class="flex gap-3">
            <AlertDialogCancel @click="rejectDraft" class="flex-1 h-11 rounded-xl border-gray-200">
              Abaikan
            </AlertDialogCancel>
            <AlertDialogAction
              @click="confirmRestore"
              class="flex-1 h-11 rounded-xl bg-primary-navy hover:bg-primary-navy/90 text-white"
            >
              Pulihkan
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ArrowLeft, Send, Loader2, X, RotateCcw, FileText } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import RichTextEditor from '@/components/admin/shared/RichTextEditor.vue'
import ImageUploader from '@/components/admin/shared/ImageUploader.vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import blogService from '@/services/blog.service'
import dayjs from 'dayjs'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const isLoading = ref(false)
const categories = ref([])
const newTag = ref('')
const isRestored = ref(false)
const autoSaveInterval = ref(null)
const showRestoreModal = ref(false)
const pendingDraft = ref(null)
const hasCheckedDraft = ref(false)

const formatLastSaved = computed(() => {
  if (!pendingDraft.value?.timestamp) return ''
  return dayjs(pendingDraft.value.timestamp).format('DD MMM, HH:mm')
})

const DRAFT_KEY = computed(() => `blog_draft_${authStore.user?.id || 'guest'}`)

watch(
  DRAFT_KEY,
  (newKey) => {
    if (newKey && !hasCheckedDraft.value && authStore.user?.id) {
      loadFromLocal()
    }
  },
  { immediate: true },
)

const form = reactive({
  title: '',
  sub_title: '',
  body: '',
  status: 'draft',
  category_ids: [],
  tags: [],
  cover_photo: null,
  published_at: '',
  seo_title: '',
  seo_description: '',
})

async function fetchCategories() {
  try {
    const response = await blogService.getCategories()
    categories.value = response.data || []
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

function toggleCategory(id, checked) {
  if (checked) form.category_ids.push(id)
  else form.category_ids = form.category_ids.filter((i) => i !== id)
}

function addTag() {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) form.tags.push(tag)
  newTag.value = ''
}

function removeTag(tag) {
  form.tags = form.tags.filter((t) => t !== tag)
}

async function handleSaveDraft() {
  form.status = 'draft'
  await handleSubmit()
}

async function handleSubmit() {
  if (!form.title || !form.body) return toast.error('Lengkapi judul dan konten artikel')
  isLoading.value = true
  try {
    const formData = new FormData()

    formData.append('title', form.title)
    if (form.sub_title) formData.append('sub_title', form.sub_title)
    formData.append('body', form.body)
    formData.append('status', form.status)

    if (form.published_at) formData.append('published_at', form.published_at)

    // Categories (array)
    if (form.category_ids && form.category_ids.length > 0) {
      form.category_ids.forEach((id, i) => formData.append(`category_ids[${i}]`, id))
    }

    // Tags
    if (form.tags && form.tags.length > 0) {
      form.tags.forEach((tag, i) => formData.append(`tag_ids[${i}]`, tag))
    }

    // Cover Photo
    if (form.cover_photo instanceof File) {
      formData.append('cover_photo', form.cover_photo)
    }

    // SEO Structure
    if (form.seo_title) formData.append('seo[meta_title]', form.seo_title)
    if (form.seo_description) formData.append('seo[meta_description]', form.seo_description)

    await blogService.adminCreate(formData)
    toast.success('Artikel berhasil disimpan')
    clearDraft() // Clear local storage draft after successful save
    router.push('/admin/blog')
  } catch (error) {
    console.error('Submit error:', error)
    const backendErrors = error.response?.data?.errors
    if (backendErrors) {
      Object.values(backendErrors).forEach((errArray) => {
        toast.error(errArray[0])
      })
    } else {
      toast.error(error.response?.data?.message || 'Gagal menyimpan artikel')
    }
  } finally {
    isLoading.value = false
  }
}

// AUTO SAVE LOGIC
function saveToLocal() {
  const dataToSave = {
    title: form.title,
    sub_title: form.sub_title,
    body: form.body,
    category_ids: form.category_ids,
    tags: form.tags,
    seo_title: form.seo_title,
    seo_description: form.seo_description,
    timestamp: new Date().getTime(),
  }
  localStorage.setItem(DRAFT_KEY.value, JSON.stringify(dataToSave))
}

function loadFromLocal() {
  const saved = localStorage.getItem(DRAFT_KEY.value)
  if (saved) {
    try {
      pendingDraft.value = JSON.parse(saved)
      showRestoreModal.value = true
      hasCheckedDraft.value = true
    } catch (e) {
      console.error('Failed to parse saved draft')
    }
  }
}

function confirmRestore() {
  if (pendingDraft.value) {
    Object.assign(form, pendingDraft.value)
    isRestored.value = true
    toast.info('Draft berhasil dipulihkan')
    showRestoreModal.value = false
  }
}

function rejectDraft() {
  localStorage.removeItem(DRAFT_KEY.value)
  pendingDraft.value = null
  showRestoreModal.value = false
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY.value)
  isRestored.value = false
}

onMounted(() => {
  fetchCategories()

  // Set up auto-save interval every 3 seconds if there's content
  autoSaveInterval.value = setInterval(() => {
    if (form.title || form.body) {
      saveToLocal()
    }
  }, 3000)
})

onBeforeUnmount(() => {
  if (autoSaveInterval.value) {
    clearInterval(autoSaveInterval.value)
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
</style>
