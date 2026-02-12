<template>
  <nav v-if="lastPage > 1" class="flex items-center justify-center space-x-2">
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 border-2 border-gray-300 text-gray-700 hover:border-primary-orange hover:text-primary-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <!-- Page Numbers -->
    <template v-for="page in displayedPages" :key="page">
      <button
        v-if="page !== '...'"
        @click="changePage(page)"
        class="px-4 py-2 border-2 transition-all"
        :class="
          currentPage === page
            ? 'border-primary-orange bg-primary-orange text-white font-semibold'
            : 'border-gray-300 text-gray-700 hover:border-primary-orange hover:text-primary-orange'
        "
      >
        {{ page }}
      </button>
      <span v-else class="px-2 text-gray-500">...</span>
    </template>

    <!-- Next Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === lastPage"
      class="px-4 py-2 border-2 border-gray-300 text-gray-700 hover:border-primary-orange hover:text-primary-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-gray-700"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>
  </nav>

  <!-- Results Info -->
  <div v-if="total" class="text-center mt-4 text-sm text-gray-600">
    Showing {{ startItem }} - {{ endItem }} of {{ total }} results
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  maxPages: {
    type: Number,
    default: 7,
  },
})

const emit = defineEmits(['page-change'])

const displayedPages = computed(() => {
  const pages = []
  const { currentPage, lastPage, maxPages } = props

  if (lastPage <= maxPages) {
    // Show all pages if total is less than max
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i)
    }
  } else {
    // Show first, last, and pages around current
    const leftOffset = Math.floor(maxPages / 2)
    const rightOffset = Math.ceil(maxPages / 2) - 1

    if (currentPage <= leftOffset + 2) {
      // Near start
      for (let i = 1; i <= maxPages - 2; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(lastPage)
    } else if (currentPage >= lastPage - rightOffset - 1) {
      // Near end
      pages.push(1)
      pages.push('...')
      for (let i = lastPage - (maxPages - 3); i <= lastPage; i++) {
        pages.push(i)
      }
    } else {
      // Middle
      pages.push(1)
      pages.push('...')
      for (let i = currentPage - leftOffset + 2; i <= currentPage + rightOffset - 2; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(lastPage)
    }
  }

  return pages
})

const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  const end = props.currentPage * props.perPage
  return end > props.total ? props.total : end
})

const changePage = (page) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
