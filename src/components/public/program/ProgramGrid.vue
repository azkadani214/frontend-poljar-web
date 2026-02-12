<template>
  <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
    <ProgramCard
      v-for="program in programs"
      :key="program.id"
      :program="program"
      class="animate-fade-in"
    />
  </div>
</template>

<script setup>
import ProgramCard from './ProgramCard.vue'

defineProps({
  programs: {
    type: Array,
    required: true,
  },
})
</script>
