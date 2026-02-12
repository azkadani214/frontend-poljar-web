<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-blue/10 p-2 rounded-lg">
          <Send class="w-6 h-6 text-primary-blue" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Kampanye Newsletter</h2>
          <p class="text-xs text-gray-500">Buat dan kirim pesan ke pelanggan Anda</p>
        </div>
      </div>
      <Button @click="showCreateModal = true" class="bg-primary-navy text-white">
        <Plus class="w-4 h-4 mr-2" />
        Kampanye Baru
      </Button>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="campaign in campaigns" :key="campaign.id" class="bg-white border-2 border-gray-100 p-6 space-y-4">
        <div class="flex justify-between items-start">
          <Badge :class="getStatusStyle(campaign.status)">{{ campaign.status }}</Badge>
          <span class="text-[10px] text-gray-400 font-bold">{{ formatDate(campaign.created_at) }}</span>
        </div>
        <h3 class="text-lg font-black text-primary-navy uppercase tracking-tight">{{ campaign.subject }}</h3>
        <div class="flex items-center justify-between text-xs font-bold text-gray-400">
           <span>{{ campaign.total_recipients }} PENERIMA</span>
           <button v-if="campaign.status === 'draft'" @click="sendCampaign(campaign.id)" class="text-primary-orange hover:underline">KIRIM SEKARANG</button>
        </div>
      </div>
    </div>

    <!-- Create Campaign Modal Placeholder -->
    <Dialog :open="showCreateModal" @update:open="showCreateModal = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Kampanye</DialogTitle>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <Label>Subjek Email</Label>
            <Input v-model="newCampaign.subject" placeholder="Masukkan subjek..." />
          </div>
          <div class="space-y-2">
            <Label>Template</Label>
            <Select v-model="newCampaign.template_id">
               <SelectTrigger><SelectValue placeholder="Pilih Template" /></SelectTrigger>
               <SelectContent>
                  <SelectItem v-for="t in templates" :key="t.id" :value="t.id">{{ t.name }}</SelectItem>
               </SelectContent>
            </Select>
          </div>
          <div class="space-y-2">
            <Label>Topik (Opsional)</Label>
            <Select v-model="newCampaign.topic_id">
               <SelectTrigger><SelectValue placeholder="Semua Pelanggan" /></SelectTrigger>
               <SelectContent>
                  <SelectItem :value="null">Semua Pelanggan</SelectItem>
                  <SelectItem v-for="topic in topics" :key="topic.id" :value="topic.id">{{ topic.name }}</SelectItem>
               </SelectContent>
            </Select>
            <p class="text-[10px] text-gray-400">Jika dipilih, email hanya akan dikirim ke pelanggan yang memilih topik ini.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showCreateModal = false">Batal</Button>
          <Button @click="handleCreate" :disabled="loading">SIMPAN DRAFT</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Send, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import api from '@/services/api'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs'

const toast = useToast()
const campaigns = ref([])
const templates = ref([])
const topics = ref([])
const showCreateModal = ref(false)
const loading = ref(false)
const newCampaign = ref({ subject: '', template_id: '', topic_id: null })

const fetchCampaigns = async () => {
  const res = await api.get('/newsletter/campaigns')
  campaigns.value = res.data
}

const fetchTemplates = async () => {
  const res = await api.get('/newsletter/templates')
  templates.value = res.data
}

const fetchTopics = async () => {
  const res = await api.get('/newsletter/topics')
  topics.value = res.data
}

const handleCreate = async () => {
  loading.value = true
  try {
    await api.post('/newsletter/campaigns', newCampaign.value)
    toast.success('Kampanye berhasil dibuat.')
    showCreateModal.value = false
    fetchCampaigns()
  } catch (err) {
    toast.error('Gagal membuat kampanye.')
  } finally {
    loading.value = false
  }
}

const sendCampaign = async (id) => {
  if (!confirm('Kirim kampanye ini sekarang?')) return
  try {
    await api.post(`/newsletter/campaigns/${id}/send`)
    toast.success('Kampanye sedang dikirim.')
    fetchCampaigns()
  } catch (err) {
    toast.error('Gagal mengirim kampanye.')
  }
}

const getStatusStyle = (status) => {
  switch(status) {
    case 'sent': return 'bg-green-100 text-green-700'
    case 'sending': return 'bg-blue-100 text-blue-700 animate-pulse'
    default: return 'bg-gray-100 text-gray-500'
  }
}

const formatDate = (date) => dayjs(date).format('DD MMM YYYY')

onMounted(() => {
  fetchCampaigns()
  fetchTemplates()
  fetchTopics()
})
</script>
