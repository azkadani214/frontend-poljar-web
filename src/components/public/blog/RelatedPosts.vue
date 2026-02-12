<template>
  <div class="mt-20 pt-16 border-t-2 border-gray-100">
    <div class="flex items-center justify-between mb-12">
      <h3 class="font-serif text-3xl font-bold text-primary-navy">Cerita Terkait</h3>
      <router-link
        to="/blog"
        class="text-sm font-bold text-primary-orange hover:text-primary-navy transition-colors flex items-center gap-2"
      >
        LIHAT SEMUA BLOG
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

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="post in posts"
        :key="post.id"
        class="group flex flex-col h-full bg-white border-2 border-gray-100 hover:border-primary-orange/30 transition-all duration-500"
      >
        <!-- Image -->
        <div class="relative aspect-16/10 overflow-hidden">
          <img
            :src="getStorageUrl(post.image_path)"
            :alt="post.title"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <!-- Content -->
        <div class="p-6 flex flex-col flex-grow">
          <div
            class="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ formatDate(post.published_at) }}
          </div>

          <router-link
            :to="{ name: 'blog-detail', params: { slug: post.slug } }"
            class="block mb-4"
          >
            <h4
              class="font-serif text-xl font-bold text-primary-navy group-hover:text-primary-orange transition-colors leading-tight line-clamp-2"
            >
              {{ post.title }}
            </h4>
          </router-link>

          <router-link
            :to="{ name: 'blog-detail', params: { slug: post.slug } }"
            class="mt-auto inline-flex items-center text-xs font-bold text-primary-navy group/link"
          >
            BACA SEKARANG
            <svg
              class="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, getStorageUrl } from '@/utils/helpers'

defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
})
</script>
