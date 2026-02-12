<template>
  <div class="bg-white p-8 lg:p-12 border-2 border-gray-100 shadow-xl">
    <h3 class="font-serif text-3xl font-bold text-primary-navy mb-8">Kirim Pesan</h3>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Name -->
        <div class="space-y-2">
          <label for="name" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
            >Nama Lengkap</label
          >
          <input
            v-model="form.name"
            id="name"
            type="text"
            required
            placeholder="Masukkan nama Anda"
            class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 focus:border-primary-orange focus:bg-white outline-none transition-all duration-300 font-medium"
          />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
            >Alamat Email</label
          >
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            placeholder="nama@email.com"
            class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 focus:border-primary-orange focus:bg-white outline-none transition-all duration-300 font-medium"
          />
        </div>
      </div>

      <!-- Subject -->
      <div class="space-y-2">
        <label for="subject" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
          >Subjek</label
        >
        <select
          v-model="form.subject"
          id="subject"
          required
          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 focus:border-primary-orange focus:bg-white outline-none transition-all duration-300 font-medium appearance-none"
        >
          <option value="" disabled>Pilih subjek pesan</option>
          <option value="kemitraan">Kemitraan & Kerjasama</option>
          <option value="volunteer">Informasi Volunteer</option>
          <option value="donasi">Donasi & Dukungan</option>
          <option value="umum">Pertanyaan Umum</option>
        </select>
      </div>

      <!-- Message -->
      <div class="space-y-2">
        <label for="message" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
          >Pesan Anda</label
        >
        <textarea
          v-model="form.message"
          id="message"
          rows="5"
          required
          placeholder="Tuliskan pesan Anda di sini..."
          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 focus:border-primary-orange focus:bg-white outline-none transition-all duration-300 font-medium resize-none"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="inline-flex items-center justify-center px-10 py-5 bg-primary-navy text-white font-bold hover:bg-primary-orange transition-all duration-300 group"
      >
        <span>{{ loading ? 'MENGIRIM...' : 'KIRIM PESAN SEKARANG' }}</span>
        <svg
          v-if="!loading"
          class="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const handleSubmit = async () => {
  loading.value = true
  try {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.')
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (error) {
    toast.error('Maaf, terjadi kesalahan. Silakan coba lagi nanti.')
  } finally {
    loading.value = false
  }
}
</script>
