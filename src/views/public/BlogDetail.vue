<template>
  <div class="bg-white min-h-screen">
    <!-- Breadcrumb & Progress -->
    <div class="fixed top-20 left-0 w-full h-1 bg-gray-100 z-50">
      <div
        class="h-full bg-primary-orange transition-all duration-300"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <section class="pt-24 pb-8 bg-gray-50 border-b border-gray-100">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <nav
          class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400"
        >
          <router-link to="/" class="hover:text-primary-orange transition-colors"
            >Beranda</router-link
          >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <router-link to="/blog" class="hover:text-primary-orange transition-colors"
            >Blog</router-link
          >
          <template v-if="post && post.categories?.length">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <router-link
              :to="`/blog?category=${post.categories[0].slug}`"
              class="hover:text-primary-orange transition-colors"
            >
              {{ post.categories[0].name }}
            </router-link>
          </template>
        </nav>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 lg:py-20">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div v-if="loading" class="animate-pulse space-y-8">
          <div class="h-12 bg-gray-100 w-3/4"></div>
          <div class="aspect-16/9 bg-gray-100"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-100"></div>
            <div class="h-4 bg-gray-100 w-5/6"></div>
          </div>
        </div>

        <div v-else-if="post" class="grid lg:grid-cols-12 gap-16">
          <!-- Article - Content Left -->
          <div class="lg:col-span-8">
            <article>
              <!-- Header -->
              <header class="mb-12">
                <div v-if="post.categories?.length" class="mb-6">
                  <span
                    class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange text-white"
                  >
                    {{ post.categories[0].name }}
                  </span>
                </div>

                <h1
                  class="font-serif text-4xl lg:text-6xl font-bold text-primary-navy mb-8 leading-tight"
                >
                  {{ post.title }}
                </h1>

                <p
                  v-if="post.sub_title"
                  class="text-xl lg:text-2xl text-gray-500 font-medium leading-relaxed mb-8 border-l-4 border-gray-200 pl-8 italic"
                >
                  {{ post.sub_title }}
                </p>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center gap-8 py-6 border-y-2 border-gray-100">
                  <div class="flex items-center gap-4">
                    <img
                      :src="getAvatarUrl(post.author)"
                      :alt="post.author?.name"
                      class="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                    <div>
                      <span class="block text-sm font-bold text-primary-navy">{{
                        post.user?.name
                      }}</span>
                      <span
                        class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                        >Penulis</span
                      >
                    </div>
                  </div>
                  <div
                    class="flex items-center gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest"
                  >
                    <div class="flex items-center gap-2">
                      <svg
                        class="w-4 h-4 text-primary-orange"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {{ formatDate(post.published_at) }}
                    </div>
                    <div class="flex items-center gap-2">
                      <svg
                        class="w-4 h-4 text-primary-orange"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {{ calculateReadingTime(post.body) }} MENIT BACA
                    </div>
                  </div>
                </div>
              </header>

              <!-- Featured Image -->
              <div class="mb-16 relative group">
                <div
                  class="absolute -inset-4 bg-gray-50 -z-10 transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"
                ></div>
                <img
                  :src="getStorageUrl(post.cover_photo_path)"
                  :alt="post.photo_alt_text"
                  class="w-full h-auto shadow-2xl border-4 border-white"
                />
                <p
                  v-if="post.photo_alt_text"
                  class="mt-4 text-center text-xs text-gray-400 italic font-medium"
                >
                  &mdash; {{ post.photo_alt_text }}
                </p>
              </div>

              <!-- Content -->
              <BlogContent :content="post.body" />

              <!-- Tags -->
              <div v-if="post.tags?.length" class="mt-16 flex flex-wrap gap-3">
                <router-link
                  v-for="tag in post.tags"
                  :key="tag.id"
                  :to="`/blog?tag=${tag.slug}`"
                  class="px-4 py-2 bg-gray-50 border-2 border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-widest hover:border-primary-orange hover:text-primary-orange transition-all"
                >
                  #{{ tag.name }}
                </router-link>
              </div>

              <!-- Social Share Bar -->
              <div
                class="mt-12 p-8 bg-primary-navy text-white flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <h4 class="font-serif text-xl font-bold mb-1">Bagikan Inspirasi</h4>
                  <p class="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
                    Bantu kami menyebarkan kebaikan
                  </p>
                </div>
                <div class="flex gap-4">
                  <button
                    @click="shareToFacebook"
                    class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-primary-orange transition-colors"
                  >
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="shareToTwitter"
                    class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-primary-orange transition-colors"
                  >
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="copyLink"
                    class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-primary-orange transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Comments Section -->
              <BlogComments :postSlug="route.params.slug" />
            </article>
          </div>

          <!-- Sidebar - Content Right -->
          <div class="lg:col-span-4">
            <div class="sticky top-24 space-y-12">
              <!-- Author Widget -->
              <div
                class="p-8 border-2 border-gray-100 text-center md:text-left flex flex-col md:flex-row items-center gap-6"
              >
                <div class="flex-shrink-0">
                  <img
                    :src="getAvatarUrl(post.author)"
                    :alt="post.author?.name"
                    class="w-24 h-24 rounded-full border-4 border-gray-100 shadow-sm object-cover"
                  />
                </div>
                <div class="text-center md:text-left flex-1">
                  <span
                    class="text-[10px] font-black tracking-widest text-primary-orange uppercase mb-2 block"
                    >Penulis Konten</span
                  >
                  <h3 class="font-serif text-2xl font-bold text-primary-navy mb-3">
                    {{ post.author?.name || 'Kontributor Polinema Mengajar' }}
                  </h3>
                  <p class="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl italic">
                    "{{
                      post.author?.quotes ||
                      'Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia.'
                    }}"
                  </p>

                  <!-- Social Links -->
                  <div class="flex items-center justify-center md:justify-start gap-4">
                    <a
                      v-if="post.author?.social_links?.facebook"
                      :href="post.author.social_links.facebook"
                      target="_blank"
                      class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-navy hover:text-white transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        />
                      </svg>
                    </a>
                    <a
                      v-if="post.author?.social_links?.twitter || post.author?.social_links?.x"
                      :href="post.author.social_links.twitter || post.author.social_links.x"
                      target="_blank"
                      class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-navy hover:text-white transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                        />
                      </svg>
                    </a>
                    <a
                      v-if="post.author?.social_links?.instagram"
                      :href="`https://instagram.com/${post.author.social_links.instagram.replace('@', '')}`"
                      target="_blank"
                      class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-navy hover:text-white transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fill-rule="evenodd"
                          d="M12.315 2c2.43 0 2.784.01 3.71.054 1.14.053 2.127.285 3.003 1.159.877.873 1.111 1.863 1.166 3.001.042.94.054 1.291.054 3.731 0 2.441-.012 2.787-.054 3.717-.055 1.148-.289 2.133-1.166 3.007-.876.874-1.863 1.107-3.003 1.161-.931.045-1.285.054-3.71.054-2.43 0-2.784-.01-3.71-.054-1.139-.054-2.126-.287-3.002-1.161-.875-.874-1.11-1.86-1.166-3.007-.045-.92-.059-1.277-.059-3.717 0-2.44.014-2.79.059-3.731.056-1.138.29-2.128 1.166-3.001.876-.874 1.863-1.106 3.002-1.159.931-.044 1.285-.054 3.71-.054zM12 7.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM12 14.75a2.75 2.75 0 110-5.5 2.75 2.75 0 010 5.5zM18.25 6.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      v-if="post.author?.social_links?.linkedin"
                      :href="post.author.social_links.linkedin"
                      target="_blank"
                      class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-navy hover:text-white transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Recent Articles -->
              <div class="p-8 bg-gray-50">
                <h4 class="font-serif text-xl font-bold text-primary-navy mb-8 relative pb-4">
                  Artikel Terbaru
                  <span class="absolute bottom-0 left-0 w-12 h-1 bg-primary-orange"></span>
                </h4>
                <div class="space-y-6">
                  <router-link
                    v-for="item in recentPosts"
                    :key="item.id"
                    :to="{ name: 'blog-detail', params: { slug: item.slug } }"
                    class="flex gap-4 group"
                  >
                    <div class="w-20 h-20 flex-shrink-0 overflow-hidden bg-white p-1 shadow-sm">
                      <img
                        :src="getStorageUrl(item.cover_photo_path)"
                        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div class="flex flex-col justify-center">
                      <span
                        class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1"
                        >{{ formatDate(item.published_at) }}</span
                      >
                      <h5
                        class="font-bold text-sm text-primary-navy group-hover:text-primary-orange transition-colors line-clamp-2 leading-tight"
                      >
                        {{ item.title }}
                      </h5>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Articles Section (Full Width) -->
    <section v-if="relatedPosts.length" class="py-20 bg-gray-50 overflow-hidden relative">
      <div class="max-w-350px mx-auto px-6 lg:px-12 relative z-10">
        <RelatedPosts :posts="relatedPosts" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useBlogStore } from '@/stores/blog'
import blogService from '@/services/blog.service'
import {
  getStorageUrl,
  getAvatarUrl,
  formatDate,
  calculateReadingTime,
  copyToClipboard,
} from '@/utils/helpers'
import BlogContent from '@/components/public/blog/BlogContent.vue'
import BlogComments from '@/components/public/blog/BlogComments.vue'
import RelatedPosts from '@/components/public/blog/RelatedPosts.vue'

const route = useRoute()
const toast = useToast()
const blogStore = useBlogStore()

const post = ref(null)
const relatedPosts = ref([])
const recentPosts = ref([])
const comments = ref([])
const loading = ref(true)
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

const fetchPost = async () => {
  try {
    loading.value = true
    const slug = route.params.slug
    await blogStore.fetchPostBySlug(slug)
    post.value = blogStore.current

    if (post.value) {
      // Fetch related & recent independently to avoid one failure blocking the other
      try {
        const relatedRes = await blogService.getRelated(slug, 3)
        relatedPosts.value = relatedRes.data || []
      } catch (e) {
        console.error('Failed to fetch related posts:', e)
        relatedPosts.value = []
      }

      try {
        const recentRes = await blogService.getRecent(5)
        recentPosts.value = recentRes.data || []
      } catch (e) {
        console.error('Failed to fetch recent posts:', e)
        recentPosts.value = []
      }

      await blogService.incrementViews(slug)
    }
  } catch (error) {
    console.error('Failed to fetch post:', error)
  } finally {
    loading.value = false
  }
}

const shareToFacebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    '_blank',
  )
}

const shareToTwitter = () => {
  const text = post.value?.title || ''
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`,
    '_blank',
  )
}

const copyLink = async () => {
  if (await copyToClipboard(window.location.href)) {
    toast.success('Link berhasil disalin!')
  }
}

onMounted(() => {
  fetchPost()
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<style scoped>
.aspect-16\/9 {
  aspect-ratio: 16 / 9;
}
</style>
