<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? 'Ubah Jabatan' : 'Tambah Jabatan Baru' }}</DialogTitle>
        <DialogDescription>
          Kelola nama, divisi, dan level hierarki untuk jabatan ini.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-4 py-4">
        <div class="space-y-2">
          <Label for="division">Divisi</Label>
          <Select v-model="form.division_id" required :disabled="isLoading">
            <SelectTrigger>
              <SelectValue placeholder="Pilih Divisi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="div in divisions" :key="div.id" :value="div.id">
                {{ div.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label for="name">Nama Jabatan</Label>
          <Input 
            id="name" 
            v-model="form.name" 
            placeholder="Contoh: Koordinator Media" 
            required 
            :disabled="isLoading"
          />
        </div>

        <div class="space-y-2">
          <Label for="level">Level Hierarki</Label>
          <Input 
            id="level" 
            type="number" 
            v-model="form.level" 
            min="1" 
            max="10" 
            required 
            :disabled="isLoading"
          />
          <p class="text-[10px] text-gray-500">Level 1-2 dianggap sebagai Admin PM (Core Team).</p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="$emit('update:open', false)" :disabled="isLoading">
            Batal
          </Button>
          <Button type="submit" class="bg-primary-navy text-white hover:bg-primary-navy/90" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Simpan Perubahan' : 'Buat Jabatan' }}
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2Icon } from 'lucide-vue-next'

const props = defineProps({
  open: Boolean,
  isEditing: Boolean,
  position: Object,
  divisions: Array,
  isLoading: Boolean
})

const emit = defineEmits(['update:open', 'submit'])

const form = reactive({
  division_id: '',
  name: '',
  level: 3
})

watch(() => props.position, (val) => {
  if (val) {
    form.division_id = val.division_id
    form.name = val.name
    form.level = val.level
  } else {
    form.division_id = ''
    form.name = ''
    form.level = 3
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>
