<script setup>
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import GiftsSection from '../components/GiftsSection.vue'
import RoeSection from '../components/RoeSection.vue'
import JoinClanSection from '../components/JoinClanSection.vue'
</script>

<template>
  <div class="bg-[#030508] min-h-screen text-slate-300">
    <HeroSection />
    <AboutSection />
    <GiftsSection />
    
    <!-- Academy Teaser (Wolf Theme) -->
    <section class="py-24 bg-[#0a0f1a] border-y border-slate-800 text-center px-6 relative overflow-hidden">
      <!-- Shadow/glow background effect -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div class="relative z-10">
        <h2 class="text-3xl font-medieval text-slate-200 mb-4 tracking-wide uppercase drop-shadow-md">
          WLF Wolf <span class="text-blue-500 font-light">Academy</span>
        </h2>
        <p class="text-slate-400 mb-8 max-w-2xl mx-auto italic">
          "Wolves don't climb mountains... we own them." Access the pack's secret library to dominate Kingdom 290.
        </p>
        <router-link to="/guia" class="inline-block border border-blue-500/50 bg-blue-900/20 text-blue-400 px-10 py-4 rounded hover:bg-blue-600 hover:text-white transition duration-300 font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          Enter the Academy
        </router-link>
      </div>
    </section>

    <RoeSection />
    <JoinClanSection />
  </div>
</template>