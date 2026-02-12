<template>
  <section class="py-24 lg:py-32 bg-primary-navy relative overflow-hidden">
    <!-- Futuristic background patterns -->
    <div class="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
       <div class="absolute top-1/4 right-0 w-64 h-64 border-2 border-white rotate-45"></div>
       <div class="absolute bottom-1/4 right-1/4 w-32 h-32 border-2 border-primary-orange"></div>
    </div>
    
    <div class="max-w-350px mx-auto px-6 lg:px-12 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <!-- Left: Text Content -->
        <div class="lg:w-1/2 space-y-8 animate-fade-in">
           <span class="inline-block px-4 py-1 bg-primary-orange text-white text-[10px] font-black tracking-[4px] uppercase">
              SUBSCRIBE
           </span>
           <h2 class="font-serif text-5xl lg:text-7xl font-bold text-white leading-tight">
              Ayo buat <br/>
              <span class="text-primary-orange italic">perubahan</span>.
           </h2>
           <p class="text-xl text-white/60 font-medium leading-relaxed max-w-lg">
              Bergabunglah dengan komunitas kami untuk mendapatkan inspirasi pendidikan dan info kegiatan terbaru langsung di email Anda.
           </p>
        </div>

        <!-- Right: Professional Form -->
        <div class="lg:w-1/2 w-full">
           <div class="bg-white/5 backdrop-blur-sm p-10 lg:p-16 border border-white/10 rounded-2xl">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                 <div class="relative group">
                    <input
                      v-model="email"
                      type="email"
                      placeholder="Masukkan alamat email Anda"
                      class="w-full bg-white/10 border-2 border-white/20 px-6 py-5 text-white placeholder:text-white/30 focus:outline-none focus:border-primary-orange transition-all duration-300 font-bold"
                      required
                      :disabled="loading"
                    />
                    <div class="absolute top-0 right-0 h-full flex items-center pr-1">
                       <button
                         type="submit"
                         class="h-[80%] px-8 bg-primary-orange text-white text-xs font-black tracking-widest uppercase hover:bg-white hover:text-primary-navy transition-all duration-500 disabled:opacity-50"
                         :disabled="loading"
                       >
                         {{ loading ? 'MENGIRIM...' : 'GABUNG SEKARANG' }}
                       </button>
                    </div>
                 </div>
                 
                 <div class="flex items-center gap-4 text-white/40 text-[10px] font-black tracking-widest uppercase">
                    <span class="w-8 h-[1px] bg-white/20"></span>
                    KAMI MENJAGA PRIVASI ANDA
                    <span class="w-8 h-[1px] bg-white/20"></span>
                 </div>
              </form>

              <!-- Messages -->
              <transition name="fade">
                <div v-if="successMessage || errorMessage" class="mt-8 p-6 bg-white rounded-xl flex items-center gap-4 animate-slide-up">
                   <div :class="successMessage ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'" class="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      <svg v-if="successMessage" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                   </div>
                   <p class="text-sm font-bold text-primary-navy uppercase tracking-tighter">
                      {{ successMessage || errorMessage }}
                   </p>
                </div>
              </transition>
           </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import newsletterService from '@/services/newsletter.service'

const { locale } = useI18n()
const toast = useToast()
const email = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!email.value) return

  try {
    loading.value = true
    successMessage.value = ''
    errorMessage.value = ''

    await newsletterService.subscribe({
      email: email.value,
      locale: locale.value
    })

    successMessage.value = locale.value === 'id' ? 'BERHASIL! CEK EMAIL ANDA UNTUK KONFIRMASI.' : 'SUCCESS! CHECK YOUR EMAIL FOR CONFIRMATION.'
    toast.success(locale.value === 'id' ? 'Terima kasih telah berlangganan!' : 'Thank you for subscribing!')
    email.value = ''

    setTimeout(() => { successMessage.value = '' }, 8000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || (locale.value === 'id' ? 'GAGAL BERLANGGANAN. COBA LAGI.' : 'FAILED TO SUBSCRIBE. TRY AGAIN.')
    setTimeout(() => { errorMessage.value = '' }, 8000)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
