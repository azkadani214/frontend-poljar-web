<template>
  <div class="space-y-4">
    <div class="overflow-x-auto rounded-md border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead v-for="col in columns" :key="col.key" :class="col.class">
              {{ col.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="loading && items.length === 0" v-for="i in 5" :key="i">
            <TableCell v-for="col in columns" :key="col.key">
              <div class="h-4 bg-gray-100 animate-pulse rounded"></div>
            </TableCell>
          </TableRow>
          
          <TableRow v-else-if="items.length === 0">
            <TableCell :colspan="columns.length" class="h-32 text-center text-gray-500">
              {{ emptyMessage }}
            </TableCell>
          </TableRow>

          <TableRow v-for="(item, idx) in items" :key="item.id || idx">
            <TableCell v-for="col in columns" :key="col.key" :class="col.cellClass">
              <slot :name="`cell-${col.key}`" :item="item">
                {{ item[col.key] }}
              </slot>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.total > 0" class="flex items-center justify-between">
      <p class="text-xs text-gray-500 font-medium uppercase tracking-wider">
        Total {{ pagination.total }} Data
      </p>
      <div class="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          :disabled="pagination.page === 1" 
          @click="$emit('page-change', pagination.page - 1)"
        >
          Previous
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          :disabled="pagination.page >= totalPages" 
          @click="$emit('page-change', pagination.page + 1)"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const props = defineProps({
  columns: { type: Array, required: true },
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  pagination: { type: Object, default: null },
  emptyMessage: { type: String, default: 'No data found.' }
})

const emit = defineEmits(['page-change'])

const totalPages = computed(() => {
  if (!props.pagination) return 0
  return Math.ceil(props.pagination.total / (props.pagination.perPage || 10))
})
</script>
