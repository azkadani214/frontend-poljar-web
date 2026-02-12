<template>
  <div>
    <!-- Hero Section -->
    <section class="relative pt-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div class="max-w-4xl">
          <div class="inline-block mb-6">
            <span
              class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-blue/10 text-primary-blue border-l-4 border-primary-blue"
            >
              Blog & Stories
            </span>
          </div>

          <h1
            class="font-serif text-5xl lg:text-6xl font-bold text-primary-navy mb-6 leading-tight"
          >
            Inspirasi & <span class="text-primary-orange">Cerita</span> Kami
          </h1>

          <p class="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Temukan kisah inspiratif, tips mengajar, dan update terbaru dari gerakan pendidikan
            Polinema Mengajar
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 lg:py-20 bg-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-12 gap-12">
          <!-- Main Blog List - Left Side -->
          <div class="lg:col-span-8">
            <!-- Featured Post -->
            <BlogFeatured v-if="featuredPost" :post="featuredPost" class="mb-12" />

            <!-- Blog Grid -->
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

            <div v-else-if="posts.length > 0" class="space-y-8">
              <BlogCard v-for="post in posts" :key="post.id" :post="post" />
            </div>

            <div v-else class="text-center py-16">
              <svg
                class="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <h3 class="text-xl font-bold text-gray-600 mb-2">Tidak Ada Artikel</h3>
              <p class="text-gray-500">Belum ada artikel yang dipublikasikan</p>
            </div>

            <!-- Pagination -->
            <Pagination
              v-if="pagination.last_page > 1"
              :current-page="pagination.current_page"
              :last-page="pagination.last_page"
              :total="pagination.total"
              @page-change="handlePageChange"
              class="mt-12"
            />
          </div>

          <!-- Sidebar - Right Side -->
          <div class="lg:col-span-4">
            <BlogSidebar
              :categories="categories"
              :popular-tags="popularTags"
              :recent-posts="recentPosts"
              :total-posts="pagination.total"
              @search="handleSearch"
              @category-filter="handleCategoryFilter"
              @tag-filter="handleTagFilter"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BlogFeatured from '@/components/public/blog/BlogFeatured.vue'
import BlogCard from '@/components/public/blog/BlogCard.vue'
import BlogSidebar from '@/components/public/blog/BlogSidebar.vue'
import Pagination from '@/components/public/shared/Pagination.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const posts = ref([])
const featuredPost = ref(null)
const categories = ref([])
const popularTags = ref([])
const recentPosts = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
})
const loading = ref(true)

const fetchPosts = async () => {
  try {
    loading.value = true
    const params = {
      page: route.query.page || 1,
      per_page: 10,
    }

    if (route.query.search) {
      params.search = route.query.search
    }
    if (route.query.category) {
      params.category = route.query.category
    }
    if (route.query.tag) {
      params.tag = route.query.tag
    }

    await blogStore.fetchPosts(params)
    posts.value = blogStore.allPosts
    featuredPost.value = blogStore.featured
    pagination.value = blogStore.pagination
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    loading.value = false
  }
}

const fetchSidebarData = async () => {
  try {
    await Promise.all([
      blogStore.fetchCategories(),
      blogStore.fetchPopularTags(10),
      blogStore.fetchRecentPosts(5),
    ])

    categories.value = blogStore.allCategories
    popularTags.value = blogStore.popular
    recentPosts.value = blogStore.recent
  } catch (error) {
    console.error('Failed to fetch sidebar data:', error)
  }
}

const handlePageChange = (page) => {
  router.push({ query: { ...route.query, page } })
}

const handleSearch = (searchQuery) => {
  router.push({ query: { ...route.query, search: searchQuery, page: 1 } })
}

const handleCategoryFilter = (categorySlug) => {
  const query = { ...route.query, page: 1 }
  if (categorySlug) {
    query.category = categorySlug
  } else {
    delete query.category
  }
  router.push({ query })
}

const handleTagFilter = (tagSlug) => {
  const query = { ...route.query, page: 1 }
  if (tagSlug) {
    query.tag = tagSlug
  } else {
    delete query.tag
  }
  router.push({ query })
}

watch(
  () => route.query,
  () => {
    fetchPosts()
  },
  { deep: true },
)

onMounted(() => {
  fetchPosts()
  fetchSidebarData()
})
</script>
