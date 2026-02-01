<script setup>
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import GiftsSection from '../components/GiftsSection.vue'
import RoeSection from '../components/RoeSection.vue'
import JoinClanSection from '../components/JoinClanSection.vue'
// Note: We removed SurvivalGuide from here as it will have its own page
</script>

<template>
  <div>
    <HeroSection />
    <AboutSection />
    <GiftsSection />
    
    <section class="py-20 bg-stone-900/50 text-center px-6">
      <h2 class="text-3xl font-medieval text-medieval-gold mb-4">Valhalla Academy</h2>
      <p class="text-gray-400 mb-8">Access our complete library of strategies and beginner guides.</p>
      <router-link to="/guia" class="border border-medieval-gold text-medieval-gold px-8 py-3 rounded hover:bg-medieval-gold hover:text-black transition font-bold uppercase">
        Read Full Guide
      </router-link>
    </section>

    <RoeSection />
    <JoinClanSection />
  </div>
</template>