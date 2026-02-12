<template>
  <div class="relative group overflow-hidden bg-primary-navy min-h-[500px] flex items-end">
    <!-- Featured Image Background -->
    <div class="absolute inset-0 z-0">
      <img
        v-if="post.cover_photo_path"
        :src="getStorageUrl(post.cover_photo_path)"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
      />
      <div v-else class="w-full h-full bg-primary-navy flex items-center justify-center">
        <ImageIcon class="w-20 h-20 text-white/10" />
      </div>
      <!-- Gradients -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-primary-navy via-primary-navy/40 to-transparent"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary-navy/80 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 p-8 lg:p-16 max-w-4xl">
      <div class="inline-block mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span
          class="px-5 py-2 bg-primary-orange text-white text-xs font-black uppercase tracking-[0.3em] shadow-xl"
        >
          Artikel Pilihan
        </span>
      </div>

      <router-link :to="`/blog/${post.slug}`" class="block group/title">
        <h2
          class="font-serif text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-8 leading-[1.1] transition-all duration-500 group-hover/title:text-primary-orange"
        >
          {{ post.title }}
        </h2>
      </router-link>

      <p
        class="text-white/70 text-lg lg:text-xl leading-relaxed mb-10 line-clamp-2 max-w-2xl font-medium"
      >
        {{ post.excerpt || post.body?.substring(0, 180) + '...' }}
      </p>

      <div class="flex flex-wrap items-center gap-8 py-8 border-t border-white/10">
        <!-- Author -->
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full border-2 border-primary-orange shadow-lg overflow-hidden"
          >
            <img
              v-if="post.user?.avatar_url"
              :src="getStorageUrl(post.user.avatar_url)"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-white/10 text-white text-xs font-bold uppercase"
            >
              {{ post.user?.name?.charAt(0) || 'A' }}
            </div>
          </div>
          <div>
            <span class="block text-sm font-black text-white uppercase tracking-widest">{{
              post.user?.name || 'Administrator'
            }}</span>
            <span class="block text-[10px] font-bold text-primary-orange uppercase tracking-[0.3em]"
              >Penulis Konten</span
            >
          </div>
        </div>

        <!-- Meta -->
        <div
          class="flex items-center gap-8 text-[11px] font-black text-white/50 uppercase tracking-[0.2em]"
        >
          <div class="flex items-center gap-3">
            <Calendar class="w-4 h-4 text-primary-orange" />
            {{ formatDate(post.published_at || post.created_at) }}
          </div>
          <div class="flex items-center gap-3">
            <Clock class="w-4 h-4 text-primary-orange" />
            5 MENIT BACA
          </div>
        </div>

        <!-- Action -->
        <router-link
          :to="`/blog/${post.slug}`"
          class="lg:ml-auto px-10 py-5 bg-white hover:bg-primary-orange hover:text-white text-primary-navy text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl flex items-center gap-3"
        >
          SELENGKAPNYA
          <ArrowRight class="w-4 h-4" />
        </router-link>
      </div>
    </div>

    <!-- Decorative Corner -->
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-primary-orange/20 -translate-y-1/2 translate-x-1/2 rotate-45 pointer-events-none"
    ></div>
  </div>
</template>

<script setup>
import { Image as ImageIcon, Calendar, Clock, ArrowRight } from 'lucide-vue-next'
import { formatDate, getStorageUrl } from '@/utils/helpers'

defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>
