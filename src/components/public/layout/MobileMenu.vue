<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-[-20px]"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-[-20px]"
  >
    <div
      v-if="uiStore.isMobileMenuOpen"
      class="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 py-8 px-6 space-y-6"
    >
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        @click="uiStore.closeMobileMenu"
        class="block text-lg font-bold text-primary-navy hover:text-primary-orange transition-colors uppercase tracking-widest"
      >
        {{ item.name }}
      </router-link>

      <router-link
        to="/kontak"
        @click="uiStore.closeMobileMenu"
        class="block w-full py-4 bg-primary-orange text-white text-center font-bold uppercase tracking-widest"
      >
        Gabung Kami
      </router-link>
    </div>
  </transition>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

const menuItems = [
  { name: 'Tentang Kami', path: '/tentang-kami' },
  { name: 'Program Kami', path: '/program' },
  { name: 'Cerita & Blog', path: '/blog' },
  { name: 'Berita Terbaru', path: '/berita' },
  { name: 'Struktur Organisasi', path: '/organisasi' },
  { name: 'Hubungi Kami', path: '/kontak' },
]
</script>
