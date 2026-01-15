<script setup>
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SurvivalGuide from './components/SurvivalGuide.vue'
import RoeSection from './components/RoeSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <SurvivalGuide />
      <RoeSection />
    </main>
    <SiteFooter />
  </div>
</template>
