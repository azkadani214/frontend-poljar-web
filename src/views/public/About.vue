<template>
  <div>
    <!-- Hero Section -->
    <section class="relative pt-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-block mb-6">
            <span
              class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-orange/10 text-primary-orange border-l-4 border-primary-orange"
            >
              About Us
            </span>
          </div>

          <h1
            class="font-serif text-5xl lg:text-6xl font-bold text-primary-navy mb-6 leading-tight"
          >
            Empowering Through <span class="text-primary-orange">Education</span>
          </h1>

          <p class="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Polinema Mengajar adalah gerakan sosial mahasiswa dari Politeknik Negeri Malang yang
            berdedikasi untuk memberdayakan anak-anak dan komunitas melalui pendidikan berkualitas.
          </p>
        </div>
      </div>
    </section>

    <!-- Vision & Mission Section -->
    <section class="py-24 lg:py-32 bg-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Vision Card -->
          <div
            class="border-4 border-primary-navy p-12 lg:p-16 hover:bg-primary-navy hover:text-white transition-all duration-500 group"
          >
            <div class="flex items-start gap-6 mb-8">
              <div class="w-16 h-16 bg-primary-orange flex items-center justify-center shrink-0">
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 class="font-serif text-3xl lg:text-4xl font-bold mb-2">Visi</h2>
                <div class="w-20 h-1 bg-primary-orange"></div>
              </div>
            </div>

            <p class="text-lg leading-relaxed opacity-90">
              Menjadi gerakan pendidikan sosial terdepan yang menciptakan dampak berkelanjutan dalam
              meningkatkan kualitas pendidikan dan literasi anak-anak di Indonesia, khususnya Jawa
              Timur, melalui inovasi pembelajaran kreatif dan pemberdayaan komunitas.
            </p>
          </div>

          <!-- Mission Card -->
          <div class="border-4 border-primary-orange p-12 lg:p-16 bg-primary-orange text-white">
            <div class="flex items-start gap-6 mb-8">
              <div class="w-16 h-16 bg-primary-navy flex items-center justify-center shrink-0">
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 class="font-serif text-3xl lg:text-4xl font-bold mb-2">Misi</h2>
                <div class="w-20 h-1 bg-primary-navy"></div>
              </div>
            </div>

            <ul class="space-y-4 text-lg leading-relaxed">
              <li class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-primary-navy shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span
                  >Menyelenggarakan program pembelajaran kreatif dan literasi yang menyenangkan
                  untuk anak-anak</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-primary-navy shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Memberdayakan mahasiswa sebagai agen perubahan pendidikan di masyarakat</span>
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-primary-navy shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Membangun kemitraan berkelanjutan dengan sekolah dan komunitas lokal</span>
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-primary-navy shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span
                  >Mengembangkan metode pembelajaran inovatif yang mudah diakses dan
                  diterapkan</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-24 lg:py-32 bg-gray-50">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Text Content -->
          <div class="order-2 lg:order-1">
            <div class="inline-block mb-6">
              <span
                class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-blue/10 text-primary-blue border-l-4 border-primary-blue"
              >
                Our Story
              </span>
            </div>

            <h2
              class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mb-6 leading-tight"
            >
              Berawal dari <span class="text-primary-orange">Kepedulian</span>
            </h2>

            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Polinema Mengajar dimulai pada tahun 2019 oleh sekelompok mahasiswa Politeknik
                Negeri Malang yang memiliki kepedulian tinggi terhadap kesenjangan pendidikan di
                Indonesia. Kami percaya bahwa setiap anak berhak mendapatkan akses pendidikan
                berkualitas, terlepas dari latar belakang ekonomi atau geografis mereka.
              </p>
              <p>
                Dari awal yang sederhana dengan 15 volunteer mengajar di satu sekolah, Polinema
                Mengajar kini telah berkembang menjadi gerakan mahasiswa yang melibatkan 300+
                volunteer aktif, melayani 20+ sekolah mitra, dan telah memberikan dampak positif
                kepada ribuan anak di seluruh Jawa Timur.
              </p>
              <p>
                Perjalanan kami didorong oleh keyakinan bahwa mahasiswa memiliki peran penting
                sebagai agen perubahan. Melalui dedikasi, kreativitas, dan kerja sama, kami terus
                berupaya menciptakan dampak berkelanjutan dalam dunia pendidikan Indonesia.
              </p>
            </div>
          </div>

          <!-- Image Grid -->
          <div class="order-1 lg:order-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="aspect-square overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"
                    alt="Teaching"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div class="aspect-3/4 overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600"
                    alt="Children"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div class="space-y-4 pt-12">
                <div class="aspect-3/4 overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
                    alt="Community"
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values Section -->
    <section class="py-24 lg:py-32 bg-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span
            class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-orange/10 text-primary-orange border-l-4 border-primary-orange"
          >
            Core Values
          </span>
          <h2
            class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mt-6 leading-tight"
          >
            Nilai-Nilai Kami
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Value 1 -->
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-orange mx-auto mb-6 flex items-center justify-center">
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <h3 class="font-serif text-xl font-bold text-primary-navy mb-3">Empati</h3>
            <p class="text-gray-600 text-sm">
              Memahami dan peduli terhadap kebutuhan anak-anak dan komunitas yang kami layani
            </p>
          </div>

          <!-- Value 2 -->
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-blue mx-auto mb-6 flex items-center justify-center">
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 class="font-serif text-xl font-bold text-primary-navy mb-3">Inovasi</h3>
            <p class="text-gray-600 text-sm">
              Mengembangkan metode pembelajaran kreatif dan solusi pendidikan yang inovatif
            </p>
          </div>

          <!-- Value 3 -->
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-orange mx-auto mb-6 flex items-center justify-center">
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 class="font-serif text-xl font-bold text-primary-navy mb-3">Kolaborasi</h3>
            <p class="text-gray-600 text-sm">
              Bekerja sama dengan berbagai pihak untuk menciptakan dampak yang lebih luas
            </p>
          </div>

          <!-- Value 4 -->
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-blue mx-auto mb-6 flex items-center justify-center">
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
            </div>
            <h3 class="font-serif text-xl font-bold text-primary-navy mb-3">Integritas</h3>
            <p class="text-gray-600 text-sm">
              Menjalankan semua program dengan transparansi, akuntabilitas, dan komitmen penuh
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Stats Section -->
    <section class="py-24 lg:py-32 bg-primary-navy text-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="font-serif text-4xl lg:text-5xl font-bold mb-4">Dampak Yang Kami Ciptakan</h2>
          <p class="text-xl text-white/80">
            Angka-angka yang menunjukkan dedikasi dan kontribusi kami dalam dunia pendidikan
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-5xl lg:text-6xl font-bold text-primary-orange mb-2">300+</div>
            <div class="text-lg font-medium">Volunteer Aktif</div>
          </div>
          <div class="text-center">
            <div class="text-5xl lg:text-6xl font-bold text-primary-orange mb-2">20+</div>
            <div class="text-lg font-medium">Sekolah Mitra</div>
          </div>
          <div class="text-center">
            <div class="text-5xl lg:text-6xl font-bold text-primary-orange mb-2">5000+</div>
            <div class="text-lg font-medium">Anak Terlayani</div>
          </div>
          <div class="text-center">
            <div class="text-5xl lg:text-6xl font-bold text-primary-orange mb-2">50+</div>
            <div class="text-lg font-medium">Program Terlaksana</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 lg:py-32 bg-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12 text-center">
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mb-6">
          Bergabunglah dengan Kami
        </h2>
        <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Menjadi bagian dari gerakan yang menciptakan perubahan nyata dalam pendidikan Indonesia
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/kontak" class="btn-primary"> Hubungi Kami </router-link>
          <router-link to="/organisasi" class="btn-outline"> Lihat Tim Kami </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'About Us - Polinema Mengajar'
})
</script>
