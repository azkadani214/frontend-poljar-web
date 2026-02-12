import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import blogService from '@/services/blog.service'

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache

export const useBlogStore = defineStore('blog', () => {
  // State
  const posts = ref([])
  const featuredPost = ref(null)
  const currentPost = ref(null)
  const recentPosts = ref([])
  const categories = ref([])
  const tags = ref([])
  const popularTags = ref([])
  const comments = ref([])
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  })
  const loading = ref(false)
  const error = ref(null)

  // Cache metadata
  const lastFetched = ref({
    list: 0,
    recent: 0,
    categories: 0,
    tags: 0,
    popularTags: 0,
  })

  // Getters
  const allPosts = computed(() => posts.value)
  const featured = computed(() => featuredPost.value)
  const current = computed(() => currentPost.value)
  const recent = computed(() => recentPosts.value)
  const allCategories = computed(() => categories.value)
  const allTags = computed(() => tags.value)
  const popular = computed(() => popularTags.value)
  const allComments = computed(() => comments.value)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value)

  // Actions
  async function fetchPosts(params = {}, force = false) {
    const isDefaultList =
      Object.keys(params).length === 0 || (Object.keys(params).length === 1 && params.page === 1)
    if (
      !force &&
      isDefaultList &&
      posts.value.length > 0 &&
      Date.now() - lastFetched.value.list < CACHE_TTL
    ) {
      return { data: posts.value, pagination: pagination.value }
    }

    loading.value = true
    error.value = null

    try {
      const response = await blogService.getAll(params)
      posts.value = response.data
      pagination.value = response.meta || response.pagination

      // Set featured post if available
      if (response.data.length > 0 && !featuredPost.value) {
        featuredPost.value = response.data[0]
      }

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

  async function fetchPostBySlug(slug) {
    if (currentPost.value?.slug === slug) {
      return { data: currentPost.value }
    }

    loading.value = true
    error.value = null

    try {
      const response = await blogService.getBySlug(slug)
      currentPost.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchRecentPosts(limit = 5, force = false) {
    if (
      !force &&
      recentPosts.value.length > 0 &&
      Date.now() - lastFetched.value.recent < CACHE_TTL
    ) {
      return { data: recentPosts.value }
    }

    try {
      const response = await blogService.getRecent(limit)
      recentPosts.value = response.data
      lastFetched.value.recent = Date.now()
      return response
    } catch (err) {
      error.value = err.message
      throw err
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
      const response = await blogService.getCategories()
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
      const response = await blogService.getTags()
      tags.value = response.data
      lastFetched.value.tags = Date.now()
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function fetchPopularTags(limit = 10, force = false) {
    if (
      !force &&
      popularTags.value.length > 0 &&
      Date.now() - lastFetched.value.popularTags < CACHE_TTL
    ) {
      return { data: popularTags.value }
    }

    try {
      const response = await blogService.getPopularTags(limit)
      popularTags.value = response.data
      lastFetched.value.popularTags = Date.now()
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function searchPosts(query, params = {}) {
    loading.value = true
    error.value = null

    try {
      const response = await blogService.search(query, params)
      posts.value = response.data
      pagination.value = response.meta || response.pagination
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchComments(slug, params = {}) {
    try {
      const response = await blogService.getComments(slug, params)
      comments.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function submitComment(slug, data) {
    try {
      const response = await blogService.postComment(slug, data)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  function clearCurrentPost() {
    currentPost.value = null
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    posts,
    featuredPost,
    currentPost,
    recentPosts,
    categories,
    tags,
    popularTags,
    comments,
    pagination,
    loading,
    error,
    lastFetched,

    // Getters
    allPosts,
    featured,
    current,
    recent,
    allCategories,
    allTags,
    popular,
    allComments,
    isLoading,
    hasError,

    // Actions
    fetchPosts,
    fetchPostBySlug,
    fetchRecentPosts,
    fetchCategories,
    fetchTags,
    fetchPopularTags,
    searchPosts,
    fetchComments,
    submitComment,
    clearCurrentPost,
    clearError,
  }
})
