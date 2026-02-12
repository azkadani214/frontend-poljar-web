<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12 font-sans">
    <div class="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 animate-fade-in">
      <div v-if="loadingFetch" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
        <p class="text-gray-400 font-black uppercase tracking-widest text-[10px]">Memuat preferensi...</p>
      </div>

      <div v-else-if="fetchError" class="text-center py-12 space-y-6">
        <h2 class="text-2xl font-serif font-black text-primary-navy uppercase tracking-tighter">Tautan Tidak Valid</h2>
        <p class="text-gray-500 font-medium">{{ fetchError }}</p>
        <router-link to="/" class="inline-block px-8 py-4 bg-primary-navy text-white text-xs font-black tracking-widest uppercase hover:bg-primary-orange transition-all">
          KEMBALI KE BERANDA
        </router-link>
      </div>

      <div v-else>
        <div class="mb-10 text-center lg:text-left">
           <div class="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <span class="w-8 h-1 bg-primary-orange"></span>
              <span class="text-[10px] font-black text-primary-orange uppercase tracking-[4px]">PREFERENCE CENTER</span>
           </div>
           <h2 class="text-4xl font-serif font-black text-primary-navy uppercase tracking-tighter">Email <br/> <span class="italic text-primary-orange">Preferences</span>.</h2>
           <p class="text-gray-500 font-medium mt-4">Halo <span class="font-bold text-primary-navy">{{ subscriberData.email }}</span>, pilih topik newsletter yang ingin Anda terima.</p>
        </div>

        <form @submit.prevent="handleUpdate" class="space-y-8">
          <div class="space-y-4">
            <div v-for="topic in subscriberData.available_topics" :key="topic.id" 
                 class="flex items-start gap-4 p-4 border-2 transition-all cursor-pointer group"
                 :class="selectedTopics.includes(topic.id) ? 'border-primary-navy bg-gray-50' : 'border-gray-50 hover:border-gray-200'"
                 @click="toggleTopic(topic.id)">
               <div class="mt-1">
                  <div class="w-5 h-5 border-2 flex items-center justify-center transition-all"
                       :class="selectedTopics.includes(topic.id) ? 'bg-primary-navy border-primary-navy' : 'border-gray-200'">
                     <CheckIcon v-if="selectedTopics.includes(topic.id)" class="w-3 h-3 text-white" />
                  </div>
               </div>
               <div>
                  <p class="text-sm font-black text-primary-navy uppercase tracking-tight">{{ topic.name }}</p>
                  <p class="text-xs text-gray-400 font-medium mt-1">{{ topic.description || 'Dapatkan berita terbaru tentang topik ini.' }}</p>
               </div>
            </div>
          </div>
          
          <div class="pt-6 border-t-2 border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <router-link :to="`/newsletter/unsubscribe?email=${subscriberData.email}`" class="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors">
              Berhenti Berlangganan Seluruhnya
            </router-link>
            <button 
              type="submit" 
              class="w-full sm:w-auto px-10 py-4 bg-primary-navy text-white text-xs font-black tracking-widest uppercase hover:bg-primary-orange transition-all duration-500 disabled:opacity-50"
              :disabled="loadingUpdate"
            >
              {{ loadingUpdate ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Check as CheckIcon } from 'lucide-vue-next'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()

const loadingFetch = ref(true)
const loadingUpdate = ref(false)
const fetchError = ref('')
const subscriberData = ref({})
const selectedTopics = ref([])

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    loadingFetch.value = false
    fetchError.value = 'Token tidak ditemukan.'
    return
  }

  try {
    const response = await api.get(`/newsletter/preferences?token=${token}`)
    subscriberData.value = response.data
    selectedTopics.value = response.data.selected_topics
  } catch (err) {
    fetchError.value = err.response?.data?.message || 'Gagal memuat data preferensi.'
  } finally {
    loadingFetch.value = false
  }
})

const toggleTopic = (id) => {
  const index = selectedTopics.value.indexOf(id)
  if (index > -1) {
    selectedTopics.value.splice(index, 1)
  } else {
    selectedTopics.value.push(id)
  }
}

const handleUpdate = async () => {
  loadingUpdate.value = true
  try {
    await api.post('/newsletter/preferences', {
      token: route.query.token,
      topic_ids: selectedTopics.value
    })
    toast.success('Preferensi berhasil diperbarui!')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal memperbarui preferensi.')
  } finally {
    loadingUpdate.value = false
  }
}
</script>
