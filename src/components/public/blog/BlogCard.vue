<template>
  <div
    class="group bg-white border-2 border-gray-100 hover:border-primary-orange transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl"
  >
    <div class="grid md:grid-cols-5">
      <!-- Image Area -->
      <div class="md:col-span-2 relative overflow-hidden aspect-video md:aspect-auto">
        <img
          v-if="post.cover_photo_path"
          :src="getStorageUrl(post.cover_photo_path)"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
          <ImageIcon class="w-12 h-12 text-gray-200" />
        </div>

        <!-- Category Overlay (Mobile only) -->
        <div class="absolute top-4 left-4 md:hidden">
          <span
            class="px-3 py-1 bg-primary-orange text-white text-[10px] font-black uppercase tracking-widest"
          >
            {{ post.category?.name || 'Inspirasi' }}
          </span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="md:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
        <div>
          <!-- Meta -->
          <div class="flex items-center gap-4 mb-6">
            <span
              class="hidden md:inline-block px-3 py-1 bg-primary-orange/10 text-primary-orange text-[10px] font-black uppercase tracking-widest border-l-2 border-primary-orange"
            >
              {{ post.category?.name || 'Inspirasi' }}
            </span>
            <div
              class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
            >
              <Calendar class="w-3.5 h-3.5" />
              {{ formatDate(post.published_at || post.created_at) }}
            </div>
          </div>

          <!-- Title -->
          <router-link :to="`/blog/${post.slug}`">
            <h3
              class="font-serif text-2xl lg:text-3xl font-bold text-primary-navy mb-4 group-hover:text-primary-orange transition-colors leading-tight"
            >
              {{ post.title }}
            </h3>
          </router-link>

          <!-- Excerpt -->
          <p
            class="text-gray-500 line-clamp-2 lg:line-clamp-3 text-sm lg:text-base leading-relaxed mb-8"
          >
            {{ post.excerpt || post.body?.substring(0, 150) + '...' }}
          </p>
        </div>

        <!-- Author & Action -->
        <div class="flex items-center justify-between border-t border-gray-50 pt-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-100">
              <img
                v-if="post.user?.avatar_url"
                :src="getStorageUrl(post.user.avatar_url)"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-primary-navy/5 text-primary-navy text-[10px] font-bold"
              >
                {{ post.user?.name?.charAt(0) || 'A' }}
              </div>
            </div>
            <span class="text-[10px] font-black text-primary-navy uppercase tracking-widest">
              {{ post.user?.name || 'Admin' }}
            </span>
          </div>

          <router-link
            :to="`/blog/${post.slug}`"
            class="flex items-center gap-2 text-[10px] font-black text-primary-orange uppercase tracking-[0.2em] group/btn"
          >
            Baca Selengkapnya
            <ArrowRight
              class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Image as ImageIcon, Calendar, ArrowRight } from 'lucide-vue-next'
import { formatDate, getStorageUrl } from '@/utils/helpers'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>
