<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 animate-fade-in">
      <div v-if="!unsubscribed">
        <h2 class="text-3xl font-serif font-black text-primary-navy uppercase tracking-tighter mb-4 text-center">Berhenti Berlangganan?</h2>
        <p class="text-gray-500 font-medium mb-8 text-center">Kami sedih melihat Anda pergi. Apakah Anda yakin ingin berhenti menerima newsletter kami?</p>
        
        <form @submit.prevent="handleUnsubscribe" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-primary-navy uppercase tracking-widest">Alasan (Opsional)</label>
            <select v-model="reason" class="w-full border-2 border-gray-100 p-4 focus:outline-none focus:border-primary-orange font-bold text-sm">
              <option value="">Pilih alasan...</option>
              <option value="too_many_emails">Terlalu banyak email</option>
              <option value="content_not_relevant">Konten tidak relevan</option>
              <option value="not_signed_up">Saya tidak merasa mendaftar</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            class="w-full px-8 py-4 bg-red-600 text-white text-xs font-black tracking-widest uppercase hover:bg-primary-navy transition-all duration-300 disabled:opacity-50"
            :disabled="loading"
          >
            {{ loading ? 'MEMPROSES...' : 'YA, BERHENTI BERLANGGANAN' }}
          </button>
        </form>
      </div>

      <div v-else class="text-center space-y-6">
        <div class="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
          <InfoIcon class="w-10 h-10" />
        </div>
        <h2 class="text-2xl font-serif font-black text-primary-navy uppercase tracking-tighter">Berhasil Berhenti</h2>
        <p class="text-gray-500 font-medium">Anda telah berhasil berhenti berlangganan dari newsletter kami. Kami berharap dapat bertemu Anda kembali di masa depan.</p>
        <router-link to="/" class="inline-block px-8 py-4 bg-primary-navy text-white text-xs font-black tracking-widest uppercase hover:bg-primary-orange transition-all duration-300">
          KEMBALI KE BERANDA
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Info as InfoIcon } from 'lucide-vue-next'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const loading = ref(false)
const unsubscribed = ref(false)
const reason = ref('')

const handleUnsubscribe = async () => {
  const email = route.query.email
  if (!email) {
    toast.error('Email tidak ditemukan.')
    return
  }

  loading.value = true
  try {
    await api.post('/newsletter/unsubscribe', { email, reason: reason.value })
    unsubscribed.value = true
    toast.success('Berhasil berhenti berlangganan.')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal memproses permintaan.')
  } finally {
    loading.value = false
  }
}
</script>
