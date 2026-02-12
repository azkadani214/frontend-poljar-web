<template>
  <section class="py-24 lg:py-32 bg-primary-navy relative overflow-hidden">
    <!-- Ornament -->
    <div
      class="absolute top-0 right-0 w-1/2 h-full bg-primary-orange/5 -skew-x-12 transform translate-x-1/2"
    ></div>

    <div class="max-w-350px mx-auto px-6 lg:px-12 text-center relative z-10">
      <div class="max-w-4xl mx-auto">
        <h2 class="font-serif text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Siap Untuk Menjadi <br />
          Bagian Dari <span class="text-primary-orange italic">Perubahan?</span>
        </h2>
        <p class="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          Jangan hanya jadi penonton. Mari bergabung bersama ratusan mahasiswa lainnya untuk
          membangun masa depan pendidikan yang lebih cerah.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <router-link
            to="/kontak"
            class="px-12 py-5 bg-primary-orange text-white font-bold hover:bg-white hover:text-primary-navy transition-all duration-300 shadow-2xl shadow-primary-orange/20"
          >
            GABUNG SEBAGAI RELAWAN
          </router-link>
          <router-link
            to="/kemitraan"
            class="px-12 py-5 border-2 border-white text-white font-bold hover:bg-white hover:text-primary-navy transition-all duration-300"
          >
            JALIN KEMITRAAN
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No logic needed
</script>
