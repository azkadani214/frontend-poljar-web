<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <!-- Decoration -->
      <div
        class="absolute top-0 right-0 w-1/3 h-full bg-primary-orange/5 -skew-x-12 transform translate-x-1/2"
      ></div>

      <div class="max-w-350px mx-auto px-6 lg:px-12 py-24 lg:py-32 relative z-10">
        <div class="max-w-4xl">
          <span
            class="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary-orange text-white"
          >
            STRUKTUR ORGANISASI
          </span>
          <h1
            class="font-serif text-5xl lg:text-7xl font-bold text-primary-navy mt-8 mb-8 leading-tight"
          >
            Bergerak Bersama, <br />
            <span class="text-primary-orange">Menginspirasi</span> Sesama
          </h1>
          <p
            class="text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-2xl border-l-4 border-gray-200 pl-8"
          >
            Tim Polinema Mengajar terdiri dari mahasiswa yang memiliki visi yang sama untuk
            pemerataan kualitas pendidikan di Indonesia.
          </p>
        </div>
      </div>
    </section>

    <!-- Core Leaders Section -->
    <section class="py-24 lg:py-32 bg-white">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div class="max-w-2xl">
            <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mb-6">
              Badan Pengurus Inti
            </h2>
            <p class="text-lg text-gray-600">
              Nakhoda yang membawa kapal Polinema Mengajar menuju pulau harapan di setiap
              periodenya.
            </p>
          </div>
          <div class="h-1 w-24 bg-primary-orange hidden md:block"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-12">
          <TeamCard v-for="member in coreTeam" :key="member.id" :member="member" />
        </div>
      </div>
    </section>

    <!-- Division Filter Section -->
    <section class="py-24 lg:py-32 bg-gray-50">
      <div class="max-w-350px mx-auto px-6 lg:px-12">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-primary-navy mb-8">
            Divisi & Departemen
          </h2>
          <div class="flex flex-wrap justify-center gap-4">
            <button
              v-for="div in divisionFilters"
              :key="div.id"
              @click="activeDivision = div.id"
              :class="[
                'px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 border-2',
                activeDivision === div.id
                  ? 'bg-primary-navy border-primary-navy text-white shadow-xl'
                  : 'bg-white border-gray-100 text-gray-400 hover:border-primary-orange hover:text-primary-orange',
              ]"
            >
              {{ div.name }}
            </button>
          </div>
        </div>

        <!-- Dynamic Team Grid -->
        <div v-if="filteredMembers.length" class="animate-fade-in">
          <TeamGrid :members="filteredMembers" />
        </div>
        <div v-else class="text-center py-20 bg-white border-2 border-dashed border-gray-200">
          <p class="text-gray-400 font-medium italic">
            Data anggota sedang dalam proses pembaruan...
          </p>
        </div>
      </div>
    </section>

    <!-- Join CTA -->
    <section class="py-24 lg:py-32 bg-primary-navy text-white text-center">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="font-serif text-4xl lg:text-6xl font-bold mb-8 italic">
          "Be the change you wish to see in the world."
        </h2>
        <p class="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Kamu memiliki semangat yang sama? Mari bergabung dan berkontribusi nyata untuk pendidikan
          Indonesia.
        </p>
        <router-link
          to="/kontak"
          class="inline-flex items-center justify-center px-10 py-4 bg-primary-orange text-white font-bold hover:bg-white hover:text-primary-navy transition-all duration-300 group"
        >
          BERGABUNG BERSAMA KAMI
          <svg
            class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TeamCard from '@/components/public/organization/TeamCard.vue'
import TeamGrid from '@/components/public/organization/TeamGrid.vue'
import organizationService from '@/services/organization.service'

const activeDivision = ref('all')
const isLoading = ref(true)

const coreTeam = ref([])
const members = ref([])
const divisions = ref([])

const divisionFilters = computed(() => {
  const base = [{ id: 'all', name: 'Semua Anggota' }]
  return [...base, ...divisions.value]
})

const filteredMembers = computed(() => {
  if (activeDivision.value === 'all') return members.value
  return members.value.filter((m) => m.division?.id === activeDivision.value)
})

async function fetchData() {
  isLoading.value = true
  try {
    const [coreRes, staffRes, divRes] = await Promise.all([
      organizationService.getCoreTeam(),
      organizationService.getStaff(),
      organizationService.getPublicDivisions(),
    ])

    // Format Core Team
    coreTeam.value = (coreRes.data || []).map((m) => ({
      id: m.id,
      name: m.user?.name,
      position: m.position?.title,
      avatar_url: m.user?.avatar_url || m.user?.photo_url,
      instagram: m.user?.instagram,
      linkedin: m.user?.linkedin,
    }))

    // Format Staff Members
    members.value = (staffRes.data || []).map((m) => ({
      id: m.id,
      name: m.user?.name,
      position: m.position?.title,
      division: m.division,
      avatar_url: m.user?.avatar_url || m.user?.photo_url,
      instagram: m.user?.instagram,
    }))

    divisions.value = divRes.data || []
  } catch (error) {
    console.error('Failed to fetch organization data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  document.title = 'Struktur Organisasi - Polinema Mengajar'
  fetchData()
})
</script>
