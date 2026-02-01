<script setup>
import { ref } from 'vue';

const mobileMenu = ref(false);
</script>

<template>
  <nav class="fixed w-full z-50 bg-black/80 border-b border-white/10 px-4 md:px-6 py-4 flex justify-between items-center backdrop-blur-md">
    <div class="flex items-center gap-3">
      <router-link to="/" class="flex items-center gap-3">
        <i class="fas fa-shield-halved text-medieval-gold text-2xl"></i>
        <span class="font-medieval text-lg md:text-xl font-bold tracking-wider text-medieval-gold">[VKG] Valhalla Kingdom</span>
      </router-link>
    </div>
    
    <div class="hidden lg:flex gap-6 items-center text-sm uppercase tracking-wider font-bold">
      <router-link to="/" class="hover:text-medieval-gold transition duration-300">Home</router-link>
      
      <router-link :to="{ path: '/', hash: '#sobre' }" class="hover:text-medieval-gold transition duration-300">About</router-link>
      
      <router-link to="/guia" class="hover:text-medieval-gold transition duration-300 text-medieval-gold">Academy (Guide)</router-link>
      
      <router-link :to="{ path: '/', hash: '#gifts' }" class="hover:text-medieval-gold transition duration-300">Gifts</router-link>
      
      <router-link :to="{ path: '/', hash: '#roe' }" class="hover:text-medieval-gold transition duration-300">RoE</router-link>

      <router-link :to="{ path: '/', hash: '#recrutamento' }" class="bg-medieval-gold text-black px-4 py-2 rounded font-bold hover:bg-yellow-600 transition text-xs">
        Recruitment
      </router-link>
    </div>

    <div class="lg:hidden flex items-center gap-4">
      <button @click="mobileMenu = !mobileMenu"><i class="fas fa-bars text-2xl text-medieval-gold"></i></button>
    </div>

    <div v-if="mobileMenu" class="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 text-xl font-medieval text-medieval-gold">
      <button @click="mobileMenu = false" class="absolute top-6 right-6"><i class="fas fa-times text-white"></i></button>
      
      <router-link @click="mobileMenu = false" to="/">Home</router-link>
      <router-link @click="mobileMenu = false" to="/guia">Game Guide</router-link>
      <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#gifts' }">Gifts</router-link>
      <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#roe' }">Rules</router-link>
    </div>
  </nav>
</template>