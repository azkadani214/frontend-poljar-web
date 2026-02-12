<template>
  <div class="max-w-2xl mx-auto py-10 px-4">
    <!-- Header -->
    <div class="text-center mb-10 text-primary-navy">
      <div
        class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-orange/10 mb-4 shadow-[0_0_20px_rgba(255,165,0,0.2)] animate-pulse"
      >
        <UserIcon class="h-8 w-8 text-primary-orange" />
      </div>
      <h1 class="text-3xl font-bold font-serif tracking-tight">Lengkapi Profil Anda</h1>
      <p class="mt-2 text-primary-navy/60">
        Sedikit lagi! Kami membutuhkan beberapa informasi untuk mempersonalisasi pengalaman Anda.
      </p>
    </div>

    <!-- Wizard Steps Indicator -->
    <div class="flex items-center justify-between mb-8 px-2">
      <div v-for="n in 3" :key="n" class="flex items-center flex-1 last:flex-none">
        <div
          class="flex items-center justify-center h-8 w-8 rounded-full border-2 transition-all duration-300 font-bold"
          :class="[
            currentStep === n
              ? 'border-primary-orange bg-primary-orange text-white'
              : currentStep > n
                ? 'border-green-500 bg-green-500 text-white'
                : 'border-gray-200 bg-white text-gray-400',
          ]"
        >
          <Check v-if="currentStep > n" class="h-4 w-4" />
          <span v-else>{{ n }}</span>
        </div>
        <div v-if="n < 3" class="flex-1 h-0.5 mx-2 bg-gray-200">
          <div
            class="h-full bg-primary-orange transition-all duration-500"
            :style="{ width: currentStep > n ? '100%' : '0%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div
      class="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden min-h-[400px]"
    >
      <div class="p-8">
        <!-- Step 1: Informasi Dasar -->
        <div
          v-if="currentStep === 1"
          class="space-y-6 animate-in slide-in-from-right-4 duration-300"
        >
          <div class="border-b pb-4">
            <h2 class="text-lg font-bold text-primary-navy">Informasi Dasar</h2>
            <p class="text-xs text-primary-navy/50">Lengkapi data diri dasar Anda.</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                >Nama Lengkap</label
              >
              <Input
                v-model="form.name"
                placeholder="Nama sesuai KTP"
                class="h-12 border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary-orange/20"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                  >Jenis Kelamin</label
                >
                <select
                  v-model="form.gender"
                  class="w-full h-12 rounded-md border border-gray-100 bg-gray-50/50 px-4 text-sm focus:bg-white focus:ring-primary-orange/20 outline-none transition-all"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                  >Tanggal Lahir</label
                >
                <Input
                  type="date"
                  v-model="form.birth_date"
                  class="h-12 border-gray-100 bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Kontak & Media Sosial -->
        <div
          v-if="currentStep === 2"
          class="space-y-6 animate-in slide-in-from-right-4 duration-300"
        >
          <div class="border-b pb-4">
            <h2 class="text-lg font-bold text-primary-navy">Kontak & Media Sosial</h2>
            <p class="text-xs text-primary-navy/50">Bagaimana kami bisa menghubungi Anda?</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                >Nomor Telepon/WA</label
              >
              <Input
                v-model="form.phone"
                placeholder="Contoh: 081234567890"
                class="h-12 border-gray-100 bg-gray-50/50"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                >Website (Opsional)</label
              >
              <Input
                v-model="form.website"
                placeholder="https://domainanda.com"
                class="h-12 border-gray-100 bg-gray-50/50"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                  >Instagram (Username)</label
                >
                <div class="relative">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-primary-navy/40 text-sm"
                    >@</span
                  >
                  <Input
                    v-model="form.social_links.instagram"
                    class="h-12 pl-8 border-gray-100 bg-gray-50/50"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                  >LinkedIn (Link)</label
                >
                <Input
                  v-model="form.social_links.linkedin"
                  placeholder="LinkedIn URL"
                  class="h-12 border-gray-100 bg-gray-50/50"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Alamat & Bio -->
        <div
          v-if="currentStep === 3"
          class="space-y-6 animate-in slide-in-from-right-4 duration-300"
        >
          <div class="border-b pb-4">
            <h2 class="text-lg font-bold text-primary-navy">Alamat & Bio</h2>
            <p class="text-xs text-primary-navy/50">Ceritakan sedikit tentang diri Anda.</p>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                >Alamat Lengkap</label
              >
              <Textarea
                v-model="form.address"
                placeholder="Jalan, No, RT/RW, Kel, Kec, Kota/Kab"
                class="min-h-[100px] border-gray-100 bg-gray-50/50"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                >Bio Singkat</label
              >
              <Textarea
                v-model="form.bio"
                placeholder="Tuliskan sesuatu tentang Anda..."
                class="min-h-[100px] border-gray-100 bg-gray-50/50"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-primary-navy/70 ml-1"
                >Quotes Favorit</label
              >
              <Textarea
                v-model="form.quotes"
                placeholder="Tuliskan kata-kata mutiara favorit Anda..."
                class="min-h-[80px] border-gray-100 bg-gray-50/50"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <Button
          variant="outline"
          @click="prevStep"
          :disabled="currentStep === 1 || loading"
          class="border-gray-200"
        >
          Sebelumnya
        </Button>

        <div class="flex items-center gap-3">
          <Button
            v-if="currentStep < 3"
            @click="nextStep"
            class="bg-primary-navy text-white hover:bg-primary-navy/90 min-w-[120px]"
          >
            Lanjut
            <ArrowRight class="w-4 h-4 ml-2" />
          </Button>
          <Button
            v-else
            @click="submit"
            :disabled="loading"
            class="bg-primary-orange text-white hover:bg-primary-orange/90 min-w-[140px] shadow-[0_4px_10px_rgba(255,165,0,0.3)]"
          >
            <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            <Check v-else class="w-4 h-4 mr-2" />
            Simpan Profil
          </Button>
        </div>
      </div>
    </div>

    <!-- Skip Option -->
    <div class="text-center mt-6">
      <button
        @click="skip"
        class="text-sm font-medium text-primary-navy/40 hover:text-primary-navy/60 transition-colors"
      >
        Nanti saja, bawa saya ke Dashboard
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import userService from '@/services/user.service'
import { User as UserIcon, Check, ArrowRight, Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const currentStep = ref(1)
const loading = ref(false)

const form = reactive({
  name: '',
  phone: '',
  gender: '',
  birth_date: '',
  address: '',
  bio: '',
  website: '',
  social_links: {
    instagram: '',
    twitter: '',
    facebook: '',
    linkedin: '',
  },
  quotes: '',
})

onMounted(() => {
  // Pre-fill from existing data if any
  const user = authStore.currentUser
  if (user) {
    form.name = user.name || ''
    form.phone = user.phone || ''
    form.gender = user.gender || ''
    form.birth_date = user.birth_date || ''
    form.address = user.address || ''
    form.bio = user.bio || ''
    form.quotes = user.quotes || ''
    form.website = user.website || ''
    if (user.social_links) {
      form.social_links = { ...form.social_links, ...user.social_links }
    }
  }
})

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

async function submit() {
  loading.value = true
  try {
    await userService.updateProfile(form)
    await authStore.fetchUser() // Refresh user data in store

    toast.success('Profil Berhasil Dilengkapi! Terima kasih telah melengkapi data diri Anda.')

    router.push('/admin/dashboard')
  } catch (error) {
    console.error('Failed to update profile:', error)
    toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.')
  } finally {
    loading.value = false
  }
}

function skip() {
  router.push('/admin/dashboard')
}
</script>

<style scoped>
.animate-in {
  animation-duration: 0.5s;
}
</style>
