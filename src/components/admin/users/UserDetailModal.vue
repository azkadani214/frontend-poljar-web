<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Detail Pengguna</DialogTitle>
        <DialogDescription>
          Informasi lengkap dan riwayat keanggotaan {{ user?.name }}.
        </DialogDescription>
      </DialogHeader>

      <div v-if="loading" class="py-12 flex justify-center">
        <Loader2Icon class="w-8 h-8 animate-spin text-primary-navy" />
      </div>

      <div v-else-if="user" class="space-y-6">
        <!-- Header Info -->
        <div class="flex items-start space-x-6 pb-6 border-b border-gray-100">
          <Avatar class="w-24 h-24 border-4 border-gray-50">
            <AvatarImage :src="user.photo_url" />
            <AvatarFallback class="text-2xl bg-primary-navy text-white">
              {{ user.name.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <div class="flex-1 space-y-1">
            <h3 class="text-2xl font-bold text-gray-900">{{ user.name }}</h3>
            <p class="text-gray-500 font-medium">{{ user.email }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <Badge
                :class="
                  user.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                "
              >
                {{ user.status === 'active' ? 'Aktif' : 'Nonaktif' }}
              </Badge>
              <Badge variant="outline" class="font-normal text-xs text-gray-400">
                Dibuat: {{ formatDate(user.created_at) }}
              </Badge>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              Total Keanggotaan
            </p>
            <p class="text-xl font-bold text-gray-900">
              {{ user.statistics?.total_memberships || 0 }}
            </p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Aktif</p>
            <p class="text-xl font-bold text-green-600">
              {{ user.statistics?.active_memberships || 0 }}
            </p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p class="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Divisi</p>
            <p class="text-xl font-bold text-gray-900">
              {{ user.statistics?.total_divisions || 0 }}
            </p>
          </div>
        </div>

        <!-- Tabs for Details -->
        <Tabs defaultValue="biodata" class="w-full">
          <TabsList class="grid w-full grid-cols-4">
            <TabsTrigger value="biodata">Biodata</TabsTrigger>
            <TabsTrigger value="memberships">Keanggotaan</TabsTrigger>
            <TabsTrigger value="roles">Hak Akses</TabsTrigger>
            <TabsTrigger value="activity">Aktivitas</TabsTrigger>
          </TabsList>

          <TabsContent value="biodata" class="mt-4 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <p class="text-[10px] uppercase font-bold text-gray-400">Nomor Telepon</p>
                <p class="text-sm font-medium">{{ user.phone || '-' }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-[10px] uppercase font-bold text-gray-400">Jenis Kelamin</p>
                <p class="text-sm font-medium capitalize">
                  {{
                    user.gender === 'male'
                      ? 'Laki-laki'
                      : user.gender === 'female'
                        ? 'Perempuan'
                        : '-'
                  }}
                </p>
              </div>
              <div class="space-y-1">
                <p class="text-[10px] uppercase font-bold text-gray-400">Tanggal Lahir</p>
                <p class="text-sm font-medium">
                  {{ user.birth_date ? formatDate(user.birth_date) : '-' }}
                </p>
              </div>
              <div class="space-y-1">
                <p class="text-[10px] uppercase font-bold text-gray-400">Website</p>
                <a
                  v-if="user.website"
                  :href="user.website"
                  target="_blank"
                  class="text-sm font-medium text-primary-blue hover:underline"
                  >{{ user.website }}</a
                >
                <p v-else class="text-sm font-medium">-</p>
              </div>
            </div>
            <div class="space-y-1 border-t pt-3">
              <p class="text-[10px] uppercase font-bold text-gray-400">Alamat</p>
              <p class="text-sm font-medium leading-relaxed">{{ user.address || '-' }}</p>
            </div>
            <div class="space-y-1 border-t pt-3">
              <p class="text-[10px] uppercase font-bold text-gray-400">Bio</p>
              <p class="text-sm font-medium leading-relaxed italic text-gray-600">
                {{ user.bio || '-' }}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="memberships" class="mt-4">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-widest text-[10px]">
                  Riwayat Keanggotaan
                </h4>
                <Button
                  size="xs"
                  variant="outline"
                  class="text-[10px] h-7"
                  @click="$emit('add-membership', user.id)"
                >
                  <PlusIcon class="w-3 h-3 mr-1" /> Tambah
                </Button>
              </div>

              <div class="border rounded-lg overflow-hidden border-gray-100">
                <Table>
                  <TableHeader class="bg-gray-50/50">
                    <TableRow>
                      <TableHead class="text-[10px] uppercase py-2">Divisi</TableHead>
                      <TableHead class="text-[10px] uppercase py-2">Jabatan</TableHead>
                      <TableHead class="text-[10px] uppercase py-2 text-center">Periode</TableHead>
                      <TableHead class="text-[10px] uppercase py-2 text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="ms in user.memberships" :key="ms.id" class="text-xs">
                      <TableCell class="font-medium">{{ ms.division?.name }}</TableCell>
                      <TableCell>{{ ms.position?.name }}</TableCell>
                      <TableCell class="text-center font-mono">{{ ms.period || '-' }}</TableCell>
                      <TableCell class="text-center">
                        <Badge
                          :class="
                            ms.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          "
                          class="text-[9px] px-1.5 py-0"
                        >
                          {{ ms.is_active ? 'Aktif' : 'Non-aktif' }}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow v-if="!user.memberships?.length">
                      <TableCell colspan="4" class="text-center py-8 text-gray-400 italic">
                        Belum ada riwayat keanggotaan.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roles" class="mt-4">
            <div class="bg-gray-50 p-6 rounded-lg border border-dashed text-center">
              <ShieldIcon class="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h4 class="text-sm font-bold text-gray-900 mb-1">Roles & Permissions</h4>
              <p class="text-xs text-gray-500 max-w-xs mx-auto mb-4">
                Fitur Role-Based Access Control (RBAC) memungkinkan Anda membatasi akses ke fitur
                tertentu di dashboard admin.
              </p>
              <div class="flex flex-wrap justify-center gap-2">
                <Badge v-for="role in user.roles" :key="role.id" class="bg-primary-navy text-white">
                  {{ role.label || role.name }}
                </Badge>
                <span v-if="!user.roles?.length" class="text-[10px] text-gray-400"
                  >User ini tidak memiliki Role administrator khusus.</span
                >
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" class="mt-4 space-y-4">
            <div class="flex items-center space-x-2 border-b border-gray-50 pb-2">
              <ActivityIcon class="w-4 h-4 text-primary-navy" />
              <h4 class="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
                Log Aktivitas Terbaru
              </h4>
            </div>

            <div v-if="isActivitiesLoading" class="py-12 flex justify-center">
              <Loader2Icon class="w-6 h-6 animate-spin text-primary-navy" />
            </div>

            <div v-else class="space-y-4">
              <div v-for="(log, i) in activities" :key="i" class="flex items-start space-x-3 group">
                <div
                  class="mt-1.5 w-2 h-2 rounded-full border border-primary-navy group-hover:bg-primary-navy transition-colors"
                ></div>
                <div class="flex-1 space-y-1">
                  <p class="text-xs text-gray-800 leading-snug">
                    <span class="font-bold">{{ log.description || log.action }}</span>
                    <span class="text-gray-500 ml-1">{{
                      log.properties?.target || log.target || ''
                    }}</span>
                  </p>
                  <div class="flex items-center space-x-2 text-[10px] text-gray-400">
                    <span class="flex items-center"
                      ><ClockIcon class="w-3 h-3 mr-1" /> {{ log.created_at_human }}</span
                    >
                    <span>&bull;</span>
                    <span>IP: {{ log.ip_address || log.ip }}</span>
                  </div>
                </div>
              </div>

              <div
                v-if="activities.length === 0"
                class="py-8 text-center text-gray-400 italic text-xs"
              >
                Tidak ada riwayat aktivitas ditemukan.
              </div>

              <div class="pt-4 border-t border-gray-50 text-center">
                <p class="text-[10px] text-gray-400 italic font-medium">
                  Mencatat aktivitas untuk keamanan akun.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <DialogFooter class="sm:justify-start">
        <Button variant="outline" @click="$emit('update:open', false)"> Tutup </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2Icon, PlusIcon, ShieldIcon, ActivityIcon, ClockIcon } from 'lucide-vue-next'
import userService from '@/services/user.service'

const props = defineProps({
  open: Boolean,
  user: Object,
  loading: Boolean,
})

defineEmits(['update:open', 'add-membership'])

const activities = ref([])
const isActivitiesLoading = ref(false)

async function fetchActivities() {
  if (!props.user?.id) return
  isActivitiesLoading.value = true
  try {
    const res = await userService.getActivities(props.user.id)
    activities.value = res.data || []
  } catch (err) {
    console.error('Failed to fetch activities:', err)
  } finally {
    isActivitiesLoading.value = false
  }
}

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      fetchActivities()
    }
  },
)

watch(
  () => props.user?.id,
  () => {
    if (props.open) {
      fetchActivities()
    }
  },
)

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>
