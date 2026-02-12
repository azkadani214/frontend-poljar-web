<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">Log Aktivitas</h2>
        <p class="text-muted-foreground">Pantau semua aktivitas pengguna di dalam sistem.</p>
      </div>
    </div>

    <div class="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="text-xs uppercase bg-muted/50 border-b">
            <tr>
              <th class="px-6 py-4 font-semibold">Waktu</th>
              <th class="px-6 py-4 font-semibold">Pengguna</th>
              <th class="px-6 py-4 font-semibold">Aksi</th>
              <th class="px-6 py-4 font-semibold">Modul</th>
              <th class="px-6 py-4 font-semibold">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" v-for="i in 5" :key="i" class="border-b animate-pulse">
              <td class="px-6 py-4"><div class="h-4 bg-muted rounded w-32"></div></td>
              <td class="px-6 py-4"><div class="h-4 bg-muted rounded w-24"></div></td>
              <td class="px-6 py-4"><div class="h-4 bg-muted rounded w-20"></div></td>
              <td class="px-6 py-4"><div class="h-4 bg-muted rounded w-24"></div></td>
              <td class="px-6 py-4"><div class="h-4 bg-muted rounded w-48"></div></td>
            </tr>
            <tr v-else-if="activities.length === 0" class="border-b">
              <td
                colspan="5"
                class="px-6 py-10 text-center text-muted-foreground whitespace-nowrap"
              >
                Belum ada data aktivitas.
              </td>
            </tr>
            <tr
              v-for="log in activities"
              :key="log.id"
              class="border-b hover:bg-muted/30 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap font-medium">
                {{ formatDateTime(log.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div
                    class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20"
                  >
                    <img
                      v-if="log.user?.photo_url"
                      :src="log.user.photo_url"
                      class="h-full w-full rounded-full object-cover"
                    />
                    <span v-else>{{ log.user?.name?.charAt(0) || 'U' }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-medium truncate max-w-[150px]">{{
                      log.user?.name || 'Sistem'
                    }}</span>
                    <span class="text-xs text-muted-foreground">{{ log.user?.email || '-' }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  :class="getActionClass(log.log_name)"
                >
                  {{ log.log_name }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap capitalize">
                {{ log.subject_type?.split('\\').pop() || '-' }}
              </td>
              <td class="px-6 py-4">
                <p class="text-xs max-w-xs truncate" :title="log.description">
                  {{ log.description }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination.total > 0"
        class="px-6 py-4 border-t flex items-center justify-between bg-muted/20"
      >
        <div class="text-xs text-muted-foreground">
          Menampilkan {{ pagination.from }} - {{ pagination.to }} dari {{ pagination.total }} data
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="fetchActivities(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-3 py-1 text-sm rounded border bg-background hover:bg-muted disabled:opacity-50 transition-colors"
          >
            Sebelumnya
          </button>
          <button
            @click="fetchActivities(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-1 text-sm rounded border bg-background hover:bg-muted disabled:opacity-50 transition-colors"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import userService from '@/services/user.service'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

const activities = ref([])
const loading = ref(true)
const pagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
  from: 0,
  to: 0,
})

let pollingInterval = null

async function fetchActivities(page = 1, showLoading = true) {
  if (showLoading) loading.value = true
  try {
    const response = await userService.getAllActivities({ page, per_page: 15 })
    activities.value = response.data || []
    if (response.pagination) {
      pagination.value = {
        current_page: response.pagination.current_page,
        last_page: response.pagination.last_page,
        total: response.pagination.total,
        from: response.pagination.from,
        to: response.pagination.to,
      }
    }
  } catch (error) {
    console.error('Error fetching activities:', error)
  } finally {
    if (showLoading) loading.value = false
  }
}

function formatDateTime(dateStr) {
  if (!dateStr) return '-'
  return dayjs(dateStr).locale('id').format('DD MMM YYYY, HH:mm')
}

function getActionClass(logName = '') {
  const name = logName.toLowerCase()
  if (name.includes('create') || name.includes('store'))
    return 'bg-green-50 text-green-700 border-green-200'
  if (name.includes('update') || name.includes('edit'))
    return 'bg-blue-50 text-blue-700 border-blue-200'
  if (name.includes('delete') || name.includes('destroy'))
    return 'bg-red-50 text-red-700 border-red-200'
  if (name.includes('login')) return 'bg-purple-50 text-purple-700 border-purple-200'
  if (name.includes('logout')) return 'bg-amber-50 text-amber-700 border-amber-200'
  return 'bg-gray-50 text-gray-700 border-gray-200'
}

onMounted(() => {
  fetchActivities()

  // Real-time polling every 10 seconds
  pollingInterval = setInterval(() => {
    if (pagination.value.current_page === 1) {
      fetchActivities(1, false)
    }
  }, 10000)
})

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval)
})
</script>
