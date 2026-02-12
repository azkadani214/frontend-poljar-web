<template>
  <div>
    <!-- Breadcrumb -->
    <section class="pt-24 pb-8 bg-gray-50">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <nav class="flex items-center gap-2 text-sm text-gray-600">
          <router-link to="/" class="hover:text-primary-orange transition-colors">Home</router-link>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <router-link to="/berita" class="hover:text-primary-orange transition-colors"
            >Berita</router-link
          >
          <template v-if="news && news.categories?.length">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <router-link
              :to="`/berita?category=${news.categories[0].slug}`"
              class="hover:text-primary-orange transition-colors"
            >
              {{ news.categories[0].name }}
            </router-link>
          </template>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span class="text-primary-navy font-semibold">{{
            truncate(news?.title || 'Loading...', 50)
          }}</span>
        </nav>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 lg:py-16 bg-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <!-- Loading State -->
        <div v-if="loading" class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-96 bg-gray-200 rounded mb-8"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        <div v-else-if="news" class="grid lg:grid-cols-12 gap-12">
          <!-- Main Article - Left Side -->
          <div class="lg:col-span-8">
            <article class="bg-white">
              <!-- Article Header -->
              <header class="mb-8">
                <!-- Category Badge -->
                <div v-if="news.categories?.length" class="mb-4">
                  <router-link
                    :to="`/berita?category=${news.categories[0].slug}`"
                    class="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary-orange/10 text-primary-orange border-l-4 border-primary-orange hover:bg-primary-orange hover:text-white transition-all"
                  >
                    {{ news.categories[0].name }}
                  </router-link>
                </div>

                <!-- Title -->
                <h1
                  class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mb-4 leading-tight"
                >
                  {{ news.title }}
                </h1>

                <!-- Subtitle -->
                <p v-if="news.sub_title" class="text-xl text-gray-600 leading-relaxed mb-6">
                  {{ news.sub_title || news.excerpt }}
                </p>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center gap-6 py-4 border-y-2 border-gray-200">
                  <!-- Author -->
                  <div class="flex items-center gap-4 group">
                    <img
                      :src="getAvatarUrl(news.author)"
                      :alt="news.author?.name"
                      class="w-14 h-14 rounded-full object-cover border-2 border-gray-100 group-hover:border-primary-orange transition-colors"
                    />
                    <div>
                      <p class="text-sm font-bold text-primary-navy">
                        {{ news.author?.name || 'Redaksi Polinema Mengajar' }}
                      </p>
                      <div class="flex items-center gap-3 mt-1">
                        <span
                          class="text-[10px] font-bold text-primary-orange uppercase tracking-tighter"
                          >Penulis Berita</span
                        >
                        <div v-if="news.author?.social_links" class="flex items-center gap-2">
                          <a
                            v-if="news.author.social_links.instagram"
                            :href="`https://instagram.com/${news.author.social_links.instagram.replace('@', '')}`"
                            target="_blank"
                            class="text-gray-400 hover:text-primary-orange"
                          >
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                d="M12.315 2c2.43 0 2.784.01 3.71.054 1.14.053 2.127.285 3.003 1.159.877.873 1.111 1.863 1.166 3.001.042.94.054 1.291.054 3.731 0 2.441-.012 2.787-.054 3.717-.055 1.148-.289 2.133-1.166 3.007-.876.874-1.863 1.107-3.003 1.161-.931.045-1.285.054-3.71.054-2.43 0-2.784-.01-3.71-.054-1.139-.054-2.126-.287-3.002-1.161-.875-.874-1.11-1.86-1.166-3.007-.045-.92-.059-1.277-.059-3.717 0-2.44.014-2.79.059-3.731.056-1.138.29-2.128 1.166-3.001.876-.874 1.863-1.106 3.002-1.159.931-.044 1.285-.054 3.71-.054zM12 7.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM12 14.75a2.75 2.75 0 110-5.5 2.75 2.75 0 010 5.5zM18.25 6.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              />
                            </svg>
                          </a>
                          <a
                            v-if="news.author.social_links.linkedin"
                            :href="news.author.social_links.linkedin"
                            target="_blank"
                            class="text-gray-400 hover:text-primary-navy"
                          >
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path
                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Date -->
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg
                      class="w-5 h-5 text-primary-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span class="text-sm">{{ formatDate(news.published_at, 'DD MMMM YYYY') }}</span>
                  </div>

                  <!-- Reading Time -->
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg
                      class="w-5 h-5 text-primary-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span class="text-sm"
                      >{{ news.read_time || calculateReadingTime(news.body) }} menit baca</span
                    >
                  </div>

                  <!-- Views -->
                  <div class="flex items-center gap-2 text-gray-600">
                    <svg
                      class="w-5 h-5 text-primary-orange"
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
                    <span class="text-sm">{{ formatNumber(news.views || 0) }} views</span>
                  </div>
                </div>
              </header>

              <!-- Featured Image -->
              <div
                class="mb-8 border-4 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center min-h-[400px]"
              >
                <img
                  v-if="news.cover_photo_path"
                  :src="getStorageUrl(news.cover_photo_path)"
                  :alt="news.title"
                  class="w-full h-auto object-cover"
                />
                <div v-else class="flex flex-col items-center justify-center text-gray-200">
                  <ImageIcon class="w-20 h-20 mb-4" />
                  <span class="text-xs font-black tracking-widest uppercase"
                    >No Photo Available</span
                  >
                </div>
              </div>

              <!-- Article Content -->
              <div class="prose prose-lg max-w-none mb-12">
                <div v-html="news.body" class="text-gray-700 leading-relaxed"></div>
              </div>

              <!-- Author Bio Block -->
              <div
                class="bg-gray-50 p-8 border-2 border-gray-100 mb-12 flex flex-col md:flex-row items-center gap-8"
              >
                <div class="flex-shrink-0">
                  <img
                    :src="getAvatarUrl(news.author)"
                    :alt="news.author?.name"
                    class="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
                <div class="text-center md:text-left">
                  <h4 class="font-serif text-xl font-bold text-primary-navy mb-2">
                    {{ news.author?.name || 'Redaksi Polinema Mengajar' }}
                  </h4>
                  <p class="text-gray-500 text-sm italic leading-relaxed mb-4">
                    "{{
                      news.author?.quotes || 'Pendidikan adalah harapan bagi masa depan bangsa.'
                    }}"
                  </p>
                  <div class="flex items-center justify-center md:justify-start gap-4">
                    <a
                      v-if="news.author?.social_links?.instagram"
                      :href="`https://instagram.com/${news.author.social_links.instagram.replace('@', '')}`"
                      target="_blank"
                      class="text-gray-400 hover:text-primary-orange transition-colors"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        />
                      </svg>
                    </a>
                    <a
                      v-if="news.author?.social_links?.linkedin"
                      :href="news.author.social_links.linkedin"
                      target="_blank"
                      class="text-gray-400 hover:text-primary-navy transition-colors"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div v-if="news.tags && news.tags.length > 0" class="mb-8">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Tags:
                </h3>
                <div class="flex flex-wrap gap-2">
                  <router-link
                    v-for="tag in news.tags"
                    :key="tag.id"
                    :to="`/berita?tag=${tag.slug}`"
                    class="px-4 py-2 border-2 border-gray-300 text-gray-700 text-sm hover:border-primary-orange hover:text-primary-orange transition-all"
                  >
                    #{{ tag.name }}
                  </router-link>
                </div>
              </div>

              <!-- Share Buttons -->
              <div class="py-6 border-y-2 border-gray-200 mb-12">
                <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Bagikan:
                </h3>
                <div class="flex gap-3">
                  <button
                    @click="shareToFacebook"
                    class="w-10 h-10 bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="shareToTwitter"
                    class="w-10 h-10 bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="shareToWhatsApp"
                    class="w-10 h-10 bg-[#25D366] text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="copyLink"
                    class="w-10 h-10 bg-gray-700 text-white flex items-center justify-center hover:opacity-80 transition-opacity"
                    title="Copy link"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Related News -->
              <div v-if="relatedNews.length > 0" class="mb-12">
                <h3 class="font-serif text-2xl font-bold text-primary-navy mb-6">Berita Terkait</h3>
                <div class="grid md:grid-cols-2 gap-6">
                  <article
                    v-for="item in relatedNews"
                    :key="item.id"
                    class="bg-white border-2 border-gray-200 overflow-hidden hover:border-primary-orange transition-all group"
                  >
                    <div
                      class="aspect-16/10 overflow-hidden bg-gray-50 flex items-center justify-center"
                    >
                      <img
                        v-if="item.cover_photo_url"
                        :src="item.cover_photo_url"
                        :alt="item.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <ImageIcon v-else class="w-8 h-8 text-gray-200" />
                    </div>
                    <div class="p-4">
                      <h4
                        class="font-bold text-primary-navy mb-2 leading-tight group-hover:text-primary-orange transition-colors"
                      >
                        {{ item.title }}
                      </h4>
                      <router-link
                        :to="`/berita/${item.slug}`"
                        class="inline-flex items-center text-primary-orange text-sm font-semibold group-hover:gap-2 transition-all"
                      >
                        Baca
                        <svg
                          class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                  </article>
                </div>
              </div>

              <!-- Comments Section -->
              <NewsComments v-if="news" :postId="news.id" />
            </article>
          </div>

          <!-- Sidebar - Right Side -->
          <div class="lg:col-span-4">
            <div class="space-y-8 lg:sticky lg:top-24">
              <!-- Recent News -->
              <div class="bg-white border-2 border-primary-navy p-6">
                <h3 class="font-serif text-xl font-bold text-primary-navy mb-6">Berita Terbaru</h3>
                <ul class="space-y-4">
                  <li
                    v-for="item in recentNews"
                    :key="item.id"
                    class="pb-4 border-b border-gray-200 last:border-0"
                  >
                    <router-link :to="`/berita/${item.slug}`" class="group">
                      <h4
                        class="font-bold text-sm text-primary-navy mb-2 leading-tight group-hover:text-primary-orange transition-colors"
                      >
                        {{ truncate(item.title, 60) }}
                      </h4>
                      <p class="text-xs text-gray-500">{{ formatDate(item.published_at) }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>

              <!-- Newsletter -->
              <div class="bg-primary-orange text-white p-6">
                <div class="text-center">
                  <svg
                    class="w-12 h-12 text-white mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <h3 class="font-serif text-xl font-bold mb-2">Newsletter</h3>
                  <p class="text-sm text-white/90 mb-4">Dapatkan update berita terbaru</p>
                  <form @submit.prevent="handleNewsletterSubmit" class="space-y-3">
                    <input
                      v-model="newsletterEmail"
                      type="email"
                      placeholder="Email Anda"
                      required
                      class="w-full px-4 py-2.5 text-primary-navy focus:outline-none"
                    />
                    <button
                      type="submit"
                      class="w-full px-4 py-2.5 bg-primary-navy text-white font-semibold hover:bg-primary-navy/90 transition-colors"
                      :disabled="newsletterLoading"
                    >
                      {{ newsletterLoading ? 'Subscribing...' : 'Subscribe' }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center py-16">
          <svg
            class="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <h3 class="text-xl font-bold text-gray-600 mb-2">Berita Tidak Ditemukan</h3>
          <p class="text-gray-500 mb-4">Maaf, berita yang Anda cari tidak ditemukan</p>
          <router-link to="/berita" class="btn-primary"> Kembali ke Berita </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useNewsStore } from '@/stores/news'
import newsService from '@/services/news.service'
import newsletterService from '@/services/newsletter.service'
import { Image as ImageIcon } from 'lucide-vue-next'
import NewsComments from '@/components/public/news/NewsComments.vue'
import {
  getStorageUrl,
  getAvatarUrl,
  formatDate,
  truncate,
  formatNumber,
  calculateReadingTime,
  copyToClipboard,
} from '@/utils/helpers'

const route = useRoute()
const toast = useToast()
const newsStore = useNewsStore()

const news = ref(null)
const relatedNews = ref([])
const recentNews = ref([])
const loading = ref(true)
const newsletterEmail = ref('')
const newsletterLoading = ref(false)

const fetchNews = async () => {
  try {
    loading.value = true
    const slug = route.params.slug
    await newsStore.fetchNewsBySlug(slug)
    news.value = newsStore.current
  } catch (error) {
    console.error('Failed to fetch news:', error)
  } finally {
    loading.value = false
  }
}

const fetchRelatedNews = async () => {
  try {
    if (news.value) {
      // Use news.value.id or news.value.slug
      const response = await newsService.getRelated(news.value.id, 2)
      relatedNews.value = response.data || []
    }
  } catch (error) {
    console.error('Failed to fetch related news:', error)
  }
}

const fetchRecentNews = async () => {
  try {
    const response = await newsService.getAll({ per_page: 5 })
    recentNews.value = response.data || []
  } catch (error) {
    console.error('Failed to fetch recent news:', error)
  }
}

const getImageUrl = (path) => {
  return getStorageUrl(path)
}

const shareToFacebook = () => {
  const url = window.location.href
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

const shareToTwitter = () => {
  const url = window.location.href
  const text = news.value?.title || ''
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    '_blank',
  )
}

const shareToWhatsApp = () => {
  const url = window.location.href
  const text = news.value?.title || ''
  window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
}

const copyLink = async () => {
  const url = window.location.href
  const success = await copyToClipboard(url)
  if (success) {
    toast.success('Link copied to clipboard!')
  } else {
    toast.error('Failed to copy link')
  }
}

const handleNewsletterSubmit = async () => {
  try {
    newsletterLoading.value = true
    await newsletterService.subscribe(newsletterEmail.value)
    toast.success('Successfully subscribed to newsletter!')
    newsletterEmail.value = ''
  } catch (error) {
    toast.error('Failed to subscribe. Please try again.')
  } finally {
    newsletterLoading.value = false
  }
}

onMounted(async () => {
  await fetchNews()
  if (news.value) {
    fetchRelatedNews()
  }
  fetchRecentNews()
})
</script>

<style scoped>
.prose {
  @apply text-gray-700;
}

.prose :deep(h2) {
  @apply text-2xl font-bold text-primary-navy mt-8 mb-4;
}

.prose :deep(h3) {
  @apply text-xl font-bold text-primary-navy mt-6 mb-3;
}

.prose :deep(p) {
  @apply mb-4 leading-relaxed;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply mb-4 ml-6;
}

.prose :deep(li) {
  @apply mb-2;
}

.prose :deep(a) {
  @apply text-primary-orange hover:underline;
}

.prose :deep(img) {
  @apply my-6 rounded;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-primary-orange pl-4 italic my-6;
}
</style>
