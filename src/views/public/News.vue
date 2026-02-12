<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <!-- Decor -->
      <div
        class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-orange/5 rounded-full blur-3xl"
      ></div>

      <div class="max-w-350px mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10">
        <div class="max-w-4xl">
          <div class="inline-block mb-6">
            <span
              class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-orange/10 text-primary-orange border-l-4 border-primary-orange"
            >
              Pusat Informasi
            </span>
          </div>

          <h1
            class="font-serif text-5xl lg:text-7xl font-bold text-primary-navy mb-8 leading-tight"
          >
            Berita & <span class="text-primary-orange text-gradient">Update</span> Terkini
          </h1>

          <p
            class="text-xl text-gray-600 leading-relaxed max-w-2xl border-l-2 border-gray-200 pl-8"
          >
            Ikuti perkembangan terbaru kegiatan Polinema Mengajar, pengumuman penting, dan berbagai
            cerita inspiratif dari lapangan.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 lg:py-24">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <!-- Featured News (only on first page and no filters) -->
        <div v-if="showFeatured && featuredPost" class="mb-20 animate-fade-in">
          <NewsFeatured :post="featuredPost" />
        </div>

        <div class="grid lg:grid-cols-12 gap-16">
          <!-- News Grid - Left Side -->
          <div class="lg:col-span-8">
            <!-- Section Header -->
            <div class="flex items-end justify-between mb-12 border-b-2 border-gray-100 pb-8">
              <div>
                <h2 class="font-serif text-3xl font-bold text-primary-navy">
                  {{ filterHeading }}
                </h2>
                <p v-if="activeFilters" class="text-sm text-gray-500 mt-2">
                  Menampilkan hasil untuk:
                  <span class="font-bold text-primary-orange">{{ activeFiltersLabel }}</span>
                </p>
              </div>
              <div v-if="activeFilters">
                <button
                  @click="clearFilters"
                  class="text-xs font-bold text-primary-navy hover:text-primary-orange transition-colors flex items-center gap-2"
                >
                  HAPUS FILTER
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="space-y-8">
              <div
                v-for="i in 3"
                :key="i"
                class="bg-white border-2 border-gray-100 overflow-hidden animate-pulse shadow-sm"
              >
                <div class="grid md:grid-cols-5">
                  <div class="md:col-span-2 aspect-16/10 md:aspect-auto bg-gray-50"></div>
                  <div class="md:col-span-3 p-8 space-y-4">
                    <div class="h-3 bg-gray-100 rounded w-1/4"></div>
                    <div class="h-8 bg-gray-100 rounded w-3/4"></div>
                    <div class="h-20 bg-gray-50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- News Cards Grid -->
            <div v-else-if="posts.length > 0" class="grid md:grid-cols-2 gap-x-8 gap-y-12">
              <NewsCard v-for="post in posts" :key="post.id" :post="post" />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200">
              <svg
                class="w-16 h-16 text-gray-300 mx-auto mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4H4a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8l-6-6z"
                />
              </svg>
              <h3 class="text-2xl font-serif font-bold text-gray-600 mb-2">Tidak Ada Berita</h3>
              <p class="text-gray-500">Maaf, kami tidak menemukan berita yang Anda cari.</p>
              <button
                @click="clearFilters"
                class="mt-8 px-6 py-3 bg-primary-navy text-white text-sm font-bold hover:bg-primary-orange transition-all"
              >
                LIHAT SEMUA BERITA
              </button>
            </div>

            <!-- Pagination -->
            <Pagination
              v-if="pagination.last_page > 1"
              :current-page="pagination.current_page"
              :last-page="pagination.last_page"
              :total="pagination.total"
              @page-change="handlePageChange"
              class="mt-16"
            />
          </div>

          <!-- Sidebar - Right Side -->
          <div class="lg:col-span-4">
            <NewsSidebar
              :categories="categories"
              :recent-posts="recentPosts"
              @search="handleSearch"
              @category-filter="handleCategoryFilter"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNewsStore } from '@/stores/news'
import NewsFeatured from '@/components/public/news/NewsFeatured.vue'
import NewsCard from '@/components/public/news/NewsCard.vue'
import NewsSidebar from '@/components/public/news/NewsSidebar.vue'
import Pagination from '@/components/public/shared/Pagination.vue'

const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()

const posts = ref([])
const featuredPost = ref(null)
const categories = ref([])
const recentPosts = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
})
const loading = ref(true)

const showFeatured = computed(() => {
  return !route.query.page || (route.query.page === '1' && !activeFilters.value)
})

const activeFilters = computed(() => {
  return !!(route.query.search || route.query.category || route.query.tag)
})

const activeFiltersLabel = computed(() => {
  if (route.query.search) return `Pencarian "${route.query.search}"`
  if (route.query.category) return `Kategori: ${route.query.category}`
  if (route.query.tag) return `Tag: ${route.query.tag}`
  return ''
})

const filterHeading = computed(() => {
  return activeFilters.value ? 'Hasil Pencarian' : 'Semua Berita'
})

const fetchPosts = async () => {
  try {
    loading.value = true
    const params = {
      page: route.query.page || 1,
      ...route.query,
    }

    await newsStore.fetchNews(params)
    posts.value = newsStore.allNews
    pagination.value = newsStore.pagination

    // If first page and no filters, get featured
    if (showFeatured.value) {
      await newsStore.fetchFeaturedNews()
      featuredPost.value = newsStore.featured[0] || null
    }
  } catch (error) {
    console.error('Failed to fetch news:', error)
  } finally {
    loading.value = false
  }
}

const fetchSidebarData = async () => {
  try {
    await Promise.all([
      newsStore.fetchCategories(),
      // Use regular news for recent if no specific popular endpoint
      newsStore.fetchNews({ per_page: 5 }),
    ])
    categories.value = newsStore.allCategories
    recentPosts.value = newsStore.news.slice(0, 5)
  } catch (error) {
    console.error('Failed to fetch sidebar data:', error)
  }
}

const handlePageChange = (page) => {
  router.push({ query: { ...route.query, page } })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSearch = (query) => {
  router.push({ query: { ...route.query, search: query, page: 1 } })
}

const handleCategoryFilter = (slug) => {
  router.push({ query: { category: slug, page: 1 } })
}

const clearFilters = () => {
  router.push({ query: {} })
}

watch(
  () => route.query,
  () => fetchPosts(),
  { deep: true },
)

onMounted(() => {
  fetchPosts()
  fetchSidebarData()
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #ff8c42, #e67a32);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
