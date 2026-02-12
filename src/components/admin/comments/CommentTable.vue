<template>
  <div class="rounded-md border bg-white">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[200px]">Penulis</TableHead>
          <TableHead>Komentar</TableHead>
          <TableHead>Artikel</TableHead>
          <TableHead class="w-[120px]">Status</TableHead>
          <TableHead class="w-[150px] text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="loading">
          <TableCell colspan="5" class="h-24 text-center">
            <div class="flex items-center justify-center gap-2">
              <div
                class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
              ></div>
              Memuat data...
            </div>
          </TableCell>
        </TableRow>
        <TableRow v-else-if="!comments.length">
          <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
            Tidak ada komentar ditemukan.
          </TableCell>
        </TableRow>
        <TableRow v-for="comment in comments" :key="comment.id" class="group">
          <TableCell>
            <div class="flex items-center gap-3">
              <Avatar class="h-8 w-8">
                <AvatarFallback class="bg-primary-navy/5 text-primary-navy text-xs font-bold">
                  {{ comment.author_name?.charAt(0) || 'G' }}
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col overflow-hidden">
                <span class="font-bold text-sm truncate">{{ comment.author_name }}</span>
                <span class="text-[10px] text-muted-foreground truncate">{{
                  comment.author_email
                }}</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div class="max-w-md">
              <p class="text-sm text-gray-600 line-clamp-2 italic" :title="comment.comment">
                "{{ comment.comment }}"
              </p>
              <span class="text-[10px] text-muted-foreground mt-1 block">
                {{ formatDate(comment.created_at) }}
              </span>
            </div>
          </TableCell>
          <TableCell>
            <div class="max-w-xs overflow-hidden">
              <span class="text-xs font-medium text-primary-navy line-clamp-1">
                {{ comment.post?.title || comment.post_title || 'N/A' }}
              </span>
              <Badge variant="outline" class="text-[9px] mt-1 capitalize">
                {{ comment.post?.status || 'published' }}
              </Badge>
            </div>
          </TableCell>
          <TableCell>
            <Badge :variant="comment.approved ? 'success' : 'warning'" class="capitalize font-bold">
              {{ comment.approved ? 'Disetujui' : 'Menunggu' }}
            </Badge>
          </TableCell>
          <TableCell class="text-right">
            <div
              class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                v-if="!comment.approved && authStore.hasPermission('komentar.approve')"
                variant="outline"
                size="icon"
                class="h-8 w-8 text-green-600 border-green-200 hover:bg-green-50"
                @click="$emit('approve', comment.id)"
                title="Setujui"
              >
                <Check class="h-4 w-4" />
              </Button>
              <Button
                v-if="!comment.approved && authStore.hasPermission('komentar.approve')"
                variant="outline"
                size="icon"
                class="h-8 w-8 text-orange-600 border-orange-200 hover:bg-orange-50"
                @click="$emit('reject', comment.id)"
                title="Tolak"
              >
                <X class="h-4 w-4" />
              </Button>
              <Button
                v-if="authStore.hasPermission('komentar.delete')"
                variant="outline"
                size="icon"
                class="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50"
                @click="$emit('delete', comment.id)"
                title="Hapus"
              >
                <Trash2 class="h-4 w-4" />
              </Button>
              <div
                v-if="
                  comment.approved &&
                  !authStore.hasPermission('komentar.approve') &&
                  !authStore.hasPermission('komentar.delete')
                "
                class="text-[10px] text-muted-foreground italic"
              >
                No Action
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Pagination -->
    <div
      v-if="pagination.last_page > 1"
      class="flex items-center justify-between px-4 py-4 border-t"
    >
      <p class="text-xs text-muted-foreground">
        Menampilkan {{ comments.length }} dari {{ pagination.total }} komentar
      </p>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="pagination.current_page === 1"
          @click="$emit('page-change', pagination.current_page - 1)"
        >
          Sebelumnya
        </Button>
        <div class="flex items-center gap-1">
          <Button
            v-for="page in pagination.last_page"
            :key="page"
            variant="outline"
            size="sm"
            :class="{ 'bg-primary-navy text-white': pagination.current_page === page }"
            @click="$emit('page-change', page)"
          >
            {{ page }}
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          :disabled="pagination.current_page === pagination.last_page"
          @click="$emit('page-change', pagination.current_page + 1)"
        >
          Selanjutnya
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Check, X, Trash2 } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth'
import dayjs from 'dayjs'

const authStore = useAuthStore()

defineProps({
  comments: Array,
  loading: Boolean,
  pagination: Object,
})

defineEmits(['approve', 'reject', 'delete', 'page-change'])

const formatDate = (date) => {
  return dayjs(date).format('DD MMM YYYY, HH:mm')
}
</script>
