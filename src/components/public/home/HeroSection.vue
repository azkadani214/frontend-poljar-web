<template>
  <section
    id="home"
    class="relative pt-20 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white overflow-hidden"
  >
    <div class="max-w-350px mx-auto px-6 lg:px-12 py-20 lg:py-24 w-full relative z-10">
      <Transition name="fade-slide" mode="out-in">
        <!-- WELCOME SLIDE (Exact Original Design) -->
        <div
          v-if="slides[activeSlide]?.type === 'welcome'"
          :key="'welcome'"
          class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <!-- Left Content -->
          <div class="space-y-8">
            <div class="inline-block">
              <span
                class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-orange/10 text-primary-orange border-l-4 border-primary-orange"
              >
                Social Education Movement
              </span>
            </div>

            <h1 class="font-serif text-5xl lg:text-7xl font-bold text-primary-navy">
              Ubah Masa Depan Mulai dari
              <span class="font-serif text-primary-orange"> Pendidikan</span>
            </h1>

            <p class="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl font-serif">
              Memberdayakan anak-anak dan komunitas melalui pembelajaran yang kreatif dan inklusif
              oleh relawan mahasiswa Politeknik Negeri Malang.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#volunteer"
                class="inline-flex items-center justify-center px-8 py-4 text-base font-semibold bg-primary-orange text-white hover:bg-[#E67A32] transition-colors group"
              >
                Lihat Cerita Kami
                <svg
                  class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </a>
              <router-link
                to="/program"
                class="inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-all"
              >
                Program Kami
              </router-link>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-3 gap-4 pt-8 border-t-2 border-gray-200">
              <div>
                <div class="font-serif text-3xl font-bold text-primary-orange">60+</div>
                <div class="text-sm text-gray-600 mt-1">Relawan Aktif</div>
              </div>
              <div>
                <div class="font-serif text-3xl font-bold text-primary-orange">5+</div>
                <div class="text-sm text-gray-600 mt-1">Telah Bekerjasama</div>
              </div>
              <div>
                <div class="font-serif text-3xl font-bold text-primary-orange">100+</div>
                <div class="text-sm text-gray-600 mt-1">Penerima Manfaat</div>
              </div>
            </div>
          </div>

          <!-- Right Image Grid -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="aspect-3/4 overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"
                    alt="Teaching"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div class="aspect-square overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600"
                    alt="Learning"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div class="space-y-4 pt-12">
                <div class="aspect-square overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600"
                    alt="Children"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div class="aspect-3/4 overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
                    alt="Community"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <!-- Floating Card -->
            <div
              class="absolute -bottom-6 -left-6 bg-primary-navy text-white p-6 max-w-[200px] border-4 border-white shadow-xl"
            >
              <div class="text-4xl font-bold">1000+</div>
              <div class="text-sm mt-1 opacity-90 leading-tight">Hours of Teaching Delivered</div>
            </div>
          </div>
        </div>

        <!-- NEWS/BLOG SLIDE (Futuristic Design) -->
        <div
          v-else
          :key="slides[activeSlide]?.id"
          class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]"
        >
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <span
                class="px-3 py-1 bg-primary-navy text-white text-[10px] font-black tracking-widest uppercase"
              >
                {{ slides[activeSlide].category }}
              </span>
              <span class="w-12 h-[1px] bg-primary-orange"></span>
              <span class="text-[10px] font-bold text-primary-orange uppercase tracking-widest"
                >KABAR TERBARU</span
              >
            </div>

            <h2 class="font-serif text-4xl lg:text-6xl font-bold leading-tight text-primary-navy">
              {{ slides[activeSlide].title }}
            </h2>

            <p class="text-lg text-gray-500 leading-relaxed line-clamp-3 font-medium">
              {{ slides[activeSlide].desc }}
            </p>

            <div class="flex items-center gap-6 pt-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-primary-navy border border-gray-200"
                >
                  <User v-if="!slides[activeSlide].author" class="w-4 h-4" />
                  <span v-else>{{ slides[activeSlide].author.charAt(0) }}</span>
                </div>
                <div>
                  <p class="text-xs font-black text-primary-navy uppercase tracking-tighter">
                    {{ slides[activeSlide].author }}
                  </p>
                  <div
                    class="flex items-center gap-1 text-[10px] text-gray-400 uppercase tracking-widest"
                  >
                    <Calendar class="w-3 h-3" />
                    {{ slides[activeSlide].date }}
                  </div>
                </div>
              </div>
              <router-link
                :to="
                  slides[activeSlide].type === 'news'
                    ? `/berita/${slides[activeSlide].slug}`
                    : `/blog/${slides[activeSlide].slug}`
                "
                class="ml-auto inline-flex items-center justify-center px-6 py-3 bg-primary-navy text-white hover:bg-primary-orange transition-all duration-300 text-xs font-bold tracking-widest uppercase group"
              >
                BACA SELENGKAPNYA
                <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </router-link>
            </div>
          </div>

          <div
            class="relative aspect-[4/3] overflow-hidden group border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center"
          >
            <img
              v-if="slides[activeSlide].image"
              :src="slides[activeSlide].image"
              :alt="slides[activeSlide].title"
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div v-else class="flex flex-col items-center justify-center text-gray-200">
              <ImageIcon class="w-20 h-20 mb-4" />
              <span class="text-xs font-black tracking-widest uppercase">Foto Belum Tersedia</span>
            </div>
            <div class="absolute inset-0 border-[16px] border-white/10 pointer-events-none"></div>
          </div>
        </div>
      </Transition>

      <!-- Pagination dots -->
      <div class="absolute bottom-0 left-0 flex gap-3 z-30">
        <button
          v-for="(_, i) in slides"
          :key="i"
          @click="goToSlide(i)"
          class="h-1.5 transition-all duration-500"
          :class="activeSlide === i ? 'w-12 bg-primary-orange' : 'w-4 bg-gray-300'"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, User } from 'lucide-vue-next'
import newsService from '@/services/news.service'
import blogService from '@/services/blog.service'
import { getStorageUrl, formatDate, stripHtml } from '@/utils/helpers'

const activeSlide = ref(0)
const slides = ref([
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Ubah Masa Depan Mulai dari Pendidikan',
    desc: 'Memberdayakan anak-anak dan komunitas melalui pembelajaran yang kreatif dan inklusif oleh relawan mahasiswa Politeknik Negeri Malang.',
    image: null,
  },
])
const autoSlideInterval = ref(null)

const fetchSlides = async () => {
  try {
    const [newsRes, blogRes] = await Promise.all([
      newsService.getLatest(2),
      blogService.getRecent(2),
    ])

    const newsItems = (newsRes.data || []).map((item) => ({
      id: item.id,
      type: 'news',
      title: item.title,
      slug: item.slug,
      category: item.category?.name || 'Berita',
      desc: item.excerpt || stripHtml(item.body).substring(0, 150) + '...',
      author: item.author?.name || 'Admin',
      date: formatDate(item.published_at),
      image: item.cover_photo_url || null,
    }))

    const blogItems = (blogRes.data || []).map((item) => ({
      id: item.id,
      type: 'blog',
      title: item.title,
      slug: item.slug,
      category: item.categories?.[0]?.name || 'Blog',
      desc: item.excerpt || stripHtml(item.body).substring(0, 150) + '...',
      author: item.user?.name || 'Writer',
      date: formatDate(item.published_at || item.created_at),
      image: item.cover_photo_path ? getStorageUrl(item.cover_photo_path) : null,
    }))

    slides.value = [slides.value[0], ...newsItems, ...blogItems]
  } catch (error) {
    console.error('Failed to fetch slides:', error)
  }
}

const goToSlide = (index) => {
  activeSlide.value = index
  resetInterval()
}

const resetInterval = () => {
  if (autoSlideInterval.value) clearInterval(autoSlideInterval.value)
  autoSlideInterval.value = setInterval(() => {
    if (slides.value.length > 0) {
      activeSlide.value = (activeSlide.value + 1) % slides.value.length
    }
  }, 10000)
}

onMounted(async () => {
  await fetchSlides()
  resetInterval()
})

onBeforeUnmount(() => {
  if (autoSlideInterval.value) clearInterval(autoSlideInterval.value)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
