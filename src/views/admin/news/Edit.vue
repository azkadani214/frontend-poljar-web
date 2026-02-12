<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <Button variant="ghost" size="icon" @click="router.back()">
          <ArrowLeft class="w-5 h-5" />
        </Button>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Edit Berita</h2>
          <p class="text-xs text-gray-500">
            Perbarui informasi yang sudah ada
            <span v-if="isRestored" class="ml-2 text-amber-500 font-medium"
              >(Memulihkan Draft Lokal)</span
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
          Hapus Draft Lokal
        </Button>
        <Button variant="outline" @click="router.back()" :disabled="isLoading"> Batal </Button>
        <Button
          class="bg-primary-navy hover:bg-primary-navy/90 text-white"
          @click="handleSubmit"
          :disabled="isLoading || isLoadingData"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          <Save v-else class="w-4 h-4 mr-2" />
          Simpan Perubahan
        </Button>
      </div>
    </div>

    <div
      v-if="isLoadingData"
      class="flex flex-col items-center justify-center py-24 bg-white border rounded-xl"
    >
      <Loader2 class="w-10 h-10 text-primary-orange animate-spin mb-4" />
      <p class="text-gray-500 font-medium">Memuat data berita...</p>
    </div>

    <div v-else class="grid lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title & Content -->
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-sm font-bold uppercase tracking-wider text-gray-400"
              >Konten Berita</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="title">Judul Berita</Label>
              <Input
                id="title"
                v-model="form.title"
                placeholder="Masukkan judul berita yang menarik..."
                class="text-lg font-bold h-12"
              />
            </div>

            <div class="space-y-2">
              <Label for="sub_title">Sub Judul</Label>
              <Input
                id="sub_title"
                v-model="form.sub_title"
                placeholder="Masukkan sub judul berita (opsional)..."
              />
            </div>

            <div class="space-y-2">
              <Label>Isi Berita</Label>
              <RichTextEditor v-model="form.body" />
            </div>

            <div class="space-y-2">
              <Label for="excerpt">Ringkasan (Optional)</Label>
              <Textarea
                id="excerpt"
                v-model="form.excerpt"
                placeholder="Tulis ringkasan singkat untuk tampilan kartu berita..."
                rows="3"
                class="resize-none"
              />
              <p class="text-[10px] text-gray-400">
                Maksimal 200 karakter. Jika kosong, akan diambil dari isi berita.
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- SEO Details -->
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-sm font-bold uppercase tracking-wider text-gray-400"
              >Optimasi SEO</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="seo_title">SEO Title</Label>
              <Input
                id="seo_title"
                v-model="form.seo_title"
                placeholder="Judul untuk mesin pencari..."
              />
            </div>
            <div class="space-y-2">
              <Label for="seo_desc">Meta Description</Label>
              <Textarea
                id="seo_desc"
                v-model="form.seo_description"
                placeholder="Deskripsi untuk mesin pencari..."
                rows="2"
              />
            </div>
            <div class="space-y-2">
              <Label for="seo_keywords">Keywords</Label>
              <Input
                id="seo_keywords"
                v-model="form.seo_keywords"
                placeholder="kata, kunci, berita (pisahkan dengan koma)"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Sidebar Settings -->
      <div class="space-y-6">
        <!-- Publication Settings -->
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-sm font-bold uppercase tracking-wider text-gray-400"
              >Pengaturan Publikasi</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-2">
              <Label>Status</Label>
              <Select v-model="form.status">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Langsung Terbit</SelectItem>
                  <SelectItem value="scheduled">Terjadwal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div v-if="form.status === 'scheduled'" class="space-y-2 animate-slide-down">
              <Label>Waktu Publikasi</Label>
              <Input type="datetime-local" v-model="form.publish_at" />
            </div>

            <div
              class="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/50"
            >
              <div class="flex flex-col">
                <span class="text-xs font-bold text-gray-700">Berita Unggulan</span>
                <span class="text-[10px] text-gray-500">Tampilkan di halaman utama</span>
              </div>
              <Switch :checked="form.is_featured" @update:checked="form.is_featured = $event" />
            </div>

            <div
              class="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/50"
            >
              <div class="flex flex-col">
                <span class="text-xs font-bold text-gray-700">Izinkan Komentar</span>
                <span class="text-[10px] text-gray-500">Publik bisa memberi tanggapan</span>
              </div>
              <Switch
                :checked="form.allow_comments"
                @update:checked="form.allow_comments = $event"
              />
            </div>
          </CardContent>
        </Card>

        <!-- Category & Tags -->
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-sm font-bold uppercase tracking-wider text-gray-400"
              >Kategori & Label</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-2">
              <Label>Kategori</Label>
              <Select v-model="form.category_id">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.id.toString()">
                    {{ cat.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-2">
              <Label>Label (Tags)</Label>
              <div class="flex flex-wrap gap-1.5 mb-2">
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
                  placeholder="Ketik tag..."
                  class="h-8 text-xs"
                  @keydown.enter.prevent="addTag"
                />
                <Button size="sm" variant="outline" class="h-8" @click="addTag">Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Featured Image -->
        <Card class="bg-white">
          <CardHeader>
            <CardTitle class="text-sm font-bold uppercase tracking-wider text-gray-400"
              >Gambar Utama</CardTitle
            >
          </CardHeader>
          <CardContent>
            <div v-if="currentImage && !form.image" class="mb-4">
              <p
                class="text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-wider text-center"
              >
                Gambar Saat Ini
              </p>
              <div class="relative group rounded-xl overflow-hidden border">
                <img :src="currentImage" class="w-full h-auto" />
                <div
                  class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <Button variant="secondary" size="sm" @click="currentImage = null"
                    >Ganti Gambar</Button
                  >
                </div>
              </div>
            </div>
            <ImageUploader v-else v-model="form.image" />
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
              <h3 class="text-xl font-bold">Pulihkan Perubahan Lokal?</h3>
              <p class="text-white/70 text-sm mt-1">
                Kami menemukan perubahan lokal berita yang belum tersimpan.
              </p>
            </div>
          </div>
        </div>
        <div class="p-6 bg-white space-y-4">
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div class="w-10 h-10 rounded-lg bg-primary-orange/10 flex items-center justify-center">
              <Newspaper class="w-5 h-5 text-primary-orange" />
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
import { ref, reactive, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ArrowLeft, Save, Loader2, X, Plus, RotateCcw, Newspaper } from 'lucide-vue-next'
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
import { Switch } from '@/components/ui/switch'
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
import RichTextEditor from '@/components/admin/shared/RichTextEditor.vue'
import ImageUploader from '@/components/admin/shared/ImageUploader.vue'
import newsService from '@/services/news.service'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const toast = useToast()
const authStore = useAuthStore()

const id = route.params.id
const isLoading = ref(false)
const isLoadingData = ref(true)
const categories = ref([])
const newTag = ref('')
const currentImage = ref(null)
const isRestored = ref(false)
const autoSaveInterval = ref(null)
const showRestoreModal = ref(false)
const pendingDraft = ref(null)
const hasCheckedDraft = ref(false)

const formatLastSaved = computed(() => {
  if (!pendingDraft.value?.timestamp) return ''
  return dayjs(pendingDraft.value.timestamp).format('DD MMM, HH:mm')
})

const DRAFT_KEY = computed(() => `news_edit_draft_${id}_${authStore.user?.id || 'guest'}`)

watch(
  DRAFT_KEY,
  (newKey) => {
    if (newKey && !hasCheckedDraft.value && authStore.user?.id && !isLoadingData.value) {
      checkLocalDraft()
    }
  },
  { immediate: true },
)

const form = reactive({
  title: '',
  sub_title: '',
  body: '',
  excerpt: '',
  status: 'draft',
  category_id: '',
  tags: [],
  is_featured: false,
  allow_comments: true,
  publish_at: '',
  image: null,
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
})

async function fetchNews() {
  try {
    isLoadingData.value = true
    const response = await newsService.getBySlug(id)
    const data = response.data

    // Populate form with all fields
    form.title = data.title || ''
    form.sub_title = data.sub_title || ''
    form.body = data.body || ''
    form.excerpt = data.excerpt || ''
    form.status = data.status || 'draft'
    form.category_id = data.categories?.[0]?.id?.toString() || ''
    form.tags = (data.tags || []).map((t) => t.name)
    form.is_featured = !!data.is_featured
    form.allow_comments = !!data.allow_comments
    form.publish_at = data.published_at ? data.published_at.slice(0, 16) : ''

    // SEO
    if (data.seo) {
      form.seo_title = data.seo.meta_title || ''
      form.seo_description = data.seo.meta_description || ''
      form.seo_keywords = data.seo.keywords ? data.seo.keywords.join(', ') : ''
    }

    currentImage.value = data.cover_photo_url
  } catch (error) {
    console.error('Fetch news error:', error)
    toast.error('Gagal memuat data berita')
    router.back()
  } finally {
    isLoadingData.value = false
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

function addTag() {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
  }
  newTag.value = ''
}

function removeTag(tag) {
  form.tags = form.tags.filter((t) => t !== tag)
}

async function handleSubmit() {
  if (!form.title) return toast.error('Judul berita harus diisi')
  if (!form.body) return toast.error('Isi berita tidak boleh kosong')

  isLoading.value = true

  try {
    const formData = new FormData()

    formData.append('title', form.title)
    if (form.sub_title) formData.append('sub_title', form.sub_title)
    formData.append('body', form.body)
    formData.append('status', form.status)

    if (form.excerpt) formData.append('excerpt', form.excerpt)
    if (form.publish_at) formData.append('published_at', form.publish_at)

    // Checkbox/Switch values as 1/0
    formData.append('is_featured', form.is_featured ? '1' : '0')
    formData.append('allow_comments', form.allow_comments ? '1' : '0')

    // Categories
    if (form.category_id) {
      formData.append('categories[0]', form.category_id)
    }

    // Tags
    if (form.tags && form.tags.length > 0) {
      form.tags.forEach((tag, i) => formData.append(`tags[${i}]`, tag))
    }

    // Image (File object)
    if (form.image instanceof File) {
      formData.append('cover_photo', form.image)
    }

    // Method spoofing for PUT if sending as multipart/form-data
    formData.append('_method', 'PUT')

    // SEO Structure
    if (form.seo_title) formData.append('seo[meta_title]', form.seo_title)
    if (form.seo_description) formData.append('seo[meta_description]', form.seo_description)
    if (form.seo_keywords) {
      form.seo_keywords.split(',').forEach((kw, i) => {
        formData.append(`seo[keywords][${i}]`, kw.trim())
      })
    }

    await newsService.update(id, formData)
    toast.success('Berita berhasil diperbarui')
    clearDraft()
    router.push('/admin/news')
  } catch (error) {
    console.error('Submit error:', error)
    const backendErrors = error.response?.data?.errors
    if (backendErrors) {
      Object.values(backendErrors).forEach((errArray) => {
        toast.error(errArray[0])
      })
    } else {
      toast.error(error.response?.data?.message || 'Gagal memperbarui berita')
    }
  } finally {
    isLoading.value = false
  }
}

// AUTO SAVE LOGIC
function saveToLocal() {
  if (isLoadingData.value) return

  const dataToSave = {
    title: form.title,
    sub_title: form.sub_title,
    body: form.body,
    excerpt: form.excerpt,
    category_id: form.category_id,
    tags: form.tags,
    is_featured: form.is_featured,
    allow_comments: form.allow_comments,
    seo_title: form.seo_title,
    seo_description: form.seo_description,
    seo_keywords: form.seo_keywords,
    timestamp: new Date().getTime(),
  }
  localStorage.setItem(DRAFT_KEY.value, JSON.stringify(dataToSave))
}

function checkLocalDraft() {
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
    toast.info('Draft lokal berita berhasil dipulihkan')
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
  fetchNews()

  autoSaveInterval.value = setInterval(() => {
    if (!isLoadingData.value && (form.title || form.body)) {
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
