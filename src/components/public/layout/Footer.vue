<template>
  <footer class="bg-primary-navy text-white">
    <!-- Main Footer -->
    <div class="max-w-350px mx-auto px-6 lg:px-12 py-16 lg:py-20">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand Column -->
        <div class="space-y-6">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-primary-orange flex items-center justify-center">
              <span class="text-white font-bold text-xl">PM</span>
            </div>
            <div>
              <div class="font-bold text-white text-lg leading-tight">Polinema Mengajar</div>
              <div class="text-xs text-white/70">Social Education Movement</div>
            </div>
          </div>
          <p class="text-sm text-white/80 leading-relaxed">
            Memberdayakan anak-anak dan komunitas melalui pembelajaran yang kreatif dan inklusif.
          </p>

          <!-- Social Media -->
          <div class="flex items-center space-x-4">
            <a
              :href="socialLinks.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white/10 hover:bg-primary-orange flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            <a
              :href="socialLinks.youtube"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white/10 hover:bg-primary-orange flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
            </a>
            <a
              :href="socialLinks.tiktok"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white/10 hover:bg-primary-orange flex items-center justify-center transition-colors"
              aria-label="TikTok"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-lg mb-6">Quick Links</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.quickLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-white/80 hover:text-primary-orange transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Organization -->
        <div>
          <h3 class="font-bold text-lg mb-6">Organisasi</h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.organization" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-white/80 hover:text-primary-orange transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="font-bold text-lg mb-6">Hubungi Kami</h3>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3">
              <svg
                class="w-5 h-5 text-primary-orange flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <a
                :href="`mailto:${socialLinks.email}`"
                class="text-sm text-white/80 hover:text-primary-orange transition-colors"
              >
                {{ socialLinks.email }}
              </a>
            </li>
            <li class="flex items-start space-x-3">
              <svg
                class="w-5 h-5 text-primary-orange flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span class="text-sm text-white/80">
                Politeknik Negeri Malang<br />
                Jl. Soekarno Hatta No.9, Malang
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="max-w-350px mx-auto px-6 lg:px-12 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p class="text-sm text-white/60">
            &copy; {{ currentYear }} Polinema Mengajar. All rights reserved.
          </p>
          <div class="flex items-center space-x-6">
            <router-link
              to="/privacy"
              class="text-sm text-white/60 hover:text-primary-orange transition-colors"
            >
              Privacy Policy
            </router-link>
            <router-link
              to="/terms"
              class="text-sm text-white/60 hover:text-primary-orange transition-colors"
            >
              Terms of Service
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { SOCIAL_LINKS, FOOTER_LINKS } from '@/utils/constants'

const currentYear = computed(() => new Date().getFullYear())
const socialLinks = SOCIAL_LINKS
const footerLinks = FOOTER_LINKS
</script>
