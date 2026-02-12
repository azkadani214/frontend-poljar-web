<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative pt-20 bg-gradient-to-br from-primary-navy to-primary-blue text-white overflow-hidden"
    >
      <!-- Decorative Element -->
      <div class="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <svg class="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
          <path d="M0 0 L100 100 L0 100 Z" />
        </svg>
      </div>

      <div class="max-w-350px mx-auto px-6 lg:px-12 py-24 lg:py-32 relative z-10">
        <div class="max-w-3xl">
          <span
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange text-white"
          >
            KEMITRAAN
          </span>
          <h1 class="font-serif text-5xl lg:text-7xl font-bold mt-8 mb-8 leading-tight">
            Bertumbuh Bersama <br />
            Dalam <span class="text-primary-orange italic">Kebaikan</span>
          </h1>
          <p
            class="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl border-l-4 border-primary-orange pl-8"
          >
            Kami percaya bahwa perubahan besar hanya bisa dicapai melalui kolaborasi yang kokoh.
            Mari jalin kemitraan untuk masa depan pendidikan Indonesia.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Partner With Us -->
    <section class="py-24 lg:py-32">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mb-8">
              Mengapa Menjadi Mitra Kami?
            </h2>
            <div class="space-y-8">
              <div v-for="(benefit, idx) in benefits" :key="idx" class="flex gap-6 group">
                <div
                  class="w-12 h-12 bg-gray-50 flex items-center justify-center shrink-0 border-2 border-gray-100 group-hover:bg-primary-orange group-hover:border-primary-orange transition-all duration-300"
                >
                  <svg
                    class="w-6 h-6 text-primary-orange group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="benefit.icon"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-primary-navy text-xl mb-2">{{ benefit.title }}</h4>
                  <p class="text-gray-500 text-sm leading-relaxed">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -inset-4 bg-gray-50 -z-10 transform -rotate-2"></div>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
              class="w-full h-auto border-4 border-white shadow-2xl"
            />
            <!-- Floating Badge -->
            <div class="absolute -bottom-8 -right-8 bg-primary-navy text-white p-8 hidden md:block">
              <div class="text-4xl font-serif font-bold text-primary-orange mb-2">20+</div>
              <div class="text-[10px] font-bold tracking-widest uppercase">Mitra Aktif</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Types -->
    <section class="py-24 lg:py-32 bg-gray-50">
      <div class="max-w-350px mx-auto px-6 lg:px-12 text-center mb-16">
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy">
          Bentuk Kolaborasi
        </h2>
        <p class="text-gray-500 mt-6 max-w-2xl mx-auto italic">
          Pilih cara yang paling sesuai bagi organisasi atau Anda untuk berkontribusi.
        </p>
      </div>

      <div class="max-w-350px mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-8">
        <div
          v-for="(type, idx) in partnershipTypes"
          :key="idx"
          class="bg-white p-10 border-2 border-gray-100 hover:border-primary-orange transition-all duration-500 flex flex-col items-center text-center group"
        >
          <div
            class="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500"
          >
            <svg
              class="w-10 h-10 text-primary-navy group-hover:text-primary-orange transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="type.icon"
              />
            </svg>
          </div>
          <h3 class="font-serif text-2xl font-bold text-primary-navy mb-4">{{ type.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed mb-8">{{ type.description }}</p>
          <ul class="text-xs font-bold text-gray-400 space-y-3 mb-10 w-full text-left">
            <li v-for="(item, iIdx) in type.features" :key="iIdx" class="flex items-center gap-3">
              <span class="w-1.5 h-1.5 bg-primary-orange"></span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Simple Process -->
    <section class="py-24 lg:py-32 bg-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="text-center mb-20">
          <h2 class="font-serif text-4xl font-bold text-primary-navy">Langkah Kemitraan</h2>
          <div class="w-24 h-1 bg-primary-orange mx-auto mt-6"></div>
        </div>

        <div class="relative grid md:grid-cols-4 gap-8">
          <!-- Connector Line -->
          <div class="absolute top-1/4 left-0 w-full h-0.5 bg-gray-100 hidden md:block -z-10"></div>

          <div v-for="(step, idx) in steps" :key="idx" class="text-center">
            <div
              class="w-16 h-16 bg-white border-2 border-primary-navy text-primary-navy font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-primary-navy group-hover:text-white transition-all"
            >
              {{ idx + 1 }}
            </div>
            <h4 class="font-bold text-primary-navy mb-2">{{ step.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-24 lg:py-32 bg-primary-orange text-white text-center">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="font-serif text-5xl lg:text-6xl font-bold mb-8 italic">
          Ready to make an impact?
        </h2>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Hubungi tim kemitraan kami untuk mendiskusikan bagaimana kita dapat bekerja sama
          menciptakan masa depan yang lebih baik.
        </p>
        <router-link
          to="/kontak"
          class="inline-flex items-center justify-center px-12 py-5 bg-primary-navy text-white font-bold hover:bg-white hover:text-primary-navy transition-all duration-300 group shadow-2xl"
        >
          HUBUNGI TIM KEMITRAAN
          <svg
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
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const benefits = [
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Dampak Nyata',
    description:
      'Kontribusi Anda akan langsung dirasakan oleh anak-anak di sekolah mitra kami melalui program pendidikan berkualitas.',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: 'Kolaborasi Strategis',
    description:
      'Membangun sinergi yang saling menguntungkan antara visi misi organisasi Anda dengan program sosial kami.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Brand Exposure',
    description:
      'Meningkatkan citra publik sebagai organisasi yang memiliki kepedulian sosial tinggi melalui berbagai kanal publikasi kami.',
  },
]

const partnershipTypes = [
  {
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    title: 'Corporate / CSR',
    description:
      'Pendampingan program CSR perusahaan Anda untuk menciptakan dampak sosial yang berkelanjutan di bidang pendidikan.',
    features: [
      'Pendanaan Program',
      'Donasi Alat Edukasi',
      'Branding Opportunity',
      'Laporan Dampak',
    ],
  },
  {
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    title: 'Sekolah Mitra',
    description:
      'Bekerja sama dalam implementasi kurikulum tambahan dan kegiatan ekstrakurikuler yang kreatif bagi siswa.',
    features: ['Implementasi Modul', 'Pelatihan Guru', 'Kegiatan Siswa', 'Akses Volunteer'],
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    title: 'Komunitas',
    description:
      'Kolaborasi lintas komunitas untuk mengadakan event besar atau kampanye pendidikan yang masif.',
    features: ['Joint Events', 'Media Partnership', 'Co-Branding', 'Knowledge Sharing'],
  },
]

const steps = [
  {
    title: 'Hubungi Kami',
    description: 'Gunakan formulir kontak atau WhatsApp untuk menyatakan minat kerjasama.',
  },
  {
    title: 'Diskusi Awal',
    description: 'Tim kami akan menjadwalkan pertemuan untuk membahas potensi kolaborasi.',
  },
  {
    title: 'Penyusunan MoU',
    description: 'Menyepakati detail kerjasama dan hak-kewajiban dalam dokumen resmi.',
  },
  {
    title: 'Implementasi',
    description: 'Menjalankan program bersama sesuai dengan timeline yang disepakati.',
  },
]

onMounted(() => {
  document.title = 'Kemitraan - Polinema Mengajar'
})
</script>
