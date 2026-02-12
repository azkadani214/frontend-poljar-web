<template>
  <div class="h-screen overflow-hidden bg-white">
    <!-- Modal Disclaimer -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showDisclaimer" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300">
          <!-- Modal Header -->
          <div class="px-8 py-6 border-b border-gray-100">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle class="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">Peringatan Akses Terbatas</h2>
                <p class="text-sm text-gray-500 mt-1 uppercase tracking-wider font-medium">Sistem Internal Polinema Mengajar</p>
              </div>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="px-8 py-6 overflow-y-auto flex-1">
            <div class="space-y-6 text-gray-600">
              <p class="leading-relaxed">
                Anda sedang mencoba mengakses <span class="font-bold text-gray-900 underline decoration-orange-500/30">sistem manajemen internal Polinema Mengajar</span>.
                Akses ini hanya diperuntukkan bagi Administrator yang sah.
              </p>

              <div class="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                <p class="text-sm font-bold text-orange-900 mb-3 flex items-center">
                  <ShieldCheck class="w-4 h-4 mr-2" />
                  Ketentuan Akses:
                </p>
                <ol class="list-decimal list-inside space-y-2 text-sm text-orange-800/80">
                  <li>Upaya akses tanpa izin adalah <span class="font-bold text-red-600">tindakan ilegal</span>.</li>
                  <li>Segala aktivitas Anda akan <span class="font-bold">dicatat secara otomatis</span> (IP & Waktu).</li>
                  <li>Penyalahgunaan akan ditindak sesuai <span class="font-bold text-gray-900">hukum yang berlaku</span>.</li>
                </ol>
              </div>

              <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div class="flex items-start gap-3">
                  <Info class="w-5 h-5 text-gray-400 mt-0.5" />
                  <div class="text-xs space-y-1">
                    <p class="font-bold text-gray-700">Informasi Keamanan:</p>
                    <p>IP Address: <span class="font-mono text-gray-900 bg-gray-200 px-1 rounded">{{ userIp }}</span></p>
                    <p>Waktu Akses: <span class="font-mono text-gray-900 bg-gray-200 px-1 rounded">{{ accessTime }}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-8 py-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div class="flex flex-col sm:flex-row gap-3">
              <router-link to="/" class="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors text-center text-sm">
                Kembali ke Beranda
              </router-link>
              <button
                @click="agreeAndContinue"
                class="flex-1 px-6 py-3 bg-primary-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm"
              >
                Setuju & Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="flex h-screen overflow-hidden">
      <!-- Left Section - Carousel -->
      <div class="hidden lg:flex lg:w-1/2 items-center justify-center p-0 relative">
        <div class="relative w-full h-full">
          <transition name="fade" mode="out-in">
            <div :key="currentSlide" class="relative w-full h-full">
              <img :src="slides[currentSlide].image" class="w-full h-full object-cover grayscale-[0.2]" />
              <div class="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 px-16 py-20 animate-slide-up">
                <h2 class="text-white text-4xl font-serif font-bold leading-tight">{{ slides[currentSlide].title }}</h2>
                <p class="text-white/60 text-lg mt-4 font-medium">{{ slides[currentSlide].subtitle }}</p>
                
                <!-- Slide Indicators -->
                <div class="flex gap-2 mt-8">
                  <div 
                    v-for="(_, idx) in slides" 
                    :key="idx"
                    class="h-1.5 rounded-full transition-all duration-300"
                    :class="idx === currentSlide ? 'w-10 bg-primary-orange' : 'w-2 bg-white/30'"
                  ></div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Right Section - Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-24 bg-white relative">
        <div class="w-full max-w-md">
          <!-- Back Link -->
          <router-link to="/" class="inline-flex items-center text-primary-orange font-bold text-sm mb-12 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Ke Beranda Publik
          </router-link>

          <div class="mb-12">
            <div class="w-16 h-16 bg-primary-navy flex items-center justify-center rounded-2xl mb-8 shadow-xl rotate-3">
              <span class="text-white font-bold text-2xl">PM</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Selamat Datang Admin!</h1>
            <p class="text-gray-500 mt-2">Gunakan kode akses keamanan untuk masuk ke sistem.</p>
          </div>

          <form @submit.prevent="verifyToken" class="space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Kode Akses Keamanan</label>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  v-model="token"
                  type="password"
                  placeholder="••••••••••••"
                  class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary-orange/10 focus:border-primary-orange outline-none transition-all text-lg tracking-widest placeholder:tracking-normal"
                  required
                  autofocus
                />
              </div>
            </div>

            <!-- Agreement Checkbox -->
            <div class="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-orange-200 transition-colors">
              <div class="pt-0.5">
                <input
                  id="agreeTerms"
                  v-model="isAgreed"
                  type="checkbox"
                  class="w-5 h-5 rounded border-gray-300 text-primary-orange focus:ring-primary-orange transition-all cursor-pointer"
                  required
                />
              </div>
              <label for="agreeTerms" class="text-sm text-gray-600 leading-relaxed cursor-pointer select-none">
                Saya menyetujui <span class="text-primary-orange font-bold">Ketentuan Keamanan</span> dan bersedia aktivitas saya dicatat oleh sistem.
              </label>
            </div>

            <button
              type="submit"
              :disabled="!isAgreed || !token"
              class="w-full bg-primary-navy hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-gray-200 disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-2 group"
            >
              Masuk ke Area Admin
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl animate-shake">
            <div class="flex items-center">
              <XCircle class="w-4 h-4 mr-2" />
              {{ error }}
            </div>
          </div>

          <div class="mt-20 pt-8 border-t border-gray-100">
            <p class="text-[10px] font-bold text-gray-300 uppercase tracking-[4px]">
              &copy; 2026 POLINEMA MENGAJAR DASHBOARD
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { 
  Lock, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  XCircle 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const token = ref('')
const error = ref('')
const isAgreed = ref(false)
const showDisclaimer = ref(true)
const userIp = ref('Detecting...') 
const accessTime = ref('')

const currentSlide = ref(0)
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80',
    title: 'Pendidikan Terbaik untuk Indonesia Emas 2045',
    subtitle: 'Membangun peradaban melalui edukasi yang inklusif.'
  },
  {
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80',
    title: 'Membangun Generasi Cerdas dan Berkarakter',
    subtitle: 'Pilar utama dalam memajukan bangsa di pelosok desa.'
  }
]

let slideInterval = null

onMounted(async () => {
  // Check if already agreed in this session
  if (sessionStorage.getItem('disclaimerAgreed')) {
    showDisclaimer.value = false
  }

  // Fetch real IP
  try {
    const res = await axios.get('https://api.ipify.org?format=json')
    userIp.value = res.data.ip
  } catch (e) {
    userIp.value = '127.0.0.1'
  }
  
  // Set access time
  const now = new Date()
  accessTime.value = now.toLocaleString('id-ID', { 
    day: '2-digit', month: 'short', year: 'numeric', 
    hour: '2-digit', minute: '2-digit', second: '2-digit' 
  }) + ' WIB'

  // Start carousel
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

function agreeAndContinue() {
  sessionStorage.setItem('disclaimerAgreed', 'true')
  showDisclaimer.value = false
}

function verifyToken() {
  const adminAccessToken = import.meta.env.VITE_ADMIN_ACCESS_TOKEN
  
  if (token.value === adminAccessToken) {
    sessionStorage.setItem('admin_access_token', token.value)
    
    // Check if there is a redirect path
    const redirectPath = route.query.redirect || '/admin/login'
    router.push(redirectPath)
  } else {
    error.value = 'Kode akses tidak valid. Silakan hubungi pengelola sistem.'
    token.value = ''
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.2s ease-in-out 0s 2;
}
</style>
