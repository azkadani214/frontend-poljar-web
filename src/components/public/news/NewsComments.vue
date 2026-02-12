<template>
  <div class="mt-16 pt-16 border-t-2 border-gray-100">
    <h3 class="font-serif text-3xl font-bold text-primary-navy mb-8 flex items-center gap-4">
      Diskusi
      <span
        v-if="comments.length"
        class="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-sans font-bold"
      >
        {{ comments.length }}
      </span>
    </h3>

    <!-- Comment Form -->
    <div
      class="mb-16 bg-gray-50 p-8 border-2 border-gray-100 rounded-xl overflow-hidden relative group"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-primary-orange/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"
      ></div>

      <h4 class="font-bold text-primary-navy mb-6 relative">Tinggalkan Komentar</h4>
      <form @submit.prevent="handleSubmit" class="space-y-6 relative">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
              >Nama Lengkap</label
            >
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-white border-2 border-gray-200 focus:border-primary-orange focus:ring-0 transition-colors text-sm font-medium rounded-lg"
              placeholder="Masukkan nama Anda"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
              >Alamat Email</label
            >
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-white border-2 border-gray-200 focus:border-primary-orange focus:ring-0 transition-colors text-sm font-medium rounded-lg"
              placeholder="email@contoh.com"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
            >Komentar</label
          >
          <textarea
            v-model="form.comment"
            rows="5"
            required
            class="w-full px-4 py-3 bg-white border-2 border-gray-200 focus:border-primary-orange focus:ring-0 transition-colors text-sm font-medium resize-none rounded-lg"
            placeholder="Tuliskan pemikiran Anda..."
          ></textarea>
        </div>
        <button
          type="submit"
          :disabled="submitting"
          class="px-8 py-4 bg-primary-navy text-white font-bold hover:bg-primary-orange transition-all duration-300 transform hover:-translate-y-1 rounded-lg flex items-center gap-3 disabled:opacity-50 disabled:transform-none"
        >
          <span v-if="submitting">MENGIRIM...</span>
          <span v-else>KIRIM KOMENTAR</span>
          <ArrowRight v-if="!submitting" class="w-4 h-4" />
        </button>
      </form>
    </div>

    <!-- Comments List -->
    <div v-if="loading" class="flex justify-center py-12">
      <div
        class="w-10 h-10 border-4 border-primary-orange border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <div v-else-if="comments.length" class="space-y-10">
      <div v-for="comment in comments" :key="comment.id" class="flex gap-6 group">
        <div class="flex-shrink-0">
          <div
            class="w-14 h-14 rounded-full bg-primary-navy/5 flex items-center justify-center border-2 border-gray-100 shadow-sm text-primary-navy font-bold text-lg"
          >
            {{ getInitial(comment.author_name) }}
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex items-center justify-between mb-2">
            <h5 class="font-bold text-primary-navy">{{ comment.author_name }}</h5>
            <div class="flex items-center gap-3">
              <span
                v-if="comment.is_pending"
                class="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded uppercase tracking-wider"
              >
                Menunggu Moderasi
              </span>
              <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {{ dayjs(comment.created_at).format('DD MMM YYYY') }}
              </span>
            </div>
          </div>
          <p
            class="text-gray-600 leading-relaxed text-sm bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
          >
            {{ comment.comment }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-else
      class="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
    >
      <MessageSquare class="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p class="text-gray-400 font-medium">Belum ada diskusi. Jadi yang pertama berkomentar!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'
import { useToast } from 'vue-toastification'
import { ArrowRight, MessageSquare } from 'lucide-vue-next'
import dayjs from 'dayjs'

const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
})

const newsStore = useNewsStore()
const toast = useToast()

const comments = ref([])
const loading = ref(true)
const submitting = ref(false)

const form = ref({
  name: '',
  email: '',
  comment: '',
  news_post_id: props.postId,
})

const fetchComments = async () => {
  loading.value = true
  try {
    const response = await newsStore.fetchComments(props.postId)
    comments.value = response.data
  } catch (err) {
    console.error('Failed to fetch comments:', err)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const response = await newsStore.submitComment(form.value)

    // Create a local comment object to show immediately
    const newComment = {
      id: response.data?.id || Date.now(),
      author_name: form.value.name,
      comment: form.value.comment,
      created_at: new Date().toISOString(),
      is_pending: true,
    }

    // Prepend to list
    comments.value = [newComment, ...comments.value]

    toast.success('Komentar berhasil dikirim dan menunggu moderasi.')

    // Reset form
    form.value.name = ''
    form.value.email = ''
    form.value.comment = ''
  } catch (err) {
    console.error(err)
    toast.error('Gagal mengirim komentar. Silakan coba lagi.')
  } finally {
    submitting.value = false
  }
}

const getInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : 'G'
}

onMounted(() => {
  fetchComments()
})
</script>
