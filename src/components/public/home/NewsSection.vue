<template>
  <section class="py-24 lg:py-32 bg-white">
    <div class="max-w-350px mx-auto px-6 lg:px-12">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div class="max-w-2xl">
          <span
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange/10 text-primary-orange"
          >
            KABAR TERBARU
          </span>
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mt-8">
            Berita & Artikel
          </h2>
        </div>
        <router-link
          to="/berita"
          class="text-sm font-bold text-primary-orange hover:text-primary-navy flex items-center gap-2 group transition-colors"
        >
          LIHAT SEMUA BERITA
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

      <!-- News Grid -->
      <div v-if="loading" class="grid md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="aspect-[4/3] bg-gray-100 mb-6"></div>
          <div class="h-3 bg-gray-100 w-1/3 mb-3"></div>
          <div class="h-6 bg-gray-100 w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-100 w-full mb-6"></div>
        </div>
      </div>

      <div v-else-if="latestNews.length > 0" class="grid md:grid-cols-3 gap-8">
        <div v-for="item in latestNews" :key="item.id" class="group">
          <div
            class="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-50 border-2 border-gray-100 flex items-center justify-center"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div v-else class="flex flex-col items-center justify-center text-gray-200">
              <ImageIcon class="w-12 h-12 mb-2" />
              <span class="text-[9px] font-black tracking-widest uppercase">No Image</span>
            </div>
            <div
              class="absolute top-4 left-4 bg-white px-3 py-1 text-[9px] font-black tracking-widest uppercase text-primary-navy"
            >
              {{ item.category }}
            </div>
          </div>
          <div class="text-[10px] font-black text-primary-orange uppercase tracking-widest mb-3">
            {{ item.date }}
          </div>
          <h3
            class="font-serif text-xl font-bold text-primary-navy mb-4 group-hover:text-primary-orange transition-colors duration-300 line-clamp-2"
          >
            {{ item.title }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
            {{ item.excerpt }}
          </p>
          <router-link
            :to="`/berita/${item.slug}`"
            class="text-[10px] font-black text-primary-navy border-b-2 border-primary-orange pb-1 hover:text-primary-orange transition-all tracking-widest"
          >
            BACA SELENGKAPNYA
          </router-link>
        </div>
      </div>
      <div v-else class="text-center py-12 text-gray-400 italic">Belum ada berita terbaru.</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Image as ImageIcon } from 'lucide-vue-next'
import newsService from '@/services/news.service'
import { getStorageUrl, formatDate } from '@/utils/helpers'

const latestNews = ref([])
const loading = ref(false)

const fetchLatestNews = async () => {
  loading.value = true
  try {
    const response = await newsService.getLatest(3)
    latestNews.value =
      response.data?.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category?.name || 'Kegiatan',
        date: formatDate(item.published_at, 'DD MMMM YYYY'),
        excerpt: item.excerpt || 'Klik untuk membaca selengkapnya',
        image: item.cover_photo_url || null,
      })) || []
  } catch (error) {
    console.error('Failed to fetch latest news:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchLatestNews)
</script>
