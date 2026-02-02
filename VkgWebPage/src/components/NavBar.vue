<script setup>
import { ref } from 'vue';

const mobileMenu = ref(false);
</script>

<template>
  <nav class="fixed w-full z-50 bg-black/90 border-b border-white/10 px-4 md:px-6 py-4 flex justify-between items-center backdrop-blur-md">
    <div class="flex items-center gap-3">
      <router-link to="/" class="flex items-center gap-3 group">
        <i class="fas fa-shield-halved text-medieval-gold text-2xl group-hover:scale-110 transition"></i>
        <span class="font-medieval text-lg md:text-xl font-bold tracking-wider text-medieval-gold group-hover:text-white transition">[VKG] Valhalla Kingdom</span>
      </router-link>
    </div>
    
    <!-- Desktop Menu -->
    <div class="hidden lg:flex gap-6 items-center text-sm uppercase tracking-wider font-bold">
      <router-link to="/" class="hover:text-medieval-gold transition duration-300">Home</router-link>
      <router-link :to="{ path: '/', hash: '#sobre' }" class="hover:text-medieval-gold transition duration-300">About</router-link>
      <router-link to="/guia" class="hover:text-medieval-gold transition duration-300 text-medieval-gold">Academy (Guide)</router-link>
      <router-link :to="{ path: '/', hash: '#roe' }" class="hover:text-medieval-gold transition duration-300">RoE</router-link>
      <router-link :to="{ path: '/', hash: '#gifts' }" class="hover:text-medieval-gold transition duration-300">Gifts</router-link>
      <router-link :to="{ path: '/', hash: '#recrutamento' }" class="bg-medieval-gold text-black px-4 py-2 rounded font-bold hover:bg-yellow-600 transition text-xs">
        Recruitment
      </router-link>
    </div>

    <!-- Mobile Toggle Button -->
    <div class="lg:hidden flex items-center gap-4">
      <button @click="mobileMenu = !mobileMenu" class="text-medieval-gold focus:outline-none">
        <i class="fas" :class="mobileMenu ? 'fa-times' : 'fa-bars'" style="font-size: 1.5rem;"></i>
      </button>
    </div>

    <!-- Mobile Menu Overlay (Corrigido) -->
    <Transition name="fade">
      <div v-if="mobileMenu" class="fixed inset-0 top-[73px] z-40 bg-black/95 flex flex-col items-center justify-start pt-10 gap-8 text-xl font-medieval text-medieval-gold overflow-y-auto h-[calc(100vh-73px)]">
        
        <router-link @click="mobileMenu = false" to="/" class="hover:text-white transition">Home</router-link>
        <router-link @click="mobileMenu = false" to="/guia" class="hover:text-white transition">Guia de Jogo</router-link>
        <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#gifts' }" class="hover:text-white transition">Gifts</router-link>
        <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#roe' }" class="hover:text-white transition">Regras (RoE)</router-link>
        <router-link @click="mobileMenu = false" :to="{ path: '/', hash: '#recrutamento' }" class="hover:text-white transition">Recrutamento</router-link>
        
        <div class="mt-8 border-t border-white/10 w-1/2"></div>
        <p class="text-xs text-gray-500 font-sans uppercase tracking-widest">Valhalla Kingdom</p>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>