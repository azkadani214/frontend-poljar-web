<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-20 bg-primary-navy text-white overflow-hidden">
      <!-- Decoration -->
      <div class="absolute inset-0 opacity-10">
        <svg
          class="w-full h-full"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <circle cx="0" cy="0" r="40" />
          <circle cx="100" cy="100" r="30" />
        </svg>
      </div>

      <div class="max-w-350px mx-auto px-6 lg:px-12 py-24 lg:py-32 relative z-10 text-center">
        <div class="max-w-3xl mx-auto">
          <span
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange text-white"
          >
            HUBUNGI KAMI
          </span>
          <h1 class="font-serif text-5xl lg:text-7xl font-bold mt-8 mb-8 leading-tight">
            Mari <span class="text-primary-orange italic font-serif">Terhubung</span> Untuk
            Perubahan
          </h1>
          <p class="text-xl lg:text-2xl text-white/70 leading-relaxed">
            Punya pertanyaan, ide kolaborasi, atau ingin memberikan dukungan? Tim kami siap
            mendengar dan membantu Anda.
          </p>
        </div>
      </div>
    </section>

    <!-- Info & Form Section -->
    <section class="py-24 lg:py-32">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <!-- Left: Contact Info -->
          <div class="lg:col-span-5">
            <ContactInfo />

            <!-- Map Placeholder / Image -->
            <div class="mt-16 relative group">
              <div
                class="absolute -inset-4 bg-gray-50 -z-10 transform rotate-1 group-hover:rotate-0 transition-transform duration-500"
              ></div>
              <img
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800"
                class="w-full h-64 object-cover border-4 border-white shadow-xl"
              />
              <div class="absolute inset-0 bg-primary-navy/20 flex items-center justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  class="px-6 py-3 bg-white text-primary-navy text-xs font-bold uppercase tracking-widest hover:bg-primary-orange hover:text-white transition-all"
                >
                  LIHAT DI GOOGLE MAPS
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Preview Section -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-350px mx-auto px-6 lg:px-12 text-center">
        <h2 class="font-serif text-4xl font-bold text-primary-navy mb-6">
          Mungkin Anda Mencari Ini?
        </h2>
        <p class="text-gray-500 mb-12 max-w-2xl mx-auto">
          Beberapa pertanyaan yang sering diajukan untuk membantu Anda mendapatkan informasi lebih
          cepat.
        </p>

        <div class="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div
            class="p-8 bg-white border-2 border-gray-100 hover:border-primary-orange transition-colors"
          >
            <h4 class="font-bold text-primary-navy mb-3">Bagaimana cara menjadi volunteer?</h4>
            <p class="text-sm text-gray-500 leading-relaxed">
              Pendaftaran volunteer biasanya dibuka setiap awal semester. Pantau terus Instagram
              kami untuk update terbaru.
            </p>
          </div>
          <div
            class="p-8 bg-white border-2 border-gray-100 hover:border-primary-orange transition-colors"
          >
            <h4 class="font-bold text-primary-navy mb-3">
              Apakah Polinema Mengajar menerima donasi?
            </h4>
            <p class="text-sm text-gray-500 leading-relaxed">
              Ya, kami menerima donasi berupa buku, alat tulis, maupun dana untuk operasional
              program di sekolah mitra.
            </p>
          </div>
        </div>

        <div class="mt-12">
          <router-link
            to="/"
            class="text-sm font-bold text-primary-orange hover:text-primary-navy flex items-center justify-center gap-2 transition-colors"
          >
            LIHAT SEMUA PERTANYAAN (FAQ)
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ContactForm from '@/components/public/contact/ContactForm.vue'
import ContactInfo from '@/components/public/contact/ContactInfo.vue'

onMounted(() => {
  document.title = 'Hubungi Kami - Polinema Mengajar'
})
</script>
