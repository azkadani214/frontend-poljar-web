<template>
  <div class="space-y-4 w-full">
    <div
      class="relative aspect-video rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-primary-orange group cursor-pointer"
      @click="triggerFilePicker"
      :class="{ 'border-primary-orange bg-primary-orange/5': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleFileSelect"
      />

      <!-- Preview Image -->
      <template v-if="previewUrl">
        <img :src="previewUrl" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button type="button" size="sm" variant="secondary" @click.stop="triggerFilePicker">
            Ganti Gambar
          </Button>
          <Button type="button" size="sm" variant="destructive" @click.stop="removeImage">
            Hapus
          </Button>
        </div>
      </template>

      <!-- Empty State -->
      <template v-else>
        <div class="p-6 text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-3 group-hover:scale-110 transition-transform">
            <UploadCloudIcon class="w-6 h-6 text-gray-400 group-hover:text-primary-orange" />
          </div>
          <p class="text-sm font-medium text-gray-700">Klik atau seret gambar ke sini</p>
          <p class="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">PNG, JPG atau WEBP (Maks. 2MB)</p>
        </div>
      </template>

      <!-- Loading Overlay -->
      <div v-if="isUploading" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col">
        <Loader2Icon class="w-8 h-8 text-primary-orange animate-spin mb-2" />
        <p class="text-xs font-medium text-gray-600">Mengunggah...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { UploadCloudIcon, Loader2Icon, ImageIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps({
  modelValue: {
    type: [File, String],
    default: null
  },
  existingUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const fileInput = ref(null)
const isDragging = ref(false)
const isUploading = ref(false)
const previewUrl = ref(props.existingUrl)

watch(() => props.existingUrl, (newVal) => {
  if (newVal) previewUrl.value = newVal
})

function triggerFilePicker() {
  fileInput.value.click()
}

function handleFileSelect(e) {
  const file = e.target.files[0]
  processFile(file)
}

function handleDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  processFile(file)
}

function processFile(file) {
  if (!file) return
  if (!file.type.startsWith('image/')) {
    alert('Hanya file gambar yang diperbolehkan')
    return
  }
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran file maksimal 2MB')
    return
  }

  emit('update:modelValue', file)
  emit('change', file)
  
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  previewUrl.value = ''
  emit('update:modelValue', null)
  emit('change', null)
  if (fileInput.value) fileInput.value.value = ''
}
</script>
