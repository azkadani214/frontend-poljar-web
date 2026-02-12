import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import newsService from '@/services/news.service'

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache

export const useNewsStore = defineStore('news', () => {
  // State
  const news = ref([])
  const featuredNews = ref([])
  const currentNews = ref(null)
  const categories = ref([])
  const tags = ref([])
  const comments = ref([])
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 9,
    total: 0,
  })
  const loading = ref(false)
  const error = ref(null)

  // Cache metadata
  const lastFetched = ref({
    list: 0,
    featured: 0,
    categories: 0,
    tags: 0,
  })

  // Getters
  const allNews = computed(() => news.value)
  const featured = computed(() => featuredNews.value)
  const current = computed(() => currentNews.value)
  const allCategories = computed(() => categories.value)
  const allTags = computed(() => tags.value)
  const allComments = computed(() => comments.value)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value)

  // Actions
  async function fetchNews(params = {}, force = false) {
    // Check cache for empty params (default list)
    const isDefaultList =
      Object.keys(params).length === 0 || (Object.keys(params).length === 1 && params.page === 1)
    if (
      !force &&
      isDefaultList &&
      news.value.length > 0 &&
      Date.now() - lastFetched.value.list < CACHE_TTL
    ) {
      return { data: news.value, pagination: pagination.value }
    }

    loading.value = true
    error.value = null

    try {
      const response = await newsService.getAll(params)
      news.value = response.data
      pagination.value = response.meta || response.pagination

      if (isDefaultList) {
        lastFetched.value.list = Date.now()
      }
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedNews(force = false) {
    if (
      !force &&
      featuredNews.value.length > 0 &&
      Date.now() - lastFetched.value.featured < CACHE_TTL
    ) {
      return { data: featuredNews.value }
    }

    loading.value = true
    error.value = null

    try {
      const response = await newsService.getFeatured()
      featuredNews.value = response.data
      lastFetched.value.featured = Date.now()
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchNewsById(id) {
    // We don't cache individual news by default in state unless it's currentNews
    loading.value = true
    error.value = null

    try {
      const response = await newsService.getById(id)
      currentNews.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchNewsBySlug(slug) {
    if (currentNews.value?.slug === slug) {
      return { data: currentNews.value }
    }

    loading.value = true
    error.value = null

    try {
      const response = await newsService.getBySlug(slug)
      currentNews.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories(force = false) {
    if (
      !force &&
      categories.value.length > 0 &&
      Date.now() - lastFetched.value.categories < CACHE_TTL
    ) {
      return { data: categories.value }
    }

    try {
      const response = await newsService.getCategories()
      categories.value = response.data
      lastFetched.value.categories = Date.now()
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function fetchTags(force = false) {
    if (!force && tags.value.length > 0 && Date.now() - lastFetched.value.tags < CACHE_TTL) {
      return { data: tags.value }
    }

    try {
      const response = await newsService.getTags()
      tags.value = response.data
      lastFetched.value.tags = Date.now()
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function searchNews(query, params = {}) {
    loading.value = true
    error.value = null

    try {
      const response = await newsService.search(query, params)
      news.value = response.data
      pagination.value = response.meta || response.pagination
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchComments(postId, params = {}) {
    try {
      const response = await newsService.getComments(postId, params)
      comments.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function submitComment(data) {
    try {
      const response = await newsService.postComment(data)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  function clearCurrentNews() {
    currentNews.value = null
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    news,
    featuredNews,
    currentNews,
    categories,
    tags,
    comments,
    pagination,
    loading,
    error,
    lastFetched,

    // Getters
    allNews,
    featured,
    current,
    allCategories,
    allTags,
    allComments,
    isLoading,
    hasError,

    // Actions
    fetchNews,
    fetchFeaturedNews,
    fetchNewsById,
    fetchNewsBySlug,
    fetchCategories,
    fetchTags,
    searchNews,
    fetchComments,
    submitComment,
    clearCurrentNews,
    clearError,
  }
})
