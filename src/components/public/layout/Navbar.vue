<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm py-4">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group">
        <img
          src="/images/logo-poljar.png"
          alt="Polinema Mengajar"
          class="h-10 lg:h-12 w-auto transition-transform duration-500 group-hover:scale-110"
        />
        <div class="flex flex-col">
          <span
            class="font-serif text-lg lg:text-xl font-black leading-none uppercase tracking-tighter text-primary-navy"
          >
            Polinema
          </span>
          <span class="text-[9px] font-black tracking-[0.4em] uppercase text-primary-orange">
            Mengajar
          </span>
        </div>
      </router-link>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex items-center gap-10">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="text-[11px] font-black uppercase tracking-[2px] transition-all duration-300 relative group text-primary-navy hover:text-primary-orange"
        >
          {{ item.name }}
          <span
            class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-orange transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>

        <router-link
          to="/kontak"
          class="px-8 py-3 bg-primary-orange text-white text-[11px] font-black uppercase tracking-widest hover:bg-primary-navy transition-all duration-500 shadow-lg shadow-primary-orange/20"
        >
          GABUNG KAMI
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        @click="uiStore.toggleMobileMenu"
        class="lg:hidden p-2 text-primary-orange focus:outline-none"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!uiStore.isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Component -->
    <MobileMenu />
  </nav>
</template>

<script setup>
import { useUIStore } from '@/stores/ui'
import MobileMenu from './MobileMenu.vue'

const uiStore = useUIStore()

const menuItems = [
  { name: 'Tentang', path: '/tentang-kami' },
  { name: 'Program', path: '/program' },
  { name: 'Blog', path: '/blog' },
  { name: 'Berita', path: '/berita' },
  { name: 'Organisasi', path: '/organisasi' },
]
</script>
