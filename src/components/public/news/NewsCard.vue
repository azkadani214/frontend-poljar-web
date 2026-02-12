<template>
  <div
    class="group bg-white border-2 border-gray-100 hover:border-primary-orange/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
  >
    <!-- Image Wrapper -->
    <div class="relative aspect-16/10 overflow-hidden bg-gray-50 flex items-center justify-center">
      <img
        v-if="post.cover_photo_path"
        :src="getStorageUrl(post.cover_photo_path)"
        :alt="post.title"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div v-else class="flex flex-col items-center justify-center text-gray-200">
        <ImageIcon class="w-12 h-12 mb-2" />
        <span class="text-[10px] font-black tracking-widest uppercase">No Image</span>
      </div>
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-white/90 backdrop-blur-sm text-primary-navy border-l-4 border-primary-orange"
        >
          {{ post.category?.name || 'Berita' }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 lg:p-8 flex flex-col flex-grow">
      <!-- Meta Information -->
      <div
        class="flex items-center gap-4 text-xs text-gray-400 mb-4 font-semibold uppercase tracking-wider"
      >
        <div class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {{ formatDate(post.published_at) }}
        </div>
        <div class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ formatReadingTime(calculateReadingTime(post.content)) }}
        </div>
      </div>

      <!-- Title -->
      <router-link
        :to="{ name: 'news-detail', params: { slug: post.slug } }"
        class="block group-hover:text-primary-orange transition-colors duration-300 mb-4"
      >
        <h3 class="font-serif text-2xl font-bold text-primary-navy leading-tight">
          {{ post.title }}
        </h3>
      </router-link>

      <!-- Excerpt -->
      <p class="text-gray-600 line-clamp-3 mb-8 leading-relaxed text-sm flex-grow">
        {{ post.excerpt }}
      </p>

      <!-- Read More Link -->
      <div class="mt-auto">
        <router-link
          :to="{ name: 'news-detail', params: { slug: post.slug } }"
          class="inline-flex items-center text-sm font-bold text-primary-navy group/link"
        >
          <span class="mr-2">BACA SELENGKAPNYA</span>
          <div
            class="w-8 h-[2px] bg-primary-orange group-hover/link:w-12 transition-all duration-300 relative"
          >
            <svg
              class="absolute -right-1.5 -top-[5px] w-3 h-3 text-primary-orange opacity-0 group-hover/link:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Image as ImageIcon } from 'lucide-vue-next'
import { formatDate, getStorageUrl, calculateReadingTime, formatReadingTime } from '@/utils/helpers'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.aspect-16\/10 {
  aspect-ratio: 16 / 10;
}
</style>
