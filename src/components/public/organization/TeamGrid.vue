<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    <TeamCard v-for="member in members" :key="member.id" :member="member" class="animate-fade-in" />
  </div>
</template>

<script setup>
import TeamCard from './TeamCard.vue'

defineProps({
  members: {
    type: Array,
    required: true,
  },
})
</script>
