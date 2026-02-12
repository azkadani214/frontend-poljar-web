<template>
  <section class="py-24 lg:py-32 bg-gray-50">
    <div class="max-w-350px mx-auto px-6 lg:px-12">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div class="max-w-2xl">
          <span
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-blue/10 text-primary-blue"
          >
            BLOG & EDUKASI
          </span>
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mt-8">
            Wawasan & Inspirasi
          </h2>
        </div>
        <router-link
          to="/blog"
          class="text-sm font-bold text-primary-blue hover:text-primary-navy flex items-center gap-2 group transition-colors"
        >
          LIHAT SEMUA ARTIKEL
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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

      <!-- Blog Grid -->
      <div v-if="loading" class="grid md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="aspect-video bg-gray-200 rounded mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <div v-else-if="latestPosts.length > 0" class="grid md:grid-cols-3 gap-8">
        <div v-for="item in latestPosts" :key="item.id" class="group">
          <div
            class="relative aspect-[16/10] overflow-hidden mb-6 rounded-xl shadow-sm border border-gray-100 bg-white"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div class="flex items-center gap-3 mb-4">
            <div
              class="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ item.date }}
            </div>
            <span class="text-gray-300">•</span>
            <span class="text-[10px] font-bold text-primary-blue uppercase tracking-widest">{{
              item.category
            }}</span>
          </div>
          <h3
            class="font-serif text-xl font-bold text-primary-navy mb-4 group-hover:text-primary-blue transition-colors duration-300 line-clamp-2"
          >
            {{ item.title }}
          </h3>
          <router-link
            :to="`/blog/${item.slug}`"
            class="text-xs font-bold text-primary-blue hover:text-primary-navy transition-colors flex items-center gap-1"
          >
            BACA ARTIKEL
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </router-link>
        </div>
      </div>
      <div v-else class="text-center py-12 text-gray-400 italic">
        Belum ada artikel blog terbaru.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import blogService from '@/services/blog.service'
import { getStorageUrl, formatDate } from '@/utils/helpers'

const latestPosts = ref([])
const loading = ref(false)

const fetchLatestPosts = async () => {
  loading.value = true
  try {
    const response = await blogService.getRecent(3)
    latestPosts.value =
      response.data?.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.categories?.[0]?.name || 'Umum',
        date: formatDate(item.published_at || item.created_at, 'DD MMMM YYYY'),
        image:
          getStorageUrl(item.cover_photo_path) ||
          'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600',
      })) || []
  } catch (error) {
    console.error('Failed to fetch latest blog posts:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchLatestPosts)
</script>
