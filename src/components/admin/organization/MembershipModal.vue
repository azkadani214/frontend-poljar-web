<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? 'Ubah Keanggotaan' : 'Tambah Anggota' }}</DialogTitle>
        <DialogDescription>
          Tentukan pengguna, divisi, dan jabatan untuk keanggotaan ini.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-4 py-4">
        <!-- User Selection (Only on Create) -->
        <div class="space-y-2" v-if="!isEditing">
          <Label for="user">Pilih Pengguna</Label>
          <Select v-model="form.user_id" required :disabled="isLoading || isEditing">
            <SelectTrigger>
              <SelectValue placeholder="Pilih Pengguna" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} ({{ user.email }})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div v-else class="space-y-1">
           <Label>Pengguna</Label>
           <p class="text-sm font-bold text-gray-900 border p-2 rounded bg-gray-50">{{ membership?.user?.name }}</p>
        </div>

        <div class="space-y-2">
          <Label for="division">Divisi</Label>
          <Select v-model="form.division_id" required :disabled="isLoading" @update:modelValue="handleDivisionChange">
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
          <Label for="position">Jabatan</Label>
          <Select v-model="form.position_id" required :disabled="isLoading || !form.division_id">
            <SelectTrigger>
              <SelectValue :placeholder="form.division_id ? 'Pilih Jabatan' : 'Pilih Divisi Terlebih Dahulu'" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="pos in filteredPositions" :key="pos.id" :value="pos.id">
                {{ pos.name }} (Level {{ pos.level }})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-2">
          <Label for="period">Periode</Label>
          <Input 
            id="period" 
            v-model="form.period" 
            placeholder="Contoh: 2024/2025" 
            :disabled="isLoading"
          />
        </div>

        <div class="flex items-center space-x-2 pt-2">
          <Checkbox id="is_active" :checked="form.is_active" @update:checked="form.is_active = $event" />
          <Label for="is_active" class="text-sm font-medium leading-none cursor-pointer">
            Set sebagai Anggota Aktif
          </Label>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="$emit('update:open', false)" :disabled="isLoading">
            Batal
          </Button>
          <Button type="submit" class="bg-primary-navy text-white hover:bg-primary-navy/90" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Simpan Perubahan' : 'Tambah Keanggotaan' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2Icon } from 'lucide-vue-next'
import organizationService from '@/services/organization.service'

const props = defineProps({
  open: Boolean,
  isEditing: Boolean,
  membership: Object,
  userId: String, // Add this
  users: Array,
  divisions: Array,
  isLoading: Boolean
})

const emit = defineEmits(['update:open', 'submit'])

const form = reactive({
  user_id: '',
  division_id: '',
  position_id: '',
  period: '',
  is_active: true
})

const filteredPositions = ref([])

async function fetchPositions(divisionId) {
  if (!divisionId) {
    filteredPositions.value = []
    return
  }
  try {
    const res = await organizationService.getPositionsByDivision(divisionId)
    filteredPositions.value = res.data || []
  } catch (error) {
    filteredPositions.value = []
  }
}

function handleDivisionChange(id) {
  form.position_id = ''
  fetchPositions(id)
}

watch(() => props.open, (val) => {
  if (val) {
    if (props.membership) {
      form.user_id = props.membership.user_id
      form.division_id = props.membership.division_id
      form.position_id = props.membership.position_id
      form.period = props.membership.period || ''
      form.is_active = !!props.membership.is_active
      fetchPositions(props.membership.division_id)
    } else if (props.userId) {
      form.user_id = props.userId
      form.division_id = ''
      form.position_id = ''
      form.period = ''
      form.is_active = true
      filteredPositions.value = []
    } else {
      form.user_id = ''
      form.division_id = ''
      form.position_id = ''
      form.period = ''
      form.is_active = true
      filteredPositions.value = []
    }
  }
})

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>
