<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-navy/10 p-2 rounded-lg">
          <Building2 class="w-6 h-6 text-primary-navy" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Struktur Organisasi</h2>
          <p class="text-xs text-gray-500">Kelola divisi, jabatan, dan keanggotaan PM</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" @click="refreshData">
          <RefreshCcw class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button>
        <Button
          v-if="activeTab === 'divisions'"
          class="bg-primary-navy hover:bg-primary-navy/90 text-white"
          @click="openCreateDivision"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          Divisi Baru
        </Button>
        <Button
          v-if="activeTab === 'positions'"
          class="bg-primary-navy hover:bg-primary-navy/90 text-white"
          @click="openCreatePosition"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          Jabatan Baru
        </Button>
        <Button
          v-if="activeTab === 'memberships'"
          class="bg-primary-navy hover:bg-primary-navy/90 text-white"
          @click="openCreateMembership"
        >
          <UserPlus class="w-4 h-4 mr-2" />
          Tambah Anggota
        </Button>
      </div>
    </div>

    <!-- Main Tabs -->
    <Tabs v-model="activeTab" class="w-full">
      <TabsList class="mb-4">
        <TabsTrigger value="divisions">Divisi</TabsTrigger>
        <TabsTrigger value="positions">Jabatan</TabsTrigger>
        <TabsTrigger value="memberships">Keanggotaan</TabsTrigger>
        <TabsTrigger value="chart">Visual Chart</TabsTrigger>
      </TabsList>

      <!-- DIVISIONS -->
      <TabsContent value="divisions">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card v-for="div in divisions" :key="div.id" class="bg-white overflow-hidden group">
            <CardHeader
              class="p-4 border-b border-gray-100 flex flex-row items-center justify-between space-y-0"
            >
              <CardTitle class="text-base font-bold text-gray-900">{{ div.name }}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem @click="editDivision(div)">
                    <Edit3 class="w-4 h-4 mr-2" /> Edit Divisi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="text-red-600 focus:text-red-600"
                    @click="confirmDelete(div, 'Divisi')"
                  >
                    <Trash2 class="w-4 h-4 mr-2" /> Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent class="p-4 space-y-4">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">Jumlah Jabatan</span>
                <Badge variant="secondary" class="font-bold">{{ div.positions_count || 0 }}</Badge>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">Anggota Aktif</span>
                <Badge
                  variant="secondary"
                  class="font-bold bg-green-50 text-green-700 border-none"
                  >{{ div.users_count || 0 }}</Badge
                >
              </div>
              <Button
                variant="outline"
                size="sm"
                class="w-full text-[10px] uppercase font-bold tracking-wider"
                @click="viewDivision(div)"
              >
                Kelola Anggota
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- POSITIONS -->
      <TabsContent value="positions">
        <Card class="bg-white">
          <DataTable :columns="posColumns" :items="positions" :loading="isLoading">
            <template #cell-actions="{ item }">
              <div class="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8 text-gray-400"
                  @click="editPosition(item)"
                >
                  <Edit3 class="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8 text-gray-400 hover:text-red-500"
                  @click="confirmDelete(item, 'Jabatan')"
                >
                  <Trash2 class="w-4 h-4" />
                </Button>
              </div>
            </template>
          </DataTable>
        </Card>
      </TabsContent>

      <!-- MEMBERSHIPS -->
      <TabsContent value="memberships">
        <Card class="bg-white overflow-hidden">
          <div class="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center">
            <div class="relative flex-1 min-w-[240px]">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                v-model="filters.membershipSearch"
                placeholder="Cari nama anggota..."
                class="pl-10 h-10"
              />
            </div>

            <Select v-model="filters.membershipDivision">
              <SelectTrigger class="w-[200px]">
                <SelectValue placeholder="Semua Divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Divisi</SelectItem>
                <SelectItem v-for="div in divisions" :key="div.id" :value="div.id">
                  {{ div.name }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" class="h-10 w-10" @click="resetMembershipFilters">
              <X class="w-4 h-4" />
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anggota</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Divisi</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="ms in filteredMemberships" :key="ms.id">
                <TableCell>
                  <div class="flex items-center space-x-2">
                    <Avatar class="w-7 h-7">
                      <AvatarImage :src="ms.user?.avatar_url" />
                      <AvatarFallback class="text-[10px]">{{
                        ms.user?.name?.charAt(0)
                      }}</AvatarFallback>
                    </Avatar>
                    <span class="text-sm font-medium">{{ ms.user?.name || 'Unknown User' }}</span>
                  </div>
                </TableCell>
                <TableCell class="text-sm">{{ ms.position?.name }}</TableCell>
                <TableCell>
                  <Badge variant="outline" class="font-normal">{{ ms.division?.name }}</Badge>
                </TableCell>
                <TableCell class="text-xs text-gray-500">{{ ms.period }}</TableCell>
                <TableCell>
                  <Badge
                    :class="
                      ms.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    "
                  >
                    {{ ms.is_active ? 'Aktif' : 'Non-aktif' }}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8 text-gray-400"
                      @click="toggleMembership(ms)"
                    >
                      <component :is="ms.is_active ? UserX : UserCheck" class="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-8 w-8 text-gray-400 hover:text-red-500"
                      @click="confirmDelete(ms, 'Keanggotaan')"
                    >
                      <Trash2 class="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow v-if="filteredMemberships.length === 0">
                <TableCell colspan="6" class="text-center py-12 text-gray-400 italic">
                  Tidak ada data keanggotaan ditemukan
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </TabsContent>

      <!-- VISUAL CHART -->
      <TabsContent value="chart">
        <OrgChart />
      </TabsContent>
    </Tabs>

    <!-- Modals -->
    <DivisionModal
      v-model:open="modals.division"
      :is-editing="isEditing"
      :division="selectedItem"
      :is-loading="isSaving"
      @submit="saveDivision"
    />

    <PositionModal
      v-model:open="modals.position"
      :is-editing="isEditing"
      :position="selectedItem"
      :divisions="divisions"
      :is-loading="isSaving"
      @submit="savePosition"
    />

    <MembershipModal
      v-model:open="modals.membership"
      :is-editing="isEditing"
      :membership="selectedItem"
      :divisions="divisions"
      :users="usersList"
      :is-loading="isSaving"
      @submit="saveMembership"
    />

    <!-- Delete Confirmation -->
    <Dialog :open="modals.delete" @update:open="modals.delete = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah Anda yakin?</DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Menghapus {{ deleteTargetType }} ini mungkin
            mempengaruhi data terkait lainnya.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" :disabled="isSaving" @click="modals.delete = false"
            >Batal</Button
          >
          <Button variant="destructive" @click="handleDelete" :disabled="isSaving">
            <Loader2 v-if="isSaving" class="w-3 h-3 mr-2 animate-spin" />
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useToast } from 'vue-toastification'
import {
  Building2,
  Plus,
  RefreshCcw,
  MoreVertical,
  Edit3,
  Trash2,
  UserPlus,
  UserX,
  UserCheck,
  Network,
  Loader2,
  Search,
  X,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DataTable from '@/components/admin/shared/DataTable.vue'
import organizationService from '@/services/organization.service'
import userService from '@/services/user.service'

// Import Modals
import DivisionModal from '@/components/admin/organization/DivisionModal.vue'
import PositionModal from '@/components/admin/organization/PositionModal.vue'
import MembershipModal from '@/components/admin/organization/MembershipModal.vue'
import OrgChart from '@/components/admin/organization/OrgChart.vue'

const toast = useToast()
const activeTab = ref('divisions')
const isLoading = ref(false)
const isSaving = ref(false)
const isEditing = ref(false)

// Data
const divisions = ref([])
const positions = ref([])
const memberships = ref([])
const usersList = ref([])

// Modals State
const modals = reactive({
  division: false,
  position: false,
  membership: false,
  delete: false,
})
const selectedItem = ref(null)
const deleteTargetType = ref('')

// Filters
const filters = reactive({
  membershipDivision: 'all',
  membershipSearch: '',
})

const filteredMemberships = computed(() => {
  return memberships.value.filter((ms) => {
    const matchDivision =
      filters.membershipDivision === 'all' || ms.division?.id === filters.membershipDivision
    const matchSearch =
      !filters.membershipSearch ||
      ms.user?.name?.toLowerCase().includes(filters.membershipSearch.toLowerCase()) ||
      ms.position?.name?.toLowerCase().includes(filters.membershipSearch.toLowerCase())
    return matchDivision && matchSearch
  })
})

const posColumns = [
  { key: 'name', label: 'Nama Jabatan' },
  { key: 'division_name', label: 'Divisi' },
  { key: 'level', label: 'Level' },
  { key: 'actions', label: '', class: 'text-right' },
]

// API Functions
async function fetchDivisions() {
  isLoading.value = true
  try {
    const res = await organizationService.getDivisions()
    divisions.value = res.data || []
  } finally {
    isLoading.value = false
  }
}

async function fetchPositions() {
  isLoading.value = true
  try {
    const res = await organizationService.getPositions()
    positions.value = res.data?.map((p) => ({ ...p, division_name: p.division?.name || '-' })) || []
  } finally {
    isLoading.value = false
  }
}

async function fetchMemberships() {
  isLoading.value = true
  try {
    const res = await organizationService.getMemberships()
    memberships.value = res.data || []
  } finally {
    isLoading.value = false
  }
}

async function fetchUsers() {
  try {
    // Get all users for the selection
    const res = await userService.getAll({ per_page: 100 })
    usersList.value = res.data || []
  } catch (error) {}
}

function refreshData() {
  fetchDivisions()
  fetchPositions()
  fetchMemberships()
  fetchUsers()
}

function viewDivision(div) {
  filters.membershipDivision = div.id
  activeTab.value = 'memberships'
}

function resetMembershipFilters() {
  filters.membershipDivision = 'all'
  filters.membershipSearch = ''
}

// Division Actions
function openCreateDivision() {
  isEditing.value = false
  selectedItem.value = null
  modals.division = true
}
function editDivision(div) {
  isEditing.value = true
  selectedItem.value = div
  modals.division = true
}
async function saveDivision(data) {
  isSaving.value = true
  try {
    if (isEditing.value) {
      await organizationService.updateDivision(selectedItem.value.id, data)
      toast.success('Divisi berhasil diperbarui')
    } else {
      await organizationService.createDivision(data)
      toast.success('Divisi berhasil dibuat')
    }
    modals.division = false
    fetchDivisions()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal menyimpan divisi')
  } finally {
    isSaving.value = false
  }
}

// Position Actions
function openCreatePosition() {
  isEditing.value = false
  selectedItem.value = null
  modals.position = true
}
function editPosition(pos) {
  isEditing.value = true
  selectedItem.value = pos
  modals.position = true
}
async function savePosition(data) {
  isSaving.value = true
  try {
    if (isEditing.value) {
      await organizationService.updatePosition(selectedItem.value.id, data)
      toast.success('Jabatan berhasil diperbarui')
    } else {
      await organizationService.createPosition(data)
      toast.success('Jabatan berhasil dibuat')
    }
    modals.position = false
    fetchPositions()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal menyimpan jabatan')
  } finally {
    isSaving.value = false
  }
}

// Membership Actions
function openCreateMembership() {
  isEditing.value = false
  selectedItem.value = null
  modals.membership = true
}
async function saveMembership(data) {
  isSaving.value = true
  try {
    if (isEditing.value) {
      await organizationService.updateMembership(selectedItem.value.id, data)
      toast.success('Keanggotaan berhasil diperbarui')
    } else {
      await organizationService.createMembership(data)
      toast.success('Anggota berhasil ditambahkan')
    }
    modals.membership = false
    fetchMemberships()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal menyimpan keanggotaan')
  } finally {
    isSaving.value = false
  }
}

async function toggleMembership(ms) {
  try {
    if (ms.is_active) {
      await organizationService.deactivateMembership(ms.id)
      toast.success('Keanggotaan dinonaktifkan')
    } else {
      await organizationService.activateMembership(ms.id)
      toast.success('Keanggotaan diaktifkan')
    }
    fetchMemberships()
  } catch (err) {
    toast.error('Gagal mengubah status keanggotaan')
  }
}

// Delete Logic
function confirmDelete(item, type) {
  selectedItem.value = item
  deleteTargetType.value = type
  modals.delete = true
}

async function handleDelete() {
  isSaving.value = true
  try {
    if (deleteTargetType.value === 'Divisi') {
      await organizationService.deleteDivision(selectedItem.value.id)
    } else if (deleteTargetType.value === 'Jabatan') {
      await organizationService.deletePosition(selectedItem.value.id)
    } else if (deleteTargetType.value === 'Keanggotaan') {
      await organizationService.deleteMembership(selectedItem.value.id)
    }
    toast.success(`${deleteTargetType.value} berhasil dihapus`)
    modals.delete = false
    refreshData()
  } catch (err) {
    toast.error(err.response?.data?.message || `Gagal menghapus ${deleteTargetType.value}`)
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchDivisions()
  fetchPositions() // Preload for position management
  fetchUsers() // Preload for membership creation
})

watch(activeTab, (val) => {
  if (val === 'divisions') fetchDivisions()
  if (val === 'positions') fetchPositions()
  if (val === 'memberships') fetchMemberships()
})
</script>
