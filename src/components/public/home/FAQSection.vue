<template>
  <section class="py-24 lg:py-32 bg-gray-50">
    <div class="max-w-350px mx-auto px-6 lg:px-12">
      <div class="text-center max-w-3xl mx-auto mb-20">
        <span class="text-xs font-bold tracking-[0.3em] uppercase text-primary-orange"
          >Frequently Asked Questions</span
        >
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mt-6">
          Pertanyaan Umum
        </h2>
      </div>

      <div class="max-w-3xl mx-auto space-y-4">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          class="bg-white border-2 border-gray-100 overflow-hidden"
        >
          <button
            @click="toggleFaq(idx)"
            class="w-full px-8 py-6 flex items-center justify-between text-left group"
          >
            <span
              class="font-bold text-primary-navy group-hover:text-primary-orange transition-colors"
            >
              {{ faq.question }}
            </span>
            <svg
              class="w-5 h-5 text-primary-orange transform transition-transform duration-300"
              :class="{ 'rotate-180': openFaq === idx }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[500px] opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="max-h-[500px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openFaq === idx" class="px-8 pb-8 text-gray-500 text-sm leading-relaxed">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openFaq = ref(0)
const toggleFaq = (idx) => {
  openFaq.value = openFaq.value === idx ? null : idx
}

const faqs = [
  {
    question: 'Siapa saja yang bisa bergabung menjadi volunteer?',
    answer:
      'Seluruh mahasiswa aktif Politeknik Negeri Malang dari semua jurusan dan angkatan dapat bergabung melalui Open Recruitment yang dibuka setiap periodenya.',
  },
  {
    question: 'Apakah ada biaya untuk bergabung?',
    answer:
      'Tidak ada biaya pendaftaran. Seluruh operasional program didukung oleh dana organisasi dan donatur yang tidak mengikat.',
  },
  {
    question: 'Di mana lokasi pengajaran Polinema Mengajar?',
    answer:
      'Kami bermitra dengan beberapa sekolah dasar di daerah terpencil di wilayah Malang Raya yang membutuhkan pendampingan pendidikan tambahan.',
  },
  {
    question: 'Bagaimana cara berdonasi ke Polinema Mengajar?',
    answer:
      'Anda dapat berdonasi melalui link Donasi di website ini atau menghubungi humas kami untuk bantuan berupa barang (buku, alat tulis, dsb).',
  },
]
</script>
