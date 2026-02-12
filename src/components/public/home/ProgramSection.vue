<template>
  <section id="programs" class="py-24 lg:py-32 bg-gray-50">
    <div class="max-w-350px mx-auto px-6 lg:px-12">
      <!-- Section Header -->
      <div class="max-w-3xl mb-16">
        <span
          class="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-orange/10 text-primary-orange border-l-4 border-primary-orange"
        >
          Our Programs
        </span>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mt-6 leading-tight">
          Apa Yang Kami Lakukan
        </h2>
        <p class="text-lg text-gray-600 mt-4 leading-relaxed">
          Beragam program pendidikan yang kami rancang untuk membuka potensi anak-anak, membantu
          sekolah, dan membangun komunitas yang lebih kuat di Jawa Timur.
        </p>
      </div>

      <!-- Programs Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Program Card 1 -->
        <div
          class="group bg-white border-2 border-gray-200 overflow-hidden hover:border-primary-orange transition-all duration-300"
        >
          <div class="aspect-16/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
              alt="Learning Support Classes"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-8">
            <div class="flex items-start justify-between mb-4">
              <h3 class="font-serif text-2xl font-bold text-primary-navy">
                Kelas Pendampingan Belajar
              </h3>
              <div
                class="w-10 h-10 bg-primary-orange/10 flex items-center justify-center shrink-0 ml-4"
              >
                <span class="text-primary-orange font-bold">01</span>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed mb-6">
              Sesi bimbingan belajar rutin yang membantu anak-anak meningkatkan prestasi akademik
              sekaligus membangun kepercayaan diri dalam belajar. Relawan kami memberikan
              pendampingan personal dan menciptakan lingkungan belajar yang aman serta suportif.
            </p>
            <router-link
              to="/program/kelas-pendampingan"
              class="inline-flex items-center text-primary-orange font-semibold group-hover:gap-2 transition-all"
            >
              Pelajari Lebih Lanjut
              <svg
                class="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
            </router-link>
          </div>
        </div>

        <!-- Program Card 2 -->
        <div
          class="group bg-white border-2 border-gray-200 overflow-hidden hover:border-primary-orange transition-all duration-300"
        >
          <div class="aspect-16/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
              alt="Creative Workshops"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-8">
            <div class="flex items-start justify-between mb-4">
              <h3 class="font-serif text-2xl font-bold text-primary-navy">
                Lokakarya Kreatif & Literasi
              </h3>
              <div
                class="w-10 h-10 bg-primary-orange/10 flex items-center justify-center shrink-0 ml-4"
              >
                <span class="text-primary-orange font-bold">02</span>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed mb-6">
              Kegiatan interaktif yang menggabungkan seni, bercerita, dan membaca untuk menjadikan
              belajar lebih menyenangkan. Kami menumbuhkan kreativitas sekaligus memperkuat
              kemampuan literasi melalui aktivitas langsung.
            </p>
            <router-link
              to="/program/lokakarya-kreatif"
              class="inline-flex items-center text-primary-orange font-semibold group-hover:gap-2 transition-all"
            >
              Pelajari Lebih Lanjut
              <svg
                class="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
            </router-link>
          </div>
        </div>

        <!-- Program Card 3 -->
        <div
          class="group bg-white border-2 border-gray-200 overflow-hidden hover:border-primary-orange transition-all duration-300"
        >
          <div class="aspect-16/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800"
              alt="Community Empowerment"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-8">
            <div class="flex items-start justify-between mb-4">
              <h3 class="font-serif text-2xl font-bold text-primary-navy">
                Pemberdayaan Komunitas
              </h3>
              <div
                class="w-10 h-10 bg-primary-orange/10 flex items-center justify-center shrink-0 ml-4"
              >
                <span class="text-primary-orange font-bold">03</span>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed mb-6">
              Program yang melibatkan orang tua dan masyarakat dalam mendukung pendidikan anak. Kami
              membangun kemitraan berkelanjutan untuk menciptakan perubahan positif yang nyata di
              tingkat komunitas.
            </p>
            <router-link
              to="/program/pemberdayaan-komunitas"
              class="inline-flex items-center text-primary-orange font-semibold group-hover:gap-2 transition-all"
            >
              Pelajari Lebih Lanjut
              <svg
                class="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
            </router-link>
          </div>
        </div>

        <!-- Program Card 4 -->
        <div
          class="group bg-white border-2 border-gray-200 overflow-hidden hover:border-primary-orange transition-all duration-300"
        >
          <div class="aspect-16/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800"
              alt="Character Development"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-8">
            <div class="flex items-start justify-between mb-4">
              <h3 class="font-serif text-2xl font-bold text-primary-navy">
                Pengembangan Karakter & Kepemimpinan
              </h3>
              <div
                class="w-10 h-10 bg-primary-orange/10 flex items-center justify-center shrink-0 ml-4"
              >
                <span class="text-primary-orange font-bold">04</span>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed mb-6">
              Kegiatan yang menanamkan nilai disiplin, empati, tanggung jawab, dan kepemimpinan
              sejak dini. Anak-anak belajar bekerja sama, mengambil peran, dan berani menyampaikan
              pendapat melalui aktivitas kelompok yang terarah.
            </p>
            <router-link
              to="/program/pengembangan-karakter"
              class="inline-flex items-center text-primary-orange font-semibold group-hover:gap-2 transition-all"
            >
              Pelajari Lebih Lanjut
              <svg
                class="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
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
            </router-link>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center mt-12">
        <router-link
          to="/program"
          class="inline-flex items-center px-8 py-4 bg-primary-navy text-white font-semibold hover:bg-[#152A45] transition-colors"
        >
          Lihat Semua Program
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// No additional logic needed
</script>
