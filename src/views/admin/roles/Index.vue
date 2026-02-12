<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-navy/10 p-2 rounded-lg">
          <Shield class="w-6 h-6 text-primary-navy" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Peran & Izin</h2>
          <p class="text-xs text-gray-500">Kelola hak akses dan tingkatan pengguna</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" @click="refreshAll" :disabled="isLoading">
          <RefreshCcw class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button>
        <Button
          class="bg-primary-orange hover:bg-primary-orange/90 text-white"
          @click="openCreateRole"
        >
          <Plus class="w-4 h-4 mr-2" />
          Tambah Peran
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Roles List -->
      <div class="lg:col-span-1 space-y-4">
        <Card
          v-for="role in roles"
          :key="role.id"
          :class="[
            'group cursor-pointer transition-all hover:ring-2 hover:ring-primary-navy/20',
            activeRole?.id === role.id
              ? 'ring-2 ring-primary-navy border-primary-navy/20'
              : 'bg-white',
          ]"
          @click="selectRole(role)"
        >
          <CardContent class="p-4 flex items-center justify-between">
            <div class="flex items-center space-x-3 overflow-hidden">
              <div
                :class="[
                  'p-2 rounded-lg shrink-0',
                  activeRole?.id === role.id
                    ? 'bg-primary-navy text-white'
                    : 'bg-gray-100 text-gray-400',
                ]"
              >
                <UserCircle class="w-5 h-5" />
              </div>
              <div class="min-w-0">
                <p
                  :class="[
                    'text-sm font-bold truncate',
                    activeRole?.id === role.id ? 'text-primary-navy' : 'text-gray-900',
                  ]"
                >
                  {{ role.label || role.name }}
                </p>
                <p class="text-[10px] text-gray-500 uppercase tracking-widest truncate">
                  {{ role.name }}
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                variant="ghost"
                size="icon"
                class="h-7 w-7 text-gray-400"
                @click.stop="editRole(role)"
              >
                <Edit3 class="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="h-7 w-7 text-gray-400 hover:text-red-500"
                @click.stop="confirmDeleteRole(role)"
              >
                <Trash2 class="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div
          v-if="roles.length === 0 && !isLoading"
          class="text-center py-10 bg-white rounded-xl border-2 border-dashed"
        >
          <Shield class="w-10 h-10 text-gray-200 mx-auto mb-2" />
          <p class="text-xs text-gray-400">Tidak ada peran ditemukan</p>
        </div>
      </div>

      <!-- Permission Matrix -->
      <div class="lg:col-span-2">
        <Card
          class="bg-white h-full min-h-[600px] flex flex-col relative overflow-hidden shadow-sm border-gray-100"
        >
          <CardHeader class="border-b border-gray-100 bg-gray-50/30">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <CardTitle class="text-lg flex items-center gap-2">
                  Matriks Perizinan:
                  <Badge
                    v-if="activeRole"
                    variant="outline"
                    class="border-primary-navy text-primary-navy bg-primary-navy/5"
                  >
                    {{ activeRole?.label || activeRole?.name }}
                  </Badge>
                  <span v-else>Pilih Peran</span>
                </CardTitle>
                <CardDescription
                  >Sesuaikan hak akses spesifik untuk setiap modul sistem</CardDescription
                >
              </div>
              <Button
                v-if="activeRole"
                size="sm"
                class="bg-primary-navy text-white hover:bg-primary-navy/90 shadow-md"
                :disabled="isSaving"
                @click="savePermissions"
              >
                <Loader2 v-if="isSaving" class="w-3 h-3 mr-2 animate-spin" />
                <Save class="w-3 h-3 mr-2" />
                Simpan Perizinan
              </Button>
            </div>
          </CardHeader>

          <CardContent class="flex-1 p-0 overflow-auto">
            <!-- Loading Overlay -->
            <div
              v-if="isLoading"
              class="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center"
            >
              <Loader2 class="w-10 h-10 animate-spin text-primary-navy mb-2" />
              <p class="text-xs font-bold text-primary-navy uppercase tracking-widest">
                Sinkronisasi Data...
              </p>
            </div>

            <div
              v-if="!activeRole"
              class="h-full flex flex-col items-center justify-center p-12 text-center text-gray-400"
            >
              <div
                class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-inner"
              >
                <LayoutGrid class="w-10 h-10 opacity-20" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Pilih Peran</h3>
              <p class="max-w-[280px] text-sm text-gray-500 leading-relaxed">
                Silakan pilih salah satu peran di panel sebelah kiri untuk mulai mengelola izin
                akses modul.
              </p>
            </div>

            <div v-else class="p-8">
              <div class="space-y-12">
                <div v-for="(perms, module) in groupedPermissions" :key="module" class="space-y-4">
                  <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div class="flex items-center space-x-3">
                      <div class="p-2 bg-primary-navy/5 rounded-lg text-primary-navy">
                        <component :is="getModuleIcon(module)" class="w-4 h-4" />
                      </div>
                      <h4 class="text-sm font-black text-gray-900 capitalize tracking-tight">
                        {{ module }}
                      </h4>
                    </div>
                    <Button
                      variant="outline"
                      size="xs"
                      class="h-7 text-[10px] font-bold border-gray-200 px-3 hover:bg-primary-navy hover:text-white transition-all"
                      @click="toggleModule(module)"
                    >
                      {{ isModuleAllSelected(module) ? 'Batalkan Semua' : 'Pilih Semua' }}
                    </Button>
                  </div>

                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                      v-for="perm in perms"
                      :key="perm.id"
                      class="flex items-center space-x-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer group select-none"
                      :class="[
                        selectedPermissions.includes(perm.id)
                          ? 'bg-primary-navy/5 border-primary-navy/20 shadow-sm'
                          : 'bg-white border-gray-100 hover:border-gray-300',
                      ]"
                      @click="togglePermission(perm.id)"
                    >
                      <div class="relative flex items-center">
                        <input
                          type="checkbox"
                          :id="`perm-${perm.id}`"
                          :checked="selectedPermissions.includes(perm.id)"
                          @click.stop="togglePermission(perm.id)"
                          class="w-5 h-5 rounded-md border-gray-300 text-primary-navy focus:ring-primary-navy cursor-pointer transition-all"
                        />
                      </div>
                      <label
                        :for="`perm-${perm.id}`"
                        class="text-xs font-bold text-gray-700 capitalize cursor-pointer group-hover:text-primary-navy transition-colors"
                        @click.stop="togglePermission(perm.id)"
                      >
                        {{ perm.label || getActionName(perm.name) }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State for Grouped -->
              <div
                v-if="Object.keys(groupedPermissions).length === 0"
                class="flex flex-col items-center justify-center py-20 text-gray-400"
              >
                <ShieldAlert class="w-12 h-12 mb-4 opacity-10" />
                <p class="text-sm italic">
                  Opps! Tidak ada data izin yang tersedia untuk dikelola.
                </p>
              </div>

              <!-- Footer info -->
              <div
                class="mt-16 pt-8 border-t border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 gap-8 uppercase tracking-widest"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-3 h-3 rounded-full bg-primary-navy shadow-[0_0_8px_rgba(30,58,95,0.4)]"
                  ></div>
                  Izin Aktif
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-gray-200"></div>
                  Izin Dinonaktifkan
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Role Form Modal -->
    <Dialog :open="modals.roleForm" @update:open="modals.roleForm = $event">
      <DialogContent class="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{{ isEditingRole ? 'Edit Peran' : 'Tambah Peran Baru' }}</DialogTitle>
          <DialogDescription>
            Tentukan nama kode sytem dan label tampilan untuk peran ini.
          </DialogDescription>
        </DialogHeader>

        <div class="space-y-4 py-4">
          <div class="space-y-1.5">
            <Label for="role-name">Nama System (Slug)</Label>
            <Input
              id="role-name"
              v-model="roleForm.name"
              placeholder="contoh: moderator_konten"
              :disabled="isEditingRole"
            />
            <p class="text-[9px] text-gray-400 font-medium italic">
              * Gunakan huruf kecil, angka, dan underscore. Tidak bisa diubah.
            </p>
          </div>
          <div class="space-y-1.5">
            <Label for="role-label">Label Tampilan</Label>
            <Input
              id="role-label"
              v-model="roleForm.label"
              placeholder="contoh: Moderator Konten"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" @click="modals.roleForm = false">Batal</Button>
          <Button
            class="bg-primary-navy text-white"
            :disabled="isSaving || !roleForm.name || !roleForm.label"
            @click="saveRole"
          >
            <Loader2 v-if="isSaving" class="w-3 h-3 mr-2 animate-spin" />
            {{ isEditingRole ? 'Simpan Perubahan' : 'Buat Peran' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Role Delete Modal -->
    <Dialog :open="modals.roleDelete" @update:open="modals.roleDelete = $event">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Peran?</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus peran <strong>{{ roleForm.label }}</strong
            >? Tindakan ini dapat menyebabkan pengguna kehilangan akses jika mereka hanya memiliki
            peran ini.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="modals.roleDelete = false">Batal</Button>
          <Button variant="destructive" :disabled="isSaving" @click="handleDeleteRole">
            <Loader2Icon v-if="isSaving" class="w-3 h-3 mr-2 animate-spin" />
            Hapus Permanen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import {
  Shield,
  RefreshCcw,
  Plus,
  UserCircle,
  ChevronRight,
  LayoutGrid,
  Info,
  Settings,
  Newspaper,
  BookOpen,
  Users,
  Building2,
  Mail,
  Save,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Edit3,
  Trash2,
  MessageSquare,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import userService from '@/services/user.service'

const toast = useToast()
const authStore = useAuthStore()
const roles = ref([])
const permissions = ref([]) // This will be a flat array
const activeRole = ref(null)
const selectedPermissions = ref([])
const isLoading = ref(false)
const isSaving = ref(false)

// Role Form State
const modals = reactive({
  roleForm: false,
  roleDelete: false,
})
const isEditingRole = ref(false)
const roleForm = reactive({
  id: null,
  name: '',
  label: '',
})

const groupedPermissions = computed(() => {
  const groups = {}
  if (Array.isArray(permissions.value)) {
    permissions.value.forEach((p) => {
      // Use the 'module' field from backend if it exists, otherwise fallback to parsing name
      const module = p.module || p.name.split('.')[0] || 'other'
      if (!groups[module]) groups[module] = []
      groups[module].push(p)
    })
  }
  return groups
})

async function fetchRoles() {
  try {
    const res = await userService.getRoles()
    roles.value = res.data || []
  } catch (err) {
    toast.error('Gagal memuat peran')
  }
}

async function fetchAllPermissions() {
  try {
    const res = await userService.getPermissions()
    const data = res.data || {}

    // Flatten the grouped object from backend into a single array for easier management
    if (!Array.isArray(data)) {
      const flat = []
      Object.values(data).forEach((items) => {
        if (Array.isArray(items)) flat.push(...items)
      })
      permissions.value = flat
    } else {
      permissions.value = data
    }
  } catch (err) {
    console.error('Error fetching permissions:', err)
  }
}

async function refreshAll() {
  isLoading.value = true
  await Promise.all([fetchRoles(), fetchAllPermissions()])

  if (roles.value.length > 0) {
    if (!activeRole.value) {
      selectRole(roles.value[0])
    } else {
      // Re-select to update permissions from fresh roles list
      const updated = roles.value.find((r) => r.id === activeRole.value.id)
      if (updated) selectRole(updated)
      else selectRole(roles.value[0])
    }
  }
  isLoading.value = false
}

function selectRole(role) {
  activeRole.value = role
  selectedPermissions.value = role.permissions?.map((p) => p.id) || []
}

function togglePermission(id) {
  const index = selectedPermissions.value.indexOf(id)
  if (index > -1) {
    selectedPermissions.value.splice(index, 1)
  } else {
    selectedPermissions.value.push(id)
  }
}

function isModuleAllSelected(module) {
  const modulePerms = groupedPermissions.value[module]
  if (!modulePerms?.length) return false
  return modulePerms.every((p) => selectedPermissions.value.includes(p.id))
}

function toggleModule(module) {
  const modulePerms = groupedPermissions.value[module]
  if (!modulePerms) return

  if (isModuleAllSelected(module)) {
    // Unselect all in module
    const ids = modulePerms.map((p) => p.id)
    selectedPermissions.value = selectedPermissions.value.filter((id) => !ids.includes(id))
  } else {
    // Select all in module
    modulePerms.forEach((p) => {
      if (!selectedPermissions.value.includes(p.id)) {
        selectedPermissions.value.push(p.id)
      }
    })
  }
}

async function savePermissions() {
  if (!activeRole.value) return

  isSaving.value = true
  try {
    await userService.updateRolePermissions(activeRole.value.id, selectedPermissions.value)
    toast.success(
      `Izin untuk ${activeRole.value.label || activeRole.value.name} berhasil diperbarui`,
    )

    // Refresh current user data to sync permissions immediately
    await authStore.fetchUser()

    // Update local role object's permissions for immediate UI feedback
    if (activeRole.value) {
      activeRole.value.permissions = permissions.value.filter((p) =>
        selectedPermissions.value.includes(p.id),
      )
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal menyimpan izin')
  } finally {
    isSaving.value = false
  }
}

// Role CRUD
function openCreateRole() {
  isEditingRole.value = false
  roleForm.id = null
  roleForm.name = ''
  roleForm.label = ''
  modals.roleForm = true
}

function editRole(role) {
  isEditingRole.value = true
  roleForm.id = role.id
  roleForm.name = role.name
  roleForm.label = role.label
  modals.roleForm = true
}

async function saveRole() {
  isSaving.value = true
  try {
    if (isEditingRole.value) {
      await userService.updateRole(roleForm.id, { name: roleForm.name, label: roleForm.label })
      toast.success('Peran berhasil diperbarui')
    } else {
      await userService.createRole({ name: roleForm.name, label: roleForm.label })
      toast.success('Peran baru berhasil ditambahkan')
    }
    modals.roleForm = false
    fetchRoles()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal menyimpan peran')
  } finally {
    isSaving.value = false
  }
}

function confirmDeleteRole(role) {
  roleForm.id = role.id
  roleForm.label = role.label
  modals.roleDelete = true
}

async function handleDeleteRole() {
  isSaving.value = true
  try {
    await userService.deleteRole(roleForm.id)
    toast.success('Peran berhasil dihapus')
    modals.roleDelete = false
    if (activeRole.value?.id === roleForm.id) activeRole.value = null
    fetchRoles()
  } catch (err) {
    toast.error('Gagal menghapus peran')
  } finally {
    isSaving.value = false
  }
}

function getActionName(name) {
  const parts = name.split('.')
  return parts.length > 1 ? parts[1] : parts[0]
}

function getModuleIcon(module) {
  switch (module.toLowerCase()) {
    case 'news':
      return Newspaper
    case 'blog':
      return BookOpen
    case 'users':
      return Users
    case 'organization':
      return Building2
    case 'newsletter':
      return Mail
    case 'komentar':
      return MessageSquare
    case 'settings':
    case 'system':
      return Settings
    default:
      return LayoutGrid
  }
}

onMounted(() => {
  refreshAll()
})
</script>
