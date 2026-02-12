<template>
  <aside class="space-y-12">
    <!-- Search Bar -->
    <div class="p-8 bg-gray-50 border-2 border-gray-100">
      <h4 class="font-serif text-xl font-bold text-primary-navy mb-6 relative pb-4">
        Cari Artikel
        <span class="absolute bottom-0 left-0 w-12 h-1 bg-primary-orange"></span>
      </h4>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Ketik kata kunci..."
          class="w-full pl-4 pr-12 py-3 bg-white border-2 border-gray-200 focus:border-primary-orange focus:ring-0 transition-colors text-sm font-medium"
          @keyup.enter="onSearch"
        />
        <button
          @click="onSearch"
          class="absolute right-0 top-0 h-full px-4 text-primary-navy hover:text-primary-orange transition-colors"
        >
          <Search class="w-5 h-5" />
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
        <li v-for="cat in categories" :key="cat.id">
          <button
            @click="$emit('category-filter', cat.slug)"
            class="flex items-center justify-between w-full group transition-all"
          >
            <span
              class="text-gray-600 group-hover:text-primary-orange group-hover:translate-x-1 transition-all flex items-center gap-3"
            >
              <span
                class="w-1.5 h-1.5 bg-gray-300 group-hover:bg-primary-orange rounded-full"
              ></span>
              {{ cat.name }}
            </span>
            <span class="text-xs font-bold text-gray-400 group-hover:text-primary-navy">
              ({{ cat.posts_count || 0 }})
            </span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Recent Posts -->
    <div class="p-8 border-2 border-gray-100">
      <h4 class="font-serif text-xl font-bold text-primary-navy mb-8 relative pb-4">
        Artikel Terbaru
        <span class="absolute bottom-0 left-0 w-12 h-1 bg-primary-orange"></span>
      </h4>
      <div class="space-y-6">
        <div v-for="post in recentPosts" :key="post.id" class="flex gap-4 group">
          <div class="w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-100">
            <img
              v-if="post.cover_photo_path"
              :src="getStorageUrl(post.cover_photo_path)"
              :alt="post.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <ImageIcon class="w-6 h-6 text-gray-300" />
            </div>
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-[10px] font-bold text-primary-orange uppercase tracking-widest mb-1">
              {{ formatDate(post.published_at || post.created_at) }}
            </span>
            <router-link
              :to="`/blog/${post.slug}`"
              class="font-serif text-sm font-bold text-primary-navy group-hover:text-primary-orange transition-colors line-clamp-2 leading-tight"
            >
              {{ post.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div v-if="popularTags?.length" class="p-8 border-2 border-gray-100">
      <h4 class="font-serif text-xl font-bold text-primary-navy mb-8 relative pb-4">
        Tags Populer
        <span class="absolute bottom-0 left-0 w-12 h-1 bg-primary-orange"></span>
      </h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in popularTags"
          :key="tag.id"
          @click="$emit('tag-filter', tag.slug)"
          class="px-4 py-2 bg-gray-50 hover:bg-primary-navy hover:text-white text-[10px] font-black uppercase tracking-widest transition-all duration-300 border border-gray-100"
        >
          #{{ tag.name }}
        </button>
      </div>
    </div>

    <!-- Newsletter Widget -->
    <div class="p-8 bg-primary-navy text-white relative overflow-hidden group">
      <!-- Decor -->
      <div
        class="absolute -bottom-8 -right-8 w-32 h-32 border-4 border-white/10 rounded-full transition-transform duration-700 group-hover:scale-150"
      ></div>

      <div class="relative z-10">
        <span
          class="text-[10px] font-black tracking-[0.3em] uppercase text-primary-orange mb-3 block"
          >Newsletter</span
        >
        <h4 class="font-serif text-xl font-bold mb-4">Dapatkan Update Mingguan</h4>
        <p class="text-xs text-white/60 mb-6 leading-relaxed">
          Berlangganan untuk mendapatkan berita dan inspirasi terbaru langsung di email Anda.
        </p>
        <div class="space-y-3">
          <input
            v-model="subscriberEmail"
            type="email"
            placeholder="Alamat Email..."
            class="w-full px-4 py-3 bg-white/10 border-2 border-white/20 focus:border-primary-orange focus:ring-0 outline-none transition-all text-sm text-white placeholder-gray-400"
          />
          <button
            @click="handleSubscribe"
            class="w-full py-3 bg-primary-orange hover:bg-white hover:text-primary-navy text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500"
          >
            BERLANGGANAN
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search, Image as ImageIcon } from 'lucide-vue-next'
import { formatDate, getStorageUrl } from '@/utils/helpers'

const props = defineProps({
  categories: Array,
  popularTags: Array,
  recentPosts: Array,
  totalPosts: Number,
})

const emit = defineEmits(['search', 'category-filter', 'tag-filter'])

const searchQuery = ref('')
const subscriberEmail = ref('')
let searchTimer = null

const onSearch = () => {
  if (searchTimer) clearTimeout(searchTimer)
  emit('search', searchQuery.value)
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
  console.log('Subscribing:', subscriberEmail.value)
  subscriberEmail.value = ''
}
</script>
