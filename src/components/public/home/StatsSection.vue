<template>
  <section class="py-20 bg-primary-navy text-white relative overflow-hidden">
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

    <div class="max-w-350px mx-auto px-6 lg:px-12 relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div v-for="(stat, idx) in stats" :key="idx" class="text-center group">
          <div
            class="font-serif text-5xl lg:text-6xl font-bold text-primary-orange mb-2 group-hover:scale-110 transition-transform"
          >
            {{ stat.value }}
          </div>
          <div class="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '500+', label: 'Anak Terinspirasi' },
  { value: '15+', label: 'Sekolah Mitra' },
  { value: '100+', label: 'Relawan Aktif' },
  { value: '50+', label: 'Modul Belajar' },
]
</script>
