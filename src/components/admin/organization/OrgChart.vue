<template>
  <div
    class="h-[650px] w-full bg-gray-50 rounded-xl overflow-hidden border relative group shadow-inner"
  >
    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      <Loader2Icon class="w-10 h-10 animate-spin text-primary-navy mb-4 font-bold" />
      <p class="text-sm font-bold text-primary-navy uppercase tracking-widest animate-pulse">
        Memuat Struktur Organisasi...
      </p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="elements.length === 0"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center text-gray-400 p-12 text-center"
    >
      <NetworkIcon class="w-20 h-20 opacity-10 mb-6" />
      <h3 class="text-lg font-bold text-gray-900">Data Struktur Belum Tersedia</h3>
      <p class="max-w-md text-sm mt-2 leading-relaxed">
        Segera tambahkan divisi dan anggota untuk melihat visualisasi hierarki organisasi yang
        interaktif.
      </p>
      <Button @click="fetchChartData" variant="outline" class="mt-6">
        <RefreshCcwIcon class="w-4 h-4 mr-2" /> Coba Lagi
      </Button>
    </div>

    <VueFlow
      v-model="elements"
      :fit-view-on-init="true"
      :default-viewport="{ zoom: 0.6 }"
      :min-zoom="0.1"
      :max-zoom="2"
      class="org-chart-flow"
      :nodes-draggable="true"
      :nodes-connectable="false"
      @init="onInit"
    >
      <Background pattern-color="#cbd5e1" :gap="20" />
      <Controls position="bottom-right" />
      <MiniMap />

      <!-- Custom Nodes -->
      <template #node-org="{ data }">
        <div
          class="px-8 py-5 shadow-[0_10px_40px_-15px_rgba(30,58,95,0.4)] rounded-2xl bg-primary-navy text-white border-4 border-white min-w-[240px] text-center relative overflow-hidden group/node"
        >
          <div
            class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 transition-transform group-hover/node:scale-150 duration-700"
          ></div>
          <Building2Icon class="w-8 h-8 mx-auto mb-3 text-primary-orange relative z-10" />
          <div class="font-black text-xl relative z-10 uppercase tracking-tight">
            {{ data.label }}
          </div>
          <div
            class="text-[10px] opacity-70 font-bold uppercase tracking-[0.2em] mt-2 relative z-10"
          >
            Pusat Organisasi
          </div>
        </div>
      </template>

      <template #node-division="{ data }">
        <div
          class="px-5 py-4 shadow-xl rounded-2xl bg-white border-2 border-primary-navy/10 min-w-[200px] group/node hover:border-primary-navy hover:shadow-primary-navy/5 transition-all duration-300"
        >
          <div class="flex items-center space-x-3">
            <div
              class="p-2 bg-primary-navy/5 rounded-xl group-hover/node:bg-primary-navy group-hover/node:text-white transition-colors duration-300"
            >
              <LayersIcon class="w-5 h-5" />
            </div>
            <div class="font-black text-sm text-gray-900 leading-tight">{{ data.label }}</div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span class="text-[10px] text-gray-400 font-black uppercase tracking-widest"
              >Divisi</span
            >
            <Badge
              variant="secondary"
              class="text-[10px] font-bold px-2 py-0.5 bg-primary-navy/5 text-primary-navy"
            >
              {{ data.count || 0 }} Posisi
            </Badge>
          </div>
          <Handle
            type="target"
            :position="Position.Top"
            class="!bg-primary-navy !w-3 !h-3 !border-2 !border-white"
          />
          <Handle
            type="source"
            :position="Position.Bottom"
            class="!bg-primary-navy !w-3 !h-3 !border-2 !border-white"
          />
        </div>
      </template>

      <template #node-position="{ data }">
        <div
          class="px-4 py-3 shadow-md rounded-xl bg-gray-50 border border-gray-200 min-w-[180px] hover:bg-white hover:border-primary-navy/40 transition-all cursor-grab active:cursor-grabbing"
        >
          <div class="font-bold text-xs text-gray-800 leading-snug">{{ data.label }}</div>
          <div class="flex items-center mt-2.5">
            <div class="w-1.5 h-1.5 rounded-full bg-primary-orange mr-2"></div>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter"
              >Level {{ data.level }}</span
            >
          </div>
          <Handle type="target" :position="Position.Top" class="!bg-gray-400 !w-2 !h-2" />
          <Handle type="source" :position="Position.Bottom" class="!bg-gray-400 !w-2 !h-2" />
        </div>
      </template>

      <template #node-member="{ data }">
        <div
          class="px-4 py-2.5 shadow-sm rounded-full bg-white border border-primary-orange/20 flex items-center space-x-3 min-w-[170px] hover:ring-2 hover:ring-primary-orange/20 transition-all cursor-pointer"
        >
          <div class="relative">
            <Avatar class="w-8 h-8 border-2 border-white shadow-sm ring-1 ring-gray-100">
              <AvatarImage :src="data.avatar" />
              <AvatarFallback class="text-[10px] bg-primary-orange text-white font-black">{{
                data.label.charAt(0)
              }}</AvatarFallback>
            </Avatar>
            <div
              class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
            ></div>
          </div>
          <div class="flex-1 overflow-hidden">
            <div class="font-bold text-xs text-gray-900 truncate">{{ data.label }}</div>
            <div class="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">
              Anggota Aktif
            </div>
          </div>
          <Handle
            type="target"
            :position="Position.Top"
            class="!bg-primary-orange !w-2.5 !h-2.5 !border-2 !border-white"
          />
        </div>
      </template>
    </VueFlow>

    <!-- Toolbar -->
    <div class="absolute top-6 left-6 flex flex-col gap-3 z-20">
      <div
        class="bg-white/90 backdrop-blur-xl p-3 rounded-2xl border shadow-2xl flex flex-col gap-3 min-w-[140px]"
      >
        <div>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-2 px-1">
            Tampilan
          </p>
          <div class="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="icon"
              class="h-9 w-9 rounded-lg"
              :class="
                direction === 'TB'
                  ? 'bg-primary-navy text-white hover:bg-primary-navy'
                  : 'bg-gray-100'
              "
              @click="updateLayout('TB')"
              title="Vertical"
            >
              <ArrowDownIcon class="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              class="h-9 w-9 rounded-lg"
              :class="
                direction === 'LR'
                  ? 'bg-primary-navy text-white hover:bg-primary-navy'
                  : 'bg-gray-100'
              "
              @click="updateLayout('LR')"
              title="Horizontal"
            >
              <ArrowRightIcon class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div class="pt-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="xs"
            class="w-full text-[10px] font-bold h-8 hover:bg-primary-navy/5 text-primary-navy"
            @click="fetchChartData"
          >
            <RefreshCcwIcon class="w-3 h-3 mr-2" :class="{ 'animate-spin': isLoading }" /> REFRESH
            DATA
          </Button>
        </div>
      </div>

      <!-- Stats Tooltip -->
      <div class="bg-primary-navy p-3 rounded-2xl shadow-xl text-white">
        <div class="flex items-center gap-2 mb-1">
          <UsersIcon class="w-3 h-3 text-primary-orange" />
          <span class="text-[10px] font-black uppercase tracking-widest text-white/60"
            >Total Nodes</span
          >
        </div>
        <div class="text-xl font-black">{{ nodeCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueFlow, useVueFlow, Handle, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import {
  Building2Icon,
  LayersIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  Loader2Icon,
  RefreshCcwIcon,
  NetworkIcon,
  UsersIcon,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import organizationService from '@/services/organization.service'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'

const { fitView } = useVueFlow()
const elements = ref([])
const isLoading = ref(false)
const direction = ref('TB')

const nodeCount = computed(() => elements.value.filter((el) => !el.source).length)

async function fetchChartData() {
  isLoading.value = true
  try {
    const res = await organizationService.getChartData()
    // Assume res.data is already formatted as { nodes: [], edges: [] }
    // but if it's just a raw tree from backend, we might need a mapper.
    // The user said: "Data dikemas dalam format tree yang kompatibel dengan komponen Vue Flow"
    // Usually this means it's an array of nodes and edges.

    if (res.data) {
      // If the backend returns nodes and edges separately
      if (res.data.nodes && res.data.edges) {
        elements.value = [...res.data.nodes, ...res.data.edges]
      } else {
        // If it's just an array of elements
        elements.value = res.data
      }
    }

    setTimeout(() => {
      fitView()
    }, 200)
  } catch (err) {
    console.error('Failed to fetch chart data:', err)
  } finally {
    isLoading.value = false
  }
}

function updateLayout(dir) {
  direction.value = dir
  fetchChartData() // In a real scenario, we might use dagre or similar to re-layout client-side
}

function onInit() {
  fitView()
}

onMounted(() => {
  fetchChartData()
})
</script>

<style>
.org-chart-flow .vue-flow__node {
  border-radius: 12px;
}
.org-chart-flow .vue-flow__edge-path {
  stroke-width: 2.5;
  stroke: #cbd5e1;
}
.org-chart-flow .vue-flow__edge.animated .vue-flow__edge-path {
  stroke: #1e3a5f;
  stroke-dasharray: 5;
  animation: vue-flow__edge-dash 1s linear infinite;
}
.org-chart-flow .vue-flow__controls {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  border: none;
  background: white;
  padding: 4px;
  border-radius: 12px;
}
.org-chart-flow .vue-flow__minimap {
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  background: white;
}

@keyframes vue-flow__edge-dash {
  from {
    stroke-dashoffset: 10;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
