<template>
  <aside class="space-y-12">
    <!-- Search Bar -->
    <div class="p-8 bg-gray-50 border-2 border-gray-100">
      <h4 class="font-serif text-xl font-bold text-primary-navy mb-6 relative pb-4">
        Cari Berita
        <span class="absolute bottom-0 left-0 w-12 h-1 bg-primary-orange"></span>
      </h4>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Ketik kata kunci..."
          class="w-full pl-4 pr-12 py-3 bg-white border-2 border-gray-200 focus:border-primary-orange focus:ring-0 transition-colors text-sm font-medium"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="absolute right-0 top-0 h-full px-4 text-primary-navy hover:text-primary-orange transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Categories -->
    <div class="p-8 border-2 border-gray-100">
      <h4 class="font-serif text-xl font-bold text-primary-navy mb-6 relative pb-4">
        Kategori
        <span class="absolute bottom-0 left-0 w-12 h-1 bg-primary-orange"></span>
      </h4>
      <ul class="space-y-3">
        <li v-for="category in categories" :key="category.id">
          <button
            @click="$emit('category-filter', category.slug)"
            class="flex items-center justify-between w-full group transition-all"
          >
            <span
              class="text-gray-600 group-hover:text-primary-orange group-hover:translate-x-1 transition-all flex items-center gap-3"
            >
              <span
                class="w-1.5 h-1.5 bg-gray-300 group-hover:bg-primary-orange rounded-full"
              ></span>
              {{ category.name }}
            </span>
            <span class="text-xs font-bold text-gray-400 group-hover:text-primary-navy">
              ({{ category.news_count || 0 }})
            </span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Recent Posts -->
    <div class="p-8 border-2 border-gray-100">
      <h4 class="font-serif text-xl font-bold text-primary-navy mb-8 relative pb-4">
        Berita Terpopuler
        <span class="absolute bottom-0 left-0 w-12 h-1 bg-primary-orange"></span>
      </h4>
      <div class="space-y-6">
        <div v-for="post in recentPosts" :key="post.id" class="flex gap-4 group">
          <div
            class="w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center"
          >
            <img
              v-if="post.cover_photo_url"
              :src="post.cover_photo_url"
              :alt="post.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <ImageIcon v-else class="w-6 h-6 text-gray-200" />
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-[10px] font-bold text-primary-orange uppercase tracking-widest mb-1">
              {{ formatDate(post.published_at, 'DD MMM YYYY') }}
            </span>
            <router-link
              :to="{ name: 'news-detail', params: { slug: post.slug } }"
              class="font-serif text-sm font-bold text-primary-navy group-hover:text-primary-orange transition-colors line-clamp-2 leading-tight"
            >
              {{ post.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Widget -->
    <div class="p-8 bg-primary-navy text-white relative overflow-hidden">
      <!-- Decor -->
      <div
        class="absolute -bottom-8 -right-8 w-32 h-32 border-4 border-white/10 rounded-full"
      ></div>

      <div class="relative z-10">
        <h4 class="font-serif text-xl font-bold mb-4">Berlangganan</h4>
        <p class="text-sm text-gray-300 mb-6 leading-relaxed">
          Dapatkan update cerita inspiratif langsung di email Anda.
        </p>
        <div class="space-y-3">
          <input
            v-model="email"
            type="email"
            placeholder="Alamat Email"
            class="w-full px-4 py-3 bg-white/10 border-2 border-white/20 focus:border-primary-orange focus:ring-0 transition-colors text-sm text-white placeholder-gray-400"
          />
          <button
            @click="handleSubscribe"
            class="w-full py-3 bg-primary-orange text-white text-sm font-bold hover:bg-[#E67A32] transition-colors"
          >
            GABUNG SEKARANG
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Image as ImageIcon } from 'lucide-vue-next'
import { formatDate, getStorageUrl } from '@/utils/helpers'

const props = defineProps({
  categories: Array,
  recentPosts: Array,
})

const emit = defineEmits(['search', 'category-filter'])

const searchQuery = ref('')
const email = ref('')
let searchTimer = null

const handleSearch = () => {
  if (searchTimer) clearTimeout(searchTimer)
  
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
  }
}

// Optimization 6: Debounce search
watch(searchQuery, (newVal) => {
  if (searchTimer) clearTimeout(searchTimer)
  
  searchTimer = setTimeout(() => {
    if (newVal.trim().length >= 2 || newVal.trim().length === 0) {
      emit('search', newVal)
    }
  }, 500)
})

const handleSubscribe = () => {
  // Logic for subscription
  console.log('Subscribe:', email.value)
  email.value = ''
}
</script>
