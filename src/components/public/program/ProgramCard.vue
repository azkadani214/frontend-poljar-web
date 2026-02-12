<template>
  <div
    class="group bg-white border-2 border-gray-100 hover:border-primary-orange/30 transition-all duration-500 flex flex-col h-full overflow-hidden"
  >
    <!-- Image -->
    <div class="relative aspect-video overflow-hidden">
      <img
        :src="getStorageUrl(program.image_path)"
        :alt="program.title"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <!-- Impact Multiplier Badge -->
      <div
        class="absolute bottom-4 right-4 bg-primary-navy text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
      >
        {{ program.category }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-8 flex flex-col flex-grow">
      <h3
        class="font-serif text-2xl font-bold text-primary-navy mb-4 group-hover:text-primary-orange transition-colors duration-300"
      >
        {{ program.title }}
      </h3>

      <p class="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3">
        {{ program.description }}
      </p>

      <!-- Key Benefits (Icons) -->
      <div class="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-50">
        <div v-for="(stat, idx) in program.stats" :key="idx" class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full bg-primary-orange/10 flex items-center justify-center text-primary-orange"
          >
            <!-- Fallback Icon -->
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {{ stat.label }}
            </div>
            <div class="text-sm font-bold text-primary-navy">{{ stat.value }}</div>
          </div>
        </div>
      </div>

      <router-link
        :to="{ name: 'program-detail', params: { slug: program.slug } }"
        class="mt-auto inline-flex items-center justify-center w-full px-6 py-4 bg-primary-navy text-white font-bold hover:bg-primary-orange transition-all duration-300"
      >
        PELAJARI SELENGKAPNYA
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { getStorageUrl } from '@/utils/helpers'

defineProps({
  program: {
    type: Object,
    required: true,
  },
})
</script>
