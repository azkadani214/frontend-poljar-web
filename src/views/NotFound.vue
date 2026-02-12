<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-6 py-24">
    <div class="max-w-xl w-full text-center">
      <div class="relative mb-12">
        <h1
          class="font-serif text-[120px] lg:text-[180px] font-bold text-gray-100 leading-none select-none"
        >
          404
        </h1>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange text-white mb-4"
            >HALAMAN TIDAK DITEMUKAN</span
          >
          <h2 class="font-serif text-3xl lg:text-4xl font-bold text-primary-navy">
            Waduh! Anda nyasar?
          </h2>
        </div>
      </div>

      <p class="text-gray-500 text-lg mb-10 leading-relaxed">
        Maaf, halaman yang Anda cari tidak dapat kami temukan. Mungkin tautannya sudah kedaluwarsa
        atau terjadi kesalahan penulisan alamat.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="px-10 py-4 bg-primary-navy text-white font-bold hover:bg-primary-orange transition-all duration-300"
        >
          KEMBALI KE BERANDA
        </router-link>
        <router-link
          to="/kontak"
          class="px-10 py-4 border-2 border-gray-100 text-primary-navy font-bold hover:border-primary-orange hover:text-primary-orange transition-all duration-300"
        >
          LAPORKAN MASALAH
        </router-link>
      </div>

      <div class="mt-20 pt-10 border-t border-gray-100 italic text-sm text-gray-400">
        "Kadang-kadang, tersesat adalah langkah pertama untuk menemukan jalan baru."
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '404 - Halaman Tidak Ditemukan'
})
</script>
