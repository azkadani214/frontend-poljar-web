<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ProgramSection />
    <ImpactSection />
    <NewsSection />
    <BlogSection />
    <TestimonialSection />
    <FAQSection />
    <NewsletterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/components/public/home/HeroSection.vue'
import AboutSection from '@/components/public/home/AboutSection.vue'
import ProgramSection from '@/components/public/home/ProgramSection.vue'
import ImpactSection from '@/components/public/home/ImpactSection.vue'
import NewsSection from '@/components/public/home/NewsSection.vue'
import BlogSection from '@/components/public/home/BlogSection.vue'
import TestimonialSection from '@/components/public/home/TestimonialSection.vue'
import FAQSection from '@/components/public/home/FAQSection.vue'
import NewsletterSection from '@/components/public/home/NewsletterSection.vue'

onMounted(() => {
  document.title = 'Polinema Mengajar - Transforming Communities'
})
</script>
