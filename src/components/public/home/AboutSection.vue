<template>
  <section id="about" class="py-24 lg:py-32 bg-white">
    <div class="max-w-350px mx-auto px-6 lg:px-12">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <!-- Left: Text Content -->
        <div class="lg:col-span-5 space-y-6">
          <div>
            <span
              class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-blue/10 text-primary-blue border-l-4 border-primary-blue"
            >
              Who We Are
            </span>
          </div>

          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy leading-tight">
            Membangun Masa Depan yang Lebih Cerah Bersama
          </h2>

          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Polinema Mengajar adalah gerakan sosial berbasis mahasiswa dari Politeknik Negeri
              Malang yang berfokus pada pemberdayaan anak-anak dan komunitas melalui program
              pendidikan yang inovatif.
            </p>
            <p>
              Kami percaya bahwa pendidikan berkualitas adalah hak dasar setiap anak. Setiap anak
              berhak mendapatkan pengalaman belajar yang kreatif, menarik, dan bermakna. Para
              relawan kami hadir membawa semangat, energi, serta perspektif baru ke ruang kelas dan
              komunitas di seluruh Jawa Timur.
            </p>
            <p>
              Melalui kolaborasi dengan sekolah, komunitas lokal, dan mitra pendidikan, kami
              berupaya menciptakan dampak berkelanjutan yang mampu mengubah kehidupan dan memperkuat
              komunitas.
            </p>
          </div>

          <a
            href="#programs"
            class="inline-flex items-center text-primary-orange font-semibold group mt-4"
          >
            Pelajari Lebih Lanjut Tentang Misi Kami
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
        </div>

        <!-- Right: Icon Cards Grid -->
        <div class="lg:col-span-7">
          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Card 1 -->
            <div
              class="border-2 border-primary-navy p-8 hover:bg-primary-navy hover:text-white transition-all duration-300 group"
            >
              <div class="w-14 h-14 bg-primary-orange flex items-center justify-center mb-6">
                <svg
                  class="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <h3 class="font-serif text-xl font-bold mb-3">Gerakan Pendidikan Sosial</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Inisiatif akar rumput yang digerakkan oleh mahasiswa dengan kepedulian tinggi
                terhadap pemerataan pendidikan dan pengembangan masyarakat.
              </p>
            </div>

            <!-- Card 2 -->
            <div
              class="border-2 border-primary-navy p-8 hover:bg-primary-navy hover:text-white transition-all duration-300 group"
            >
              <div class="w-14 h-14 bg-primary-orange flex items-center justify-center mb-6">
                <svg
                  class="w-7 h-7 text-white"
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
              <h3 class="font-serif text-xl font-bold mb-3">Relawan Mahasiswa</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Mahasiswa Politeknik Negeri Malang yang terlatih dan berdedikasi memberikan
                pengalaman pembelajaran berkualitas bagi anak-anak di seluruh wilayah.
              </p>
            </div>

            <!-- Card 3 -->
            <div
              class="border-2 border-primary-navy p-8 hover:bg-primary-navy hover:text-white transition-all duration-300 group"
            >
              <div class="w-14 h-14 bg-primary-orange flex items-center justify-center mb-6">
                <svg
                  class="w-7 h-7 text-white"
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
              <h3 class="font-serif text-xl font-bold mb-3">Metode Inovatif</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Menggunakan pendekatan pembelajaran yang kreatif, interaktif, dan menyenangkan untuk
                menginspirasi rasa ingin tahu dan cinta belajar.
              </p>
            </div>

            <!-- Card 4 -->
            <div
              class="border-2 border-primary-navy p-8 hover:bg-primary-navy hover:text-white transition-all duration-300 group"
            >
              <div class="w-14 h-14 bg-primary-orange flex items-center justify-center mb-6">
                <svg
                  class="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 class="font-serif text-xl font-bold mb-3">Dampak Berkelanjutan</h3>
              <p class="text-sm opacity-80 leading-relaxed">
                Berfokus pada transformasi jangka panjang dengan membangun kapasitas komunitas,
                kemitraan lokal, dan menciptakan perubahan yang bertahan lama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed
</script>
