<template>
  <div class="relative group bg-primary-navy overflow-hidden">
    <div class="grid lg:grid-cols-2">
      <!-- Image side -->
      <div
        class="relative aspect-16/10 lg:aspect-auto overflow-hidden bg-white/5 flex items-center justify-center"
      >
        <img
          v-if="post.cover_photo_path"
          :src="getStorageUrl(post.cover_photo_path)"
          :alt="post.title"
          class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
        />
        <div v-else class="flex flex-col items-center justify-center text-white/10">
          <ImageIcon class="w-24 h-24 mb-4" />
          <span class="text-xs font-black tracking-widest uppercase">No Photo Available</span>
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-primary-navy/40 to-transparent"></div>
        <!-- Badge -->
        <div class="absolute top-6 left-6">
          <span
            class="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-primary-orange text-white shadow-lg"
          >
            TERBARU
          </span>
        </div>
      </div>

      <!-- Content side -->
      <div class="p-8 lg:p-16 flex flex-col justify-center relative">
        <!-- Abstract Pattern Decor -->
        <div class="absolute top-0 right-0 p-8 opacity-10">
          <svg class="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-dasharray="4 4"
            />
          </svg>
        </div>

        <div class="space-y-6 relative">
          <div
            class="flex items-center gap-4 text-xs font-bold tracking-widest text-primary-orange uppercase"
          >
            <span>{{ formatDate(post.published_at) }}</span>
            <span class="w-8 h-[1px] bg-primary-orange"></span>
            <span>{{ post.category?.name || 'BERITA UTAMA' }}</span>
          </div>

          <router-link
            :to="{ name: 'news-detail', params: { slug: post.slug } }"
            class="block group/title"
          >
            <h2
              class="font-serif text-3xl lg:text-5xl font-bold text-white leading-tight group-hover/title:text-primary-orange transition-colors duration-300"
            >
              {{ post.title }}
            </h2>
          </router-link>

          <p class="text-gray-300 text-lg leading-relaxed line-clamp-3">
            {{ post.excerpt }}
          </p>

          <div class="pt-4">
            <router-link
              :to="{ name: 'news-detail', params: { slug: post.slug } }"
              class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-navy font-bold hover:bg-primary-orange hover:text-white transition-all duration-300 group/btn"
            >
              BACA CERITA SELENGKAPNYA
              <svg
                class="w-5 h-5 ml-3 transform group-hover/btn:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { Image as ImageIcon } from 'lucide-vue-next'
import { formatDate, getStorageUrl } from '@/utils/helpers'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>
