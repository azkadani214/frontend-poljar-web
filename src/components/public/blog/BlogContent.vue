<template>
  <div
    class="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary-navy prose-a:text-primary-orange prose-blockquote:border-primary-orange prose-img:rounded-lg"
  >
    <div v-html="content"></div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
/* Custom prose overrides if needed */
.prose :deep(img) {
  @apply shadow-xl border-4 border-white mx-auto;
}
</style>
