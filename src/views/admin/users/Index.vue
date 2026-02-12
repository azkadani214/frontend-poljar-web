<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center space-x-3">
        <div class="bg-primary-navy/10 p-2 rounded-lg">
          <Users class="w-6 h-6 text-primary-navy" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Kelola Pengguna</h2>
          <p class="text-xs text-gray-500">Atur akses dan peran anggota tim</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" @click="fetchUsers" :disabled="isLoading">
          <RefreshCcw class="w-4 h-4 mr-2" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </Button>

        <DropdownMenu v-if="authStore.hasPermission('pengguna.create')">
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" class="border-gray-200 font-bold">
              <FileUp class="w-4 h-4 mr-2" />
              Import Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuItem @click="modals.import = true" class="text-xs font-bold py-2.5">
              <Plus class="w-4 h-4 mr-3 text-primary-navy" /> Mulai Import Baru
            </DropdownMenuItem>
            <DropdownMenuItem @click="downloadTemplate" class="text-xs font-bold py-2.5">
              <Download class="w-4 h-4 mr-3 text-primary-orange" /> Unduh Template CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          v-if="authStore.hasPermission('pengguna.create')"
          size="sm"
          class="bg-primary-navy hover:bg-primary-navy/90 text-white font-black px-4"
          @click="openCreateModal"
        >
          <Plus class="w-4 h-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        v-for="stat in statsDisplay"
        :key="stat.label"
        class="bg-white border border-gray-100 shadow-none transition-all"
      >
        <CardContent class="p-5 flex items-center justify-between">
          <div class="space-y-1">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
              {{ stat.label }}
            </p>
            <p class="text-3xl font-black text-gray-900">{{ stat.value }}</p>
          </div>
          <div :class="`p-3 rounded-2xl ${stat.bg}`">
            <component :is="stat.icon" :class="`w-6 h-6 ${stat.color}`" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- User List Section -->
    <Card class="bg-white shadow-none border-gray-100 overflow-hidden">
      <div class="p-5 border-b border-gray-100 flex flex-wrap gap-4 items-center bg-gray-50/10">
        <div class="relative flex-1 min-w-[280px]">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            v-model="filters.search"
            placeholder="Cari nama atau email..."
            class="w-full pl-11 h-11 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary-navy outline-none transition-all placeholder:text-gray-400"
            @input="debouncedSearch"
          />
        </div>

        <div class="flex items-center gap-3">
          <Select v-model="filters.status" @update:modelValue="fetchUsers">
            <SelectTrigger class="w-[160px] h-11 border-gray-200 shadow-none">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Nonaktif</SelectItem>
            </SelectContent>
          </Select>

          <Select v-model="filters.division" @update:modelValue="fetchUsers">
            <SelectTrigger class="w-[200px] h-11 border-gray-200 shadow-none">
              <SelectValue placeholder="Divisi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Divisi</SelectItem>
              <SelectItem v-for="div in divisions" :key="div.id" :value="div.id.toString()">
                {{ div.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        :columns="columns"
        :items="users"
        :loading="isLoading"
        :pagination="pagination"
        @page-change="
          (p) => {
            pagination.page = p
            fetchUsers()
          }
        "
        class="border-none"
      >
        <template #cell-user="{ item }">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <Avatar class="w-10 h-10 border border-gray-100 shadow-none">
                <AvatarImage :src="item.avatar_url" />
                <AvatarFallback class="bg-primary-navy text-white text-xs font-black">
                  {{ item.name?.charAt(0).toUpperCase() || 'U' }}
                </AvatarFallback>
              </Avatar>
              <div
                v-if="item.status === 'active'"
                class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
              ></div>
            </div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate leading-tight">
                {{ item.name }}
              </p>
              <p class="text-[11px] text-gray-400 truncate">{{ item.email }}</p>
            </div>
          </div>
        </template>

        <template #cell-divisions="{ item }">
          <div class="flex flex-wrap gap-1.5">
            <div v-for="ms in item.memberships" :key="ms.id" class="flex flex-col">
              <Badge
                v-if="ms.is_active"
                variant="secondary"
                class="text-[9px] font-bold uppercase px-2 py-0.5 bg-gray-100 text-gray-600 border-none tracking-tight"
              >
                {{ ms.division?.name }}
              </Badge>
            </div>
            <span
              v-if="!item.memberships?.length"
              class="text-[10px] text-gray-400 font-bold uppercase tracking-widest"
              >Luar Struktur</span
            >
          </div>
        </template>

        <template #cell-roles="{ item }">
          <div class="flex flex-wrap gap-1.5">
            <Badge
              v-for="role in item.roles"
              :key="role.id"
              variant="outline"
              class="text-[10px] font-bold uppercase px-2 py-0.5 border-gray-200 text-gray-500 bg-gray-50/50"
            >
              {{ role.label || role.name }}
            </Badge>
            <span v-if="!item.roles?.length" class="text-xs text-gray-300">-</span>
          </div>
        </template>

        <template #cell-status="{ item }">
          <Badge
            variant="outline"
            :class="
              item.status === 'active'
                ? 'bg-green-50/50 text-green-600 border-green-100'
                : 'bg-red-50/50 text-red-600 border-red-100'
            "
            class="text-[9px] font-black uppercase px-2.5 py-1 whitespace-nowrap shadow-none"
          >
            {{ item.status === 'active' ? 'AKTIF' : 'NONAKTIF' }}
          </Badge>
        </template>

        <template #cell-actions="{ item }">
          <div class="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-gray-400 hover:text-primary-navy hover:bg-gray-100 rounded-lg"
              @click="viewUser(item)"
            >
              <Eye class="w-4 h-4" />
            </Button>
            <Button
              v-if="authStore.hasPermission('pengguna.update')"
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-gray-400 hover:text-primary-orange hover:bg-gray-100 rounded-lg"
              @click="editUser(item)"
            >
              <Edit3 class="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8 text-gray-400 hover:bg-gray-100 rounded-lg"
                >
                  <MoreVertical class="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-48">
                <DropdownMenuItem
                  v-if="authStore.hasPermission('pengguna.update')"
                  @click="openResetPasswordModal(item)"
                  class="text-xs font-bold py-2.5"
                >
                  <Key class="w-4 h-4 mr-3 text-primary-orange" /> Reset Password
                </DropdownMenuItem>
                <DropdownMenuItem
                  v-if="authStore.hasPermission('pengguna.update')"
                  @click="toggleUserStatus(item)"
                  :class="item.status === 'active' ? 'text-red-600' : 'text-green-600'"
                  class="text-xs font-bold py-2.5"
                >
                  <component
                    :is="item.status === 'active' ? UserX : UserCheck"
                    class="w-4 h-4 mr-3"
                  />
                  {{ item.status === 'active' ? 'Nonaktifkan Akun' : 'Aktifkan Akun' }}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  v-if="authStore.hasPermission('pengguna.delete')"
                  class="text-red-600 focus:text-red-500 focus:bg-red-50 text-xs font-bold py-2.5"
                  @click="confirmDelete(item)"
                >
                  <Trash2 class="w-4 h-4 mr-3" /> Hapus User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </template>
      </DataTable>
    </Card>

    <!-- User Form Modal -->
    <Dialog :open="showModal" @update:open="showModal = $event">
      <DialogContent class="sm:max-w-[550px] overflow-hidden">
        <DialogHeader class="bg-gray-50/50 -mx-6 -mt-6 p-6 border-b">
          <DialogTitle class="text-xl font-black text-gray-900 capitalize">{{
            isEditing ? 'Ubah Profil Pengguna' : 'Daftarkan Pengguna'
          }}</DialogTitle>
          <DialogDescription class="text-xs font-medium text-gray-500">
            Lengkapi profil anggota tim untuk memberikan akses sistem.
          </DialogDescription>
        </DialogHeader>

        <form @submit.prevent="saveUser" class="space-y-6 py-6 overflow-y-auto max-h-[70vh] px-1">
          <div
            class="flex items-center space-x-6 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
          >
            <div class="relative">
              <Avatar class="w-20 h-20 border-4 border-white">
                <AvatarImage :src="form.photoPreview || form.avatar_url" />
                <AvatarFallback class="bg-primary-navy text-white text-2xl font-black">
                  {{ form.name?.charAt(0) || 'U' }}
                </AvatarFallback>
              </Avatar>
              <div
                class="absolute inset-0 bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <Label
                  for="photo-upload"
                  class="cursor-pointer text-white italic text-[10px] font-bold"
                  >UBAH</Label
                >
              </div>
            </div>
            <div class="flex-1 space-y-2">
              <Label class="text-xs font-black uppercase tracking-widest text-gray-400"
                >Foto Profil Tim</Label
              >
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                @change="handlePhotoChange"
                class="h-10 text-xs cursor-pointer bg-white"
              />
              <p class="text-[10px] text-gray-400 italic">Disarankan aspek rasio 1:1, max 1MB.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-2">
              <Label for="name" class="text-xs font-black uppercase text-gray-700"
                >Nama Lengkap</Label
              >
              <Input
                id="name"
                v-model="form.name"
                required
                placeholder="Ahmad Fauzi"
                class="h-11"
              />
            </div>
            <div class="space-y-2">
              <Label for="email" class="text-xs font-black uppercase text-gray-700"
                >Alamat Email</Label
              >
              <Input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="ahmad@example.com"
                class="h-11"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-2">
              <Label class="text-xs font-black uppercase text-gray-700">Status Akun</Label>
              <Select v-model="form.status">
                <SelectTrigger class="h-11">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">🟢 AKTIF</SelectItem>
                  <SelectItem value="inactive">🔴 NONAKTIF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-3 pt-2">
            <Label class="text-xs font-black uppercase text-gray-700">Peran & Hak Akses</Label>
            <div class="flex flex-wrap gap-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
              <div
                v-for="role in rolesList"
                :key="role.id"
                class="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg border cursor-pointer hover:border-primary-navy transition-colors"
              >
                <input
                  type="checkbox"
                  :id="'role-' + role.id"
                  :value="role.name"
                  v-model="form.roles"
                  class="w-5 h-5 rounded border-gray-300 text-primary-navy focus:ring-primary-navy cursor-pointer"
                />
                <label
                  :for="'role-' + role.id"
                  class="text-xs font-bold text-gray-700 cursor-pointer select-none"
                >
                  {{ role.label || role.name }}
                </label>
              </div>
              <div v-if="rolesList.length === 0" class="text-xs text-gray-400 italic py-2">
                Memuat daftar peran...
              </div>
            </div>
          </div>

          <!-- Password Fields -->
          <div
            v-if="!isEditing || showPasswordFields"
            class="space-y-5 pt-6 border-t border-gray-100 mt-2"
          >
            <div class="flex items-center gap-2 mb-2">
              <Key class="w-4 h-4 text-primary-orange" />
              <h4 class="text-xs font-black uppercase tracking-tight text-gray-900">
                Keamanan Kata Sandi
              </h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-2">
                <Label for="password" class="text-xs font-black uppercase text-gray-700"
                  >Password {{ isEditing ? 'Baru' : '' }}</Label
                >
                <Input
                  id="password"
                  v-model="form.password"
                  type="password"
                  :required="!isEditing"
                  class="h-11"
                  placeholder="••••••••"
                />
              </div>
              <div class="space-y-2">
                <Label for="password_confirm" class="text-xs font-black uppercase text-gray-700"
                  >Konfirmasi Password</Label
                >
                <Input
                  id="password_confirm"
                  v-model="form.password_confirmation"
                  type="password"
                  :required="!isEditing"
                  class="h-11"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          <div v-else class="flex justify-center">
            <Button
              type="button"
              variant="ghost"
              class="text-xs font-bold text-primary-orange hover:bg-primary-orange/5"
              @click="showPasswordFields = true"
            >
              + Ingin Mengubah Password?
            </Button>
          </div>
        </form>

        <DialogFooter class="bg-gray-50/50 -mx-6 -mb-6 p-6 border-t shadow-inner">
          <Button
            type="button"
            variant="ghost"
            class="font-bold text-gray-500"
            @click="showModal = false"
            >BATAL</Button
          >
          <Button
            type="submit"
            :disabled="isSaving"
            class="bg-primary-navy text-white font-black px-8 hover:scale-[1.02] transition-transform active:scale-95"
            @click="saveUser"
          >
            <Loader2 v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'SIMPAN PERUBAHAN' : 'DAFTARKAN ANGGOTA' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Modals -->
    <UserDetailModal
      v-model:open="modals.detail"
      :user="userDetail"
      :loading="isDetailLoading"
      @add-membership="handleAddMembership"
    />

    <ResetPasswordModal
      v-model:open="modals.resetPassword"
      :user="selectedUser"
      :is-loading="isSaving"
      @submit="handleResetPassword"
    />

    <MembershipModal
      v-model:open="modals.membership"
      :is-editing="false"
      :user-id="form.id"
      :divisions="divisions"
      :users="usersList"
      :is-loading="isSaving"
      @submit="saveMembership"
    />

    <!-- Delete Confirmation -->
    <Dialog :open="modals.delete" @update:open="modals.delete = $event">
      <DialogContent class="sm:max-w-[420px]">
        <DialogHeader>
          <div
            class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-white ring-1 ring-red-100"
          >
            <Trash2 class="w-8 h-8 text-red-600" />
          </div>
          <DialogTitle class="text-center text-xl font-black"
            >Hapus Pengguna Permanent?</DialogTitle
          >
          <DialogDescription class="text-center text-sm pt-2">
            Anda akan menghapus total data <strong>{{ selectedUser?.name }}</strong> dari system.
            <span class="block mt-2 font-bold text-red-600"
              >Peringatan: Data yang dihapus tidak bisa dikembalikan!</span
            >
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="grid grid-cols-2 gap-3 sm:justify-center pt-6">
          <Button
            variant="outline"
            :disabled="isSaving"
            @click="modals.delete = false"
            class="font-bold border-gray-200"
            >BATAL</Button
          >
          <Button
            variant="destructive"
            @click="handleDelete"
            :disabled="isSaving"
            class="font-black bg-red-600"
          >
            <Loader2 v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" />
            SAYA YAKIN, HAPUS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Import Modal (Complete Overhaul with Preview) -->
    <Dialog :open="modals.import" @update:open="modals.import = $event">
      <DialogContent
        class="sm:max-w-[1000px] max-h-[90vh] flex flex-col p-0 overflow-hidden border-none"
      >
        <DialogHeader class="p-6 bg-gray-50/50 border-b flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-primary-navy/10 rounded-2xl flex items-center justify-center"
              >
                <FileUp class="w-6 h-6 text-primary-navy" />
              </div>
              <div>
                <DialogTitle class="text-2xl font-black">Import Anggota Baru</DialogTitle>
                <DialogDescription class="text-xs">
                  Proses import data masal dengan fitur pratinjau dan koreksi.
                </DialogDescription>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Badge variant="outline" class="px-3 py-1 bg-white">
                Step {{ importStep === 'upload' ? '1/2' : '2/2' }}:
                {{ importStep === 'upload' ? 'Unggah File' : 'Konfirmasi & Edit' }}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div class="flex-1 min-h-0 p-6 bg-white flex flex-col">
          <!-- UPLOAD STEP -->
          <div
            v-if="importStep === 'upload'"
            class="h-full flex flex-col items-center justify-center space-y-8 py-12"
          >
            <div
              class="w-full max-w-xl border-4 border-dashed border-gray-100 rounded-[32px] p-12 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-primary-navy/5 hover:border-primary-navy/10 transition-all cursor-pointer group relative"
              @click="$refs.importFileInput.click()"
            >
              <input
                type="file"
                ref="importFileInput"
                class="hidden"
                accept=".csv"
                @change="handleImportFileChange"
              />
              <div
                class="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
              >
                <FileUp class="w-10 h-10 text-primary-navy" />
              </div>
              <h4 class="text-xl font-bold text-gray-900">Pilih File CSV Perangkat Anda</h4>
              <p class="text-sm text-gray-400 mt-2 text-center max-w-xs">
                Pastikan file anda mengikuti template yang telah kami sediakan untuk menghindari
                kesalahan.
              </p>
              <div class="mt-8 flex gap-2">
                <Badge variant="secondary" class="bg-gray-100 text-gray-500">Maksimal 2MB</Badge>
                <Badge variant="secondary" class="bg-gray-100 text-gray-500">Ekstensi .CSV</Badge>
              </div>
            </div>

            <div
              class="w-full max-w-xl p-4 bg-primary-orange/5 rounded-2xl border border-primary-orange/20 flex gap-4"
            >
              <div
                class="flex-shrink-0 w-10 h-10 bg-primary-orange/10 rounded-xl flex items-center justify-center"
              >
                <AlertCircle class="w-5 h-5 text-primary-orange" />
              </div>
              <div>
                <p class="text-xs font-black text-primary-orange uppercase mb-1">Penting</p>
                <p class="text-[11px] text-primary-orange/80 leading-relaxed font-medium">
                  Sistem akan melakukan pembaruan jika menemukan email yang sudah terdaftar, dan
                  membuat akun baru jika email belum ada dalam database.
                </p>
              </div>
            </div>
          </div>

          <!-- PREVIEW STEP -->
          <div v-else class="flex-1 min-h-0 flex flex-col space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <h4 class="font-black text-gray-900 uppercase tracking-widest text-xs">
                  Preview Data ({{ importRows.length }} Baris)
                </h4>
                <Badge v-if="importRows.length > 50" variant="destructive" class="text-[10px]"
                  >Over Limit? (Max 50 recommended)</Badge
                >
              </div>
              <div class="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="text-xs font-bold border-primary-navy/20 text-primary-navy hover:bg-primary-navy/5"
                  @click="addImportRow"
                >
                  <Plus class="w-4 h-4 mr-2" /> TAMBAH BARIS
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  class="text-xs font-bold text-gray-400 hover:text-red-500"
                  @click="resetImport"
                >
                  <X class="w-4 h-4 mr-2" /> RESET SEMUA
                </Button>
              </div>
            </div>

            <div class="flex-1 min-h-0 overflow-auto border rounded-xl bg-gray-50/10 import-table">
              <table class="w-full text-left border-collapse min-w-[1800px]">
                <thead class="sticky top-0 bg-white z-20 border-b">
                  <tr class="bg-gray-50/50">
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-12"
                    >
                      #
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[200px]"
                    >
                      Nama Lengkap *
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[200px]"
                    >
                      Email *
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[140px]"
                    >
                      Telepon
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[100px]"
                    >
                      Gender
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[120px]"
                    >
                      Tgl Lahir
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[250px]"
                    >
                      Alamat
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[140px]"
                    >
                      Peran (slug)
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[140px]"
                    >
                      Divisi
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[140px]"
                    >
                      Jabatan
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[80px]"
                    >
                      Level
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[100px]"
                    >
                      Periode
                    </th>
                    <th
                      class="p-3 text-[10px] font-black text-gray-400 uppercase tracking-wider w-[100px] text-center sticky right-0 bg-gray-50"
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                  <tr
                    v-for="(row, idx) in importRows"
                    :key="row.id"
                    class="hover:bg-primary-navy/5 transition-colors group"
                  >
                    <td class="p-3 text-[11px] font-bold text-gray-400">{{ idx + 1 }}</td>

                    <!-- Editable Fields Mapping -->
                    <td v-for="header in templateHeaders" :key="header" class="p-2">
                      <div class="relative group/field">
                        <input
                          v-model="row[header]"
                          :placeholder="header === 'birth_date' ? 'YYYY-MM-DD' : ''"
                          class="w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-primary-navy focus:bg-white rounded px-2 py-1.5 text-xs transition-all outline-none"
                          :class="{
                            'border-red-500 bg-red-50/30': row.errors && row.errors[header],
                            'font-bold text-gray-900': header === 'name',
                            'text-primary-navy': header === 'email',
                          }"
                          @input="validateImportRow(row)"
                        />
                        <!-- Error Tooltip -->
                        <div
                          v-if="row.errors && row.errors[header]"
                          class="absolute left-0 -top-8 bg-red-600 text-white text-[9px] px-2 py-1 rounded shadow-lg z-30 whitespace-nowrap hidden group-hover/field:block"
                        >
                          {{ row.errors[header] }}
                        </div>
                      </div>
                    </td>

                    <td
                      class="p-2 text-center sticky right-0 bg-white group-hover:bg-gray-50 transition-colors"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-gray-300 hover:text-red-500 hover:bg-red-50"
                        @click="removeImportRow(row.id)"
                      >
                        <Trash class="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex items-center justify-between text-[10px]">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1.5 text-gray-400">
                  <span class="w-2 h-2 rounded-full bg-red-500"></span> Membutuhkan Perhatian
                </span>
                <span class="text-gray-400 italic"
                  >Klik + TAMBAH BARIS untuk input manual. Koleksi data masal dari file .CSV
                  anda.</span
                >
              </div>
              <div v-show="hasImportErrors" class="font-bold text-red-500 flex items-center gap-1">
                <AlertCircle class="w-3 h-3" /> Masih terdapat kesalahan format data
              </div>
            </div>
          </div>
        </div>

        <DialogFooter class="p-6 bg-gray-50/50 border-t flex-shrink-0">
          <Button
            v-if="importStep === 'preview'"
            variant="outline"
            class="font-bold border-gray-200"
            @click="resetImport"
            >GANTI FILE</Button
          >
          <div class="flex-1"></div>
          <Button
            variant="ghost"
            class="font-bold text-gray-500 mr-2"
            @click="modals.import = false"
            >TUTUP</Button
          >
          <Button
            v-if="importStep === 'preview'"
            class="bg-primary-navy text-white font-black px-12"
            :disabled="isSaving || importRows.length === 0 || hasImportErrors"
            @click="submitImport"
          >
            <Loader2 v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" />
            <Check v-else class="w-4 h-4 mr-2" />
            KONFIRMASI IMPORT ({{ importRows.length }})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import {
  Users,
  Search,
  RefreshCcw,
  Edit3,
  Trash2,
  Trash,
  Eye,
  MoreVertical,
  Key,
  UserX,
  UserCheck,
  Loader2,
  ShieldCheck,
  UserCircle,
  Activity,
  FileUp,
  Plus,
  Check,
  X,
  AlertCircle,
  Download,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

// Services
import userService from '@/services/user.service'
import organizationService from '@/services/organization.service'

// Stores
import { useAuthStore } from '@/stores/auth'

// Components
import UserDetailModal from '@/components/admin/users/UserDetailModal.vue'
import ResetPasswordModal from '@/components/admin/users/ResetPasswordModal.vue'
import MembershipModal from '@/components/admin/organization/MembershipModal.vue'

const authStore = useAuthStore()
const toast = useToast()

// Table Columns
const columns = [
  { key: 'user', label: 'Pengguna' },
  { key: 'roles', label: 'Peran & Akses' },
  { key: 'divisions', label: 'Divisi Org' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '', class: 'text-right' },
]

// Data
const users = ref([])
const divisions = ref([])
const rolesList = ref([]) // Roles list
const usersList = ref([]) // For MembershipModal
const isLoading = ref(false)
const isDetailLoading = ref(false)
const isSaving = ref(false)
const stats = reactive({ total: 0, active: 0, inactive: 0, verified: 0 })

// State
const showModal = ref(false)
const isEditing = ref(false)
const showPasswordFields = ref(false)
const filters = reactive({ search: '', status: 'all', division: 'all' })
const pagination = reactive({ page: 1, perPage: 10, total: 0 })

const modals = reactive({
  detail: false,
  resetPassword: false,
  membership: false,
  delete: false,
  import: false,
})

const importFile = ref(null)
const importFileInput = ref(null)
const importRows = ref([]) // Data parsed from CSV
const importStep = ref('upload') // 'upload' or 'preview'

const selectedUser = ref(null)
const userDetail = ref(null)

const form = reactive({
  id: null,
  name: '',
  email: '',
  status: 'active',
  password: '',
  password_confirmation: '',
  photo: null,
  photoPreview: null,
  avatar_url: null,
  roles: [],
})

const hasImportErrors = computed(() => {
  return importRows.value.some((row) => row.errors && Object.keys(row.errors).length > 0)
})

const statsDisplay = computed(() => [
  {
    label: 'Total Anggota',
    value: stats.total,
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Status Aktif',
    value: stats.active,
    icon: UserCheck,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    label: 'Akun Terverifikasi',
    value: stats.verified,
    icon: ShieldCheck,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    label: 'Non-Aktif',
    value: stats.inactive,
    icon: UserX,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
])

let searchTimeout = null
function debouncedSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.page = 1
    fetchUsers()
  }, 500)
}

async function fetchUsers() {
  isLoading.value = true
  try {
    const params = {
      page: pagination.page,
      per_page: pagination.perPage,
      search: filters.search,
    }
    if (filters.status !== 'all') params.status = filters.status
    if (filters.division !== 'all') params.division_id = filters.division

    const response = await userService.getAll(params)
    users.value = response.data || []
    pagination.total = response.meta?.total || 0
    usersList.value = users.value // Simplified list for modal
  } catch (error) {
    toast.error('Gagal memuat pengguna')
  } finally {
    isLoading.value = false
  }
}

async function fetchStats() {
  try {
    const response = await userService.getStatistics()
    const data = response.data || {}
    stats.total = data.total_users || 0
    stats.active = data.active_users || 0
    stats.inactive = data.inactive_users || 0
    stats.verified = data.total_users || 0 // Default to total if verified not provided
  } catch (error) {}
}

async function fetchDivisions() {
  try {
    const response = await organizationService.getDivisions()
    divisions.value = response.data || []
  } catch (error) {}
}

async function viewUser(user) {
  selectedUser.value = user
  modals.detail = true
  isDetailLoading.value = true
  try {
    const res = await userService.getById(user.id)
    userDetail.value = res.data
  } catch (err) {
    toast.error('Gagal memuat detail pengguna')
    modals.detail = false
  } finally {
    isDetailLoading.value = false
  }
}

async function fetchRoles() {
  try {
    const res = await userService.getRoles()
    rolesList.value = res.data || []
  } catch (err) {}
}

function openCreateModal() {
  isEditing.value = false
  showPasswordFields.value = true
  resetForm()
  showModal.value = true
}

function editUser(user) {
  isEditing.value = true
  showPasswordFields.value = false
  resetForm()
  Object.assign(form, {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    avatar_url: user.avatar_url,
    roles: user.roles?.map((r) => r.name) || [],
  })
  showModal.value = true
}

function resetForm() {
  Object.assign(form, {
    id: null,
    name: '',
    email: '',
    status: 'active',
    password: '',
    password_confirmation: '',
    photo: null,
    photoPreview: null,
    avatar_url: null,
    roles: [],
  })
}

function handlePhotoChange(e) {
  const file = e.target.files[0]
  if (file) {
    form.photo = file
    form.photoPreview = URL.createObjectURL(file)
  }
}

async function saveUser() {
  isSaving.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('status', form.status)

    if (form.password) {
      formData.append('password', form.password)
      formData.append('password_confirmation', form.password_confirmation)
    }

    if (form.photo) {
      formData.append('photo', form.photo)
    }

    // Append roles
    if (form.roles && form.roles.length) {
      form.roles.forEach((roleName) => {
        formData.append('roles[]', roleName)
      })
    }

    if (isEditing.value) {
      await userService.update(form.id, formData)
      toast.success('Informasi pengguna berhasil diperbarui')
    } else {
      await userService.create(formData)
      toast.success('Pengguna baru berhasil didaftarkan')
    }

    showModal.value = false
    fetchUsers()
    fetchStats()
  } catch (error) {
    // If it's a validation error, toast handles it via interceptor
    // but we can add a custom check here if needed.
    console.error('Save error:', error)
  } finally {
    isSaving.value = false
  }
}

function openResetPasswordModal(user) {
  selectedUser.value = user
  modals.resetPassword = true
}

async function handleResetPassword(data) {
  isSaving.value = true
  try {
    await userService.changePassword({
      user_id: selectedUser.value.id,
      password: data.password,
      password_confirmation: data.password_confirmation,
    })
    toast.success('Keamanan akun diperbarui: Password berhasil direset')
    modals.resetPassword = false
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal mereset password')
  } finally {
    isSaving.value = false
  }
}

async function toggleUserStatus(user) {
  try {
    if (user.status === 'active') await userService.deactivate(user.id)
    else await userService.activate(user.id)
    toast.success('Akses akun berhasil dimodifikasi')
    fetchUsers()
    fetchStats()
  } catch (error) {
    toast.error('Gagal mengubah status akses')
  }
}

function confirmDelete(user) {
  selectedUser.value = user
  modals.delete = true
}

async function handleDelete() {
  isSaving.value = true
  try {
    await userService.delete(selectedUser.value.id)
    toast.success('Pengguna telah dihapus dari sistem permanently')
    modals.delete = false
    fetchUsers()
    fetchStats()
  } catch (err) {
    toast.error('Gagal menghapus data pengguna')
  } finally {
    isSaving.value = false
  }
}

function handleAddMembership(userId) {
  form.id = userId
  modals.membership = true
}

async function saveMembership(data) {
  isSaving.value = true
  try {
    await organizationService.createMembership(data)
    toast.success('Penempatan divisi berhasil disimpan')
    modals.membership = false
    if (modals.detail) {
      viewUser(selectedUser.value)
    }
    fetchUsers()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Gagal mengatur penempatan divisi')
  } finally {
    isSaving.value = false
  }
}

// CSV Template Headers
const templateHeaders = [
  'name',
  'email',
  'phone',
  'gender',
  'birth_date',
  'address',
  'bio',
  'role',
  'division',
  'position',
  'level',
  'period',
]

function downloadTemplate() {
  const exampleRow = [
    'Fauzi Ahmad',
    'fauzi@example.com',
    '08123456789',
    'male',
    '1995-10-15',
    'Jl. Merdeka No. 12',
    'Pengembang Web',
    'admin|staff',
    'Teknologi',
    'Lead Developer',
    '4',
    '2024',
  ]
  const csvContent = [templateHeaders.join(','), exampleRow.join(',')].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'template_import_user.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function handleImportFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    if (!file.name.endsWith('.csv')) {
      toast.error('File harus berformat .csv')
      return
    }
    importFile.value = file
    parseCSV(file)
  }
}

function parseCSV(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const text = e.target.result
    const lines = text
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l !== '')
    if (lines.length < 1) {
      toast.error('File CSV kosong atau tidak valid')
      return
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())

    // Check if essential headers exist
    if (!headers.includes('name') || !headers.includes('email')) {
      toast.error('Header Name dan Email wajib ada dalam file CSV')
      return
    }

    const rows = []
    for (let i = 1; i < lines.length; i++) {
      const currentline = lines[i].split(',')
      const obj = {}

      // Map based on headers
      headers.forEach((h, index) => {
        if (templateHeaders.includes(h)) {
          obj[h] = currentline[index] ? currentline[index].trim() : ''
        }
      })

      // Fill missing internal headers with empty string
      templateHeaders.forEach((th) => {
        if (!(th in obj)) obj[th] = ''
      })

      const id = Math.random().toString(36).substr(2, 9)
      const dataRow = {
        ...obj,
        id,
        errors: {},
      }

      validateImportRow(dataRow)
      rows.push(dataRow)
    }

    if (rows.length === 0) {
      toast.error('Tidak ada data yang bisa diimport. Mohon periksa format baris CSV anda.')
      return
    }

    importRows.value = rows
    importStep.value = 'preview'
  }
  reader.readAsText(file)
}

function validateImportRow(row) {
  const errors = {}

  // Name Validation
  if (!row.name) errors.name = 'Nama lengkap wajib diisi'

  // Email Validation
  if (!row.email) {
    errors.email = 'Alamat email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
    errors.email = 'Format email tidak valid (contoh: user@domain.com)'
  }

  // Gender Validation
  if (row.gender && !['male', 'female'].includes(row.gender.toLowerCase())) {
    errors.gender = 'Gunakan: male atau female'
  }

  // Date Validation
  if (row.birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(row.birth_date)) {
    errors.birth_date = 'Gunakan format YYYY-MM-DD'
  }

  // Role format check simple hint
  if (row.role && row.role.includes(',')) {
    errors.role = 'Gunakan pemisah | untuk peran ganda'
  }

  row.errors = errors
}

function addImportRow() {
  const id = Math.random().toString(36).substr(2, 9)
  const newRow = { id, errors: {} }
  templateHeaders.forEach((th) => (newRow[th] = ''))

  validateImportRow(newRow)
  importRows.value.unshift(newRow) // Add to top

  if (importStep.value === 'upload') {
    importStep.value = 'preview'
  }
}

function removeImportRow(id) {
  importRows.value = importRows.value.filter((r) => r.id !== id)
  if (importRows.value.length === 0) {
    resetImport()
  }
}

function resetImport() {
  importFile.value = null
  importRows.value = []
  importStep.value = 'upload'
  modals.import = false
}

async function submitImport() {
  if (importRows.value.length === 0) return

  isSaving.value = true
  try {
    // Send the cleaned data array to backend
    const dataToSend = importRows.value.map((row) => {
      const { id, errors, ...cleanRow } = row
      return cleanRow
    })

    const response = await userService.importData(dataToSend)
    const summary = response.data

    if (summary.failure_count > 0) {
      toast.warning(
        `Import selesai dengan beberapa error. Berhasil: ${summary.success_count}, Gagal: ${summary.failure_count}`,
      )
      console.warn('Import Errors:', summary.errors)
    } else {
      toast.success(`Berhasil mengimport ${summary.success_count} pengguna!`)
    }

    resetImport()
    fetchUsers()
    fetchStats()
  } catch (error) {
    toast.error(error.response?.data?.message || 'Gagal memproses import data')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchUsers()
  fetchStats()
  fetchDivisions()
  fetchRoles()
})
</script>

<style scoped>
.DataTable :deep(thead tr th) {
  @apply text-[10px] uppercase font-black tracking-widest text-gray-400 py-4;
}

/* Custom scrollbar for preview table */
.import-table::-webkit-scrollbar {
  height: 6px;
}
.import-table::-webkit-scrollbar-track {
  background: transparent;
}
.import-table::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
