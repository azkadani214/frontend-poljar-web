<template>
  <div
    class="group relative bg-white border-2 border-gray-100 p-4 transition-all duration-500 hover:border-primary-orange/30 flex flex-col items-center"
  >
    <!-- Image Wrapper -->
    <div class="relative w-full aspect-square overflow-hidden mb-6">
      <img
        :src="getAvatarUrl(member)"
        :alt="member.name"
        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <!-- Hover Overlay for Socials -->
      <div
        class="absolute inset-0 bg-primary-navy/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
      >
        <a
          v-if="member.instagram"
          :href="`https://instagram.com/${member.instagram}`"
          target="_blank"
          class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-primary-orange text-white transition-colors"
        >
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </svg>
        </a>
        <a
          v-if="member.linkedin"
          :href="`https://linkedin.com/in/${member.linkedin}`"
          target="_blank"
          class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-primary-orange text-white transition-colors"
        >
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path
              d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- Info -->
    <div class="text-center">
      <h4 class="font-serif text-xl font-bold text-primary-navy mb-1">{{ member.name }}</h4>
      <p class="text-xs font-bold text-primary-orange uppercase tracking-widest">
        {{ member.position }}
      </p>

      <div v-if="member.division" class="mt-4 pt-4 border-t border-gray-100">
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{{ 
          typeof member.division === 'object' ? member.division.name : member.division 
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAvatarUrl } from '@/utils/helpers'

defineProps({
  member: {
    type: Object,
    required: true,
  },
})
</script>
