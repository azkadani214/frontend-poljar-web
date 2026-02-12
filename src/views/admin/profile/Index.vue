<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Cover Placeholder -->
      <div class="h-32 bg-gradient-to-r from-primary-navy to-primary-blue relative">
        <div class="absolute -bottom-12 left-8">
          <div class="relative group">
            <Avatar class="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage :src="form.photo_url || authStore.currentUser?.avatar_url" />
              <AvatarFallback class="bg-primary-navy text-white text-3xl font-black">
                {{ authStore.currentUser?.name?.charAt(0) }}
              </AvatarFallback>
            </Avatar>
            <label
              for="profile-photo"
              class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera class="w-6 h-6 text-white" />
              <input
                id="profile-photo"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handlePhotoUpload"
              />
            </label>
          </div>
        </div>
      </div>

      <div class="pt-16 pb-8 px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ authStore.currentUser?.name }}</h2>
            <p class="text-gray-500 font-medium">{{ authStore.currentUser?.email }}</p>
            <div class="flex gap-2 mt-2">
              <Badge class="bg-primary-navy/5 text-primary-navy border-none capitalize">{{
                authStore.currentUser?.status
              }}</Badge>
              <Badge
                v-for="role in authStore.currentUser?.roles"
                :key="role.id"
                variant="outline"
                class="border-primary-orange text-primary-orange bg-primary-orange/5"
              >
                {{ role.label || role.name }}
              </Badge>
            </div>
          </div>
          <div class="flex gap-3">
            <Button
              variant="outline"
              @click="showLogoutConfirm = true"
              class="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut class="w-4 h-4 mr-2" />
              Keluar
            </Button>
            <Button
              @click="saveProfile"
              :disabled="loading"
              class="bg-primary-navy text-white hover:bg-primary-navy/90 min-w-[120px]"
            >
              <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
              Simpan Profil
            </Button>
          </div>
        </div>
      </div>

      <div class="border-t">
        <Tabs defaultValue="personal" class="w-full">
          <div class="px-8 border-b">
            <TabsList class="h-14 bg-transparent gap-8">
              <TabsTrigger
                value="personal"
                class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-orange data-[state=active]:shadow-none rounded-none px-0 h-14 font-bold text-gray-500"
              >
                Informasi Personal
              </TabsTrigger>
              <TabsTrigger
                value="public"
                class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-orange data-[state=active]:shadow-none rounded-none px-0 h-14 font-bold text-gray-500"
              >
                Profil Publik
              </TabsTrigger>
              <TabsTrigger
                value="security"
                class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-orange data-[state=active]:shadow-none rounded-none px-0 h-14 font-bold text-gray-500"
              >
                Keamanan
              </TabsTrigger>
            </TabsList>
          </div>

          <!-- Personal Tab -->
          <TabsContent value="personal" class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">
                  Nama Lengkap <span class="text-red-500">*</span>
                </Label>
                <Input
                  v-model="form.name"
                  placeholder="Contoh: Muhammad Akhyar"
                  class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">Email Utama</Label>
                <Input
                  :value="authStore.currentUser?.email"
                  disabled
                  class="h-11 border-gray-100 bg-gray-100 font-medium"
                />
              </div>
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">
                  Nomor Telepon <span class="text-red-500">*</span>
                </Label>
                <Input
                  v-model="form.phone"
                  placeholder="Contoh: 081234567890"
                  class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">
                  Jenis Kelamin <span class="text-red-500">*</span>
                </Label>
                <Select v-model="form.gender">
                  <SelectTrigger
                    class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                  >
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">
                  Tanggal Lahir <span class="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  v-model="form.birth_date"
                  class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div class="space-y-2">
              <Label class="text-xs font-black uppercase text-gray-400">Alamat Lengkap</Label>
              <Textarea
                v-model="form.address"
                placeholder="Jl. Soekarno Hatta No. 9, Malang, Jawa Timur"
                rows="3"
                class="border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
              />
            </div>
          </TabsContent>

          <!-- Public Tab -->
          <TabsContent value="public" class="p-8 space-y-6">
            <div class="space-y-6 max-w-2xl">
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">Motto / Quotes</Label>
                <Input
                  v-model="form.quotes"
                  placeholder="Contoh: Berbagi ilmu, membangun negeri."
                  class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">Bio Singkat</Label>
                <Textarea
                  v-model="form.bio"
                  placeholder="Tuliskan sesuatu tentang Anda, pengalaman, atau motivasi bergabung di Polinema Mengajar..."
                  rows="4"
                  class="border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>
              <div class="space-y-2">
                <Label class="text-xs font-black uppercase text-gray-400">Website</Label>
                <Input
                  v-model="form.website"
                  placeholder="Contoh: https://akhyar.id"
                  class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label class="text-xs font-black uppercase text-gray-400"
                    >Instagram Username</Label
                  >
                  <Input
                    v-model="form.social_links.instagram"
                    placeholder="Contoh: akhyar_dev"
                    class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                  />
                </div>
                <div class="space-y-2">
                  <Label class="text-xs font-black uppercase text-gray-400"
                    >LinkedIn Profile URL</Label
                  >
                  <Input
                    v-model="form.social_links.linkedin"
                    placeholder="Contoh: https://linkedin.com/in/akhyar-muhammad"
                    class="h-11 border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <!-- Security Tab -->
          <TabsContent value="security" class="p-8 space-y-6">
            <div class="max-w-md space-y-6">
              <div class="p-4 rounded-lg bg-amber-50 border border-amber-100 flex gap-4">
                <ShieldCheck class="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 class="text-sm font-bold text-amber-800">Keamanan Akun</h4>
                  <p class="text-xs text-amber-700 mt-1">
                    Kami merekomendasikan penggantian kata sandi secara berkala minimal 3 bulan
                    sekali.
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <Label class="text-xs font-black uppercase text-gray-400">Kata Sandi Baru</Label>
                  <Input type="password" v-model="passForm.password" class="h-11 border-gray-100" />
                </div>
                <div class="space-y-2">
                  <Label class="text-xs font-black uppercase text-gray-400"
                    >Konfirmasi Kata Sandi Baru</Label
                  >
                  <Input
                    type="password"
                    v-model="passForm.password_confirmation"
                    class="h-11 border-gray-100"
                  />
                </div>
                <Button
                  @click="updatePassword"
                  variant="outline"
                  :disabled="passLoading"
                  class="text-primary-navy border-primary-navy hover:bg-primary-navy/5"
                >
                  <Loader2 v-if="passLoading" class="w-4 h-4 mr-2 animate-spin" />
                  Perbarui Kata Sandi
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>

    <!-- Beautiful Logout Confirmation Modal -->
    <Dialog v-model:open="showLogoutConfirm">
      <DialogContent class="sm:max-w-[425px] border-none bg-white p-0 overflow-hidden shadow-2xl">
        <div class="h-2 bg-red-500 w-full"></div>
        <div class="p-8">
          <DialogHeader class="mb-6">
            <div
              class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <LogOut class="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle class="text-2xl font-bold text-center text-gray-900"
              >Konfirmasi Keluar</DialogTitle
            >
            <DialogDescription class="text-center text-gray-500 mt-2 text-base">
              Apakah Anda yakin ingin mengakhiri sesi ini? Anda perlu masuk kembali untuk mengakses
              panel administrasi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter class="flex sm:flex-row flex-col gap-3 mt-4">
            <Button
              variant="outline"
              class="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 h-12 text-base font-semibold"
              @click="showLogoutConfirm = false"
            >
              Batalkan
            </Button>
            <Button
              class="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 text-base font-semibold shadow-lg shadow-red-200"
              @click="confirmLogout"
            >
              Ya, Keluar Sekarang
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import userService from '@/services/user.service'
import { useToast } from 'vue-toastification'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Camera, Loader2, ShieldCheck, LogOut } from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const passLoading = ref(false)
const showLogoutConfirm = ref(false)

const form = reactive({
  name: '',
  phone: '',
  gender: '',
  birth_date: '',
  address: '',
  bio: '',
  quotes: '',
  website: '',
  social_links: {
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
  },
  photo_url: null,
})

const passForm = reactive({
  password: '',
  password_confirmation: '',
})

onMounted(async () => {
  if (!authStore.currentUser) {
    await authStore.fetchUser()
  }

  const user = authStore.currentUser
  if (user) {
    form.name = user.name || ''
    form.phone = user.phone || ''
    form.gender = user.gender || ''
    form.birth_date = user.birth_date || ''
    form.address = user.address || ''
    form.bio = user.bio || ''
    form.quotes = user.quotes || ''
    form.website = user.website || ''
    form.photo_url = user.avatar_url
    if (user.social_links) {
      form.social_links = { ...form.social_links, ...user.social_links }
    }
  }
})

async function confirmLogout() {
  showLogoutConfirm.value = false
  try {
    toast.info('Sedang keluar...')
    await authStore.logout()
    toast.success('Berhasil keluar dari sistem')
  } catch (error) {
    toast.error('Gagal keluar, silakan coba lagi')
  }
}

async function handlePhotoUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  loading.value = true
  try {
    const res = await userService.updatePhoto(file)
    form.photo_url = res.data.photo_url
    await authStore.fetchUser()
    toast.success('Foto berhasil diubah')
  } catch (error) {
    toast.error('Gagal mengunggah foto')
  } finally {
    loading.value = false
  }
}

async function saveProfile() {
  loading.value = true
  try {
    await userService.updateProfile(form)
    await authStore.fetchUser()
    toast.success('Profil berhasil diperbarui')
  } catch (error) {
    toast.error('Gagal memperbarui profil')
  } finally {
    loading.value = false
  }
}

async function updatePassword() {
  if (!passForm.password || passForm.password !== passForm.password_confirmation) {
    toast.error('Kata sandi tidak cocok')
    return
  }

  passLoading.value = true
  try {
    await userService.changePassword(passForm)
    passForm.password = ''
    passForm.password_confirmation = ''
    toast.success('Kata sandi berhasil diperbarui')
  } catch (error) {
    toast.error('Gagal memperbarui kata sandi')
  } finally {
    passLoading.value = false
  }
}
</script>
