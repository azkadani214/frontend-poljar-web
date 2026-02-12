<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-navy/10 p-2 rounded-lg">
          <Mail class="w-6 h-6 text-primary-navy" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Manajemen Newsletter</h2>
          <p class="text-xs text-gray-500">Kelola pelanggan email dan kampanye informasi</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" @click="handleRefresh">
          <RefreshCcw class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button>
        <router-link to="/admin/newsletter/campaigns">
          <Button class="bg-primary-navy text-white">
            <Send class="w-4 h-4 mr-2" />
            Manajemen Kampanye
          </Button>
        </router-link>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card class="bg-white border-2 border-gray-50">
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">TOTAL PELANGGAN</p>
            <p class="text-3xl font-black text-primary-navy tracking-tighter">{{ stats.total_subscribers || 0 }}</p>
          </div>
          <div class="w-12 h-12 rounded-none bg-gray-50 flex items-center justify-center">
            <Users class="w-6 h-6 text-primary-navy" />
          </div>
        </CardContent>
      </Card>
      
      <Card class="bg-white border-2 border-gray-50">
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">TERVERIFIKASI</p>
            <p class="text-3xl font-black text-green-600 tracking-tighter">{{ stats.verified_subscribers || 0 }}</p>
          </div>
          <div class="w-12 h-12 rounded-none bg-green-50 flex items-center justify-center">
            <CheckCircle2 class="w-6 h-6 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card class="bg-white border-2 border-gray-50">
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">PENDING</p>
            <p class="text-3xl font-black text-amber-600 tracking-tighter">{{ stats.unverified_subscribers || 0 }}</p>
          </div>
          <div class="w-12 h-12 rounded-none bg-amber-50 flex items-center justify-center">
            <Clock class="w-6 h-6 text-amber-600" />
          </div>
        </CardContent>
      </Card>

      <Card class="bg-white border-2 border-gray-50">
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">UNSUBSCRIBED</p>
            <p class="text-3xl font-black text-red-600 tracking-tighter">{{ stats.unsubscribed || 0 }}</p>
          </div>
          <div class="w-12 h-12 rounded-none bg-red-50 flex items-center justify-center">
            <UserX class="w-6 h-6 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Subscriber Table -->
    <Card class="bg-white border-2 border-gray-50 overflow-hidden">
      <div class="p-6 border-b-2 border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 class="font-black text-primary-navy uppercase tracking-[2px] flex items-center text-xs">
          <List class="w-4 h-4 mr-2 text-primary-orange" />
          DAFTAR PELANGGAN
        </h3>
        <div class="flex gap-2 w-full md:w-auto">
          <div class="relative flex-1 md:w-64">
             <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <Input v-model="searchQuery" placeholder="Cari email..." class="pl-10 h-10 rounded-none border-2 border-gray-100 focus:border-primary-orange transition-all" />
          </div>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow class="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead class="text-[10px] font-black uppercase tracking-widest py-4">Email</TableHead>
            <TableHead class="text-[10px] font-black uppercase tracking-widest py-4 text-center">Status</TableHead>
            <TableHead class="text-[10px] font-black uppercase tracking-widest py-4 text-center">Locale</TableHead>
            <TableHead class="text-[10px] font-black uppercase tracking-widest py-4">Tanggal Join</TableHead>
            <TableHead class="text-right text-[10px] font-black uppercase tracking-widest py-4">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="isLoading" v-for="i in 5" :key="i">
            <TableCell v-for="j in 5" :key="j"><div class="h-12 bg-gray-50 animate-pulse rounded-none"></div></TableCell>
          </TableRow>
          <TableRow v-else-if="filteredSubscribers.length === 0">
            <TableCell colspan="5" class="h-40 text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">Data tidak ditemukan.</TableCell>
          </TableRow>
          <TableRow v-for="sub in filteredSubscribers" :key="sub.id" class="group hover:bg-gray-50/50 transition-all border-b border-gray-50">
            <TableCell class="font-bold text-primary-navy py-4">{{ sub.email }}</TableCell>
            <TableCell class="text-center py-4">
              <Badge 
                :class="sub.verified_at ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'" 
                class="rounded-none px-3 py-1 font-black text-[9px] uppercase tracking-widest border-none"
              >
                {{ sub.verified_at ? 'Terverifikasi' : 'Pending' }}
              </Badge>
              <Badge v-if="!sub.subscribed" class="ml-2 bg-red-100 text-red-700 rounded-none px-3 py-1 font-black text-[9px] uppercase tracking-widest border-none">Unsubscribed</Badge>
            </TableCell>
            <TableCell class="text-center py-4">
               <span class="text-[10px] font-black uppercase text-gray-400">{{ sub.locale || 'id' }}</span>
            </TableCell>
            <TableCell class="text-gray-500 font-bold text-[10px] py-4 uppercase tracking-widest">{{ formatDate(sub.created_at) }}</TableCell>
            <TableCell class="text-right py-4">
              <Button @click="handleDelete(sub.id)" variant="ghost" size="icon" class="text-gray-300 hover:text-red-600 transition-colors">
                <Trash2 class="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Mail, 
  Send, 
  RefreshCcw, 
  Users, 
  CheckCircle2, 
  Clock, 
  List, 
  Trash2,
  UserX,
  Search
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import newsletterService from '@/services/newsletter.service'
import dayjs from 'dayjs'
import { useToast } from 'vue-toastification'

const toast = useToast()
const isLoading = ref(false)
const subscribers = ref([])
const stats = ref({})
const searchQuery = ref('')

const filteredSubscribers = computed(() => {
  if (!searchQuery.value) return subscribers.value
  const q = searchQuery.value.toLowerCase()
  return subscribers.value.filter(s => s.email.toLowerCase().includes(q))
})

async function fetchSubscribers() {
  isLoading.value = true
  try {
    const res = await newsletterService.getSubscribers()
    subscribers.value = res.data || []
  } catch (error) {
    toast.error('Gagal mengambil data pelanggan')
  } finally {
    isLoading.value = false
  }
}

async function fetchStats() {
  try {
    const res = await newsletterService.getStatistics()
    stats.value = res.data || {}
  } catch (error) {}
}

const handleRefresh = () => {
  fetchSubscribers()
  fetchStats()
}

const handleDelete = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) return
  try {
    // We reuse delete endpoint if available or unsubscribe
    // For now, let's assume we want to unsubscribe or delete
    await newsletterService.unsubscribe({ email: subscribers.value.find(s => s.id === id).email })
    toast.success('Pelanggan berhasil dihapus (unsubscribed)')
    handleRefresh()
  } catch (error) {
    toast.error('Gagal menghapus pelanggan')
  }
}

function formatDate(date) {
  return dayjs(date).format('DD MMM YYYY HH:mm')
}

onMounted(() => {
  handleRefresh()
})
</script>
