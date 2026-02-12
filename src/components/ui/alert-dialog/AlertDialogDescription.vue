<script setup>
import { AlertDialogDescription } from 'radix-vue'
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps(['asChild', 'as', 'class'])

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <AlertDialogDescription
    v-bind="delegatedProps"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>
