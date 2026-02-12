<template>
  <div class="h-screen overflow-hidden bg-white">
    <div class="flex h-screen overflow-hidden">
      <!-- Left Section - Carousel (Identik dengan Token Gate) -->
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

      <!-- Right Section - Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-24 bg-white relative overflow-y-auto">
        <div class="w-full max-w-md py-12">
          <!-- Back Link -->
          <router-link to="/" class="inline-flex items-center text-primary-orange font-bold text-sm mb-12 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Ke Beranda Publik
          </router-link>

          <div class="mb-12">
            <div class="w-16 h-16 bg-primary-navy flex items-center justify-center rounded-2xl mb-8 shadow-xl">
              <span class="text-white font-bold text-2xl">PM</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Login Administrator</h1>
            <p class="text-gray-500 mt-2">Masuk untuk mengelola konten Polinema Mengajar.</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Alamat Email</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="admin@polinemamengajar.org"
                  class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary-orange/10 focus:border-primary-orange outline-none transition-all text-sm"
                  required
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-xs font-bold uppercase tracking-widest text-gray-400">Kata Sandi</label>
                <a href="#" class="text-[10px] font-bold text-primary-orange uppercase hover:underline">Lupa Password?</a>
              </div>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••••"
                  class="w-full pl-12 pr-12 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary-orange/10 focus:border-primary-orange outline-none transition-all text-sm"
                  required
                  :disabled="isLoading"
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Eye v-if="!showPassword" class="w-4 h-4" />
                  <EyeOff v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div v-if="error" class="p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl flex items-center">
              <AlertCircle class="w-4 h-4 mr-2 flex-shrink-0" />
              {{ error }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-primary-navy hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-gray-200 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
              <span v-else class="flex items-center gap-2">
                Masuk ke Dashboard
                <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <div class="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
            <span>&copy; 2026 PM Admin</span>
            <div class="flex gap-4">
              <a href="#" class="hover:text-primary-orange transition-colors">Bantuan</a>
              <a href="#" class="hover:text-primary-orange transition-colors">Keamanan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { 
  Mail, 
  Lock, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle 
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const isLoading = ref(false)
const error = ref(null)

// Carousel Logic
const currentSlide = ref(0)
const slides = [
  {
    image: '/images/login-carousel-1.webp',
    title: 'Pendidikan Terbaik untuk Indonesia Emas 2045',
    subtitle: 'Membangun peradaban melalui edukasi yang inklusif.'
  },
  {
    image: '/images/login-carousel-2.webp',
    title: 'Membangun Generasi Cerdas dan Berkarakter',
    subtitle: 'Pilar utama dalam memajukan bangsa di pelosok desa.'
  }
]

let slideInterval = null

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

async function handleLogin() {
  isLoading.value = true
  error.value = null

  try {
    const result = await authStore.login(form.email, form.password)

    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      error.value = result.error || 'Login gagal. Periksa email dan password Anda.'
    }
  } catch (err) {
    error.value = err.message || 'Terjadi kesalahan sistem. Silakan coba lagi.'
  } finally {
    isLoading.value = false
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

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
}
</style>
