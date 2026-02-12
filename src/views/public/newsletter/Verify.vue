<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <Card class="max-w-md w-full border-none shadow-2xl overflow-hidden">
      <div
        class="bg-gradient-to-br from-primary-navy to-blue-900 p-8 text-white relative text-center"
      >
        <div class="relative z-10 flex flex-col items-center space-y-4">
          <div class="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
            <Loader2 v-if="status === 'loading'" class="w-10 h-10 animate-spin" />
            <CheckCircle2 v-else-if="status === 'success'" class="w-10 h-10 text-emerald-400" />
            <XCircle v-else class="w-10 h-10 text-rose-400" />
          </div>
          <h1 class="text-2xl font-bold tracking-tight">Verifikasi Langganan</h1>
        </div>
      </div>

      <CardContent class="p-8 text-center bg-white">
        <div v-if="status === 'loading'" class="space-y-4">
          <p class="text-gray-600">
            Mohon tunggu sebentar, kami sedang memproses permintaan Anda...
          </p>
        </div>

        <div v-else-if="status === 'success'" class="space-y-6">
          <div class="space-y-2">
            <p class="text-gray-600">
              Selamat! Email Anda berhasil diverifikasi. Anda sekarang resmi berlangganan newsletter
              kami.
            </p>
          </div>
          <Button
            class="w-full bg-primary-navy hover:bg-primary-navy/90 text-white rounded-xl h-12"
            @click="router.push('/')"
          >
            Kembali ke Beranda
          </Button>
        </div>

        <div v-else class="space-y-6">
          <div class="space-y-2 text-rose-600 font-medium">
            <p>{{ errorMessage || 'Token verifikasi tidak valid atau sudah kadaluarsa.' }}</p>
          </div>
          <p class="text-sm text-gray-500">
            Silakan coba mendaftar kembali jika masalah berlanjut.
          </p>
          <Button variant="outline" class="w-full rounded-xl h-12" @click="router.push('/')">
            Ke Beranda
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import newsletterService from '@/services/newsletter.service'

const route = useRoute()
const router = useRouter()
const status = ref('loading')
const errorMessage = ref('')

async function performVerification() {
  const token = route.query.token
  if (!token) {
    status.value = 'error'
    errorMessage.value = 'Token tidak ditemukan.'
    return
  }

  try {
    await newsletterService.verify(token)
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    errorMessage.value = error.message || 'Gagal memverifikasi email.'
  }
}

onMounted(() => {
  performVerification()
})
</script>
