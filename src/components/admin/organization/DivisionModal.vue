<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? 'Ubah Divisi' : 'Tambah Divisi Baru' }}</DialogTitle>
        <DialogDescription>
          Masukkan nama divisi PM yang baru. Pastikan nama divisi belum pernah digunakan.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-4 py-4">
        <div class="space-y-2">
          <Label for="name">Nama Divisi</Label>
          <Input 
            id="name" 
            v-model="form.name" 
            placeholder="Contoh: Media & Komunikasi" 
            required 
            :disabled="isLoading"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="$emit('update:open', false)" :disabled="isLoading">
            Batal
          </Button>
          <Button type="submit" class="bg-primary-navy text-white hover:bg-primary-navy/90" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Simpan Perubahan' : 'Buat Divisi' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2Icon } from 'lucide-vue-next'

const props = defineProps({
  open: Boolean,
  isEditing: Boolean,
  division: Object,
  isLoading: Boolean
})

const emit = defineEmits(['update:open', 'submit'])

const form = reactive({
  name: ''
})

watch(() => props.division, (val) => {
  if (val) {
    form.name = val.name
  } else {
    form.name = ''
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>
