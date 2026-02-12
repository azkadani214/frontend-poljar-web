<template>
  <section class="py-24 lg:py-32 bg-white overflow-hidden">
    <div class="max-w-350px mx-auto px-6 lg:px-12">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <!-- Content -->
        <div>
          <span
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange/10 text-primary-orange"
          >
            DAMPAK NYATA
          </span>
          <h2
            class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mt-8 mb-8 leading-tight"
          >
            Lebih Dari Sekadar <br />
            <span class="italic text-primary-orange font-serif">Mengajar</span>
          </h2>
          <p class="text-lg text-gray-500 leading-relaxed mb-12">
            Setiap kunjungan kami ke sekolah bukan hanya soal materi pelajaran, tapi soal membangun
            mimpi dan harapan bersama anak-anak di pelosok Jawa Timur.
          </p>

          <div class="space-y-8">
            <div
              v-for="(testimonial, idx) in testimonials"
              :key="idx"
              class="p-8 border-l-4 border-primary-orange bg-gray-50"
            >
              <p class="text-primary-navy italic mb-4">"{{ testimonial.text }}"</p>
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <div class="text-sm font-bold text-primary-navy">{{ testimonial.author }}</div>
                  <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {{ testimonial.role }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Grid -->
        <div class="relative">
          <div class="absolute -inset-4 bg-gray-50 -z-10 transform -rotate-1"></div>
          <div class="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500"
              class="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500"
              class="w-full aspect-square object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    text: 'Polinema Mengajar mengubah cara saya memandang pendidikan. Saya belajar bahwa kepedulian kecil bisa berdampak besar.',
    author: 'Andi Pratama',
    role: 'Volunteer / Mahasiswa',
  },
  {
    text: 'Kehadiran kakak-kakak relawan membuat siswa kami jauh lebih antusias dalam belajar dan berani bermimpi.',
    author: 'Ibu Ratna',
    role: 'Kepala Sekolah SDN 01 Sumberputih',
  },
]
</script>
