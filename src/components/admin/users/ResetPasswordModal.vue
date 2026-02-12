<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogDescription>
          Atur ulang kata sandi untuk <strong>{{ user?.name }}</strong>. Password baru akan langsung aktif setelah disimpan.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-4 py-4">
        <div class="space-y-2">
          <Label for="new_password">Password Baru</Label>
          <Input 
            id="new_password" 
            type="password" 
            v-model="form.password" 
            required 
            :disabled="isLoading"
          />
        </div>

        <div class="space-y-2">
          <Label for="confirm_password">Konfirmasi Password Baru</Label>
          <Input 
            id="confirm_password" 
            type="password" 
            v-model="form.password_confirmation" 
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
            Reset Password
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
  user: Object,
  isLoading: Boolean
})

const emit = defineEmits(['update:open', 'submit'])

const form = reactive({
  password: '',
  password_confirmation: ''
})

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    form.password = ''
    form.password_confirmation = ''
  }
})

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>
