<script setup>
import { ref } from 'vue';

const mobileMenu = ref(false);
</script>

<template>
  <nav class="fixed w-full z-50 bg-black/80 border-b border-white/10 px-4 md:px-6 py-4 flex justify-between items-center">
    <div class="flex items-center gap-3">
      <i class="fas fa-shield-halved text-medieval-gold text-2xl"></i>
      <span class="font-medieval text-lg md:text-xl font-bold tracking-wider text-medieval-gold">[VKG] Valhalla Kingdom</span>
    </div>
    
    <div class="hidden lg:flex gap-6 items-center">
      <a href="#inicio" class="hover:text-medieval-gold transition duration-300">Home</a>
      <a href="#sobre" class="hover:text-medieval-gold transition duration-300">About</a>
      <a href="#jogar" class="hover:text-medieval-gold transition duration-300">How to Play</a>
      <a href="#roe" class="hover:text-medieval-gold transition duration-300">RoE</a>
      <a href="#gifts" class="hover:text-medieval-gold transition duration-300">Gifts</a>

      <button class="bg-medieval-gold text-black px-4 py-2 rounded font-bold hover:bg-yellow-600 transition text-sm uppercase">Recrutamento</button>
    </div>

    <div class="lg:hidden flex items-center gap-4">
      <button @click="mobileMenu = !mobileMenu"><i class="fas fa-bars text-2xl"></i></button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="mobileMenu" class="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 text-2xl font-medieval text-medieval-gold">
      <button @click="mobileMenu = false" class="absolute top-6 right-6"><i class="fas fa-times text-white"></i></button>
      <a @click="mobileMenu = false" href="#inicio">Home</a>
      <a @click="mobileMenu = false" href="#sobre">About</a>
      <a @click="mobileMenu = false" href="#jogar">How to Play</a>
      <a @click="mobileMenu = false" href="#roe">RoE</a>
      <a @click="mobileMenu = false" href="#gifts">Gifts</a>
    </div>
  </nav>
</template>
