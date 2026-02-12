<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section v-if="program" class="relative pt-20 bg-primary-navy text-white overflow-hidden">
      <!-- Abstract Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg
          class="w-full h-full"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 L100 0 L100 100 Z" />
        </svg>
      </div>

      <div class="max-w-350px mx-auto px-6 lg:px-12 py-20 lg:py-32 relative z-10">
        <div class="max-w-4xl">
          <div class="inline-block mb-6">
            <span
              class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange text-white"
            >
              {{ program.category }}
            </span>
          </div>

          <h1 class="font-serif text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            {{ program.title }}
          </h1>

          <p
            class="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl border-l-4 border-primary-orange pl-8"
          >
            {{ program.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Details -->
    <section v-if="program" class="py-20 lg:py-32">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <!-- Left: Main Content -->
          <div class="lg:col-span-8">
            <div class="prose prose-lg max-w-none">
              <h2 class="font-serif text-3xl font-bold text-primary-navy">Tentang Program</h2>
              <div v-html="program.content" class="text-gray-600 leading-relaxed"></div>

              <div class="my-16 grid sm:grid-cols-2 gap-8">
                <div class="p-8 bg-gray-50 border-2 border-gray-100">
                  <h4 class="font-bold text-primary-navy mb-4 flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-full bg-primary-orange text-white flex items-center justify-center text-xs"
                      >01</span
                    >
                    Visi & Tujuan
                  </h4>
                  <ul class="space-y-3 text-sm text-gray-600">
                    <li v-for="(goal, idx) in program.goals" :key="idx" class="flex gap-2">
                      <span class="text-primary-orange">•</span> {{ goal }}
                    </li>
                  </ul>
                </div>
                <div class="p-8 bg-gray-50 border-2 border-gray-100">
                  <h4 class="font-bold text-primary-navy mb-4 flex items-center gap-3">
                    <span
                      class="w-8 h-8 rounded-full bg-primary-orange text-white flex items-center justify-center text-xs"
                      >02</span
                    >
                    Metode Pelaksanaan
                  </h4>
                  <ul class="space-y-3 text-sm text-gray-600">
                    <li v-for="(method, idx) in program.methods" :key="idx" class="flex gap-2">
                      <span class="text-primary-orange">•</span> {{ method }}
                    </li>
                  </ul>
                </div>
              </div>

              <h2 class="font-serif text-3xl font-bold text-primary-navy">Timeline Kegiatan</h2>
              <div class="mt-12 space-y-8">
                <div
                  v-for="(step, idx) in program.timeline"
                  :key="idx"
                  class="relative pl-8 border-l-2 border-gray-100 pb-8 last:pb-0"
                >
                  <div
                    class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary-orange shadow-sm"
                  ></div>
                  <div class="text-xs font-bold text-primary-orange uppercase tracking-widest mb-1">
                    {{ step.date }}
                  </div>
                  <h4 class="font-bold text-primary-navy text-lg mb-2">{{ step.title }}</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Sidebar Info -->
          <div class="lg:col-span-4">
            <div class="sticky top-24 space-y-12">
              <!-- Quick Stats -->
              <div class="p-8 border-2 border-primary-navy">
                <h3 class="font-serif text-xl font-bold text-primary-navy mb-8">Informasi Cepat</h3>
                <div class="space-y-6">
                  <div v-for="(info, idx) in program.quick_info" :key="idx">
                    <div
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1"
                    >
                      {{ info.label }}
                    </div>
                    <div class="text-lg font-bold text-primary-navy">
                      {{ info.value }}
                    </div>
                  </div>
                </div>

                <router-link
                  to="/kontak"
                  class="mt-10 inline-flex items-center justify-center w-full px-6 py-4 bg-primary-orange text-white font-bold hover:bg-[#E67A32] transition-colors"
                >
                  GABUNG PROGRAM
                </router-link>
              </div>

              <!-- Impact Counter -->
              <div class="bg-gray-50 p-8 border-2 border-gray-100">
                <h4 class="font-bold text-primary-navy mb-6">Dampak Pencapaian</h4>
                <div class="space-y-4">
                  <div
                    v-for="(stat, idx) in program.impact_stats"
                    :key="idx"
                    class="flex items-end justify-between"
                  >
                    <span class="text-sm font-medium text-gray-600">{{ stat.label }}</span>
                    <span class="text-2xl font-serif font-bold text-primary-navy">{{
                      stat.value
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section v-if="program && program.gallery?.length" class="py-24 bg-gray-50 overflow-hidden">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <h2 class="font-serif text-4xl font-bold text-primary-navy text-center mb-16">
          Galeri Kegiatan
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(img, idx) in program.gallery"
            :key="idx"
            class="group relative aspect-square overflow-hidden bg-white p-2 shadow-xl"
          >
            <img
              :src="getStorageUrl(img)"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div
              class="absolute inset-2 bg-primary-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProgramStore } from '@/stores/program'
import { getStorageUrl } from '@/utils/helpers'

const route = useRoute()
const programStore = useProgramStore()
const program = ref(null)

const fetchProgram = async () => {
  const slug = route.params.slug
  // Mock data if API is not fully set up or just for design showcase
  program.value = {
    title: 'Kelas Pendampingan Belajar',
    category: 'Pendidikan Dasar',
    description:
      'Memberikan bantuan belajar akademik bagi siswa SD & SMP di daerah yang memiliki keterbatasan akses pendidikan berkualitas.',
    content:
      '<p>Program ini dirancang khusus untuk menjembatani kesenjangan kualitas pendidikan. Melalui pendekatan tutor sebaya yang menyenangkan, kami membantu siswa memahami konsep-konsep materi pelajaran sekolah dengan cara yang lebih kreatif.</p><p>Relawan kami dilatih untuk tidak sekadar memberikan jawaban, tapi mengajarkan cara berpikir kritis dan logis.</p>',
    goals: [
      'Meningkatkan literasi membaca dan numerasi',
      'Membangun kepercayaan diri siswa',
      'Membuka wawasan masa depan melalui motivasi',
      'Menanamkan nilai-nilai karakter luhur',
    ],
    methods: [
      'Pembelajaran berbasis project (PBL)',
      'Game-based learning',
      'Personalized tutoring',
      'Outbound edukatif',
    ],
    timeline: [
      {
        date: 'Minggu 1',
        title: 'Assessment & Bonding',
        description: 'Melakukan pemetaan kemampuan awal siswa dan membangun hubungan emosional.',
      },
      {
        date: 'Minggu 2-8',
        title: 'Core Learning Phase',
        description:
          'Pelaksanaan kurikulum inti yang berfokus pada Matematika, Bahasa Inggris, dan Sains.',
      },
      {
        date: 'Minggu 9',
        title: 'Evaluation & Celebration',
        description: 'Ujian akhir yang dikemas dalam bentuk festival kreativitas.',
      },
    ],
    quick_info: [
      { label: 'DURASI PROGRAM', value: '3 Bulan' },
      { label: 'JADWAL', value: 'Sabtu & Minggu' },
      { label: 'VOLUNTEER DIBUTUHKAN', value: '25 Orang' },
      { label: 'MINIMAL PENDIDIKAN', value: 'Mahasiswa' },
    ],
    impact_stats: [
      { label: 'Siswa Terbantukan', value: '250+' },
      { label: 'Relawan Terlibat', value: '45' },
      { label: 'Jam Mengajar', value: '1.200' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
      'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600',
    ],
  }

  // Actual fetch (disabled for now to ensure design shows)
  // try {
  //   await programStore.fetchProgramBySlug(slug)
  //   if (programStore.current) program.value = programStore.current
  // } catch(e) {}
}

onMounted(() => {
  fetchProgram()
})
</script>

<style scoped>
.prose :deep(h2) {
  @apply mb-10 relative pb-6;
}
.prose :deep(h2)::after {
  content: '';
  @apply absolute bottom-0 left-0 w-16 h-1 bg-primary-orange;
}
</style>
